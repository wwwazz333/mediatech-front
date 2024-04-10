import { z } from "zod";
import TableComponent from "../global-component/table.component";
import { Book, bookSchema } from "../models/books";

export interface BooksProps {
	books?: Book[] | null;
}

export default function BooksComponent({ books }: BooksProps) {
	return (
		<>
			{!books && "loading..."}
			{books &&
				<TableComponent headers={["Title", "Description", "genre"]} rows={z.array(bookSchema).parse(books).map((book) => [book.name, book.description ?? "", book.genre ?? ""])} />
			}
		</>
	)
}