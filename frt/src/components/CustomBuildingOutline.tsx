import { Polygon } from "react-leaflet";

interface IBuildingOutlineProps {
	key: string;
	positions: [number, number][];
	outlineColor?: string;
	outlineWeight?: number;
	outlineFillOpacity?: number;
}

export function CustomBuildingOutline(props: IBuildingOutlineProps) {
	return (
		<Polygon
			key={props.key}
			positions={props.positions}
			pathOptions={{
				color: props.outlineColor,
				weight: props.outlineWeight,
				fillOpacity: props.outlineFillOpacity,
			}}
		/>
	);
}
