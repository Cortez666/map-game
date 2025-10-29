import { Flex, Text, Icon } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";

interface IToolbarIconProps {
	icon: any;
	tooltip?: boolean;
	tooltipText?: string;
	gap?: number;
	color?: string;
	textSize?: string;
	textWeight?: string;
	textColor?: string;
	value?: string | number;
}

export function ToolbarIcon(props: IToolbarIconProps) {
	return (
		<Tooltip content={props.tooltipText} disabled={!props.tooltip}>
			<Flex gap={props.gap}>
				<Icon as={props.icon} size="xl" color={props.color} />
				<Text
					fontSize={props.textSize}
					fontWeight={props.textWeight}
					color={props.textColor}
				>
					{props.value}
				</Text>
			</Flex>
		</Tooltip>
	);
}
