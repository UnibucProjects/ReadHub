import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input } from 'reactstrap';
import Rating from "@material-ui/lab/Rating";

class BookCopyRating extends Component {

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
            const bookCopy = await (await fetch(`/api/myBookCopy/${this.props.match.params.id}`)).json();
            this.setState({item: bookCopy});
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

        await fetch('/api/bookCopy/'+ item.id, {
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
        const title = <h2>Rate this book!</h2>;
        const labels = {0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5'};

        const RatingStars = () => {
            const {item} = this.state;
            const [value, setValue] = React.useState(item.rating);
            const [hover, setHover] = React.useState(-1);

            return (<div>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Rating name="rating_stars" defaultValue={value} size="large"
                                    onChange={(event, newValue) => {setValue(newValue); item.rating=labels[hover !== -1 ? hover : value]}}
                                    onChangeActive={(event, newHover) => {setHover(newHover);}}/>
                            {/*{value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}*/}
                            {labels[hover !== -1 ? hover : value]}
                            <Input type={"hidden"} name="rating" id="rating" value={item.rating}
                                   onChange={this.handleChange} autoComplete="rating"/>
                        </FormGroup>
                        <FormGroup>
                            <Button color={"success"} id={"rating_button"} type={"submit"}>
                                Save rating
                            </Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>)
        }

        return <RatingStars/>;
    }
}

export default withRouter(BookCopyRating);