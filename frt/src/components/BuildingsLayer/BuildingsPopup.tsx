import { Popup } from "react-leaflet";
import { Box, Text, Badge, VStack } from "@chakra-ui/react";
import { type LatLngExpression } from "leaflet";
import { type IBuildingProps } from "@/api/overpass";

interface IBuildingPopupProps {
	building: IBuildingProps;
	position: LatLngExpression;
}

export function BuildingPopup(props: IBuildingPopupProps) {
	return (
		<Popup position={props.position} autoClose={false}>
			<Box
				bg="white"
				p={3}
				borderRadius="md"
				boxShadow="md"
				minW="180px"
				fontSize="sm"
				color="gray.700"
			>
				<VStack align="start" gap={1}>
					<Text fontWeight="bold">{props.building.id}</Text>
					<Badge>{props.building.tags?.building}</Badge>
				</VStack>
			</Box>
		</Popup>
	);
}
