import { useMemo } from "react";
import { BuildingsRenderer } from "./BuildingsRenderer";
import { useBuildingLayerLogic } from "./BuildingsLayerLogic";

export function BuildingsLayer() {
	const logic = useBuildingLayerLogic();

	const rendererProps = useMemo(
		() => ({
			buildings: logic.buildings,
			colorOverrides: logic.colorOverrides,
			activeBuilding: logic.activeBuilding,
			onClick: logic.setActiveBuilding,
			buildingRefs: logic.buildingRefs,
			iconOverrides: logic.iconOverrides,
		}),
		[logic.buildings, logic.activeBuilding]
	);

	return <BuildingsRenderer {...rendererProps} />;
}
