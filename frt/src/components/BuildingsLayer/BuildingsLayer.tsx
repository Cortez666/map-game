import { useMemo } from "react";
import { BuildingsRenderer } from "./BuildingsRenderer";
import { useBuildingLayerLogic } from "./BuildingsLayerLogic";

export function BuildingsLayer() {
	const logic = useBuildingLayerLogic();

	const rendererProps = useMemo(
		() => ({
			buildings: logic.buildings,
			activeBuilding: logic.activeBuilding,
			onClick: logic.setActiveBuilding,
			buildingRefs: logic.buildingRefs,
		}),
		[logic.buildings, logic.activeBuilding]
	);

	return (
		<BuildingsRenderer
			{...rendererProps}
			colorOverrides={[
				{ id: "297010157", color: "red" },
				{ id: "378051788", color: "green" },
				{ id: "378051789", color: "blue" },
			]}
		/>
	);
}
