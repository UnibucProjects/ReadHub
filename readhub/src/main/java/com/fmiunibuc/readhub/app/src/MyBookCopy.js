// import React, { Component } from 'react';
// import { Button, ButtonGroup, Container, Table } from 'reactstrap';
// import AppNavbar from './AppNavbar';
// import { Link } from 'react-router-dom';
// import AuthService from "./services/auth.service";
//
// class MyBookCopy extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {bookCopy: undefined, isLoading: true};
//     }
//
//     componentDidMount() {
//         this.setState({isLoading: true});
//
//         fetch('api/myBookCopy/' + this.props.match.params.id)
//             .then(response => response.json())
//             .then(data => this.setState({bookCopy: data, isLoading: false}));
//     }
//
//     render() {
//         const {bookCopy, isLoading} = this.state;
//         const user = AuthService.getCurrentUser();
//
//         if (isLoading) {
//             return <p>Loading...</p>;
//         }
//
//         if(bookCopy.get().shelf.library.owner.id !== user.get().id) {
//             return (<div>
//                 <p>You are not allowed to see this page!</p>
//             </div>)
//         }
//
//         const myBookCopy = ( <tr key={book.id}>
//                 <td style={{whiteSpace: 'nowrap'}}>{bookCopy.bookType.name}</td>
//                 <td>{bookCopy.bookType.author}</td>
//                 <td>{bookCopy.bookType.pages}</td>
//                 <td>{bookCopy.status}</td>
//                 <td>{bookCopy.pagesRead}</td>
//                 <td>{bookCopy.rating}</td>
//                 <td>
//                     <ButtonGroup>
//                         <Button size="sm" color="orange" tag={Link} to={"/bookCopy/editStatus/" + bookCopy.id}>Edit status</Button>
//                         <Button size="sm" color="primary" tag={Link} to={"/books/" + book.id}>Edit</Button>
//                         <Button size="sm" color="danger" onClick={() => this.remove(book.id)}>Delete</Button>
//                     </ButtonGroup>
//                 </td>
//             </tr>
//         );
//
//         return (
//             <div>
//                 <Container fluid>
//                     <Table className="mt-4">
//                         <thead>
//                         <tr>
//                             <th width="20%">Name</th>
//                             <th width="20%">Author</th>
//                             <th width="20%">Pages</th>
//                             <th width="20%">Status</th>
//                             <th width="20%">Pages read</th>
//                             <th width="20%">Rating</th>
//                             <th width="10%">Actions</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {myBookCopy}
//                         </tbody>
//                     </Table>
//                 </Container>
//             </div>
//         );
//     }
// }
//
// export default MyBookCopy;
