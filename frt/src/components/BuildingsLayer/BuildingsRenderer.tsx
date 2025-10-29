import { Box } from "@chakra-ui/react";
import { Polygon, Marker } from "react-leaflet";
import L, { type LatLngExpression } from "leaflet";
import { type IBuildingProps } from "@/api/overpass";
import { BuildingPopup } from "./BuildingsPopup";
import type React from "react";

interface IColorOverride {
	id: string;
	color: string;
}

interface IIconOverride {
	id: string;
	icon: string;
}

interface IBuildingRendererProps {
	buildings: IBuildingProps[];
	activeBuilding: IBuildingProps | null;
	onClick: (b: IBuildingProps) => void;
	buildingRefs: React.RefObject<Map<string, L.Polygon>>;
	colorOverrides?: IColorOverride[];
	iconOverrides?: IIconOverride[];
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
	function GetBuildingColor(id: string): string {
		const override = props.colorOverrides?.find(function (x) {
			return x.id === id;
		});

		if (override) {
			return override.color;
		}

		return "#000000";
	}

	function GetBuildingIcon(id: string): L.Icon | null {
		const iconData = props.iconOverrides?.find((x) => x.id === id);

		if (!iconData) {
			return null;
		}

		const iconUrl = iconData.icon.startsWith("/") ? iconData.icon : `/Icons/${iconData.icon}`;

		return L.icon({
			iconUrl,
			iconSize: [32, 32],
			iconAnchor: [16, 16],
		});
	}

	const polygons = [];
	const markers = [];

	for (let i = 0; i < props.buildings.length; i++) {
		const b = props.buildings[i];
		const color = GetBuildingColor(b.id);
		const centroid = GetCentroid(b.geometry);
		const icon = GetBuildingIcon(b.id);

		polygons.push(
			<Polygon
				key={`poly-${b.id}`}
				positions={b.geometry}
				pathOptions={{
					color: color,
					weight: 1.5,
					fillOpacity: 0.35,
				}}
				ref={(ref) => {
					if (ref) props.buildingRefs.current.set(b.id, ref);
				}}
				eventHandlers={{
					click: () => props.onClick(b),
				}}
			/>
		);

		if (icon) {
			markers.push(
				<Marker
					key={`icon-${b.id}`}
					position={centroid}
					icon={icon}
					eventHandlers={{
						click: () => props.onClick(b),
					}}
					zIndexOffset={1000}
				/>
			);
		}
	}

	return (
		<Box>
			{markers}
			{polygons}
			{props.activeBuilding && (
				<BuildingPopup
					building={props.activeBuilding}
					position={GetCentroid(props.activeBuilding.geometry)}
				/>
			)}
		</Box>
	);
}
