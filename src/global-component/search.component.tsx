import axios from "axios";
import { useEffect, useState } from "react";
import { Observer } from "../lib/observer";

export interface SearchProps<T> {
	searchWhat: string;
	fields: string[];
	observer: Observer<T>;
}

export default function SearchComponent<T>({ fields, searchWhat, observer }: SearchProps<T>) {
	const [searchFieldsState, setSearchFieldsState] = useState<Record<string, string>>({});

	const handleInputChange = (field: string, value: string) => {
		setSearchFieldsState(prevState => ({ ...prevState, [field]: value }));
	};

	const submitSearch = () => {
		const paramsSearch: any = {};

		for (const filed of fields) {
			if (filed && searchFieldsState[filed] && searchFieldsState[filed].length > 0) {
				paramsSearch[filed] = searchFieldsState[filed];
			}
		}
		axios.get(`${import.meta.env.VITE_API_URL}/${searchWhat}/search`,
			{ params: paramsSearch })
			.then((response) => observer.notify(response.data))
			.catch((error) => console.error(error.message));
	};

	useEffect(() => {
		submitSearch();
	}, []);


	return (
		<div>
			{fields.map(field => (
				<input
					key={field}
					type="text"
					placeholder={`Search ${field}`}
					onChange={(e) => handleInputChange(field, e.target.value)}
				/>
			))}
			<button onClick={submitSearch}>Search</button>

		</div>
	)
}