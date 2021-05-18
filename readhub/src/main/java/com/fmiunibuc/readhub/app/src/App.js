import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
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
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
const TITLE = "ReadHub";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

        return (
            <>
            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        {TITLE}
                    </Link>
                    <div className="navbar-nav mr-auto">

                        {showAdminBoard && (<li className="nav-item">
                            <Link to={"/libraries"} className="nav-link">
                                Manage libraries
                            </Link>
                        </li>)}
                        {showAdminBoard && (<li className="nav-item">
                            <Link to={"/shelves"} className="nav-link">
                                Manage shelves
                            </Link>
                        </li>)}
                        <li className="nav-item">
                            <Link to={"/books"} className="nav-link">
                                Manage books
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/bookCopies"} className="nav-link">
                                Manage book copies
                            </Link>
                        </li>
                        {showAdminBoard && (<li className="nav-item">
                            <Link to={"/users"} className="nav-link">
                                Manage users
                            </Link>
                        </li>)}
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
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
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route path="/user" component={BoardUser} />
                        <Route path="/mod" component={BoardModerator} />
                        <Route path="/admin" component={BoardAdmin} />
                        <Route path='/libraries' exact={true} component={LibraryList}/>
                        <Route path='/libraries/:id' component={LibraryEdit}/>
                        <Route path='/shelves' exact={true} component={ShelfList}/>
                        <Route path='/shelves/:id' component={ShelfEdit}/>
                        <Route path='/books' exact={true} component={BookList}/>
                        <Route path='/books/:id' component={BookEdit}/>
                        <Route path='/bookCopies' exact={true} component={BookCopyList}/>
                        <Route path='/bookCopies/:id' component={BookCopyEdit}/>
                    </Switch>
                </div>
            </div>
            </>
        );
    }
}

export default App;
