import React, { Component } from 'react';
import {
  Button, ButtonGroup, Container, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import "./App.css";

class LibraryList extends Component {
  constructor(props) {
    super(props);
    this.state = { libraries: [], librariesOwners: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('api/libraries')
      .then((response) => response.json())
      .then((data) => this.setState({ libraries: data, isLoading: false }));

    fetch('api/librariesOwners')
        .then((response) => response.json())
        .then((data) => this.setState({ librariesOwners: data }));
  }

  async remove(id) {
    await fetch(`/api/library/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const updatedLibraries = [...this.state.libraries].filter((i) => i.id !== id);
      this.setState({ libraries: updatedLibraries });
    });
  }

  render() {
    const { libraries, librariesOwners, isLoading } = this.state;

    if (isLoading) {
      // eslint-disable-next-line react/jsx-filename-extension
      return <p>Loading...</p>;
    }

    const newLibraries = [];
    for(let i = 0; i < libraries.length; i++) {
      newLibraries[i] = {};
      newLibraries[i].id = libraries[i].id;
      newLibraries[i].name = libraries[i].name;
      newLibraries[i].owner = librariesOwners[i];
    }
    console.log(librariesOwners);

    const libraryList = newLibraries.map((library) => {
      return (
        <tr key={library.id}>
          <td style={{ whiteSpace: 'nowrap' }}>{library.name}</td>
          <td>{library.owner}</td>
          <td>
            <ButtonGroup>
              <Button className={"action_button"} size="sm" color="primary" tag={Link} to={`/libraries/${library.id}`}>Edit</Button>
              <Button className={"action_button"} size="sm" color="danger" onClick={() => this.remove(library.id)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/libraries/new">Add Library</Button>
          </div>
          <h3>User libraries</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="40%">Name</th>
                <th width="30%">Owner</th>
                <th width="30%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {libraryList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default LibraryList;
