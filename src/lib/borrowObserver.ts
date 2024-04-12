import { Borrow } from "../models/borrow";
import { Observer } from "./observer";


export class BorrowObserver extends Observer<Borrow[]> {
	private static instance: BorrowObserver;
	private constructor() {
		super();
	}
	static getInstance(): BorrowObserver {
		if (!this.instance) {
			this.instance = new BorrowObserver();
		}
		return this.instance;
	}
}