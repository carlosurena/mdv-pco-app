import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom' 

export class NavigationBar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">mdv</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="mr-auto">
            <div className="nav-link"><NavLink to="/">Dashboard</NavLink></div>
            <div className="nav-link"><NavLink to="/checkins">Check-ins</NavLink></div>
            <div className="nav-link"><NavLink to="/people">People</NavLink></div>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
          

        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavigationBar
