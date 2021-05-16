import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LibraryList from './LibraryList';
import LibraryEdit from "./LibraryEdit";
import ShelfList from './ShelfList'
import ShelfEdit from './ShelfEdit'
import BookList from "./BookList";
import BookEdit from "./BookEdit";
import BookCopyList from "./BookCopyList";
import BookCopyEdit from "./BookCopyEdit";
import UserList from "./UserList";
import UserEdit from "./UserEdit";

const TITLE = 'ReadHub';

class App extends Component {
  render() {
    return (
        <>
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <Router>
              <Switch>
                <Route path='/' exact={true} component={Home}/>
                <Route path='/libraries' exact={true} component={LibraryList}/>
                <Route path='/libraries/:id' component={LibraryEdit}/>
                <Route path='/shelves' exact={true} component={ShelfList}/>
                <Route path='/shelves/:id' component={ShelfEdit}/>
                <Route path='/books' exact={true} component={BookList}/>
                <Route path='/books/:id' component={BookEdit}/>
                <Route path='/bookCopies' exact={true} component={BookCopyList}/>
                <Route path='/bookCopies/:id' component={BookCopyEdit}/>
                <Route path='/users' exact={true} component={UserList}/>
                <Route path='/users/:id' component={UserEdit}/>
              </Switch>
            </Router>
        </>
    )
  }
}

export default App;
