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
			closePopup: logic.closePopup,
			onClick: logic.handleClick,
		};
	}, [logic.icons, logic.activeIcon]);

	return <CustomIconsRenderer {...renderProps} />;
}
