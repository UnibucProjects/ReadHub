import React, { Component } from 'react';
import {
  Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/ReadHub-MDS/ReadHub" target="_blank">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
