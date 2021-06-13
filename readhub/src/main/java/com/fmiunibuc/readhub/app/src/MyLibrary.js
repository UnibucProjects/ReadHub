import React, { Component } from 'react';
import {
  Button, ButtonGroup, Container, Table,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

class MyLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = { shelves: [], isLoading: true };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await fetch(`/api/myLibrary/${this.props.match.params.id}`)
        .then((response) => response.json())
        .then((data) => this.setState({shelves: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/shelf/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      const updatedShelves = [...this.state.shelves].filter((i) => i.id !== id);
      this.setState({ shelves: updatedShelves });
    });
  }

  render() {
    const {shelves, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (shelves === []) {
      return (
          <div>
            <p>You haven't added shelves yet!</p>
          </div>
      );
    }

    const shelvesList = shelves.map((shelf) => (
        <tr key={shelf.id}>
          <td style={{ whiteSpace: 'nowrap' }}><Link to={`/shelf/${shelf.id}`}>{shelf.name}</Link></td>
          <td>
            <ButtonGroup>
              <Button size="sm" color="primary" tag={Link} to={`/shelves/${shelf.id}`}>Edit</Button>
              <Button size="sm" color="danger" onClick={() => this.remove(shelf.id)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
    ));
    return (
        <div>
          <Container fluid>
            <div>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/shelves/new">Add Shelf</Button>
                </div>
                <h2>My shelves</h2>
            </div>
            <Table className="mt-4">
              <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="10%">Actions</th>
              </tr>
              </thead>
              <tbody>
              {shelvesList}
              </tbody>
            </Table>
          </Container>
        </div>
    );
  }
}

export default MyLibrary;
