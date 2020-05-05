import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import TranslatorApp from "./Components/TranslatorApp";
import Login from "./Components/Login";
import Login2 from "./Components/Login2";
import { IntlProvider } from "react-intl";
import messages_de from "./translations/de.json";
import messages_en from "./translations/en.json";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/polyfill-locales";
import Home from "./Components/Home";
import Evaluator from "./Components/Evaluator";
import Evaluator2 from "./Components/Evaluator2";
import Main from "./Components/Main";
import FillForm from "./Components/FillForm";

const messages = {
  de: messages_de,
  en: messages_en,
};
const language = navigator.language.split(/[-_]/)[0];

/*ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <TranslatorApp />
  </IntlProvider>,
  document.getElementById("root")
);*/

ReactDOM.render(<Login2 />, document.getElementById("root"));
/*ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Login2} />
      <Route path="/options" component={Main} />
      <Route path="/showdevcon" component={Evaluator} />
      <Route path="/showquarter/:username" component={Evaluator2} />
      <Route path="/showdevcon/:username" component={Evaluator} />
      <Route path="/show/:username" component={Home} />
      <Route path="/fillform" component={FillForm} />
    </div>
  </Router>,
  document.getElementById("root")
);*/
serviceWorker.unregister();
