import React, { Component } from 'react';
import {
  Button, ButtonGroup, Container, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar';

class BookCopyList extends Component {
  constructor(props) {
    super(props);
    this.state = { bookCopies: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('api/bookCopies')
      .then((response) => response.json())
      .then((data) => this.setState({ bookCopies: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/bookCopy/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      const updatedBookCopies = [...this.state.bookCopies].filter((i) => i.id !== id);
      this.setState({ bookCopies: updatedBookCopies });
    });
  }

  render() {
    const { bookCopies, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const bookCopyList = bookCopies.map((bookCopy) => {
      return (
        <tr key={bookCopy.id}>
          <td style={{ whiteSpace: 'nowrap' }}><Link to={`/myBookCopy/${bookCopy.id}`}>{bookCopy.bookType.name}</Link></td>
          <td>{bookCopy.bookType.author}</td>
          <td>{bookCopy.status}</td>
          <td>{bookCopy.pagesRead}</td>
          <td>{bookCopy.rating}</td>
          <td>
            <ButtonGroup>
              <Button size="sm" color="danger" onClick={() => this.remove(bookCopy.id)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/bookCopies/new">Add Book Copy</Button>
          </div>
          <h3>My book copies</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="15%">Name</th>
                <th width="15%">Author</th>
                <th width="15%">Status</th>
                <th width="15%">Pages read</th>
                <th width="10%">Rating</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookCopyList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default BookCopyList;
