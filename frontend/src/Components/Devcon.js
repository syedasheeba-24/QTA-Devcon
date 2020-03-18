import React, { Component } from "react";
import { Route, NavLink, Redirect, BrowserRouter } from "react-router-dom";
import AssignTeams from "./AssignTeams";
import AssignRoleDevcon from "./AssignRoleDevcon";
import ViewDevconScores from "./ViewDevconScores";
import "./index.css";

class Devcon extends Component {
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
              <NavLink to="/devcon">Assign Papers</NavLink>
            </li>
            <li>
              <NavLink to="/assignevaluators">Assign evaluators</NavLink>
            </li>
            <li>
              <NavLink to="/viewdevconscores">View Devcon Scores</NavLink>
            </li>
          </ul>
          <div className="subcontent">
            <Route path="/devcon" component={AssignTeams} />
            <Route path="/assignevaluators" component={AssignRoleDevcon} />
            <Route path="/viewdevconscores" component={ViewDevconScores} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Devcon;
