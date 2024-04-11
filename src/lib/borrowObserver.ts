import { Book } from "../models/books";

export class BorrowObserver extends Observer<Book[]> {
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