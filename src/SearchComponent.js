import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import BookComponent from './BookComponent.js'

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      page: 1
    }
  }

  showBooks= () => {
    console.log("showBooks");
    console.log(this.props.searchedBooks);

    return this.props.searchedBooks.map((book)=>{
        //console.log(book);
        return (
          <li key={book.id}>
            <BookComponent book={book} onBookShelfChanged={this.props.onBookShelfChanged}/>
          </li>
        )
      });
  }

  onSearchChanged = (event) => {
    const searchTerm = event.target.value;
    this.setState({
      searchTerm
    });
  }

  componentDidUpdate() {
    const searchTerm = this.state.searchTerm;
    console.log(searchTerm);
    if (searchTerm !== "") {
      this.props.searchBooksWithTerm(searchTerm);
      this.setState({searchTerm: ""});
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"
              onChange={this.onSearchChanged}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.showBooks()
            }
          </ol>
        </div>

      </div>
    );
  }
}

export default SearchComponent;
