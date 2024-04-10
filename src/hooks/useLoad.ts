import axios from "axios";
import { useEffect, useState } from "react";



export function useLoad<T>(url: string) {
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		axios.get(url).then((response) => {
			setData(response.data);
		}).catch((error) => {
			console.error(error.message);
		});
	}, [url]);

	return data;
}