import { Popup } from "react-leaflet";
import { Box, Text, Badge, VStack, Button } from "@chakra-ui/react";
import { type LatLngExpression } from "leaflet";
import { type ICustomIconsProps } from "@/api/customIcons";

interface ICustomIconPopupProps {
	icon: ICustomIconsProps;
	position: LatLngExpression;
}

export function CustomIconPopup(props: ICustomIconPopupProps) {
	return (
		<Popup position={props.position} autoClose={true}>
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
					<Text fontWeight="bold">{props.icon.id}</Text>
					<Text>{props.icon.description}</Text>
					<Badge>{props.icon.type}</Badge>
					<Button variant="solid" backgroundColor="blue.600" color="white">
						{props.icon.buttonText}
					</Button>
				</VStack>
			</Box>
		</Popup>
	);
}
