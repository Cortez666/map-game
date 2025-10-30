import { PiFarm } from "react-icons/pi";
import { type IconType } from "react-icons";

export interface ICustomIconsProps {
	id: string;
	lat: number;
	lng: number;
	icon: IconType;
	color?: string;
	size?: number;
	title?: string;
	description?: string;
	buttonText?: string;
	onClick?: () => void;
}

const ICON_MAP: Record<string, IconType> = {
	PiFarm,
};

export async function fetchCustomIcons(): Promise<ICustomIconsProps[]> {
	try {
		const res = await fetch("/data/customIcons.json");
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const raw = await res.json();

		return raw
			.map((item: any) => {
				const Icon = ICON_MAP[item.icon];
				if (!Icon) return null;
				return {
					id: item.id,
					lat: item.lat,
					lng: item.lng,
					icon: Icon,
					color: item.color,
					size: item.size ?? 22,
					title: item.title,
					description: item.description,
					buttonText: item.buttonText,
				};
			})
			.filter(Boolean);
	} catch (err) {
		console.error("Error fetching custom icons:", err);
		return [];
	}
}
