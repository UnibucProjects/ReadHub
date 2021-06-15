import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LibraryList from './LibraryList';
import LibraryEdit from './LibraryEdit';
import MyLibrary from './MyLibrary';
import ShelfList from './ShelfList';
import ShelfEdit from './ShelfEdit';
import MyShelf from './MyShelf';
import BookList from './BookList';
import BookEdit from './BookEdit';
import BookCopyList from './BookCopyList';
import BookCopyEdit from './BookCopyEdit';
import MyBookCopy from './MyBookCopy';
import UserList from './UserList';
import UserEdit from './UserEdit';
import AuthService from './services/auth.service';
import Login from './components/login.component';
import Register from './components/register.component';
import Home from './components/home.component';
import Profile from './components/profile.component';
import BoardUser from './components/board-user.component';
import BoardModerator from './components/board-moderator.component';
import BoardAdmin from './components/board-admin.component';
import BookCopyStatus from "./BookCopyStatus";
import BookCopyRating from "./BookCopyRating";
import MyStats from "./MyStats"
import BookCopyShelf from "./BookCopyShelf"

const TITLE = 'ReadHub';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showUserBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showUserBoard: user.roles.includes('ROLE_USER'),
        showAdminBoard: user.roles.includes('ROLE_ADMIN'),
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  logOut() {
    AuthService.logout();
  }

  render() {
    const {
      currentUser, showUserBoard, showAdminBoard,
    } = this.state;

    const isAuthenticated = showUserBoard;
    let id = 0;
    if (isAuthenticated) {
      id = currentUser.id;
    }

    return (
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            {!isAuthenticated && (<Link to="/" className="navbar-brand">
              {TITLE}
            </Link>)}
            {isAuthenticated && (<Link to="/profile" className="navbar-brand">
              {TITLE}
            </Link>)}
            <div className="navbar-nav mr-auto">

              {isAuthenticated && (
              <li className="nav-item">
                <Link to={`/myLibrary/${id}`} className="nav-link">
                  My library
                </Link>
              </li>
              )}

              {showAdminBoard && (
              <li className="nav-item">
                <Link to="/libraries" className="nav-link">
                  Manage libraries
                </Link>
              </li>
              )}
              {showAdminBoard && (
              <li className="nav-item">
                <Link to="/shelves" className="nav-link">
                  Manage shelves
                </Link>
              </li>
              )}
              {isAuthenticated && (
                  <li className="nav-item">
                    <Link to={`/myStats/${id}`} className="nav-link">
                      My stats
                    </Link>
                  </li>
              )}
              {showAdminBoard && (<li className="nav-item">
                <Link to="/books" className="nav-link">
                  Manage books
                </Link>
              </li>)}
              {showAdminBoard && (<li className="nav-item">
                <Link to="/bookCopies" className="nav-link">
                  Manage book copies
                </Link>
              </li>)}
              {showAdminBoard && (
              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  Manage users
                </Link>
              </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={['/', '/home']} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/myStats/:id" component={MyStats} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/libraries" exact component={LibraryList} />
              <Route path="/libraries/:id" component={LibraryEdit} />
              <Route path="/myLibrary/:id" component={MyLibrary} />
              <Route path="/shelves" exact component={ShelfList} />
              <Route path="/shelf/:id" component={MyShelf} />
              <Route path="/shelves/:id" component={ShelfEdit} />
              <Route path="/books" exact component={BookList} />
              <Route path="/books/:id" component={BookEdit} />
              <Route path="/bookCopies" exact component={BookCopyList} />
              <Route path="/bookCopies/:id" component={BookCopyEdit} />
              <Route path="/addBookToShelf/:id1/:id2" component={MyBookCopy}/>
              <Route path="/bookCopiesStatus/:id" component={BookCopyStatus} />
              <Route path="/bookCopiesRating/:id" component={BookCopyRating} />
              <Route path="/bookCopiesShelf/:id" component={BookCopyShelf} />
              <Route path="/myBookCopy/:id" component={MyBookCopy} />
              <Route path="/users" exact component={UserList} />
              <Route path="/users/:id" component={UserEdit} />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

export default App;
