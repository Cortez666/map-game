import { LatLngBounds } from "leaflet";

export interface IBuildingProps {
	id: string;
	geometry: [number, number][];
}

export async function FetchBuildings(bounds: LatLngBounds): Promise<IBuildingProps[]> {
	const south = bounds.getSouth();
	const west = bounds.getWest();
	const north = bounds.getNorth();
	const east = bounds.getEast();

	const query = `
    [out:json][timeout:25];
    (
      way["building"](${south},${west},${north},${east});
    );
    out geom;
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
		.map((el: any) => ({
			id: String(el.id),
			geometry: el.geometry.map((g: any) => [g.lat, g.lon]),
		}));
}
