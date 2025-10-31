import { useState, useEffect, useCallback } from "react";
import { fetchCustomIcons, type ICustomIconsProps } from "@/api/customIcons";

import { useResources } from "@/context/ResourcesContext";

export function useCustomIconsLayerLogic() {
	const { setMoney } = useResources();

	const [icons, setIcons] = useState<ICustomIconsProps[]>([]);
	const [activeIcon, setActiveIcon] = useState<ICustomIconsProps | null>(null);

	const loadIcons = useCallback(async () => {
		try {
			const data = await fetchCustomIcons();
			setIcons(data);
		} catch (err) {
			console.error("Error loading custom icons:", err);
		}
	}, []);

	useEffect(() => {
		loadIcons();
	}, [loadIcons]);

	function handleIconClick(icon: ICustomIconsProps) {
		setActiveIcon(icon);
	}

	function closePopup() {
		setActiveIcon(null);
	}

	function handleClick() {
		console.log("handleClick");
		setTimeout(() => {
			console.log("handleClick timeout");
			setMoney(100);
		}, 1000);
	}

	return { icons, activeIcon, handleIconClick, closePopup, handleClick };
}
