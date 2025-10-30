import { Box } from "@chakra-ui/react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BuildingsLayer } from "./BuildingsLayer/BuildingsLayer";
import { CustomIconsLayer } from "./CustomIconsLayer/CustomIconsLayer";
import { MapToolbar } from "./Toolbar/MapToolbar";

interface IMapProps {
	position: [number, number];
	minZoom: number;
	maxZoom?: number;
	maxBounds?: [[number, number], [number, number]];
	mapWidth?: number | string;
	mapHeight?: number | string;
	borderColor?: string;
	borderRadius?: string | number;
}

export function DisplayMap(props: IMapProps) {
	const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

	return (
		<Box
			w={props.mapWidth}
			h={props.mapHeight}
			border="5px solid"
			borderColor={props.borderColor}
			borderRadius={props.borderRadius}
			overflow="hidden"
		>
			<MapToolbar />
			<MapContainer
				doubleClickZoom={false}
				zoomControl={false}
				scrollWheelZoom={true}
				center={props.position}
				zoom={props.minZoom}
				minZoom={props.minZoom}
				maxZoom={props.maxZoom}
				maxBoundsViscosity={1}
				maxBounds={props.maxBounds}
				style={{ width: props.mapWidth, height: props.mapHeight }}
			>
				<TileLayer url={url} />
				<BuildingsLayer />
				<CustomIconsLayer />
			</MapContainer>
		</Box>
	);
}
