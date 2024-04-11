import axios from "axios";
import { useCallback } from "react";

export interface DeleteButtonProps {
	endpoint: string;
}

export default function DeleteButtonComponent({ endpoint }: DeleteButtonProps) {

	const handleDelete = useCallback(() => {
		axios.delete(`${import.meta.env.VITE_API_URL}/${endpoint}`)
	}, [endpoint]);

	return (
		<button onClick={handleDelete}>
			Delete
		</button>
	)
}