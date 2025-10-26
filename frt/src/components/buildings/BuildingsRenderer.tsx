import { Box, Text } from "@chakra-ui/react";
import { Polygon, Popup } from "react-leaflet";
import { type LatLngExpression } from "leaflet";
import type { IBuildingProps } from "../../api/overpass";

interface IBuildingsRendererProps {
	buildings: IBuildingProps[];
	activeBuilding: IBuildingProps | null;
	onClick: (b: IBuildingProps) => void;
	buildingRefs: React.RefObject<Map<string, L.Polygon>>;
}

function getCentroid(geometry: [number, number][]): LatLngExpression {
	const lat = geometry.reduce((sum, [la]) => sum + la, 0) / geometry.length;
	const lng = geometry.reduce((sum, [, lo]) => sum + lo, 0) / geometry.length;
	return [lat, lng];
}

export function BuildingsRenderer({
	buildings,
	activeBuilding,
	onClick,
	buildingRefs,
}: IBuildingsRendererProps) {
	return (
		<Box>
			{buildings.map((b) => (
				<Polygon
					key={b.id}
					positions={b.geometry}
					pathOptions={{
						color: activeBuilding?.id === b.id ? "#E53E3E" : "#3182CE",
						weight: 1.5,
						fillOpacity: 0.35,
					}}
					ref={(ref) => {
						if (ref) buildingRefs.current.set(b.id, ref);
					}}
					eventHandlers={{
						click: () => onClick(b),
					}}
				/>
			))}

			{activeBuilding && (
				<Popup position={getCentroid(activeBuilding.geometry)} autoClose={false}>
					<Text fontWeight="bold">ID: {activeBuilding.id}</Text>
					<Text fontWeight="bold">Type: {activeBuilding.tags?.building || "N/A"}</Text>
				</Popup>
			)}
		</Box>
	);
}
