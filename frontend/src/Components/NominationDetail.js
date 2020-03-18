import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";

class Detail extends Component {
  fields = [];
  _arrOfScores = [];
  constructor(props) {
    super(props);
    this.state = {
      nominations: [],
      fieldData: [],
      form: {},
      fieldsArray: [],
      isShowing: false,
      nomination: {},
      projectType: "",
      teamName: "",
      score: "",
      username: "",
      listOfScore: [],
      index: "",
      arrOfScores: []
    };
  }

  componentDidMount() {
    axios
      .get("/get-nomination-by-group/" + this.props.match.params.projectType)
      .then(res => {
        this.setState({
          username: this.props.match.params.username
        });
        this.setState({ nominations: res.data });
        this.state.nominations.map(c =>
          this.setState({ fieldData: c.listOfNominations })
        );
      });
  }

  openModalHandler = (_id, _index) => {
    var arr;
    this.setState({ isShowing: true });
    this.setState({ index: _index });
    axios
      .get("/get-activated-form/" + this.props.match.params.projectType)
      .then(res => {
        this.setState({ form: res.data });
        arr = this.state.form.fields;
        arr = arr.filter(o => o);
        this.setState({ fieldsArray: arr });
      });
    axios.get("/get-nomination/" + _id).then(res => {
      this.setState({ nomination: res.data });
      this.setState({ projectType: this.state.nomination.projectType });
      this.setState({ teamName: this.state.nomination.teamName });
    });
  };

  closeModalHandler = () => {
    this.setState({ isShowing: false });
  };

  submitScore = teamName => {
    let tempArray = this.state.listOfScore.slice();
    let score = this.state.score;
    tempArray.push({ score, teamName });
    this._arrOfScores[this.state.index] = this.state.score;
    this.setState({ arrOfScores: this._arrOfScores });
    this.setState({ listOfScore: tempArray });
    this.setState({ isShowing: false });
  };

  handleSubmit = event => {
    const { listOfScore } = this.state;
    let nameOfEvaluator = this.state.username;
    event.preventDefault();
    axios.post("/savescore", { nameOfEvaluator, listOfScore }).then(result => {
      this.props.history.push("/show/" + this.state.username);
    });
  };

  onChange = event => {
    this.setState({ score: event.target.value });
  };

  render() {
    const score = this.state.score;
    return (
      <div>
        {this.state.isShowing ? (
          <div className="back-drop">
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
                          class="form-control"
                          name="score"
                          maxLength="2"
                          onChange={this.onChange}
                          /*style={{
                            marginLeft: 290,
                            marginTop: 5,
                            paddingLeft: 20
                          }}*/
                        />
                      </div>
                    </div>
                  </form>
                </dl>
              </div>
            </Modal>
          </div>
        ) : null}
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Nominations</h3>
            </div>
            <div class="panel-body">
              <table class="table table-stripe">
                <thead>
                  <tr>
                    <th>Project</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.nominations.map((c, index) => (
                    <tr style={{ width: "100%" }}>
                      <td>
                        <Link
                          onClick={() => this.openModalHandler(c.id, index)}
                        >
                          {c.teamName}
                        </Link>
                        <input
                          type="text"
                          maxLength="2"
                          style={{ float: "right", width: "5%" }}
                          value={this.state.arrOfScores[index]}
                          disabled
                        />
                      </td>
                      {/* <td>{this.state.valueOfUserName}</td>*/}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
