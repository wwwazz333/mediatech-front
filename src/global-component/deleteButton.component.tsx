import axios from "axios";
import { useCallback } from "react";
import { Observer } from "../lib/observer";

export interface DeleteButtonProps<T> {
	endpoint: string;
	observer: Observer<T>;

}

export default function DeleteButtonComponent<T>({ endpoint, observer }: DeleteButtonProps<T>) {

	const handleDelete = useCallback(() => {
		axios.delete(`${import.meta.env.VITE_API_URL}/${endpoint}`)
			.then((response) => {
				console.log(response);
				const oldData = observer.getValue();
				if (observer && oldData && Object.prototype.toString.call(oldData) === '[object Array]') {
					try {
						const array: any[] = [];
						for (let obj of oldData as any[]) {
							if (JSON.stringify(obj) !== JSON.stringify(response.data)) {
								array.push(obj);
							}
						}
						observer.notify(array as T);
					} catch (error) {
						console.error(error);
					}
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, [endpoint]);

	return (
		<button onClick={handleDelete}>
			Delete
		</button>
	)
}