import { createContext, useContext, useState, useEffect } from "react";

interface IResourcesContextProps {
	moneyAmount: number;
	setMoney: (amount: number) => void;

	beerAmount: number;
	setBeer: (amount: number) => void;

	fatigueAmount: number;
	fatigueColor: string;
	isSleeping?: boolean;
	sleep?: (amount: number) => void;
}

const ResourcesContext = createContext<IResourcesContextProps | undefined>(undefined);

export function ResourcesProvider({ children }: { children: React.ReactNode }) {
	const [moneyAmount, setMoneyAmount] = useState<number>(0);
	const [beerAmount, setBeerAmount] = useState<number>(0);
	const [fatigueAmount, setFatigueAmount] = useState<number>(100);

	function setMoney(amount: number) {
		setMoneyAmount(moneyAmount + amount);
	}

	function setBeer(amount: number) {
		setBeerAmount(beerAmount + amount);
	}

	const fatigueColors = ["red", "orange", "yellow", "green"];
	const fatigueColor = fatigueColors[Math.floor(fatigueAmount / 25)] as string;
	let isSleeping = false as boolean;

	function sleep(amount: number) {
		isSleeping = true;
		setFatigueAmount(fatigueAmount + amount);
	}

	useEffect(() => {
		if (isSleeping) {
			return;
		}

		if (fatigueAmount > 0) {
			setFatigueAmount(fatigueAmount - 1 * 0.25);
		} else {
			setFatigueAmount(0);
		}
	}, [fatigueAmount]);

	return (
		<ResourcesContext.Provider
			value={{
				moneyAmount,
				setMoney,
				beerAmount,
				setBeer,
				fatigueAmount,
				fatigueColor,
			}}
		>
			{children}
		</ResourcesContext.Provider>
	);
}

export function useResources() {
	const context = useContext(ResourcesContext);

	if (context === undefined) {
		throw new Error("useResources must be used within a ResourcesProvider");
	}

	return context;
}
