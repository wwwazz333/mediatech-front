export class Observer<T> {
	private value?: T;
	private observers: Array<(value: T) => void> = [];

	subscribe(observer: (value: T) => void): void {
		this.observers.push(observer);
	}
	unsubscribe(observer: (value: T) => void): void {
		this.observers = this.observers.filter(obs => obs !== observer);
	}

	notify(value: T): void {
		this.value = value;
		this.observers.forEach(observer => observer(value));
	}

	getValue(): T | undefined {
		return this.value;
	}
}