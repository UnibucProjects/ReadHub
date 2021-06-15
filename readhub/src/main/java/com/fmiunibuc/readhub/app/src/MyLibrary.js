import React, { Component } from 'react';
import {
  Button, ButtonGroup, Container, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './App.css';

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
              <Button className={"action_button"} size="sm" color="primary" tag={Link} to={`/shelves/${shelf.id}`}>Edit</Button>
              &nbsp; &nbsp;
              <Button className={"action_button"} size="sm" color="danger" onClick={() => this.remove(shelf.id)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
    ));
    return (
        <div>
          <Container fluid>
              <br/>
            <div id={"library_title"}>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/shelves/new">Add Shelf</Button>
                </div>

                <h2>My Library</h2>
            </div>
            <Table id={"shelves_table"} className="mt-4">
              <thead>
              <tr>
                <th width="50%">Name</th>
                <th width="50%">Actions</th>
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
