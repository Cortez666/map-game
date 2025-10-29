import { Flex, Text, Icon } from "@chakra-ui/react";

interface IToolbarIconProps {
	icon: any;
	gap?: number;
	color?: string;
	textSize?: string;
	textWeight?: string;
	textColor?: string;
	text?: string;
}

export function ToolbarIcon(props: IToolbarIconProps) {
	return (
		<Flex gap={props.gap}>
			<Icon as={props.icon} size="xl" color={props.color} />
			<Text fontSize={props.textSize} fontWeight={props.textWeight} color={props.textColor}>
				{props.text}
			</Text>
		</Flex>
	);
}
