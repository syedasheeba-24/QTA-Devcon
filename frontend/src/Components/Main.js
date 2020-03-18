import React, { Component } from "react";
import { Route, NavLink, Redirect, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Admin2 from "./Admin2";
import Devcon from "./Devcon";
import "./index.css";

class Main extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggenIn = true;
    if (token === null) {
      loggenIn = false;
    }
    this.state = {
      loggenIn
    };
  }
  logoutRoute = event => {
    localStorage.removeItem("token");
  };
  render() {
    if (this.state.loggenIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <BrowserRouter>
        <div>
          <ul
            className="header"
            style={{ position: "fixed", width: "100%", zIndex: "3" }}
          >
            <li>
              <NavLink to="/options">Quarter Awards</NavLink>
            </li>
            <li>
              <NavLink to="/devcon">Devcon</NavLink>
            </li>
            <li>
              <a
                href="/"
                style={{
                  float: "right",
                  color: "white"
                }}
                onClick={this.logoutRoute.bind(this)}
              >
                Logout
              </a>
            </li>
          </ul>
          <div className="content">
            <Route path="/options" component={Admin2} />
            <Route path="/devcon" component={Devcon} />
            <Route exact path="/" component={Login} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default Main;
