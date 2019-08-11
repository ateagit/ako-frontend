import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import image from './logo.svg';



class Header extends React.Component {
    
    render() {
        const header:any  = (
            <Navbar  expand="lg" bg="dark" variant="dark" style = {{zIndex: 5}}>
                {/* Logo for the website, outside NavBar.Collapse so wont be collapsed */}
                <Navbar.Brand href="/home">
                    <img
                        src = {image}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />  
                </Navbar.Brand>

                {/* Hamburger Button for smaller screens */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                {/* Navigation links that will be collapsed on smaller screens*/}
                <Navbar.Collapse>
                    {/* ml-auto is marginLeft: auto */}
                    <Nav className="ml-auto"> 
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );

        return header;
    }
}


export default Header;