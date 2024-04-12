import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import TableComponent from "../global-component/table.component";
import { BookObserver } from "../lib/bookObserver";
import { Book, bookSchema } from "../models/books";

export interface BooksProps {
}

export default function BooksComponent(params: BooksProps) {
	const [books, setBooks] = useState<Book[] | null>(null);

	const updateData = useCallback((data: Book[]) => {
		setBooks(data);
	}, []);

	useEffect(() => {
		BookObserver.getInstance().unsubscribe(updateData);
		BookObserver.getInstance().subscribe(updateData);
	}, []);
	return (
		<>
			{!books && "loading..."}
			{books &&
				<TableComponent headers={["Id", "Title", "Description", "genre"]}
					rows={z.array(bookSchema).parse(books).map((book) =>
						[book.id?.toString() ?? "", book.name, book.description ?? "", book.genre ?? ""])} />
			}
		</>
	)
}