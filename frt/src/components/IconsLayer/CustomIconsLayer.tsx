import { Marker } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { useEffect, useState } from "react";
import { fetchCustomIcons, type ICustomIconsProps } from "@/api/customIcons";
import { CustomIconPopup } from "./CustomIconPopup";

export function CustomIconsLayer() {
	const [icons, setIcons] = useState<ICustomIconsProps[]>([]);
	const [activeIcon, setActiveIcon] = useState<ICustomIconsProps | null>(null);

	useEffect(() => {
		fetchCustomIcons().then(setIcons);
	}, []);

	function CreateDivIcon(props: ICustomIconsProps): L.DivIcon {
		const html = ReactDOMServer.renderToStaticMarkup(
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					transform: "translate(-50%, -50%)",
				}}
			>
				<props.icon color={props.color ?? "orange"} size={props.size ?? 32} />
			</div>
		);

		return L.divIcon({
			html,
			className: "custom-react-icon",
			iconSize: [props.size ?? 32, props.size ?? 32],
			iconAnchor: [(props.size ?? 32) / 2, (props.size ?? 32) / 2],
		});
	}

	return (
		<>
			{icons.map((i) => (
				<Marker
					key={i.id}
					position={[i.lat, i.lng]}
					icon={CreateDivIcon(i)}
					zIndexOffset={1000}
					eventHandlers={{
						click: () => setActiveIcon(i),
					}}
				/>
			))}

			{activeIcon && (
				<CustomIconPopup
					icon={activeIcon}
					position={[activeIcon.lat, activeIcon.lng]}
					key={activeIcon.id}
				/>
			)}
		</>
	);
}
