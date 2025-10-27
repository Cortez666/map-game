import { useRef, useEffect, useCallback } from "react";

export function useDebounce<T extends (...args: any[]) => void>(
	fn: T,
	delay: number
): (...args: Parameters<T>) => void {
	const timeoutRef = useRef<number>(0);

	const debouncedFn = useCallback(
		(...args: Parameters<T>) => {
			window.clearTimeout(timeoutRef.current);
			timeoutRef.current = window.setTimeout(() => fn(...args), delay);
		},
		[fn, delay]
	);

	useEffect(() => () => window.clearTimeout(timeoutRef.current), []);
	return debouncedFn;
}
