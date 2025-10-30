import { Box, Flex, Text, Spacer } from "@chakra-ui/react";
import { ToolbarButton } from "./ToolbarButton";
import { ToolbarIcon } from "./ToolbarIcon";

import { BiDollarCircle } from "react-icons/bi";
import { GiBeerBottle } from "react-icons/gi";

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
			justifyContent="space-between"
			zIndex="1000"
			bg="whiteAlpha.900"
			p={2}
		>
			<Flex direction="row" align="center" justify="space-between" gap={6}>
				<Flex order={0}>
					<Text fontWeight="bold" color="blue.600">
						Map Controls
					</Text>
				</Flex>
				<Spacer />
				<Flex order={1} gap={2}>
					<ToolbarButton buttonTetxt="Test01" onClick={handleReload} />
					<ToolbarButton buttonTetxt="Test02" onClick={handleReload} />
					<ToolbarButton buttonTetxt="test03" onClick={handleReload} />
				</Flex>
				<Flex order={2} gap={2}>
					<ToolbarButton buttonTetxt="Test1" onClick={handleReload} />
					<ToolbarButton buttonTetxt="Test2" onClick={handleReload} />
					<ToolbarButton buttonTetxt="Test3" onClick={handleReload} />
				</Flex>
			</Flex>
			<Flex direction="row" align="center" justify="space-between" gap={6}>
				<Flex gap={6}>
					<ToolbarIcon
						icon={BiDollarCircle}
						tooltip
						tooltipText="Money"
						gap={2}
						value={0}
						textColor="yellow.600"
						textWeight="bold"
						textSize="xl"
						color="yellow.600"
					/>
					<ToolbarIcon
						icon={GiBeerBottle}
						tooltip
						tooltipText="Beer"
						gap={2}
						value={0}
						textColor="yellow.600"
						textWeight="bold"
						textSize="xl"
						color="yellow.600"
					/>
				</Flex>
			</Flex>
		</Box>
	);
}
