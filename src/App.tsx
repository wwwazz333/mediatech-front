import { useState } from 'react';
import './App.css';
import BooksComponent from './books/books.component';
import CreateComponent from './global-component/create.component';
import SearchComponent from './global-component/search.component';
import { Book, bookSchema } from './models/books';

function App() {
  const [books, setBooks] = useState<Book[] | null>(null);

  return (
    <div >
      {/* <SearchBookComponent newBooksToDisplay={setBooks} /> */}
      <SearchComponent searchWhat="books" newSearchToDisplay={setBooks} fields={["id", "name", "genre", "authorName"]} />
      <BooksComponent books={books} />
      <CreateComponent createWhat='books'
        defaultData={{ name: "", genre: "", description: "", numberAvailable: 0 }}
        parser={(data) => bookSchema.parse(data)}
      />
    </div>
  );
}

export default App;
