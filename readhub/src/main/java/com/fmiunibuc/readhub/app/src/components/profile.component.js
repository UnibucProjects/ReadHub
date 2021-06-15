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
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: '/home' });
    this.setState({ currentUser, userReady: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

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
              <div>
                <h3>This is our recommendation!</h3>
                <p>To be added :))</p>
              </div>



            </div>
          ) : null}
      </div>
    );
  }
}
