import { createContext, useContext, useState, useEffect } from "react";

interface IStatsContextProps {
	fatigueAmount: number;
	fatigueColor: string;
	isSleeping?: boolean;
	sleep?: (amount: number) => void;
}

const StatsContext = createContext<IStatsContextProps | undefined>(undefined);

export function StatsProvider({ children }: { children: React.ReactNode }) {
	const [fatigueAmount, setFatigueAmount] = useState<number>(100);

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
		<StatsContext.Provider
			value={{
				fatigueAmount,
				fatigueColor,
			}}
		>
			{children}
		</StatsContext.Provider>
	);
}

export function useStats() {
	const context = useContext(StatsContext);

	if (context === undefined) {
		throw new Error("useStats must be used within a StatsProvider");
	}

	return context;
}
