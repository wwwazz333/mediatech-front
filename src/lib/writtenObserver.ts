import { Written } from "../models/written";
import { Observer } from "./observer";


export class writtenObserver extends Observer<Written[]> {
	private static instance: writtenObserver;
	private constructor() {
		super();
	}
	static getInstance(): writtenObserver {
		if (!this.instance) {
			this.instance = new writtenObserver();
		}
		return this.instance;
	}
}