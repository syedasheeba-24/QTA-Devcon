import React, { Component } from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import Login from "./Login";
import { Redirect, BrowserRouter, Route } from "react-router-dom";

class FillForm extends Component {
  _fields = [];
  counter = 0;
  name = "";
  constructor() {
    super();

    this.state = {
      form: {},

      idOfActivatedForm: "",
      parentFormName: "",
      listOfNominations: [],
      fieldsArray: [],
      projectType: "",
      teamName: "",
      categories: [],
      value: "",
      isFieldVisible: false,
    };
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  onChange = (event) => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this._fields[event.target.id] = event.target.value;
    this.setState(state);
    this.setState({ projectType: this.state.value });
    this.setState({ listOfNominations: this._fields });
  };

  handleSubmit = (event) => {
    var arr;
    event.preventDefault();
    axios.get("/get-activated-form/" + this.state.value).then((res) => {
      this.setState({ form: res.data });
      this.setState({ parentFormName: res.data.formName });
      this.setState({ idOfActivatedForm: res.data.id });
      arr = this.state.form.fields;
      arr = arr.filter((o) => o);
      this.setState({ fieldsArray: arr });
      this.setState({ isFieldVisible: true });
    });
  };

  logoutRoute = (event) => {
    //  event.preventDefault();
    localStorage.removeItem("user");
    this.props.history.push("/");
  };

  componentWillMount() {
    axios.get("/get-activated-categories").then((res) => {
      this.setState({ categories: res.data });
      this.setState({ value: this.state.categories[0] });
    });
  }
  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }

  onSubmit = (e) => {
    const {
      listOfNominations,
      projectType,
      idOfActivatedForm,
      parentFormName,
      teamName,
    } = this.state;
    e.preventDefault();
    if (this.state.listOfNominations.length === 0) {
      alert("Please ensure the fields are filled");
    } else {
      axios
        .post("/save-nomination", {
          listOfNominations,
          projectType,
          idOfActivatedForm,
          parentFormName,
          teamName,
        })
        .then((result) => {
          localStorage.removeItem("user");
          this.props.history.push("/");
        });
    }
  };

  render() {
    const { teamName } = this.state;
    if (this.state.isFieldVisible) {
      return (
        <BrowserRouter>
          <Route exact path="/" component={Login} />
          <div>
            <div>
              <div
                class="navbar-brand"
                style={{
                  backgroundColor: "#1890d8",
                  width: "100%",
                  position: "fixed",
                  zIndex: "1",
                }}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBYZbvOamYzZSVOfiIYoR7YCSWwWjk9Ctx44eQf1ZpwIzbm1O6"
                  alt=""
                  style={{
                    width: "8%",
                    height: "8%",
                  }}
                  class="img-fluid"
                />
                <a
                  href="valueOfLogout"
                  style={{
                    float: "right",
                    color: "white",
                    paddingTop: "14px",
                    paddingRight: "10px",
                  }}
                  onClick={this.logoutRoute.bind(this)}
                >
                  Logout
                </a>
              </div>
            </div>
            <div class="container">
              <div>
                <button
                  class="btn btn-primary"
                  value="/"
                  style={{ float: "right", marginRight: "10px" }}
                  onClick={this.logoutRoute.bind(this)}
                >
                  <FormattedMessage
                    id="logout"
                    defaultMessage="Logout"
                    description="Logout"
                  />
                </button>
              </div>

              <div class="panel-body" style={{ paddingTop: "80px" }}>
                <form classname="form-inline" onSubmit={this.handleSubmit}>
                  <label style={{ fontSize: "22px" }}>
                    Choose the project Category
                    <select
                      value={this.state.value}
                      onChange={this.handleChange}
                      style={{ marginLeft: 20 }}
                    >
                      {this.state.categories.map((c) => (
                        <option value={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    style={{ marginLeft: "10px", marginBottom: "10px" }}
                  >
                    Submit
                  </button>
                </form>
                <form onSubmit={this.onSubmit} autoComplete="off">
                  <div class="form-group">
                    <label>TeamName:</label>
                    <input
                      type="text"
                      class="form-control"
                      name="teamName"
                      value={teamName}
                      onChange={this.onChange}
                      placeholder="Team Name"
                    />
                  </div>

                  {this.state.fieldsArray.map((c, index) => (
                    <div class="form-group">
                      <label>{c.field}</label>
                      <input
                        type={c.fieldType}
                        class="form-control"
                        maxLength={c.fieldLength}
                        id={index}
                        onChange={this.onChange}
                        placeholder={c.field}
                      />
                    </div>
                  ))}

                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Route exact path="/" component={Login} />
          <div>
            <div>
              <div
                class="navbar-brand"
                style={{
                  backgroundColor: "#1890d8",
                  width: "100%",
                  position: "fixed",
                  zIndex: "1",
                }}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBYZbvOamYzZSVOfiIYoR7YCSWwWjk9Ctx44eQf1ZpwIzbm1O6"
                  alt=""
                  style={{
                    width: "8%",
                    height: "8%",
                  }}
                  class="img-fluid"
                />
                <a
                  href="valueOfLogout"
                  style={{
                    float: "right",
                    color: "white",
                    paddingTop: "14px",
                    paddingRight: "10px",
                  }}
                  onClick={this.logoutRoute.bind(this)}
                >
                  Logout
                </a>
              </div>
            </div>
            <div class="container" style={{ paddingTop: "80px" }}>
              <form classname="form-inline">
                <label style={{ fontSize: "22px" }}>
                  Choose the project Category
                  <select
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={{ marginLeft: 20 }}
                  >
                    {this.state.categories.map((c) => (
                      <option value={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <button
                  onClick={this.handleSubmit}
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                  class="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </BrowserRouter>
      );
    }
  }
}

export default FillForm;
