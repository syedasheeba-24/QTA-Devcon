import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Route, NavLink, Redirect, BrowserRouter } from "react-router-dom";
import CreateForm from "./CreateForm";
import GetForms from "./GetForms";
import AssignRole from "./AssignRole";
import Viewscores from "./ViewScores";
import ViewNominations from "./ViewNominations";
import "./Admin.css";
import "./index.css";

class Options extends Component {
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
  route = event => {
    event.preventDefault();
    let path = event.target.value;
    this.props.history.push(path);
  };
  logoutRoute = event => {
    event.preventDefault();
    localStorage.removeItem("token");
    this.props.history.push("/");
  };
  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }
  render() {
    if (this.state.loggenIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <BrowserRouter>
        <div>
          <ul
            className="subheader"
            style={{
              position: "fixed",
              width: "100%",
              zIndex: "2",
              paddingTop: "60px"
            }}
          >
            <li>
              <NavLink to="/options">Create Form</NavLink>
            </li>
            <li>
              <NavLink to="/getforms">View Forms</NavLink>
            </li>
            <li>
              <NavLink to="/shownominations">Show Nominations</NavLink>
            </li>
            <li>
              <NavLink to="/assign">Assign roles</NavLink>
            </li>
            <li>
              <NavLink to="/viewscores">Show scores</NavLink>
            </li>
          </ul>
          <div className="subcontent">
            <Route path="/options" component={CreateForm} />
            <Route path="/getforms" component={GetForms} />
            <Route path="/shownominations" component={ViewNominations} />
            <Route path="/assign" component={AssignRole} />
            <Route path="/viewscores" component={Viewscores} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default Options;
