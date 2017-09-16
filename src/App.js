import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import SearchComponent from './SearchComponent.js'
import ListBookComponent from "./ListBookComponent.js"

class BooksApp extends React.Component {
  state = {
    /**
     * : Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchedBooks: []
  }

  onBookShelfChanged = (newBook, shelf) => {
    console.log("onBookShelfChanged");
    let books = JSON.parse(JSON.stringify(this.state.books)); // deep copy
    let clonedNewBook = JSON.parse(JSON.stringify(newBook));

    let filteredBooks = books.filter((book)=>(book.id === clonedNewBook.id));
    if (filteredBooks.length === 0) {
      console.log("pushed");
      clonedNewBook.shelf = shelf;
      books.push(clonedNewBook);
    } else {
      filteredBooks.forEach((book, id) => {
        book.shelf = shelf;
      });
    }

    this.setState({books});
  }

  serverUpdateBooksIfChanged = (prevBooks, currentBooks) => {
    currentBooks.filter((prevBook) => {
      let findChangedBooks = prevBooks
        .filter((book) => {
          return book.id===prevBook.id && book.shelf!== prevBook.shelf
        })
        .length === 1;
      let findAddedBooks = prevBooks
        .filter((book) => {
          return book.id===prevBook.id
        })
        .length === 0;
      return findChangedBooks || findAddedBooks;
    }).forEach(
          (book) => {
            console.log(book);

            BooksAPI.update(book, book.shelf)
              .then((data)=>{
                  console.log("success");
                  // TODO check when updating data is successful or not
              });
          }
    );
  }

  searchBooksWithTerm = (searchTerm) => {
    BooksAPI.search(searchTerm, 14)
      .then((books) => {
        if (books.error) {
          books = [];
        }

        books.forEach((book) => {
          let filteredBooks = this.state.books.filter((stateBook)=>(stateBook.id===book.id));
          if (filteredBooks.length === 1) {
            book.shelf = filteredBooks[0].shelf;
          }
        });

        console.log(books);
        this.setState({
          searchedBooks: books
        });
      });
  }

  resetBooks = () => {
    this.setState({searchedBooks:[]});
  }

  initBooks = () => {
    BooksAPI.getAll()
        .then((data) => {
          //console.log(data);
          this.setState({books: data});
        });
  }

  reinitBooks = () => {
    this.resetBooks();
    this.initBooks();
  }

  componentDidMount() {
    console.log("componentDidMount App");
    this.initBooks();
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate App");
    this.serverUpdateBooksIfChanged(this.state.books, nextState.books);
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={
          () => (
            <ListBookComponent
              resetBooks={this.resetBooks}
              books={this.state.books}
              onBookShelfChanged={this.onBookShelfChanged} />
          )
        }/>

        <Route path="/search" render={
          () => (
            <SearchComponent
              searchedBooks={this.state.searchedBooks}
              onBookShelfChanged={this.onBookShelfChanged}
              searchBooksWithTerm={this.searchBooksWithTerm}/>
          )
        }/>

      </div>
    );
  }
}

export default BooksApp
