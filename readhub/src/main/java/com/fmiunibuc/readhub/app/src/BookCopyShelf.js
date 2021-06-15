import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AuthService from './services/auth.service';
import { Button, Form } from 'reactstrap';
import { FormGroup } from '@material-ui/core';
class BookCopyShelf extends Component {

  emptyItem = {
    name: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      shelves: [],
      item: this.emptyItem,
      chosenShelf: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const user = AuthService.getCurrentUser();
    await fetch(`/api/myBookCopy/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => this.setState({shelves: [], item: data}));
    await fetch(`/api/myLibrary/${user.id}`)
      .then((response) => response.json())
      .then((data) => this.setState({shelves: data, chosenShelf: this.state.item.shelf.id}));

  }


  async handleSubmit(event) {
    event.preventDefault();
    const { shelves, item, chosenShelf } = this.state;

    await fetch('/api/moveBookToShelf/' + item.id + '/' + chosenShelf.props.value, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/myBookCopy/' + item.id);
  }

  handleChange (event, value) {
    event.preventDefault();
    console.log(this);
    this.state.chosenShelf = value;
  }

  render() {
    const title = <h3>Change the book shelf using the dropdown menu</h3>;
    const { shelves, item, chosenShelf } = this.state;

    const ChooseShelf = () => {
      const { shelves, item, chosenShelf } = this.state;


      return (<div>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
          <InputLabel id="demo-simple-select-label">Shelf</InputLabel>
            <Select
              value={chosenShelf.id}
              onChange={this.handleChange}
            >
              {shelves.map((shelf) => {
                return <MenuItem key={shelf.id} value={shelf.id}>{shelf.name}</MenuItem>;
              })}
            </Select>
          </FormGroup>

          <FormGroup>
          <Button color={"primary"} type={"submit"}>Change shelf </Button>
        </FormGroup>
        </Form>
      </div>);
    }
    return <ChooseShelf/>;
  }
}
export default withRouter(BookCopyShelf);
