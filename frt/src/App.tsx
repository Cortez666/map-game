import { Container } from "@chakra-ui/react";
import { DisplayMap } from "./components/DisplayMap.tsx";

export function App(): React.JSX.Element {
	return (
		<Container centerContent fluid p={2}>
			<DisplayMap
				position={[51.39409, 22.96473]}
				minZoom={16}
				maxZoom={18}
				mapWidth={"100%"}
				mapHeight={"95vh"}
				borderColor="red"
				borderRadius="2xl"
				maxBounds={[
					[51.385, 22.94],
					[51.401, 22.98],
				]}
			/>
		</Container>
	);
}
