import { useState, useCallback, useRef, useEffect } from "react";
import { useMapEvents } from "react-leaflet";
import L, { LatLngBounds } from "leaflet";
import { FetchBuildings, type IBuildingProps } from "../../api/overpass";
import { mapEvents } from "@/events/mapEvents";
import { BuildingsRenderer } from "./BuildingsRenderer";

export function BuildingsLayer() {
	const [buildings, setBuildings] = useState<IBuildingProps[]>([]);
	const [activeBuilding, setActiveBuilding] = useState<IBuildingProps | null>(null);
	const buildingRefs = useRef<Map<string, L.Polygon>>(new Map());

	const handleBoundsChange = useCallback(async (bounds: LatLngBounds) => {
		try {
			const data = await FetchBuildings(bounds);
			setBuildings(data);
		} catch (err) {
			console.error("Error fetching buildings:", err);
		}
	}, []);

	useMapEvents({
		moveend: (e) => {
			handleBoundsChange(e.target.getBounds());
		},
	});

	useEffect(() => {
		const listener = (id: string) => {
			const b = buildings.find((x) => x.id === id);
			if (b) setActiveBuilding(b);
		};
		mapEvents.on("showBuildingPopup", listener);
		return () => mapEvents.off("showBuildingPopup", listener);
	}, [buildings]);

	return (
		<>
			<BuildingsRenderer
				buildings={buildings}
				activeBuilding={activeBuilding}
				onClick={setActiveBuilding}
				buildingRefs={buildingRefs}
			/>
		</>
	);
}
