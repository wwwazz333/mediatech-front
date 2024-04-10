import { useState } from 'react';
import './App.css';
import BooksComponent from './books/books.component';
import SearchComponent from './global-component/search.component';
import { Book } from './models/books';

function App() {
  const [books, setBooks] = useState<Book[] | null>(null);

  return (
    <div >
      {/* <SearchBookComponent newBooksToDisplay={setBooks} /> */}
      <SearchComponent searchWhat="books" newSearchToDisplay={setBooks} fields={["id", "name", "genre", "authorName"]} />
      <BooksComponent books={books} />
    </div>
  );
}

export default App;
