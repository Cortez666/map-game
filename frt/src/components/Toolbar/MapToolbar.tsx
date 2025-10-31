import { Box, Flex, Spacer } from "@chakra-ui/react";
import { ToolbarButton } from "./ToolbarButton";
import { ToolbarText } from "./ToolbarText";
import { ToolbarIcon } from "./ToolbarIcon";

import { BiDollarCircle } from "react-icons/bi";
import { GiBeerBottle } from "react-icons/gi";

import { useResources } from "@/context/ResourcesContext";

export function MapToolbar() {
	const { moneyAmount, beerAmount } = useResources();

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
					<ToolbarText text="Map Controlls" />
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
				<Flex order={0}>
					<ToolbarText text="Resources" />
				</Flex>
				<Flex order={1} gap={6}>
					<ToolbarIcon
						icon={BiDollarCircle}
						tooltip
						tooltipText="Money"
						gap={2}
						value={moneyAmount}
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
						value={beerAmount}
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
