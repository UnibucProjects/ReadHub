import React, { Component } from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';

class MyBookCopy extends Component {
    rating;

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
        const labels = {
            0: '0',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
        };

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const rtg = bookCopy.rating;
        const bookCopyId = bookCopy.id;
        if(rtg === null || rtg === undefined) {
            this.rating = 0;
        } else {
            this.rating = rtg;
        }

        return (
            <>
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
                                {bookCopy.rating}/5
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
                <div id="stars_container">
                    <br/>
                    <br/>
                    <p><b>Tell us if you liked this book! :)) </b></p>
                    <Button color={"info"} tag={Link} to={`/bookCopiesRating/${bookCopy.id}`}>Rate the book!</Button>
                </div>
            </>
        )

    }
}

export default MyBookCopy;
