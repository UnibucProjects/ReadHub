import React, { Component } from 'react';
import {
  Button, ButtonGroup, Container, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('api/users')
      .then((response) => response.json())
      .then((data) => this.setState({ users: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/user/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      // eslint-disable-next-line react/no-access-state-in-setstate
      const updatedUsers = [...this.state.users].filter((i) => i.id !== id);
      this.setState({ users: updatedUsers });
    });
  }

  render() {
    const { users, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const userList = users.map((user) => (
      <tr key={user.id}>
        <td style={{ whiteSpace: 'nowrap' }}>{user.username}</td>
        <td>{user.email}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={`/users/${user.id}`}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(user.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    ));

    return (
      <div>
        <Container fluid>
          <h3>My Users</h3>
          <Table className="mt-5">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="20%">Email</th>
              </tr>
            </thead>
            <tbody>
              {userList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default UserList;
