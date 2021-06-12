import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AuthService from "./services/auth.service";


class ShelfEdit extends Component {

    emptyItem = {
        name: ''
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
        if (this.props.match.params.id !== 'new') {
            const shelf = await (await fetch(`/api/shelf/${this.props.match.params.id}`)).json();
            this.setState({item: shelf});
        }
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
        const user = AuthService.getCurrentUser();
        await fetch('/api/shelf/' + user.id, {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        // await fetch('/api/shelf' + (item.id ? '/' + item.id : ''), {
        //     method: (item.id) ? 'PUT' : 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(item),
        // });
        this.props.history.push('/myLibrary/' + user.id);
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Shelf' : 'Add Shelf'}</h2>;
        const user = AuthService.getCurrentUser();
        console.log(user);
        return <div>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="hidden" name="id" id="id" value={user.id} />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to={"/myLibrary/" + user.id}>Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(ShelfEdit);
