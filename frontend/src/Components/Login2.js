import React, { Component, Switch } from "react";
import axios from "axios";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Evaluator from "./Evaluator";
import Evaluator2 from "./Evaluator2";
import Login from "./Login";
import Login2 from "./Login2";
import Main from "./Main";
import FillForm from "./FillForm";
import "./Login.css";

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      responseCode: -2,
    };
  }
  componentWillMount() {
    axios.get("/getUsername").then((res) => {
      this.setState({ username: res.data });
      axios.get("/auth").then((res2) => {
        this.setState({ responseCode: res2.data });
      });
    });
  }
  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }

  render() {
    if (this.state.responseCode === 0) {
      return (
        <BrowserRouter>
          <Route path="/options" component={Main} />
          <Redirect to="/options" />
        </BrowserRouter>
      );
    } else if (this.state.responseCode === 1)
      return (
        <BrowserRouter>
          <Route path="/showdevcon" component={Evaluator} />
          <Redirect to="/showdevcon" />
        </BrowserRouter>
      );
    else if (this.state.responseCode === 2)
      return (
        <BrowserRouter>
          <Route path="/showquarter/:username" component={Evaluator2} />

          <Redirect
            to={{
              pathname: `/showquarter/${this.state.username}`,
            }}
          />
        </BrowserRouter>
      );
    else if (this.state.responseCode === 3)
      return (
        <BrowserRouter>
          <Route path="/showquarter/:username" component={Evaluator2} />
          <Route path="/showdevcon/:username" component={Evaluator} />
          <Route path="/show/:username" component={Home} />

          <Redirect
            to={{
              pathname: `/show/${this.state.username}`,
            }}
          />
        </BrowserRouter>
      );
    else if (this.state.responseCode === 3)
      return (
        <BrowserRouter>
          <Route exact path="/" component={Login2} />
          <Route path="/fillform" component={FillForm} />
          <Redirect to="/fillform" />
        </BrowserRouter>
      );
    else {
      return (
        <div>
          <p>Welcome!!</p>
        </div>
      );
    }
  }
}

export default LoginBox;
