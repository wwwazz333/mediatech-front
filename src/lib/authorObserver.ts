import { Author } from "../models/author";
import { Observer } from "./observer";

export class AuthorObserver extends Observer<Author[]> {
	private static instance: AuthorObserver;
	private constructor() {
		super();
	}
	static getInstance(): AuthorObserver {
		if (!this.instance) {
			this.instance = new AuthorObserver();
		}
		return this.instance;
	}
}