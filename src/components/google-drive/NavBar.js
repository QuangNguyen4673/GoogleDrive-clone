import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBarComponent() {
  return (
    <div className="my-navbar">
      <Navbar bg="light" expand="sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Q Drive
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link as={Link} to="/user">
                Profile
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarComponent;
