export let money = 0 as number;
export let beer = 0 as number;

function Start(): void {
	money = 100;
	beer = 2;
}

export function AddMoney(amount: number): void {
	money += amount;
}

export function RemoveMoney(amount: number): void {
	money += amount;
}

export function AddBeer(amount: number): void {
	beer += amount;
}

export function RemoveBeer(amount: number): void {
	beer += amount;
}

Start();
