import { Text, Button } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";

interface IToolbarButtonProps {
	tooltip?: boolean;
	tooltipText?: string;
	onClick: () => void;
	disabled?: boolean;
	buttonTetxt?: string;
}

export function ToolbarButton(props: IToolbarButtonProps) {
	return (
		<Tooltip content={props.tooltipText} disabled={!props.tooltip}>
			<Button
				size="sm"
				variant="solid"
				color="white"
				backgroundColor="blue.600"
				onClick={props.onClick}
				disabled={props.disabled}
				_hover={{ bg: "teal" }}
			>
				<Text>{props.buttonTetxt}</Text>
			</Button>
		</Tooltip>
	);
}
