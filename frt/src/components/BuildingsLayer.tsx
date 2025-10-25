import { useState, useCallback } from "react";
import { useMapEvents, LayerGroup, Tooltip } from "react-leaflet";
import L, { LatLngBounds, tooltip } from "leaflet";
import { FetchBuildings, type IBuildingProps } from "../api/overpass";
import { CustomBuildingOutline } from "./CustomBuildingOutline";

interface IBuildingsLayerProps {
	outlineColor: string;
	outlineWeight: number;
	outlineFillOpacity: number;
}

export function BuildingsLayer(props: IBuildingsLayerProps) {
	const [buildings, setBuildings] = useState<IBuildingProps[]>([]);

	const handleBoundsChange = useCallback(async (bounds: LatLngBounds) => {
		try {
			const data = await FetchBuildings(bounds);
			setBuildings(data);
		} catch (err) {
			console.error("Error fetching buildings:", err);
		}
	}, []);

	useMapEvents({
		click: (b) => {
			const bui = L.polygon(b.target);
			bui.bindTooltip("Hello").openTooltip();
		},
		moveend: (e) => {
			handleBoundsChange(e.target.getBounds());
		},
	});

	return (
		<>
			{buildings.map((b) => (
				<CustomBuildingOutline
					key={b.id}
					positions={b.geometry}
					outlineColor={props.outlineColor}
					outlineWeight={props.outlineWeight}
					outlineFillOpacity={props.outlineFillOpacity}
				/>
			))}
		</>
	);
}
