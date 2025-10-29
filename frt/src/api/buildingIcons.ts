import { FaHouse } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { type IconType } from "react-icons";

export interface IBuildingIconProps {
	id: string;
	icon: IconType;
	color?: string;
	size?: number;
}

const ICON_MAP: Record<string, IconType> = {
	FaHouse,
	FaShoppingCart,
};

/**
 * Loads icon configurations from JSON (mock DB).
 * Can later be replaced with an API call.
 */
export async function FetchBuildingsIcons(): Promise<IBuildingIconProps[]> {
	try {
		const res = await fetch("/data/buildingIcons.json");
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const rawData = await res.json();

		return rawData
			.map((item: any) => {
				const Icon = ICON_MAP[item.icon];
				if (!Icon) return null;
				return {
					id: item.id,
					icon: Icon,
					color: item.color,
					size: item.size ?? 32,
				};
			})
			.filter(Boolean);
	} catch (err) {
		console.error("Error fetching building icons:", err);
		return [];
	}
}
