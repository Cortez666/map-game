// src/components/BuildingsRenderer.tsx
import { Polygon, Popup } from "react-leaflet";
import { type LatLngExpression } from "leaflet";
import type { IBuildingProps } from "../../api/overpass";

interface IBuildingsRendererProps {
	buildings: IBuildingProps[];
	activeBuilding: IBuildingProps | null;
	onClick: (b: IBuildingProps) => void;
	buildingRefs: React.RefObject<Map<string, L.Polygon>>;
}

const getCentroid = (geometry: [number, number][]): LatLngExpression => {
	const lat = geometry.reduce((sum, [la]) => sum + la, 0) / geometry.length;
	const lng = geometry.reduce((sum, [, lo]) => sum + lo, 0) / geometry.length;
	return [lat, lng];
};

export function BuildingsRenderer({
	buildings,
	activeBuilding,
	onClick,
	buildingRefs,
}: IBuildingsRendererProps) {
	return (
		<>
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
					<b>Building ID:</b> {activeBuilding.id}
					<br />
					{activeBuilding.tags?.name && (
						<>
							<b>Name:</b> {activeBuilding.tags.name}
							<br />
						</>
					)}
					<b>Type:</b> {activeBuilding.tags?.building || "N/A"}
				</Popup>
			)}
		</>
	);
}
