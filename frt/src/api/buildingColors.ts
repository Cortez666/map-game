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

		const data = (await response.json()) as IBuildingColorProps[];

		return data;
	} catch (err) {
		console.error("Error fetching building colors:", err);
		return [];
	}
}
