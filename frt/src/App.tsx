import React from "react";
import { Container } from "@chakra-ui/react";
import { DisplayMap } from "./components/DisplayMap.tsx";

export function App(): React.JSX.Element {
	return (
		<Container centerContent p={2}>
			<DisplayMap
				position={[51.39409, 22.96473]}
				minZoom={15}
				maxZoom={18}
				mapWidth={"75vw"}
				mapHeight={"75vh"}
				borderColor="red"
				borderRadius="2xl"
				maxBounds={[
					[51.38409, 22.95473],
					[51.40409, 22.97473],
				]}
			/>
		</Container>
	);
}
