import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Main from "./Main";
import Evaluator from "./Evaluator";
import Evaluator2 from "./Evaluator2";
import AssignTeams from "./AssignTeams";
import CreateForm from "./CreateForm";
import GetForms from "./GetForms";
import FillForm from "./FillForm";
import AssignRole from "./AssignRole";
import Viewscores from "./ViewScores";
import ViewDevconScores from "./ViewDevconScores";
import ViewNominations from "./ViewNominations";
import NominationDetail from "./NominationDetail";

function TranslatorApp() {
  return (
    <Router basename="/">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/options" component={Main} />
        <Route path="/create" component={CreateForm} />
        <Route path="/getforms" component={GetForms} />
        <Route path="/fillform" component={FillForm} />
        <Route
          path="/getnominationbygroup/:projectType/:username"
          component={NominationDetail}
        />
        <Route path="/assign" component={AssignRole} />
        <Route path="/show/:username" component={Home} />
        <Route path="/shownominations" component={ViewNominations} />
        <Route path="/viewscores" component={ViewDevconScores} />
        <Route path="/assignteams" component={AssignTeams} />
      </Switch>
    </Router>
  );
}

export default TranslatorApp;
