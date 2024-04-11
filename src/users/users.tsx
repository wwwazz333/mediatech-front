import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import ModalComponent from "../global-component/modal.component";
import TableComponent from "../global-component/table.component";
import { Book, bookSchema } from "../models/books";
import { User, userSchema } from "../models/user";

export interface UsersProps {
	users?: User[] | null;
}

export default function UsersComponent({ users }: UsersProps) {
	const [userSelecting, setUserSelecting] = useState<User>();
	const [listBooks, setListBooks] = useState<Book[]>();
	const [selectedBook, setSelectedBook] = useState<number>();
	const [error, setError] = useState<string>();


	const borrow = (user: User, idBook: number) => {
		axios.post(`${import.meta.env.VITE_API_URL}/borrows/forUser/${user.id}/forBook/${idBook}`)
			.then((response) => {
				//close all
				setListBooks(undefined);
				setUserSelecting(undefined);
				setSelectedBook(undefined);
			})
			.catch((error) => {
				console.error(error);
				setError("Error loading books : " + error);

			});


	}

	const handleBorrowBook = (user: User) => {
		setUserSelecting(user);
		axios.get(`${import.meta.env.VITE_API_URL}/books`)
			.then((response) => {
				try {
					const books: Book[] = z.array(bookSchema).parse(response.data);
					setListBooks(books);
				} catch (error) {
					console.error(error);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<>
			{!users && "loading..."}
			{users &&
				<TableComponent headers={["Id", "Name", "Borrow a Books"]}
					rows={z.array(userSchema).parse(users).map((user) =>
						[user.id?.toString() ?? "", user.name, (<button onClick={() => handleBorrowBook(user)}>Barrow a book</button>)])} />
			}
			<ModalComponent show={userSelecting !== undefined} hide={() => {
				setUserSelecting(undefined);
				setListBooks(undefined);
			}} >
				<h1>Borrow : {userSelecting?.name}</h1>
				{!listBooks &&
					<p>
						Loading...
					</p>
				}
				{listBooks &&
					<>
						<div>
							<select onChange={(e) => {
								setSelectedBook(Number(e.target.value));
							}}>
								{
									listBooks.map((book) =>
										<>{
											book.id && <option key={book.id} value={book.id}>{book.name}</option>
										}</>
									)
								}
							</select>
							<button onClick={() => borrow(userSelecting!, selectedBook!)}>Borrow</button>
						</div>
						{error && <p>{error}</p>}
					</>
				}
			</ModalComponent>
		</>
	)
}