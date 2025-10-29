export interface IBuildingIconProps {
	id: string;
	icon: string;
}

export async function FetchBuildingsIcons(): Promise<IBuildingIconProps[]> {
	try {
		const response = await fetch("/data/buildingIcons.json", {
			headers: { "Cache-Control": "no-cache" },
		});

		if (!response.ok) {
			throw new Error(`Overpass API error: ${response.statusText}`);
		}

		const text = await response.text();

		try {
			const data = JSON.parse(text) as IBuildingIconProps[];
			return data;
		} catch (err) {
			console.error("Invalid JSON in buildingIcons.json:", text);
			throw err;
		}
	} catch (err) {
		console.error("Error fetching building icons:", err);
		return [];
	}
}
