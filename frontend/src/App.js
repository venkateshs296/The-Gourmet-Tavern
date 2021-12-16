import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/main/Home";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/navbar/Footer";
import About from "./components/main/About";
import Contact from "./components/main/Contact";
import Menu from "./components/menu/common/Menu";
import MyOrdersPage from "./components/orders/MyOrdersPage";
import MyCartPage from "./components/cart/MyCartPage";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <LogIn />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route exact path="/foodMenu">
              <Menu type={"food"} />
            </Route>
            <Route exact path="/drinksMenu">
              <Menu type={"drink"} />
            </Route>
            <Route exact path="/myOrders">
              <MyOrdersPage />
            </Route>
            <Route exact path="/myCart">
              <MyCartPage />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
