import { Box, Flex, Text, Spacer } from "@chakra-ui/react";
import { ToolbarButton } from "./ToolbarButton";

export function MapToolbar() {
	function handleReload(): void {
		window.location.reload();
	}

	return (
		<Box display="flex" top="5" left="0" right="0" zIndex="1000" bg="whiteAlpha.900" p={2}>
			<Flex direction="row" align="center" justify="flex-start" gap={6}>
				<Flex order={0}>
					<Text fontWeight="bold" color="blue.600">
						Map Controls
					</Text>
				</Flex>
				<Flex order={1} gap={2}>
					<ToolbarButton buttonTetxt="Test01" onClick={handleReload} />
					<ToolbarButton buttonTetxt="Test02" onClick={handleReload} />
					<ToolbarButton buttonTetxt="test03" onClick={handleReload} />
				</Flex>
				<Spacer />
				<Flex order={2} gap={2}>
					<ToolbarButton buttonTetxt="Test1" onClick={handleReload} />
					<ToolbarButton buttonTetxt="Test2" onClick={handleReload} />
					<ToolbarButton buttonTetxt="Test3" onClick={handleReload} />
				</Flex>
			</Flex>
		</Box>
	);
}
