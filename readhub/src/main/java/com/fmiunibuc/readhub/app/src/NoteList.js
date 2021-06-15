import React, { Component } from 'react';
import {
    Button, ButtonGroup, Container, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthService from './services/auth.service';

class NoteList extends Component {

    constructor(props) {
        super(props);
        this.state = {notes: null, isLoading: true };
        //this.remove = this.remove.bind(this);
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        await fetch(`/api/myNotes/${this.props.match.params.id}`)
            .then((response) => response.json())
            .then((data) => this.setState({ notes: data, isLoading: false }));
    }

    render() {
        const { notes, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        console.log(notes)
        const noteList = notes.map((note) => (
            <div key={note.id}>
                <br/>
                <h4>{note.title}</h4>
                <br/>
                <p><i>{note.text}</i></p>
                <p><small>On page {note.pageNumber}</small></p>
                <br/>
                <div>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={`/notes/${this.props.match.params.id}/${note.id}`}>Edit</Button>
                    </ButtonGroup>
                </div>
            </div>
        ));
        return (
            <div>
                <div className="float-right">
                <Button color="success" tag={Link} to={`/notes/${this.props.match.params.id}`} >Add note</Button>
                </div>
                <h3>Notes</h3>
                <div>
                {noteList}
                </div>
            </div>
        );    }

}

export default NoteList;