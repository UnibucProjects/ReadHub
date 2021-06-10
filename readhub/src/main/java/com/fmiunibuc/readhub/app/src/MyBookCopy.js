import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import AuthService from "./services/auth.service";

class MyBookCopy extends Component {

    constructor(props) {
        super(props);
        this.state = {bookCopy: null, isLoading: true};
    }

    async componentDidMount() {
        this.setState({isLoading: true});

        await fetch(`/api/myBookCopy/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => this.setState({bookCopy: data, isLoading: false}));
    }

    render() {
        const {bookCopy, isLoading} = this.state;
        const user = AuthService.getCurrentUser();

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div className="container">
                <p>
                    <strong>Book name:</strong>
                    {' '}
                    {bookCopy.bookType.name}
                </p>
                <p>
                    <strong>Author:</strong>
                    {' '}
                    {bookCopy.bookType.author}
                </p>
                <p>
                    <strong>Status:</strong>
                    {' '}
                    {bookCopy.status}
                </p>
                <p>
                    <strong>Pages read:</strong>
                    {' '}
                    {bookCopy.pagesRead}/{bookCopy.bookType.pages}
                </p>
                {
                    (bookCopy.rating) ? (
                        <p>
                            <strong>Rating:</strong>
                            {' '}
                            {bookCopy.rating}/10
                        </p>
                    ) : (
                        <p>
                            <strong>Rating:</strong>
                            {' '}
                            Not rated
                        </p>
                    )
                }
                <Button size="sm" color="primary" tag={Link} to={`/bookCopies/${bookCopy.id}`}>Update pages</Button>{' '}
                <Button size="sm" color="primary" tag={Link} to={`/bookCopiesStatus/${bookCopy.id}`}>Change status</Button>
            </div>
        )

    }
}

export default MyBookCopy;
