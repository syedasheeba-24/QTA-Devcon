import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Button from "terra-button/lib/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Assign extends Component {
  constructor() {
    super();
    const token = localStorage.getItem("token");
    let loggenIn = true;
    if (token === null) {
      loggenIn = false;
    }

    this.state = {
      loggenIn,
      role: "admin",
      username: "",
      associateName: ""
    };
  }

  usernameChange = event => {
    this.setState({ username: event.target.value });
  };

  associateNameChange = event => {
    this.setState({ associateName: event.target.value });
  };

  handleDropdownChange = event => {
    this.setState({ role: event.target.value });
  };

  notify = () =>
    toast.success("Assigned Succesfully!!", {
      position: toast.POSITION.TOP_CENTER
    });

  onSubmit = e => {
    const username = this.state.username;
    const role = this.state.role;
    const event = "quarter";
    const associateName = this.state.associateName;

    e.preventDefault();
    if (username === "" || associateName === "") {
      alert("Please enter associate ID and name");
    } else if (username.length < 8) {
      alert("Please enter valid associate ID");
    } else {
      axios
        .post("/register", { username, role, event, associateName })
        .then(
          this.notify(),
          this.setState({ username: "" }),
          this.setState({ associateName: "" })
        );
    }
  };

  render() {
    if (this.state.loggenIn === false) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <ToastContainer autoClose={3000} />

        <div class="container" style={{ paddingTop: "125px" }}>
          <form onSubmit={this.onSubmit}>
            <div class="form-group">
              <label class="label">Associate ID*</label>
              <input
                type="text"
                class="form-control"
                name="username"
                maxLength="8"
                style={{ width: "20%" }}
                onChange={this.usernameChange}
                value={this.state.username}
                placeholder="Enter the Associate ID"
                required
              />
            </div>
            <div class="form-group">
              <label class="label">Associate Name*</label>
              <input
                type="text"
                class="form-control"
                name="associateName"
                maxLength="8"
                style={{ width: "30%" }}
                onChange={this.associateNameChange}
                value={this.state.associateName}
                placeholder="Enter the Associate Name"
                required
              />
            </div>
            <label class="form-group">
              Select the role *
              <select
                name="role"
                style={{
                  padding: "12px",
                  margin: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box"
                }}
                onChange={this.handleDropdownChange}
              >
                <option value="admin">Admin</option>
                <option value="evaluator">Evaluator</option>
              </select>
            </label>
            <div class="form-group">
              <Button
                onClick={this.onSubmit}
                text="Submit"
                variant="emphasis"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Assign;
