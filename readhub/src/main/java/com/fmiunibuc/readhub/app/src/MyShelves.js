import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import {Link, withRouter} from 'react-router-dom';

class MyShelves extends Component {

    constructor(props) {
        super(props);
        this.state = {shelves: null, isLoading: true};
    }

    async componentDidMount() {
        this.setState({isLoading: true});
        await fetch('api/myShelves/' + this.props.match.params.id[0] + "/" + this.props.match.params[2])
            .then(response => response.json())
            .then(data => this.setState({shelves: data, isLoading: false}));
    }

    render() {
        const {shelves, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        if(shelves === null) {
            return (<div>
                <p>You have no  shelves!</p>
            </div>);
        }

        const userId = this.props.match.params.id[0];
        const bookId = this.props.match.params.id[1];
        const myShelves = shelves.map(shelf => {
            return <tr key={shelf.id}>
                <td style={{whiteSpace: 'nowrap'}}><Link to={"/shelf/" + userId + "/" + shelf.id}>{shelf.name}</Link></td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="orange" tag={Link} to={"/addBookToShelf/" + shelf.id + "/" + bookId + "/" + userId}>Add to this shelf</Button>
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
                        {myShelves}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default MyShelves;
