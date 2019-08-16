import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import image from './logo.png';



class Header extends React.Component {
    
    render() {
        const header:any  = (
            <Navbar style ={{
                background: "linear-gradient(90deg, rgb(253, 253, 255) 0%, rgb(204, 173, 173) 47%, rgb(255, 134, 134) 100%)", zIndex: 5}}  expand="lg" >
                {/* Logo for the website, outside NavBar.Collapse so wont be collapsed */}
                <Navbar.Brand href="/home">
                    <img
                        src = {image}
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
                        <Nav.Link href="/courses">Courses</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );

        return header;
    }
}


export default Header;