import { LatLngBounds } from "leaflet";

export interface IBuildingProps {
	id: string;
	geometry: [number, number][];
	tags?: Record<string, string>;
}

function generateBuildingId(geometry: [number, number][]): string {
	const str = geometry.map(([lat, lon]) => `${lat.toFixed(5)},${lon.toFixed(5)}`).join(";");
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // convert to 32-bit int
	}
	return `gen-${Math.abs(hash)}`;
}

export async function FetchBuildings(bounds: LatLngBounds): Promise<IBuildingProps[]> {
	const south = bounds.getSouth();
	const west = bounds.getWest();
	const north = bounds.getNorth();
	const east = bounds.getEast();

	const query = `
    [out:json][timeout:3600];
    (
      way["building"](${south},${west},${north},${east});
    );
    out geom tags;
  `;

	const response = await fetch("https://overpass-api.de/api/interpreter", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({ data: query }),
	});

	if (!response.ok) {
		throw new Error(`Overpass API error: ${response.statusText}`);
	}

	const data = await response.json();

	return data.elements
		.filter((el: any) => el.type === "way" && el.geometry)
		.map((el: any) => {
			const geometry = el.geometry.map((g: any) => [g.lat, g.lon]) as [number, number][];
			return {
				id: el.id ? String(el.id) : generateBuildingId(geometry),
				geometry,
				tags: el.tags || {},
			};
		});
}
