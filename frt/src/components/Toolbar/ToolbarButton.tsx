import { Text, Button } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";

interface IToolbarButtonProps {
	tooltip: string;
	onClick: () => void;
	disabled?: boolean;
	buttonTetxt?: string;
}

export function ToolbarButton(props: IToolbarButtonProps) {
	return (
		<Tooltip content={props.tooltip}>
			<Button
				size="sm"
				variant="solid"
				color="white"
				backgroundColor="blue.600"
				onClick={props.onClick}
				disabled={props.disabled}
			>
				<Text>{props.buttonTetxt}</Text>
			</Button>
		</Tooltip>
	);
}
