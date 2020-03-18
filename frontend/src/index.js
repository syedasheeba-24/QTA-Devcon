import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import TranslatorApp from "./Components/TranslatorApp";
import Login from "./Components/Login";
import { IntlProvider } from "react-intl";
import messages_de from "./translations/de.json";
import messages_en from "./translations/en.json";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/polyfill-locales";

const messages = {
  de: messages_de,
  en: messages_en
};
const language = navigator.language.split(/[-_]/)[0];

/*ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <TranslatorApp />
  </IntlProvider>,
  document.getElementById("root")
);*/
ReactDOM.render(<Login />, document.getElementById("root"));
serviceWorker.unregister();
