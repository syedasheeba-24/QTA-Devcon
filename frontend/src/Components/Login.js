import React, { Component, Switch } from "react";
import axios from "axios";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import Input from "terra-form-input";
import Button from "terra-button/lib/Button";
import { Helmet } from "react-helmet";
import Home from "./Home";
import Evaluator from "./Evaluator";
import Evaluator2 from "./Evaluator2";
import Main from "./Main";
import FillForm from "./FillForm";
import "./Login.css";

class LoginBox extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    const evaluatorToken = localStorage.getItem("evaluator");
    const userToken = localStorage.getItem("user");

    let loggedIn = true;
    let evaluatorLoggedIn = true;
    let userLoggedIn = true;
    if (token === null) {
      loggedIn = false;
    }

    if (evaluatorToken === null) {
      evaluatorLoggedIn = false;
    }
    if (userToken === null) {
      userLoggedIn = false;
    }
    this.state = {
      username: "",
      password: "",
      responseCode: -2,
      loggedIn,
      evaluatorLoggedIn,
      userLoggedIn
    };
  }
  onChange = event => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.username === "" || this.state.password === "") {
      alert("Please ensure both the fields are filled");
    } else {
      axios
        .get("/auth/" + this.state.username + "/" + this.state.password)
        .then(res => {
          if (res.data === 0) {
            localStorage.setItem("token", "admin token");
            this.setState({ loggedIn: true });
          } else if (res.data === 1 || res.data === 2 || res.data === 3) {
            localStorage.setItem("evaluator", "evaluator token");
            this.setState({ evaluatorLoggedIn: true });
          } else {
            localStorage.setItem("user", "user token");
            this.setState({ userLoggedIn: true });
          }
          this.setState({ responseCode: res.data });
        });
    }
  };

  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }

  render() {
    const { username, password } = this.state;
    if (this.state.responseCode === 0 || this.state.loggedIn === true) {
      return (
        <BrowserRouter>
          <Route path="/options" component={Main} />
          <Redirect to="/options" />
        </BrowserRouter>
      );
    } /* else if (this.state.evaluatorLoggedIn === true) {
       return (
         <Redirect
           to={{
             pathname: `/show/${this.state.username}`
           }}
         />
       );
     } */ else if (
      this.state.responseCode === 1 &&
      this.state.evaluatorLoggedIn === true
    )
      return (
        <BrowserRouter>
          <Route path="/showdevcon/:username" component={Evaluator} />
          <Redirect
            to={{
              pathname: `/showdevcon/${this.state.username}`
            }}
          />
        </BrowserRouter>
      );
    else if (
      this.state.responseCode === 2 &&
      this.state.evaluatorLoggedIn === true
    )
      return (
        <BrowserRouter>
          <Route path="/showquarter/:username" component={Evaluator2} />
          <Redirect
            to={{
              pathname: `/showquarter/${this.state.username}`
            }}
          />
        </BrowserRouter>
      );
    else if (
      this.state.responseCode === 3 &&
      this.state.evaluatorLoggedIn === true
    )
      return (
        <BrowserRouter>
          <Route path="/showquarter/:username" component={Evaluator2} />
          <Route path="/showdevcon/:username" component={Evaluator} />
          <Route path="/show/:username" component={Home} />

          <Redirect
            to={{
              pathname: `/show/${this.state.username}`
            }}
          />
        </BrowserRouter>
      );
    else {
      if (this.state.userLoggedIn === true) {
        return (
          <BrowserRouter>
            <Route path="/fillform" component={FillForm} />
            <Redirect to="/fillform" />
          </BrowserRouter>
        );
      } else {
        return (
          <div>
            <Helmet>
              <style>
                {
                  "body { background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE63ROROiAsNSrQsK0bJH1-SNEdL5oD2Fll54d0FPShOOovmLi&s); background-size:cover;background-position:center;}"
                }
              </style>
            </Helmet>

            <div id="login">
              {/*  <img
                src="https://www.cerner.com/nl/-/media/code-media-folder/apps/cardiac-risk/cardiac-risk-logo-header.png?vs=1&h=702&w=1250&la=en&hash=AD471149C6782F4FE7B79AC497F6E2B3E75F9544://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBYZbvOamYzZSVOfiIYoR7YCSWwWjk9Ctx44eQf1ZpwIzbm1O6"
                alt=""
                style={{
                  width: "50%",
                  height: "20%",
                  marginLeft: "60px"
                }}
              /> */}

              <form name="userRegistrationForm">
                <Input
                  name="username"
                  style={{
                    marginTop: "7px"
                  }}
                  value={username}
                  onChange={this.onChange}
                  required
                  placeholder="Associate ID"
                />
                <Input
                  name="password"
                  style={{
                    marginTop: "10px"
                  }}
                  type="password"
                  value={password}
                  onChange={this.onChange}
                  required
                  placeholder="Password"
                />
                <Button
                  onClick={this.onSubmit}
                  style={{
                    margin: "auto",
                    display: "block",
                    marginTop: "20px",
                    textAlign: "center"
                  }}
                  text="Submit"
                  variant="emphasis"
                />
              </form>
            </div>
          </div>
        );
      }
    }
  }
}
export default LoginBox;
