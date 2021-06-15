import React, { Component } from 'react';
import {
  Button, ButtonGroup, Container, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class ShelfList extends Component {
  constructor(props) {
    super(props);
    this.state = { shelves: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('api/shelves')
      .then((response) => response.json())
      .then((data) => this.setState({ shelves: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/shelf/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      const updatedShelves = [...this.state.shelves].filter((i) => i.id !== id);
      this.setState({ shelves: updatedShelves });
    });
  }

  render() {
    const { shelves, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const shelfList = shelves.map((shelf) => {
      const ownerName = `${'Owner name' || ''}`;
      const libraryName = `${'Library name' || ''}`;
      return (
        <tr key={shelf.id}>
          <td style={{ whiteSpace: 'nowrap' }}>{shelf.name}</td>

          <td>

          </td>
          <td>
            <ButtonGroup>
              <Button size="sm" color="primary" tag={Link} to={`/shelves/${shelf.id}`}>Edit</Button>
              <Button size="sm" color="danger" onClick={() => this.remove(shelf.id)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/shelves/new">Add Shelf</Button>
          </div>
          <h3>My shelves</h3>
          <Table className="mt-5">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="20%">Library</th>
                <th width="20%">Owner</th>
                <th>Books</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shelfList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ShelfList;
