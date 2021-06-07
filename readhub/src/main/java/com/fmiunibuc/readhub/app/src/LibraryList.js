import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
class LibraryList extends Component {

    constructor(props) {
        super(props);
        this.state = {libraries: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/libraries')
            .then(response => response.json())
            .then(data => this.setState({libraries: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/library/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedLibraries = [...this.state.libraries].filter(i => i.id !== id);
            this.setState({libraries: updatedLibraries});
        });
    }

    render() {
        const {libraries, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const libraryList = libraries.map(library => {
            const ownerName = `${"Owner name" || ''}`;
            return <tr key={library.id}>
                <td style={{whiteSpace: 'nowrap'}}>{library.name}</td>
                <td>{ownerName}</td>
                <td>{library.shelfList.map(shelf => {
                    return <div key={shelf.id}>{shelf.name}</div>
                })}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/libraries/" + library.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(library.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/libraries/new">Add Library</Button>
                    </div>
                    <h3>My libraries</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="20%">Owner</th>
                            <th>Shelves</th>
                            <th width="10%">Actions</th>
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
