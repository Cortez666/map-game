import { useState, useCallback, useRef, useEffect } from "react";
import L, { LatLngBounds } from "leaflet";
import { FetchBuildings, type IBuildingProps } from "@/api/overpass";
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

		return function cleanup() {
			mapEvents.off("showBuildingPopup", listener);
		};
	}, [buildings]);

	return {
		buildings,
		activeBuilding,
		setActiveBuilding,
		buildingRefs,
	};
}

// export function ChangeBuildingColorById(
// 	buildingRefs: React.RefObject<Map<string, L.Polygon>>,
// 	id: string,
// 	color: string
// ): void {
// 	if (!buildingRefs.current) {
// 		return;
// 	}

// 	const polygon = buildingRefs.current.get(id);
// 	if (!polygon) {
// 		console.warn(`Building with id "${id}" not found in refs.`);
// 		return;
// 	}

// 	// Update the polygon style dynamically
// 	polygon.setStyle({
// 		color: color,
// 		fillColor: color,
// 	});
// }
