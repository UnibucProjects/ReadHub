import React, { Component } from 'react';
import {
  Button, ButtonGroup, Container, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthService from './services/auth.service';



class BookList extends Component {
  emptyItem = {
    name: ''
  };

  constructor(props) {
    super(props);
    this.state = {item: this.emptyItem, books: [], ratings: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('api/books')
      .then((response) => response.json())
      .then((data) => this.setState({ books: data, isLoading: false }));

    fetch('/api/books/ratings')
        .then((response) => response.json())
        .then((data) => this.setState({ ratings: data }));
  }

  async remove(id) {
    await fetch(`/api/book/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      const updatedBooks = [...this.state.books].filter((i) => i.id !== id);
      this.setState({ books: updatedBooks });
    });
  }

  async onClickHandler(bookId){
    const user = AuthService.getCurrentUser();
    await fetch(`/api/addBookToShelf/${user.id}/${bookId}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
       .then(r => console.log(r));
  }

  render() {
    const { books, ratings, isLoading } = this.state;
    const user = AuthService.getCurrentUser();
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const newBooks = [];
    for(let i = 0; i < books.length; i++) {
      newBooks[i] = {};
      newBooks[i].id = books[i].id;
      newBooks[i].name = books[i].name;
      newBooks[i].author = books[i].author;
      newBooks[i].pages = books[i].pages;
      if(ratings[i] === null) {
        newBooks[i].rating = "Not rated yet";
      } else {
        newBooks[i].rating = ratings[i];
      }
    }

    const bookList = newBooks.map((book) => (
      <tr key={book.id}>
        <td style={{ whiteSpace: 'nowrap' }}>{book.name}</td>
        <td>{book.author}</td>
        <td>{book.pages}</td>
        <td>{book.rating}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color={"success"} onClick={() => this.onClickHandler(book.id)}>Add to my library</Button>
            {user.roles.includes('ROLE_MODERATOR') && (<Button size="sm" color="primary" tag={Link} to={`/books/${book.id}`}>Edit</Button>)}
            {user.roles.includes('ROLE_MODERATOR') && (<Button size="sm" color="danger" onClick={() => this.remove(book.id)}>Delete</Button>)}
          </ButtonGroup>
        </td>
      </tr>
    ));

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            {user.roles.includes('ROLE_MODERATOR') && (
            <Button color="success" tag={Link} to="/books/new">Add Book</Button>)}
          </div>
          <h3>Books</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="25%">Name</th>
                <th width="25%">Author</th>
                <th width="10%">Pages</th>
                <th width="15%">Rating</th>
                <th width="25%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default BookList;
