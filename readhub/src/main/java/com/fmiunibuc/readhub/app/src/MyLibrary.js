import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';
import AuthService from "./services/auth.service";

class MyLibrary extends Component {

    constructor(props) {
        super(props);
        this.state = {library: null, isLoading: true, currentUser: null};
    }

    async componentDidMount() {
        const user = AuthService.getCurrentUser();
        console.log(user);
        this.setState({isLoading: true});
        await fetch(`/api/library/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => this.setState({library: data, isLoading: false, currentUser:user}));
    }

    render() {
        const {library, isLoading, user} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        if(library === null) {
            return (<div>
                <p>You have no library!</p>
            </div>);
        }

        console.log(library);
        if(library.shelfList === undefined) {
            return (<div>
                <p>You haven't added shelves yet!</p>
            </div>);
        }

        const userId = this.props.match.params.id;
        const shelvesList = library.shelfList.map(shelf => {
            return <tr key={library.id}>
                <td style={{whiteSpace: 'nowrap'}}><Link to={"/shelf/" + user.id + "/" + shelf.id}>{shelf.name}</Link></td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/shelves/" + shelf.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(shelf.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>

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
