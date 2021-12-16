import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Header_NavBar } from "../../helpers_section/helperString";
import { logoutUser } from "../../store/actions/authActions";
import "../components.css";

const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const history = useHistory();

  const logOut_Procedure = () => {
    history.push("/");
    logoutUser(dispatch, user._id, token, history);
  };

  return (
    <>
      <div className="header">
        <Navbar bg="light">
          <Container>
            <Navbar.Brand href="/">
              <img src="symbol.png" height="40px" alt="GT" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">{Header_NavBar.HOME}</Nav.Link>
                <Nav.Link href="/about">{Header_NavBar.ABOUT}</Nav.Link>
                <NavDropdown title="Menu" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/foodMenu">
                    {Header_NavBar.FOOD}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/drinksMenu">
                    {Header_NavBar.DRINK}
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/contact">{Header_NavBar.CONTACT}</Nav.Link>
              </Nav>
              {(token && isAuthenticated) || isAuthenticated ? (
                <Nav>
                  {
                    <>
                      <Nav.Link href="/myCart">{Header_NavBar.CART}</Nav.Link>
                      <Nav.Link href="/myOrders">
                        {Header_NavBar.ORDER}
                      </Nav.Link>
                      <Nav.Link onClick={() => logOut_Procedure()}>
                        {Header_NavBar.LOGOUT}
                      </Nav.Link>
                    </>
                  }
                </Nav>
              ) : (
                <Nav>
                  <Nav.Link href="/register">{Header_NavBar.REGISTER}</Nav.Link>
                  <Nav.Link href="/login">{Header_NavBar.LOGIN}</Nav.Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default NavBar;
