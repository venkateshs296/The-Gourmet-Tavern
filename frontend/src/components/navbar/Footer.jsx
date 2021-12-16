import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <>
        <div className="clear"></div>
        <div className="footer">
          <Navbar bg="light">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <p className="text-center">
                    Copyright &#169; 2021 The Gourmet Tavern
                  </p>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
    </>
  );
};

export default Footer;
