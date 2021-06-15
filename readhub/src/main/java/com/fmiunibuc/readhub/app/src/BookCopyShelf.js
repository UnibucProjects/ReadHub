import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AuthService from './services/auth.service';
import ShelfEdit from './ShelfEdit';
import { Button } from 'reactstrap';
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
    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const user = AuthService.getCurrentUser();
    await fetch(`/api/myBookCopy/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => this.setState({shelves: [], item: data}));
    await fetch(`/api/myLibrary/${user.id}`)
      .then((response) => response.json())
      .then((data) => this.setState({shelves: data, chosenShelf: this.state.item.shelf}));

    //this.setState({shelves: [], item: item});
    /*await fetch('api/shelves')
      .then((response) => response.json())
      .then((data) => this.setState({ shelves: data, item: item}));*/
  }


  async handleSubmit(event) {
    event.preventDefault();
    const { shelves, item, chosenShelf } = this.state;

    await fetch('/api/moveBookToShelf/' + item.id + '/' + chosenShelf.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/myBookCopy/' + item.id);
  }

  render() {
    const title = <h3>Change the book shelf using the dropdown menu</h3>;
    const { shelves, item, chosenShelf } = this.state;
    const ShelfList = () => {return shelves.map((shelf) => {
       return <MenuItem value={shelf}>{shelf.name}</MenuItem>;
    })};

    const ChooseShelf = () => {
      const { shelves, item, chosenShelf } = this.state;
      //const [value, setValue] = React.useState(item.shelf.id);
      const handleChange = (event) => {
        event.preventDefault();
        this.setState({chosenShelf: event.target.value})
        console.log("cevaaa");
      }

      return (<div>
        {title}
        <FormControl>
          <InputLabel id="demo-simple-select-label">Shelf</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chosenShelf}
            onChange={handleChange}
          >
            <ShelfList/>

          </Select>
          <Button color={"primary"} onClick={this.handleSubmit}>Change shelf </Button>
        </FormControl>
      </div>);
    }
    return <ChooseShelf/>;
  }
}
export default withRouter(BookCopyShelf);
