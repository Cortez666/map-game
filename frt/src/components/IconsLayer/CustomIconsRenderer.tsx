import { Marker } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { type ICustomIconsProps } from "@/api/customIcons";
import { CustomIconPopup } from "./CustomIconPopup";

interface Props {
	icons: ICustomIconsProps[];
	activeIcon: ICustomIconsProps | null;
	onIconClick: (icon: ICustomIconsProps) => void;
}

export function CustomIconsRenderer({ icons, activeIcon, onIconClick }: Props) {
	function CreateDivIcon(item: ICustomIconsProps): L.DivIcon {
		const html = ReactDOMServer.renderToStaticMarkup(
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					transform: "translate(-50%, -50%)",
				}}
			>
				<item.icon color={item.color ?? "orange"} size={item.size ?? 32} />
			</div>
		);

		return L.divIcon({
			html,
			className: "custom-react-icon",
			iconSize: [item.size ?? 32, item.size ?? 32],
			iconAnchor: [(item.size ?? 32) / 2, (item.size ?? 32) / 2],
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
						click: () => onIconClick(i),
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
