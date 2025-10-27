import { useState, useCallback, useRef, useEffect } from "react";
import L, { LatLngBounds } from "leaflet";
import { FetchBuildings, type IBuildingProps } from "@/api/overpass";
import { FetchBuildingsColors, type IBuildingColorProps } from "@/api/buildingColors";
import { useDebounce } from "@/hooks/useDebounce";
import { useMapBoundsListener } from "@/hooks/useMapBoundsListener";
import { mapEvents } from "@/events/mapEvents";

function RoundCoord(value: number): number {
	return parseFloat(value.toFixed(4));
}

function BoundsKey(bounds: LatLngBounds): string {
	const s = RoundCoord(bounds.getSouth());
	const w = RoundCoord(bounds.getWest());
	const n = RoundCoord(bounds.getNorth());
	const e = RoundCoord(bounds.getEast());
	return `${s}_${w}_${n}_${e}`;
}

export function useBuildingLayerLogic() {
	const [buildings, setBuildings] = useState<IBuildingProps[]>([]);
	const [colorOverrides, setColorOverrides] = useState<IBuildingColorProps[]>([]);
	const [activeBuilding, setActiveBuilding] = useState<IBuildingProps | null>(null);
	const buildingRefs = useRef<Map<string, L.Polygon>>(new Map());
	const cahceRef = useRef<Map<string, IBuildingProps[]>>(new Map());

	async function fetchBuildings(bounds: LatLngBounds): Promise<void> {
		const key = BoundsKey(bounds);

		if (cahceRef.current.has(key)) {
			const cached = cahceRef.current.get(key);

			if (cached) {
				setBuildings(cached);
				return;
			}
		}

		try {
			const data = await FetchBuildings(bounds);
			setBuildings(data);
			cahceRef.current.set(key, data);
		} catch (err) {
			console.error("Error fetching buildings:", err);
		}
	}

	async function LoadColors(): Promise<void> {
		try {
			const colors = await FetchBuildingsColors();
			setColorOverrides(colors);
		} catch (err) {
			console.error("Error fetching building colors:", err);
		}
	}

	const handleBoundsChange = useCallback(fetchBuildings, []);
	const debounceedHandleBoundsChange = useDebounce(handleBoundsChange, 25);

	useMapBoundsListener(debounceedHandleBoundsChange);

	useEffect(() => {
		function listener(id: string) {
			const found = buildings.find(function (x) {
				return x.id === id;
			});

			if (found) {
				setActiveBuilding(found);
			}
		}

		LoadColors();

		mapEvents.on("showBuildingPopup", listener);

		return function cleanup() {
			mapEvents.off("showBuildingPopup", listener);
		};
	}, [buildings]);

	return {
		buildings,
		colorOverrides,
		activeBuilding,
		setActiveBuilding,
		buildingRefs,
	};
}
