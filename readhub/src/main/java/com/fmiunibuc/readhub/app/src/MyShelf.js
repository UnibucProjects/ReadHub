import React, { Component } from 'react';
import {
  Button, ButtonGroup, Container, Table,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class MyShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {bookList: [], shelf: null, isLoading: true };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await fetch(`/api/shelf/${this.props.match.params.id}`)
        .then((response) => response.json())
        .then((data) => this.setState({bookList:data['books'], shelf: data, isLoading: false }));
  }

  async remove(id) {
      await fetch(`/api/shelf/${id}`, {
          method: 'DELETE',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
      });
  }

  async removeBook(id) {
    await fetch(`/api/bookCopy/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      const updatedBooks = [...this.state.bookList].filter((i) => i.id !== id);
      this.setState({ bookList: updatedBooks });
    });
  }
  render() {
    const {bookList, shelf, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (shelf === null) {
      return (
          <div>
            <p>This shelf doesn't exist!</p>
          </div>
      );
    }
    const myShelf = (
        <tr >
          <td style={{ whiteSpace: 'nowrap' }}><h1>{shelf.name} Shelf</h1></td>
          <td>
            <ButtonGroup>
              <Button size="sm" color="primary" tag={Link} to={`/shelves/${shelf.id}`}>Edit</Button>
              <Button size="sm" color="danger" onClick={() => this.remove(shelf.id)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
    );
    const bookListShow = bookList.map((book) => (
        <tr key={book.id}>
            <td style={{ whiteSpace: 'nowrap' }}><Link to={`/shelf/${book.id}`}>{book.bookType.name}</Link></td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={`/books/${shelf.id}`}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => this.removeBook(shelf.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    ));
    const ShowALLBooks = (bookList.length === 0) ?
      (<div>
        <br></br>
        <br></br>
        <h4>You don't have books added yet!</h4>
      </div>) : (
      <div>
        <h3>Books</h3>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="20%">Name</th>
            <th width="10%">Actions</th>
          </tr>
          </thead>
          <tbody>
          {bookListShow}
          </tbody>
        </Table>
      </div>);


    return (
        <div>
          <Container fluid>

            <Table className="mt-4">

              <tbody>
              {myShelf}
              </tbody>
            </Table>

            {ShowALLBooks}
          </Container>
        </div>
    );
  }
}

export default MyShelf;