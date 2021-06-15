import React, { Component } from 'react';
import UserService from '../services/user.service';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
                        (error.response && error.response.data)
                        || error.message
                        || error.toString(),
        });
      },
    );
  }

  render() {
    return (
      [
        <div className="container">
          <header className="jumbotron" id={"home_div"}>
            <h1>Hello!</h1>
            <h1>Welcome to ReadHub!</h1>
            <br/>
            <br/>
            <h5>Are you looking for a friendly place where you can track your reading progress and discover new books?</h5>
            <h5>Well, you are in the right place!</h5>
            <h5> Register now, it's free! </h5>

            <div id={"home_buttons"}>
              <Button className={"home_button"} tag={ Link } to={"/login"}>Login</Button>
              &nbsp; &nbsp; &nbsp;
              <Button className={"home_button"} tag={ Link } to={"/register"}>Register</Button>
            </div>
          </header>
        </div>]
    );
  }
}
