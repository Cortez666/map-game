import mitt from "mitt";

type MapEvents = {
	showBuildingPopup: string;
};

export const mapEvents = mitt<MapEvents>();
