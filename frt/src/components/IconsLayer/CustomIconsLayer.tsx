import { CustomIconsRenderer } from "./CustomIconsRenderer";
import { useCustomIcons } from "./CustomIconLayerLogic";

export function CustomIconsLayer() {
	const { icons, activeIcon, handleIconClick } = useCustomIcons();

	return (
		<CustomIconsRenderer icons={icons} activeIcon={activeIcon} onIconClick={handleIconClick} />
	);
}
