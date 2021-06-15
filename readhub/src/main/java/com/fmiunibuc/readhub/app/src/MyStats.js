import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyStats extends Component{
    constructor(props) {
        super(props);
        this.state = { books: [], isLoading: true };
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        await fetch(`/api/myStats/${this.props.match.params.id}`)
            .then((response) => response.json())
            .then((data) => this.setState({books: data, isLoading: false }));
    }

    render() {
        const {books, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        if (books.length === 0) {
            return (
                <div>
                    <h4>You don't have any books in your library!</h4>
                </div>
            );
        }
        else {

            return (
                <div class="container">
                    <h4>
                        <strong>Longest book in my library:</strong>
                        {' '}
                        <Link to={`/myBookCopy/${books[0].id}`}>{books[0].bookType.name}</Link>
                    </h4>
                    <br/>
                    <h4>
                        <strong>Shortest book in my library:</strong>
                        {' '}
                        <Link to={`/myBookCopy/${books[1].id}`}>{books[1].bookType.name}</Link>
                    </h4>
                    <br/>
                    {
                        (books[2].rating) ? (
                            <h4>
                                <strong>My favorite book:</strong>
                                {' '}
                                <Link to={`/myBookCopy/${books[2].id}`}>{books[2].bookType.name}</Link>
                            </h4>

                        ) : (
                            <h4>
                                <strong>My favorite book:</strong>
                                {' '}
                                You haven't rated any books yet!
                            </h4>
                        )
                    }
                    <br/>
                    {
                        (books[2].rating) ? (
                            <h4>
                                <strong>My least favorite book:</strong>
                                {' '}
                                <Link to={`/myBookCopy/${books[3].id}`}>{books[3].bookType.name}</Link>
                            </h4>
                        ) : (
                            <h4>
                                <strong>My least favorite book:</strong>
                                {' '}
                                You haven't rated any books yet!
                            </h4>
                        )
                    }

                </div>
            );
        }
    }
}

export default MyStats