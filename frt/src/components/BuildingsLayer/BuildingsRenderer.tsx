import { Polygon } from "react-leaflet";
import { type LatLngExpression } from "leaflet";
import { type IBuildingProps } from "@/api/overpass";
import { BuildingPopup } from "./BuildingsPopup";

interface IBuildingRendererProps {
	buildings: IBuildingProps[];
	activeBuilding: IBuildingProps | null;
	onClick: (b: IBuildingProps) => void;
	buildingRefs: React.RefObject<Map<string, L.Polygon>>;
}

function GetCentroid(geometry: [number, number][]): LatLngExpression {
	let latSum = 0;
	let lngSum = 0;

	for (let i = 0; i < geometry.length; i++) {
		latSum += geometry[i][0];
		lngSum += geometry[i][1];
	}

	const lat = latSum / geometry.length;
	const lng = lngSum / geometry.length;
	return [lat, lng];
}

export function BuildingsRenderer(props: IBuildingRendererProps) {
	function RenderPopup() {
		if (!props.activeBuilding) {
			return null;
		}

		const position = GetCentroid(props.activeBuilding.geometry);

		return <BuildingPopup building={props.activeBuilding} position={position} />;
	}

	function RenderBuildings() {
		const items: React.ReactNode[] = [];

		for (let i = 0; i < props.buildings.length; i++) {
			const b = props.buildings[i];
			const color =
				props.activeBuilding && props.activeBuilding.id === b.id ? "#E53E3E" : "#3182CE";

			items.push(
				<Polygon
					key={b.id}
					positions={b.geometry}
					pathOptions={{
						color: color,
						weight: 1.5,
						fillOpacity: 0.35,
					}}
					ref={(ref) => {
						if (ref) {
							props.buildingRefs.current.set(b.id, ref);
						}
					}}
					eventHandlers={{
						click() {
							props.onClick(b);
						},
					}}
				/>
			);
		}

		return items;
	}

	return (
		<>
			{RenderBuildings()}
			{RenderPopup()}
		</>
	);
}
