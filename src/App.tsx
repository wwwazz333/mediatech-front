import { useState } from 'react';
import './App.css';
import AuthorsComponent from './authors/authors.component';
import BooksComponent from './books/books.component';
import CreateComponent from './global-component/create.component';
import SearchComponent from './global-component/search.component';
import { Author, authorSchema } from './models/author';
import { Book, bookSchema } from './models/books';
import { User, userSchema } from './models/user';
import { Written, writtenSchema } from './models/written';
import UsersComponent from './users/users';
import WrittensComponent from './writtens/writtens';

function App() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [authors, setAuthor] = useState<Author[] | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [writtens, setWrittens] = useState<Written[] | null>(null);

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

      <p>-------------------------------Written--------------------------------</p>
      <SearchComponent searchWhat="writtens" newSearchToDisplay={setWrittens} fields={["idBook", "idAuthor"]} />
      <WrittensComponent writtens={writtens} />
      <CreateComponent createWhat='writtens'
        defaultData={{ idBook: 0, idAuthor: 0, publication: new Date() }}
        parser={(data) => writtenSchema.parse(data)}
      />
    </div>
  );
}

export default App;
