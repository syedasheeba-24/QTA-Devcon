import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Modal from "./Modal/Modal";

class Show extends Component {
  fields = [];
  _arrOfScores = [];
  _listOfComments = [];
  constructor(props) {
    super(props);
    const token = localStorage.getItem("evaluator");
    let loggenIn = true;
    if (token === null) {
      loggenIn = false;
    }
    this.state = {
      loggenIn,
      form: {},
      isShowing: false,
      fieldsArray: [],
      projectType: "",
      username: "",
      teamName: "",
      score: "",
      charCount: [],
      categories: [],
      nomination: {},
      nominations: [],
      fieldData: [],
      listOfScore: [],
      listOfPositions: [],
      index: "",
      arrOfScores: [],
      headerValue: "",
      comment: []
    };
  }
  componentWillMount() {
    let _idOfFormActivated = "";
    axios.get("/get-activated-categories").then(res => {
      this.setState({ username: this.props.match.params.username });
      this.setState({ categories: res.data });
      axios.get("/get-activated-form/" + this.state.categories[0]).then(res => {
        this.setState({ form: res.data });
        _idOfFormActivated = this.state.form.id;
        axios
          .get("/get-nomination-by-group/" + _idOfFormActivated)
          .then(res => {
            this.setState({
              username: this.props.match.params.username
            });
            this.setState({ headerValue: this.state.categories[0] });
            this.setState({ nominations: res.data });
            // this.state.nominations.map(c =>
            //  this.setState({ fieldData: c.listOfNominations })
            //);
          });
      });
    });
  }
  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }
  openModalHandler = (_id, _index) => {
    var arrToRemoveNullFields = [];
    var modifiedArray = [];
    var listOfPositions = [];
    var arrMandatoryData = [];
    var modifiedNominationArray = [];
    this.setState({ isShowing: true });
    this.setState({ index: _index });
    axios.get("/get-activated-form/" + this.state.headerValue).then(res => {
      axios.get("/get-ids/" + this.state.headerValue).then(result => {
        listOfPositions = result.data;
        this.setState({ form: res.data });
        arrToRemoveNullFields = this.state.form.fields;
        arrToRemoveNullFields = arrToRemoveNullFields.filter(o => o);
        listOfPositions.map(c => modifiedArray.push(arrToRemoveNullFields[c]));
        this.setState({ listOfPositions: result.data });
        this.setState({ fieldsArray: modifiedArray });

        axios.get("/get-nomination/" + _id).then(result2 => {
          this.setState({ nomination: result2.data });
          this.setState({ projectType: this.state.nomination.projectType });
          this.setState({ teamName: this.state.nomination.teamName });
          arrMandatoryData = this.state.nomination.listOfNominations;
          listOfPositions.map(c =>
            modifiedNominationArray.push(arrMandatoryData[c])
          );
          this.setState({ fieldData: modifiedNominationArray });
        });
      });
    });
  };

  closeModalHandler = () => {
    this.setState({ isShowing: false });
  };

  submitScore = teamName => {
    let tempArray = this.state.listOfScore.slice();
    if (this.state.score === "") {
      alert("Please enter the score");
    } else if (this.state.score > 10 || this.state.score < 0) {
      alert("Please enter score between 1 and 10");
    } else {
      let score = this.state.score;
      //tempArray[this.state.index] = { score, teamName };
      this._arrOfScores[this.state.index] = this.state.score;
      let comment = this._listOfComments[this.state.index];
      tempArray[this.state.index] = { score, teamName, comment };
      this.setState({ arrOfScores: this._arrOfScores });
      this.setState({ listOfScore: tempArray });
      this.setState({ isShowing: false });
    }
  };

  handleSubmit = event => {
    const { listOfScore } = this.state;
    let nameOfEvaluator = this.state.username;
    event.preventDefault();
    if (
      this.state.listOfScore.length !== this.state.nominations.length ||
      this.state.comment.length !== this.state.nominations.length
    )
      alert(
        "Please ensure the score and comments are filled for all the teams"
      );
    else {
      axios
        .post("/savescore", { nameOfEvaluator, listOfScore })
        .then(result => {
          localStorage.removeItem("evaluator");
          this.props.history.push("/");
        });
    }
  };

  onChange = event => {
    this.setState({ score: event.target.value });
  };
  handleTextAreaChange = (event, index, teamName) => {
    let arrOfCount = [];
    let tempArray = this.state.listOfScore.slice();
    // let finalScoreArray=this.state.comment.slice();
    let score = this.state.arrOfScores[index];
    this._listOfComments[index] = event.target.value;
    let comment = this._listOfComments[index];
    tempArray[index] = { score, teamName, comment };
    let count = 100 - event.target.value.length;
    arrOfCount[index] = count;
    this.setState({ charCount: arrOfCount });
    this.setState({ comment: this._listOfComments });
    this.setState({ listOfScore: tempArray });
  };

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
  logoutRoute = event => {
    event.preventDefault();
    localStorage.removeItem("evaluator");
    this.props.history.push("/");
  };

  render() {
    // if (this.state.loggenIn === false) {
    // return <Redirect to="/" />;
    //}
    if (this.state.nominations.length !== 0) {
      return (
        <div>
          {this.state.isShowing ? (
            <div className="back-drop" style={{ textAlign: "center" }}>
              <Modal
                className="modal"
                show={this.state.isShowing}
                close={this.closeModalHandler}
                submit={() => this.submitScore(this.state.teamName)}
              >
                <div>
                  <dl>
                    <dt>Project Type</dt>
                    <dd>{this.state.projectType}</dd>
                    <dt>Team Name:</dt>
                    <dd>{this.state.teamName}</dd>

                    {this.state.fieldsArray.map((c, index) => (
                      <div>
                        <dt>{c.field}:</dt>
                        <dd>{this.state.fieldData[index]}</dd>
                      </div>
                    ))}
                    <dt> Enter the Score out of 10 :</dt>

                    <form classname="form-inline" autoComplete="off">
                      <div class="row">
                        <div class="form-group col-lg-3">
                          <input
                            type="number"
                            style={{
                              width: "40%",
                              marginLeft: "335px",
                              marginTop: "10px"
                            }}
                            min="1"
                            max="10"
                            class="form-control"
                            name="score"
                            maxLength="2"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    </form>
                  </dl>
                </div>
              </Modal>
            </div>
          ) : null}
          <div>
            <div
              class="navbar-brand"
              style={{
                backgroundColor: "#1890d8",
                width: "100%",
                position: "fixed"
              }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBYZbvOamYzZSVOfiIYoR7YCSWwWjk9Ctx44eQf1ZpwIzbm1O6"
                alt=""
                style={{
                  width: "8%",
                  height: "8%"
                }}
                class="img-fluid"
              />
              <a
                href="valueOfLogout"
                style={{
                  float: "right",
                  color: "white",
                  paddingTop: "14px",
                  paddingRight: "10px"
                }}
                onClick={this.logoutRoute.bind(this)}
              >
                Logout
              </a>
            </div>

            <div
              class="sidenav"
              style={{
                height: "100%",
                width: "160px",
                marginTop: "68px",
                position: "fixed",
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
                paddingTop: "80px"
              }}
            >
              <div class="container">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">
                      List of nominations for {this.state.headerValue}
                    </h3>
                  </div>
                  <div class="panel-body">
                    <table class="table table-stripe">
                      <thead>
                        <tr>
                          <th>TeamName</th>
                          <th>Score</th>
                          <th>Comments</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.nominations.map((c, index) => (
                          <tr>
                            <td>
                              <Link
                                onClick={() =>
                                  this.openModalHandler(c.id, index)
                                }
                              >
                                {c.teamName}
                              </Link>
                            </td>
                            <td>
                              <input
                                type="text"
                                maxLength="2"
                                size="2"
                                //style={{ width: "10%" }}
                                value={this.state.arrOfScores[index]}
                                disabled
                              />
                            </td>
                            <td>
                              <textarea
                                style={{
                                  width: "80%",
                                  resize: "none"
                                  // height: "50%"
                                }}
                                name="comments"
                                maxLength="100"
                                onChange={event =>
                                  this.handleTextAreaChange(
                                    event,
                                    index,
                                    this.state.teamName
                                  )
                                }
                              />
                              <p>
                                Characters Left: {this.state.charCount[index]}
                                /100
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button onClick={this.handleSubmit}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <div
              class="navbar-brand"
              style={{
                backgroundColor: "#1890d8",
                width: "100%",
                position: "fixed"
              }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBYZbvOamYzZSVOfiIYoR7YCSWwWjk9Ctx44eQf1ZpwIzbm1O6"
                alt=""
                style={{
                  width: "8%",
                  height: "8%"
                }}
                class="img-fluid"
              />
              <a
                href="valueOfLogout"
                style={{
                  float: "right",
                  color: "white",
                  paddingTop: "14px",
                  paddingRight: "10px"
                }}
                onClick={this.logoutRoute.bind(this)}
              >
                Logout
              </a>
            </div>

            <div
              class="sidenav"
              style={{
                height: "100%",
                width: "160px",
                marginTop: "68px",
                position: "fixed",
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
                paddingTop: "80px"
              }}
            >
              <div class="container">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">
                      No nominations found for {this.state.headerValue}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Show;
