import { useEffect } from "react";
import { useMapEvents, useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";

export function useMapBoundsListener(onBoundsChange: (bounds: LatLngBounds) => void) {
	const map = useMap();

	useMapEvents({
		moveend: (e) => {
			const bounds = e.target.getBounds();
			onBoundsChange(bounds);
		},
	});

	useEffect(() => {
		if (map) {
			const bounds = map.getBounds();
			onBoundsChange(bounds);
		}
	}, [map, onBoundsChange]);
}
