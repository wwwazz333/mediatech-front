import { User } from "../models/user";
import { Observer } from "./observer";


export class UserObserver extends Observer<User[]> {
	private static instance: UserObserver;
	private constructor() {
		super();
	}
	static getInstance(): UserObserver {
		if (!this.instance) {
			this.instance = new UserObserver();
		}
		return this.instance;
	}
}