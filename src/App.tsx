import { useState } from 'react';
import './App.css';
import BooksComponent from './books/books.component';
import SearchBookComponent from './books/searchBook.component';
import { Book } from './models/books';

function App() {
  const [books, setBooks] = useState<Book[] | null>(null);

  return (
    <div >
      <SearchBookComponent newBooksToDisplay={setBooks} />
      <BooksComponent books={books} />
    </div>
  );
}

export default App;
