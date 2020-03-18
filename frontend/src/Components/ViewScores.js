import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Score extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggenIn = true;
    if (token === null) {
      loggenIn = false;
    }
    this.state = {
      loggenIn,
      form: {},
      listOfEvaluations: [],
      projectType: "",
      teamName: "",
      categories: [],
      nominations: [],
      listOfScore: [],
      avgScore: [],
      headerValue: "",
      count: 0
    };
  }
  componentWillMount() {
    let _idOfFormActivated = "";
    axios.get("/get-activated-categories").then(res => {
      this.setState({ categories: res.data });
      axios
        .get("/get-activated-form/" + this.state.categories[0])
        .then(result => {
          this.setState({ form: result.data });
          _idOfFormActivated = this.state.form.id;
          axios
            .get("/get-nomination-by-group/" + _idOfFormActivated)
            .then(result3 => {
              this.setState({ nominations: result3.data });
              axios
                .get("/get-evaluations/" + this.state.categories[0])
                .then(result4 => {
                  this.setState({
                    listOfEvaluations: result4.data
                  });
                  this.setState({ headerValue: this.state.categories[0] });
                });
            });
        });
    });
  }

  route = event => {
    let _headerValue = event.target.text;
    let _idOfFormActivated = "";
    event.preventDefault();
    axios.get("/get-activated-form/" + _headerValue).then(res => {
      this.setState({ form: res.data });
      _idOfFormActivated = this.state.form.id;
      axios.get("/get-nomination-by-group/" + _idOfFormActivated).then(res => {
        this.setState({ headerValue: _headerValue });
        this.setState({ nominations: res.data });
      });
    });
  };

  render() {
    if (this.state.loggenIn === false) {
      return <Redirect to="/" />;
    }
    if (this.state.nominations.length !== 0) {
      return (
        <div>
          <div
            class="sidenav"
            style={{
              height: "100%",
              width: "160px",
              marginTop: "125px",
              position: "fixed",
              zIndex: "1",
              backgroundColor: "#f4f5f7",
              paddingTop: "20px"
            }}
          >
            {this.state.categories.map(c => (
              <a
                href={c}
                style={{
                  padding: "6px 8px 6px 26px",
                  textDecoration: "none",
                  fontSize: "20px",
                  display: "block"
                }}
                onClick={this.route.bind(this)}
                tabIndex="1"
              >
                {c}
              </a>
            ))}
          </div>

          <div
            class="main"
            style={{
              marginLeft: "160px",
              padding: "0px 10px",
              paddingTop: "125px",
              overflow: "auto",
              textAlign: "center"
            }}
          >
            <h3>List of nominations for {this.state.headerValue}</h3>

            <div>
              <table class="table table-bordered">
                <thead style={{ backgroundColor: "#e1e6e8" }}>
                  <tr>
                    <th>TeamName</th>
                    <th style={{ textAlign: "center" }}>Evaluation Details</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.nominations.map((c, index) => (
                    <tr>
                      <td>{c.teamName}</td>
                      <td>
                        <table class="table table-bordered">
                          <thead style={{ backgroundColor: "#e1e6e8" }}>
                            <tr>
                              <th>Score</th>
                              <th>Comment </th>
                              <th>Evaluated By </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.listOfEvaluations.map(cc => (
                              <tr>
                                <td>
                                  <input
                                    size="2"
                                    style={{
                                      paddingLeft: "10px",
                                      borderRadius: "4px"
                                    }}
                                    type="text"
                                    value={cc.listOfScore[index].score}
                                    disabled
                                  />
                                </td>

                                <td>
                                  <textarea
                                    style={{
                                      //resize: "none",
                                      paddingLeft: "10px",

                                      borderRadius: "4px",
                                      backgroundColor: "#f4f5f7"
                                    }}
                                    value={cc.listOfScore[index].comment}
                                    name="comments"
                                    disabled
                                  />
                                </td>

                                <td>
                                  <input
                                    style={{
                                      paddingLeft: "10px",
                                      borderRadius: "4px"
                                    }}
                                    type="text"
                                    value={cc.nameOfEvaluator}
                                    disabled
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div
            class="sidenav"
            style={{
              height: "100%",
              width: "160px",
              marginTop: "125px",
              position: "fixed",
              zIndex: "1",
              backgroundColor: "#f4f5f7",
              paddingTop: "20px"
            }}
          >
            {this.state.categories.map(c => (
              <a
                href={c}
                style={{
                  padding: "6px 8px 6px 26px",
                  textDecoration: "none",
                  fontSize: "20px",
                  display: "block"
                }}
                onClick={this.route.bind(this)}
                tabIndex="1"
              >
                {c}
              </a>
            ))}
          </div>

          <div
            class="main"
            style={{
              marginLeft: "160px",
              padding: "0px 10px",
              paddingTop: "125px",
              overflow: "auto",
              textAlign: "center"
            }}
          >
            <h3>No nominations found for {this.state.headerValue}</h3>
          </div>
        </div>
      );
    }
  }
}

export default Score;
