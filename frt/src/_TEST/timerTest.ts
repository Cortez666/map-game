import { useState, useEffect } from "react";

const TIME_IN_MILISECINDS_TO_COUNTDOWN = (4 * 1000) as number;
const INTERVAL_IN_MILIOSECONDS = 100 as number;

export function Timer() {
	const [startTimer, setStartTimer] = useState<boolean>(false);
	const [time, setTime] = useState<number>(TIME_IN_MILISECINDS_TO_COUNTDOWN);
	const [refTime, setRefTime] = useState<number>(Date.now());

	if (!startTimer) {
		return;
	}

	useEffect(() => {
		const countdownUntilZero = () => {
			setTime((prevTime) => {
				if (prevTime <= 0) {
					setStartTimer(false);
					return 0;
				}

				const now = Date.now();
				const interval = now - refTime;

				setRefTime(now);

				return prevTime - interval;
			});
		};

		setTimeout(countdownUntilZero, INTERVAL_IN_MILIOSECONDS);
	}, [time]);

	return { time, setStartTimer };
}
