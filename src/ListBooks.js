import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import ShelfDetails from './ShelfDetails'

class ListBooks extends Component {

	state = {
		read: [],
		wantToRead: [],
		currentlyReading: []
	};

	componentDidMount() {
		this.getAllBooks();
	}

	getAllBooks() {
		BooksAPI.getAll().then(books => {
			const matchCR = new RegExp(escapeRegExp('currentlyReading'));
			let currentlyReading = books ? books.filter(book => matchCR.test(book.shelf)) : null;

			const matchWR = new RegExp(escapeRegExp('wantToRead'));
			let wantToRead = books ? books.filter(book => matchWR.test(book.shelf)) : null;

			const matchR = new RegExp(escapeRegExp('read'));
			let read = books ? books.filter(book => matchR.test(book.shelf)) : null;
		});
	}

	updateBookShelf(book, shelf){
		BooksAPI.update(book, shelf).then(() => this.getAllBooks());
	}

	renderBookComponent(books, title) {
		return (
			<div className='bookshelf'>
				<h2 className='bookshelf-title'> { title } </h2>
				<div className='bookshelf-books'>
					<ol className='bookshelf-grid'>
						{ books.map((book, index) =>
							<ShelfDetails key={index} book={book} updateBookShelf={this.updateBookShelf.bind(this)} />
						)}
					</ol>
				</div>
			</div>	
		)
	}

	render() {
		const { currentlyReading, wantToRead, read } = this.state;

		return (
			<div className='list-books'>
				<div className='list-books-title'>
					<h1>My Reads</h1>
				</div>
				<div className='list-books-content'>
					<div>
						{ this.renderBookComponent(currentlyReading, 'Currently Reading') }
						{ this.renderBookComponent(wantToRead, 'Want To Read') }
						{ this.renderBookComponent(read, "Read")}
					</div>
				</div>
				<div className='open-search'>
					<Link to='/search'> Add a book </Link>
				</div>
			</div>
		);
	}
}

export default ListBooks









