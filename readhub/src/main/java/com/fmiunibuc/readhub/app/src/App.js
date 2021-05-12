import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LibraryList from './LibraryList';
import { Helmet } from 'react-helmet';
import LibraryEdit from "./LibraryEdit";

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
              </Switch>
            </Router>
        </>
    )
  }
}

export default App;
