import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Login2 from "./Login2";
import { Route, Redirect, BrowserRouter } from "react-router-dom";

class Show extends Component {
  _arrOfScores = [];
  _listOfComments = [];
  _totalWeightage = [];
  constructor(props) {
    super(props);

    this.state = {
      listOfScore: [],
      index: "",
      arrOfScores: [],
      headerValue: "",
      comments: [],
      criteria: ["Presentation Skills", "Demo", "Reusability"],
      weightage: ["50", "30", "20"],
      score: [],
      finalWeightedScore: [],
      totalWeightage: "0",
      listOfPapers: [],
      paperName: "",
      username: "",
    };
  }

  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
    axios.get("/getUsername").then((res) => {
      this.setState({ username: res.data });
      axios.get("/getPapers/" + this.state.username).then((res) => {
        this.setState({ listOfPapers: res.data });
        this.setState({ paperName: this.state.listOfPapers[0] });
      });
    });
  }

  handleDropdownChange = (event) => {
    let _score = [];
    let _comments = [];
    let _weightage = [];
    this.setState({ paperName: event.target.value });
    this.setState({ score: _score });
    this.setState({ comments: _comments });
    this.setState({ totalWeightage: _weightage });
  };

  handleSubmit = (event) => {
    let _score = [];
    let _comments = [];
    let _weightage = [];
    let paperName = this.state.paperName;
    //let evaluatorName = this.props.match.params.username;
    let evaluatorName = this.state.username;
    let criteria = this.state.criteria;
    let weightage = this.state.weightage;
    let score = this.state.score;
    let comments = this.state.comments;
    let totalWeightage = this.state.totalWeightage;
    let finalWeightedScore = "";
    let sum = 0;
    this.state.score.map(
      (c, index) => (sum = sum + c * (weightage[index] / 100))
    );
    finalWeightedScore = sum;
    axios
      .post("/addDevconScore", {
        paperName,
        evaluatorName,
        criteria,
        weightage,
        score,
        comments,
        finalWeightedScore,
        totalWeightage,
      })
      .then((result) => {
        this.setState({ score: _score });
        this.setState({ comments: _comments });
        this.setState({ totalWeightage: _weightage });
      });
  };

  logoutRoute = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };

  scoreChange = (event, index) => {
    if (event.target.value <= 10 && event.target.value > 0) {
      this._arrOfScores[index] = event.target.value;
      this._totalWeightage[index] =
        event.target.value * (this.state.weightage[index] / 100);
      this.setState({ score: this._arrOfScores });
      this.setState({ totalWeightage: this._totalWeightage });
    } else {
      this._arrOfScores[index] = 0;
      this.setState({ score: this._arrOfScores });
    }
  };

  commentChange = (event, index) => {
    this._listOfComments[index] = event.target.value;
    this.setState({ comments: this._listOfComments });
  };

  render() {
    if (this.state.listOfPapers[0] !== "") {
      return (
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
                Logout
              </button>
            </div>

            <div class="panel-body" style={{ paddingTop: "80px" }}>
              <form classname="form-inline" onSubmit={this.handleSubmit}>
                <label style={{ fontSize: "22px" }}>
                  Choose the team
                  <select
                    onChange={this.handleDropdownChange}
                    style={{ marginLeft: 20 }}
                  >
                    {this.state.listOfPapers.map((c) => (
                      <option>{c}</option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{ marginLeft: "10px", marginBottom: "10px" }}
                >
                  Submit Score
                </button>
              </form>
              <div style={{ textAlign: "center" }}>
                <table class="table table-bordered">
                  <thead style={{ backgroundColor: "#e1e6e8" }}>
                    <tr>
                      <th>Evaluation Criteria</th>
                      <th>Weightage(%)</th>
                      <th>Score(1-10)</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.criteria.map((c, index) => (
                      <tr>
                        <td>{c}</td>
                        <td>{this.state.weightage[index]}</td>
                        <td>
                          <input
                            type="number"
                            maxLength="2"
                            min="1"
                            max="10"
                            value={this.state.score[index]}
                            onChange={(event) => this.scoreChange(event, index)}
                          />
                        </td>
                        <td>
                          <textarea
                            style={{ width: "100%" }}
                            name="comments"
                            onChange={(event) =>
                              this.commentChange(event, index)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    } else
      return (
        <BrowserRouter>
          <Route exact path="/" component={Login2} />
          <div>
            <h2
              style={{
                textAlign: "center",
                marginRight: "10px",
                paddingTop: "10px",
              }}
            >
              Sorry,you've no paper assigned to you!
            </h2>
            <a
              href="/"
              style={{
                textAlign: "center",
                marginRight: "50%",
                marginLeft: "50%",
                fontSize: "25px",
              }}
              onClick={this.logoutRoute.bind(this)}
            >
              Logout
            </a>
          </div>
        </BrowserRouter>
      );
  }
}

export default Show;
