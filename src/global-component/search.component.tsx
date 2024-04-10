import axios from "axios";
import { useEffect, useState } from "react";

export interface SearchProps<T> {
	searchWhat: string;
	newSearchToDisplay: (book: T[]) => void;
	fields: string[];
}

export default function SearchComponent<T>({ newSearchToDisplay, fields, searchWhat }: SearchProps<T>) {
	const [searchFieldsState, setSearchFieldsState] = useState<Record<string, string>>({});

	const handleInputChange = (field: string, value: string) => {
		setSearchFieldsState(prevState => ({ ...prevState, [field]: value }));
	};

	const submitSearch = () => {
		const paramsSearch: any = {};

		for (let filed of fields) {
			if (filed) {
				paramsSearch[filed] = searchFieldsState[filed];
			}
		}
		axios.get(`${process.env.REACT_APP_API_URL}/${searchWhat}/search`,
			{ params: paramsSearch })
			.then((response) => newSearchToDisplay(response.data))
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