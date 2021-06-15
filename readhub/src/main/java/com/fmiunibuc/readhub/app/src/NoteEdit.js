import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class NoteEdit extends Component {
    emptyItem = {
        name: ' '
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        /*if (this.props.match.params.id !== 'new') {
            const note = await (await fetch(`/api/note/${this.props.match.params.id}`)).json();
            this.setState({item: note});
        }*/
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log(item);
        await fetch(`/api/note/${this.props.match.params.id}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/myNotes/' + this.props.match.params.id);
    }
    render() {
        const {item} = this.state;
        const title = <h2>Add Note</h2>;

        return <div>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={item.title || ''}
                               onChange={this.handleChange} autoComplete="title"/>

                        <Label for="text">Content</Label>
                        <Input type="text" name="text" id="text" value={item.text || ''}
                               onChange={this.handleChange} autoComplete="text"/>

                        <Label for="pageNumber">Page Number</Label>
                        <Input type="text" name="pageNumber" id="pageNumber" value={item.pageNumber || ''}
                               onChange={this.handleChange} autoComplete="pageNumber"/>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="danger" tag={Link} to ={`/myNotes/${this.props.match.params.id}`}>Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }

}

export default NoteEdit;