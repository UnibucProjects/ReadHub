import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import AuthService from '../services/auth.service';
import './Home.css';
import {Button} from "reactstrap";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: '' },
      pagesRead: 0,
      totalPages: 0
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: '/home' });
    this.setState({ currentUser, userReady: true });

    fetch(`/api/users/pagesRead/${currentUser.id}`)
        .then((response) => response.json())
        .then((data) => this.setState({ pagesRead: data }));
    fetch(`/api/users/totalPages/${currentUser.id}`)
        .then((response) => response.json())
        .then((data) => this.setState({ totalPages: data }));

  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser, pagesRead, totalPages } = this.state;

    let hint = "";
    let percent = 0;
    if(totalPages === 0) {
      hint = "Let's find a book for you!";
    } else {
      percent = pagesRead / totalPages;
      if(percent === 0) {
        hint = "Ooops, it seems like you haven't read yet! :)) Let's find a book for you!";
      } else if(percent <= 0.25) {
        hint = "Keep reading, you can improve your score!";
      } else if(percent <= 0.5) {
        hint = "That's very good!";
      } else if(percent <= 0.75) {
        hint = "It seems that you like reading!";
      } else {
        hint = "Wow, you are an awesome reader! Let's see if there's a new book available!";
      }
    }

    return (
      <div className="container">
        {(this.state.userReady)
          ? (
            <div>
              <header className="jumbotron" id={"profile_header"}>
                <h3>
                  <strong>Hi, {currentUser.username}!</strong>
                </h3>
                <h4>We are happy you came back! &nbsp; What would you like to read today?</h4>

                <div id={"library_buttons"}>
                  <Button className={"library_button"} tag={Link} to={"/myLibrary/" + currentUser.id}>Go to my library</Button>
                  &nbsp; &nbsp; &nbsp;
                  <Button className={"library_button"} tag={Link} to={"/books"}>Discover new books</Button>
                </div>
              </header>
              <br/>
              <div className={"jumbotron"} id={"progress"}>
                <header>
                  <h2>My progress:</h2>
                  <br/>
                  <h4>{pagesRead} pages read from a total of {totalPages}. It means {percent * 100}%.</h4>
                  <div id={"hint"}>
                    <h4>{hint}</h4> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button id={"btn"} tag={Link} to={"/books"}>Go to book list</Button>
                  </div>
                </header>
              </div>

            </div>
          ) : null}
      </div>
    );
  }
}
