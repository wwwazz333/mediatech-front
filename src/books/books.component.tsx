import { z } from "zod";
import TableComponent from "../global-component/table.component";
import { useLoad } from "../hooks/useLoad";
import { bookSchema } from "../models/books";

export interface BooksProps {

}

export default function BooksComponent(params: BooksProps) {
	const books = useLoad(`${process.env.REACT_APP_API_URL}/books`);
	return (
		<>
			{!books && "loading..."}
			{books &&
				<TableComponent headers={["Title", "Description", "genre"]} rows={z.array(bookSchema).parse(books).map((book) => [book.name, book.description ?? "", book.genre ?? ""])} />
			}
		</>
	)
}