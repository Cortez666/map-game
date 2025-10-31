import { createContext, useContext, useState } from "react";

interface IResourcesContextProps {
	moneyAmount: number;
	setMoney: (amount: number) => void;

	beerAmount: number;
	setBeer: (amount: number) => void;
}

const ResourcesContext = createContext<IResourcesContextProps | undefined>(undefined);

export function ResourcesProvider({ children }: { children: React.ReactNode }) {
	const [moneyAmount, setMoneyAmount] = useState<number>(0);
	const [beerAmount, setBeerAmount] = useState<number>(0);

	function setMoney(amount: number) {
		setMoneyAmount(moneyAmount + amount);
	}

	function setBeer(amount: number) {
		setBeerAmount(beerAmount + amount);
	}

	return (
		<ResourcesContext.Provider value={{ moneyAmount, setMoney, beerAmount, setBeer }}>
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
