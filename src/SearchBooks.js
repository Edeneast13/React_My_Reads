import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ShelfDetails from './ShelfDetails'

class SearchBooks extends Component {

	state = {
		books: [],
		query: '',
		results: null
	};

	updateSearch(query) {
		//BooksAPI.search(query).then(books => books ? this.setState({ books}) : []);
		//this.setState({query});
		this.setState({ query: query})

		if(query.trim() !== '') {
			BooksAPI.search(query, 20).then(books => this.setState({
				results: books
			}))
		}
		else {
			this.setState({
				results: []
			})
		}
	}

	updateBookShelf(book, shelf) {
		BooksAPI.update(book, shelf).then(() => shelf !== 'none' ? alert(`${book.title} has been added to your shelf`) : null)
				.catch(() => alert('Something went wrong! Please try again!'));

	}

	renderSearchComponents() {
		const { books, query } = this.state;

		if(query) {
			return books.error ? 
				<div> No results found </div>
					: books.map((book, index) => {
						return (
							<ShelfDetails key={index} book={book} updateBookShelf={this.updateBookShelf.bind(this)} />
						);
					});
		}
	}

	render() {

		let books = this.state.results

		if(books === null || books.error) {
			books = []
		}

		return (
			<div className='search-books'>
				<div className='search-books-bar'>
					<Link to='/' className='close-search'> Close </Link>
						<div className='search-books-input-wrapper'>
							<input type='text' placeholder='Search by title or author' value={ this.state.query } onChange={ e => this.updateSearch(e.target.value) } />
						</div>
				</div>
			<div className='search-books-results'>
				<ol className='books-grid'>
					{ this.renderSearchComponents() }
				</ol>
			</div>
		</div>
		);
	}
}

export default SearchBooks 







