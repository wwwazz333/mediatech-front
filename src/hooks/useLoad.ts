import axios from "axios";
import { useEffect, useState } from "react";



export function useLoad<T>(url: string, applyToData?: (data: T) => T) {
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		axios.get(url).then((response) => {
			if (applyToData) {
				try {
					setData(applyToData(response.data));
				} catch (error: any) {
					console.error(error.message);
				}
			} else {
				setData(response.data);
			}
		}).catch((error) => {
			console.error(error.message);
		});
	}, [url]);

	return data;
}