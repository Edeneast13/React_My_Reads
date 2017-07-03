import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component { 

    render() {
        return (
          <div className='app'>
            <Route path='/' exact component={ ListBooks } />
            <Route path="/search" component={ SearchBooks } />
          </div>
        );
    }
}

export default BooksApp
