import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Tooltip } from "./ui/tooltip";

export function MapToolbar() {
	function handleReload(): void {
		window.location.reload();
	}

	return (
		<Box
			position="absolute"
			top="5"
			left="0"
			right="0"
			zIndex="1000"
			bg="whiteAlpha.900"
			boxShadow="md"
			p={2}
			borderBottom="1px solid"
			borderColor="gray.200"
		>
			<Flex align="center" justify="space-between" w="100%" px={3}>
				<Text fontWeight="bold" color="blue.600">
					Map Controls
				</Text>
				<Flex gap={2}>
					<Tooltip content="Reload map">
						<Button
							variant={"solid"}
							size={"sm"}
							color={"white"}
							background={"blue"}
							onClick={handleReload}
						>
							TEST RELOAD BUTTON
						</Button>
					</Tooltip>
				</Flex>
			</Flex>
		</Box>
	);
}
