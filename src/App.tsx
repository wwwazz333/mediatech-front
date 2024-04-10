import { useState } from 'react';
import './App.css';
import AuthorsComponent from './authors/authors.component';
import BooksComponent from './books/books.component';
import CreateComponent from './global-component/create.component';
import SearchComponent from './global-component/search.component';
import { Author, authorSchema } from './models/author';
import { Book, bookSchema } from './models/books';

function App() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [authors, setAuthor] = useState<Author[] | null>(null);

  return (
    <div >
      <p>-------------------------------Books--------------------------------</p>
      <SearchComponent searchWhat="books" newSearchToDisplay={setBooks} fields={["id", "name", "genre", "authorName"]} />
      <BooksComponent books={books} />
      <CreateComponent createWhat='books'
        defaultData={{ name: "", genre: "", description: "", numberAvailable: 0 }}
        parser={(data) => bookSchema.parse(data)}
      />

      <p>-------------------------------Authors--------------------------------</p>
      <SearchComponent searchWhat="authors" newSearchToDisplay={setAuthor} fields={["id", "name"]} />
      <AuthorsComponent authors={authors} />
      <CreateComponent createWhat='authors'
        defaultData={{ name: "" }}
        parser={(data) => authorSchema.parse(data)}
      />
    </div>
  );
}

export default App;
