import React, { Component } from 'react';
import {
  Button, ButtonGroup, Container, Table,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class MyShelf extends Component {
  constructor(props) {
    super(props);
    this.state = { shelf: null, isLoading: true };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await fetch(`api/shelf/${this.props.match.params.id}`)
      .then((response) => response.json())
      .then((data) => this.setState({ shelf: data, isLoading: false }));
  }

  render() {
    const { shelf, isLoading } = this.state;

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
      <tr key={shelf.id}>
        <td style={{ whiteSpace: 'nowrap' }}>{shelf.name}</td>
        <td>{shelf.library.name}</td>
        <td>
          {shelf.books.map((book) => <div key={book.id}>{book.name}</div>)}
        </td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={`/shelves/${shelf.id}`}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(shelf.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    );

    return (
      <div>
        <Container fluid>

          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="20%">Library</th>
                <th width="50%">Books</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myShelf}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default MyShelf;
