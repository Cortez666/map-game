import { useState, useCallback, useRef, useEffect } from "react";
import L, { LatLngBounds } from "leaflet";
import { FetchBuildings, type IBuildingProps } from "@/api/overpass";
import { FetchBuildingsColors, type IBuildingColorProps } from "@/api/buildingColors";
import { FetchBuildingsIcons, type IBuildingIconProps } from "@/api/buildingIcons";
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
	const [iconOverrides, setIconOverrides] = useState<IBuildingIconProps[]>([]);
	const [activeBuilding, setActiveBuilding] = useState<IBuildingProps | null>(null);
	const buildingRefs = useRef<Map<string, L.Polygon>>(new Map());
	const cahceRef = useRef<Map<string, IBuildingProps[]>>(new Map());
	const hasFetchedRef = useRef(false);

	async function fetchBuildings(bounds: LatLngBounds): Promise<void> {
		if (hasFetchedRef.current) {
			return;
		}

		hasFetchedRef.current = true;

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

	async function LoadIcons(): Promise<void> {
		try {
			const icons = await FetchBuildingsIcons();
			setIconOverrides(icons);
		} catch (err) {
			console.error("Error fetching building icons:", err);
		}
	}

	const handleBoundsChange = useCallback(fetchBuildings, []);
	const debounceedHandleBoundsChange = useDebounce(handleBoundsChange, 100);

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

		mapEvents.on("showBuildingPopup", listener);

		return () => mapEvents.off("showBuildingPopup", listener);
	}, [buildings]);

	useEffect(() => {
		LoadColors();
		LoadIcons();
	}, []);

	return {
		buildings,
		colorOverrides,
		iconOverrides,
		activeBuilding,
		setActiveBuilding,
		buildingRefs,
	};
}
