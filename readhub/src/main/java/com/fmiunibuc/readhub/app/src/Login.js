import React, { Component } from "react";
import axios from "axios";

class login extends Component {
    constructor() {
        super();

        this.state = {
            username: "admin",
            password: "admin"
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit = event => {
        event.preventDefault();

        const endpoint = "http://localhost:8090/authenticate";

        const username = this.state.username;
        const password = this.state.password;

        const user_object = {
            username: username,
            password: password
        };

        axios.post(endpoint, user_object).then(res => {
            localStorage.setItem("authorization", res.data.token);
            return this.handleDashboard();
        });
    };

    handleDashboard() {
        axios.get("http://localhost:8090/dashboard").then(res => {
            if (res.data === "success") {
                this.props.history.push("/dashboard");
            } else {
                alert("Authentication failure");
            }
        });
    }

    render() {
        return (
            <div>
                <div class="wrapper">
                    <form class="form-signin" onSubmit={this.handleFormSubmit}>
                        <h2 class="form-signin-heading">Please login</h2>
                        <div className="form-group">
                            <input type="text"
                                   class="form-control"
                                   placeholder="User name"
                            />
                        </div>
                        <div className="form-group">
                            <input type="password"
                                   class="form-control"
                                   placeholder="password"
                            />
                        </div>
                        <button class="btn btn-lg btn-primary btn-block" type="submit">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
export default login;