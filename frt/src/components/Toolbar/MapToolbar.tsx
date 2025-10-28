import { Box, Flex, Text } from "@chakra-ui/react";
import { ToolbarButton } from "./ToolbarButton";

export function MapToolbar() {
	function handleReload(): void {
		window.location.reload();
	}

	return (
		<Box
			display="flex"
			top="5"
			left="0"
			right="0"
			zIndex="1000"
			bg="whiteAlpha.900"
			m={2}
			p={2}
		>
			<Flex align="center" gap={10} justify="start" w="100%" px={3}>
				<Text fontWeight="bold" color="blue.600">
					Map Controls
				</Text>
				<Flex gap={2}>
					<ToolbarButton tooltip="Reload" buttonTetxt="Reload" onClick={handleReload} />
					<ToolbarButton tooltip="Reload" buttonTetxt="Reload" onClick={handleReload} />
					<ToolbarButton tooltip="Reload" buttonTetxt="Reload" onClick={handleReload} />
				</Flex>
			</Flex>
		</Box>
	);
}
