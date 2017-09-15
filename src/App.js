import React, {Component} from 'react'
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
    showSearchPage: false,
    books: [],
    booksInChangedShelf: []
  }

  onBookShelfChanged = (newBook, shelf) => {
    console.log("onBookShelfChanged");
    let books = this.state.books;
    let booksInChangedShelf = [];
    books.forEach((book, id) => {
      if(book.id === newBook.id) {
        book.shelf = shelf;
        booksInChangedShelf.push(book);
      }
    });
    this.setState({booksInChangedShelf: booksInChangedShelf, books: books});
  }

  componentDidMount() {
    BooksAPI.getAll()
        .then((data) => {
          console.log(data);
          this.setState({books: data});
        });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    let booksInChangedShelf = this.state.booksInChangedShelf;
    console.log("called"+booksInChangedShelf.length);
    if (booksInChangedShelf.length > 0) {
        booksInChangedShelf.forEach((book)=>{
            BooksAPI.update(book, book.shelf)
              .then((data)=>{
                  console.log("success");
                  console.log(data);
              });
        });
        this.setState({booksInChangedShelf: []});
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={
          () => (
            <ListBookComponent books={this.state.books} onBookShelfChanged={this.onBookShelfChanged} />
          )
        }/>

        <Route path="/search" render={
          () => (
            <SearchComponent/>
          )
        }/>

      </div>
    );
  }
}

export default BooksApp
