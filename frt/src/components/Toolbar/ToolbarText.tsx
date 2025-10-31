import { Text } from "@chakra-ui/react";

interface IToolbarTextProps {
	text: string;
}

export function ToolbarText(props: IToolbarTextProps) {
	return (
		<Text fontWeight="bold" color="blue.600">
			{props.text}
		</Text>
	);
}
