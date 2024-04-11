
export class AuthorObserver extends Observer<AuthorObserver[]> {
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