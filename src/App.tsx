import { useState } from 'react';
import './App.css';
import AuthorsComponent from './authors/authors.component';
import BooksComponent from './books/books.component';
import CreateComponent from './global-component/create.component';
import SearchComponent from './global-component/search.component';
import { Author, authorSchema } from './models/author';
import { Book, bookSchema } from './models/books';
import { User, userSchema } from './models/user';
import UsersComponent from './users/users';

function App() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [authors, setAuthor] = useState<Author[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);

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

      <p>-------------------------------Users--------------------------------</p>
      <SearchComponent searchWhat="users" newSearchToDisplay={setUsers} fields={["id", "name"]} />
      <UsersComponent users={users} />
      <CreateComponent createWhat='users'
        defaultData={{ name: "" }}
        parser={(data) => userSchema.parse(data)}
      />
    </div>
  );
}

export default App;
