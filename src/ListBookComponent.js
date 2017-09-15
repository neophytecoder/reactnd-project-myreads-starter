import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import BookComponent from "./BookComponent.js"

class ListBookComponent extends Component {

  showBooks = (shelf) => {
    return this.props.books
      .filter((book) => book.shelf===shelf)
      .map((book)=>{
        //console.log(book);
        return (
          <li key={book.id}>
            <BookComponent book={book} onBookShelfChanged={this.props.onBookShelfChanged}/>
          </li>
        )
      })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    this.showBooks("currentlyReading")
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    this.showBooks("wantToRead")
                  }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {
                  this.showBooks("read")
                }


                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" onClick={()=>{this.props.resetBooks()}}>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBookComponent;
