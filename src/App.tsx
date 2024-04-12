import './App.css';
import AuthorsComponent from './authors/authors.component';
import BooksComponent from './books/books.component';
import BorrowsComponent from './borrows/borrows.component';
import CreateComponent from './global-component/create.component';
import SearchComponent from './global-component/search.component';
import { AuthorObserver } from './lib/authorObserver';
import { BookObserver } from './lib/bookObserver';
import { BorrowObserver } from './lib/borrowObserver';
import { UserObserver } from './lib/userObserver';
import { writtenObserver } from './lib/writtenObserver';
import { authorSchema } from './models/author';
import { bookSchema } from './models/books';
import { userSchema } from './models/user';
import { writtenSchema } from './models/written';
import UsersComponent from './users/users';
import WrittensComponent from './writtens/writtens';

function App() {


  return (
    <div >
      <p>-------------------------------Books--------------------------------</p>
      <SearchComponent searchWhat="books" fields={["id", "name", "genre", "authorName"]} observer={BookObserver.getInstance()} />
      <BooksComponent />
      <CreateComponent
        observer={BookObserver.getInstance()}
        createWhat='books'
        defaultData={{ name: "", genre: "", description: "", numberAvailable: 0 }}
        parser={(data) => bookSchema.parse(data)}
      />

      <p>-------------------------------Authors--------------------------------</p>
      <SearchComponent searchWhat="authors" observer={AuthorObserver.getInstance()} fields={["id", "name"]} />
      <AuthorsComponent />
      <CreateComponent
        observer={AuthorObserver.getInstance()}
        createWhat='authors'
        defaultData={{ name: "" }}
        parser={(data) => authorSchema.parse(data)}
      />

      <p>-------------------------------Users--------------------------------</p>
      <SearchComponent searchWhat="users" fields={["id", "name"]} observer={UserObserver.getInstance()} />
      <UsersComponent />
      <CreateComponent
        observer={UserObserver.getInstance()}
        createWhat='users'
        defaultData={{ name: "" }}
        parser={(data) => userSchema.parse(data)}
      />

      <p>-------------------------------Written--------------------------------</p>
      <SearchComponent searchWhat="writtens" observer={writtenObserver.getInstance()} fields={["idBook", "idAuthor"]} />
      <WrittensComponent />
      <CreateComponent
        observer={writtenObserver.getInstance()}
        createWhat='writtens'
        defaultData={{ idBook: 0, idAuthor: 0, publication: new Date() }}
        parser={(data) => writtenSchema.parse(data)}
      />

      <p>-------------------------------Borrow--------------------------------</p>
      <SearchComponent searchWhat="borrows" observer={BorrowObserver.getInstance()} fields={["idBook", "idUser"]} />
      <BorrowsComponent />
      {/* <CreateComponent createWhat='borrows'
        defaultData={{ idBook: 0, idUser: 0, dateBorrow: new Date() }}
        parser={(data) => borrowSchema.parse(data)}
      /> */}
    </div>
  );
}

export default App;
