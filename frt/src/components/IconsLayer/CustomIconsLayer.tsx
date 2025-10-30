import { useMemo } from "react";
import { CustomIconsRenderer } from "./CustomIconsRenderer";
import { useCustomIconsLayerLogic } from "./CustomIconLayerLogic";

export function CustomIconsLayer() {
	const logic = useCustomIconsLayerLogic();

	const renderProps = useMemo(() => {
		return {
			icons: logic.icons,
			activeIcon: logic.activeIcon,
			handleIconClick: logic.handleIconClick,
			onIconClick: logic.handleIconClick,
		};
	}, [logic.icons, logic.activeIcon]);

	return <CustomIconsRenderer {...renderProps} />;
}
