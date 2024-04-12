import { Book } from "../models/books";
import { Observer } from "./observer";

export class BookObserver extends Observer<Book[]> {
	private static instance: BookObserver;
	private constructor() {
		super();
	}
	static getInstance(): BookObserver {
		if (!this.instance) {
			this.instance = new BookObserver();
		}
		return this.instance;
	}
}