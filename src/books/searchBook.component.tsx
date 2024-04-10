import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Book } from "../models/books";
import "./searchBook.css";

export interface SearchBookProps {
	newBooksToDisplay: (book: Book[]) => void;
}

export default function SearchBookComponent({ newBooksToDisplay }: SearchBookProps) {
	const [id, setId] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [genre, setGenre] = useState<string>("");
	const [authorName, setAuthorName] = useState<string>("");

	const submitSearch = useCallback(() => {
		console.debug("searching for books", name);
		const paramsSearch: any = {};
		if (id) {
			paramsSearch["id"] = id;
		}
		if (name) {
			paramsSearch["name"] = name;
		}
		if (genre) {
			paramsSearch["genre"] = genre;
		}
		if (authorName) {
			paramsSearch["authorName"] = authorName;
		}
		console.debug("searching for books", paramsSearch);
		axios.get(`${process.env.REACT_APP_API_URL}/books`,
			{ params: paramsSearch })
			.then((response) => newBooksToDisplay(response.data))
			.catch((error) => console.error(error.message));
	}, [id, name, genre, authorName]);

	useEffect(() => {
		submitSearch();
	}, []);



	return (
		<div>
			<label>id <input type="text" placeholder="Search id" defaultValue={id} onChange={(e) => setId(e.target.value)} /></label>
			<label>name <input type="text" placeholder="Search name" defaultValue={name} onChange={(e) => setName(e.target.value)} /></label>
			<label>genre <input type="text" placeholder="Search genre" defaultValue={genre} onChange={(e) => setGenre(e.target.value)} /></label>
			<label>author name <input type="text" placeholder="Search author name" defaultValue={authorName} onChange={(e) => setAuthorName(e.target.value)} /></label>

			<button onClick={submitSearch}>Search</button>
		</div>
	)
}