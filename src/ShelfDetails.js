import React from 'react'

const ShelfDetails = ({ book, updateBookShelf }) => {

	const thumbNail = book.imageLinks ? book.imageLinks.smallThumbnail : null;

	return (
		<li>
			<div className='book'>
				<div className='book-top'>
					<div className='book-cover' >
						style={{ width: 128, height: 193, backgroundImage: `url(${thumbNail})`}}
					</div>
						<div className='book-shelf-changer'>
							<select onChange={ e => updateBookShelf(book, e.target.value)} value={ book.shelf } >
								<option value='none' disabled> Move to... </option>
								<option value='currentlyReading' disabled> Currently Reading </option>
								<option value='wantedToRead' disabled> Want To Read </option>
								<option value='read' disabled> Read </option>
								<option value='none' disabled> None </option>
							</select>
						</div>
					</div>
				<div className='book-title'>{ book.title }</div>
				<div className='book-authors'>{ book.authors }</div>
			</div>
		</li>
	);
};

export default ShelfDetails