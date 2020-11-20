import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

const navbar = props => (
    <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
            <Link to="/">Tracker</Link>
        </Nav>
    </Navbar>
)

export default navbar;