export interface IBuildingColorProps {
	id: string;
	color: string;
}

export async function FetchBuildingsColors(): Promise<IBuildingColorProps[]> {
	try {
		const response = await fetch("/data/buildingColors.json", {
			headers: { "Cache-Control": "no-cache" },
		});

		if (!response.ok) {
			throw new Error(`Overpass API error: ${response.statusText}`);
		}

		const text = await response.text();

		try {
			const data = JSON.parse(text) as IBuildingColorProps[];
			return data;
		} catch (err) {
			console.error("Invalid JSON in buildingColors.json:", text);
			throw err;
		}
	} catch (err) {
		console.error("Error fetching building colors:", err);
		return [];
	}
}
