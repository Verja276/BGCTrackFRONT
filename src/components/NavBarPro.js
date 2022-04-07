import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import photo from "../BGCLogo-_Hex_004B91.svg";
export default function () {
    function handleCleanStorage() {
        localStorage.setItem("barcode", "")
    }

    return (
        (sessionStorage.getItem("user_status") == "a") ? (
            <Container>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand onClick={handleCleanStorage} href="/">{<div> <img src={photo} height="45" width="45" alt="LOGO" /> </div>}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>


                            <NavDropdown title="Other" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={handleCleanStorage} href="/yourequip">Your Equipment</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleCleanStorage} href="/SearchEquip">Search Equipment</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleCleanStorage} href="/SearchUser">Search Users</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleCleanStorage} href="/BarcodeScan">Add Equipment</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleCleanStorage} href="/Signup">Add User</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleCleanStorage} href="/RequestEquip">Request Equipment</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleCleanStorage} href="/manageRequests">Check Out</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleCleanStorage} href="/CheckIn">Check In</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
            </Container>

        ) : ((sessionStorage.getItem("user_status") == "e") ? (
            <Container>
                <Navbar bg="light" expand="lg">

                    <Navbar.Brand onClick={handleCleanStorage} href="/">{<div> <img src={photo} height="45" width="45" alt="LOGO" /> </div>}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>

                            <NavDropdown title="Other" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={handleCleanStorage} href="/yourequip">Your Equipment</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleCleanStorage} href="/SearchEquip">Search Equipment</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleCleanStorage} href="/BarcodeScan">Add Equipment</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleCleanStorage} href="/RequestEquip">Request Equipment</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleCleanStorage} href="/manageRequests">Check Out</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleCleanStorage} href="/CheckIn">Check In</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>


            </Container>

        ) : (
            <Container>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand onClick={handleCleanStorage} href="/">{<div> <img src={photo} height="45" width="45" alt="LOGO" /> </div>}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>


                            <NavDropdown title="Other" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={handleCleanStorage} href="/yourequip">Your Equipment</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleCleanStorage} href="/SearchEquip">Search Equipment</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleCleanStorage} href="/RequestEquip">Request Equipment</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
            </Container>
        ))
    );


}
