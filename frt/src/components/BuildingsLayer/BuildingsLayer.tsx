import { useMemo } from "react";
import { BuildingsRenderer } from "./BuildingsRenderer";
import { useBuildingLayerLogic } from "./BuildingsLayerLogic";
import { ChangeBuildingColor } from "./BuildingsLayerLogic";

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

	ChangeBuildingColor(logic.buildingRefs, "297010157", "#E53E3E");

	return <BuildingsRenderer {...rendererProps} />;
}
