import React, {Component} from 'react'

class BookComponent extends Component {

  onBookStatusChanged = (event) => {
    const shelf = event.target.value;
    this.props.onBookShelfChanged(this.props.book, shelf);
  };

  render() {
    let shelf = this.props.book.shelf;
    if (!shelf) {
      shelf = "none";
    }
    const {title, authors, imageLinks} = this.props.book;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.smallThumbnail})` }}/>
          <div className="book-shelf-changer">
            <select onChange={this.onBookStatusChanged}
                defaultValue={shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading" >Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}

export default BookComponent;
