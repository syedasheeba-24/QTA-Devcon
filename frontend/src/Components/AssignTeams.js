import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Button from "terra-button/lib/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

class Assign extends Component {
  _tempArr = [];
  _numberArr = [];
  _arr = [];
  _stateArr = [];
  constructor() {
    super();

    this.state = {
      arrOfPapers: [
        "A",
        "B",
        "C",
        "D",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
      ],
      evaluatorNames: [],
      evaluatorIds: [],
      evaluatorName: "",
      evaluatorID: "",
      papersAssigned: [],
      st: [],
      tempArr: [],
    };
  }
  componentWillMount() {
    axios.get("/getDevconEvaluators").then((result) => {
      this.setState({
        evaluatorNames: result.data,
      });
      this.setState({
        evaluatorName: this.state.evaluatorNames[0],
      });
      axios.get("/getDevconEvaluatorId").then((result2) => {
        this.setState({
          evaluatorIds: result2.data,
        });
        this.setState({
          evaluatorID: this.state.evaluatorIds[0],
        });
      });
    });
  }
  handleChange = (event) => {
    this.setState({ evaluatorName: event.target.value });
    let Id = this.state.evaluatorNames.indexOf(event.target.value);
    this.setState({ evaluatorID: this.state.evaluatorIds[Id] });
  };

  change = (e, c, fieldKey) => {
    if (e.target.checked) {
      this._stateArr[fieldKey] = true;
      // this._numberArr[fieldKey] = fieldKey;
      // this._tempArr[fieldKey] = c;
      this._tempArr.push(c);
      this.setState({ st: this._stateArr });
      this.setState({ papersAssigned: this._tempArr });
    } else {
      var index = fieldKey;
      let Id = this._tempArr.indexOf(c);
      if (index !== -1) {
        this._stateArr[fieldKey] = false;
        this._tempArr.splice(Id, 1);
        //this._numberArr.splice(index, 1);
        this.setState({ st: this._stateArr });
        this.setState({ papersAssigned: this._tempArr });
      }
    }
  };
  notify = () =>
    toast.success("Assigned Succesfully!!", {
      position: toast.POSITION.TOP_CENTER,
    });
  onSubmit = (event) => {
    let evaluatorName = this.state.evaluatorName;
    let evaluatorID = this.state.evaluatorID;
    let papersAssigned = this.state.papersAssigned;
    if (papersAssigned.length === 0) {
      alert("Minimum 1 paper to be assigned");
    } else {
      // this._arr = this.state.arrOfPapers;
      //this._numberArr.reverse().map(c => this._arr.splice(c, 1));
      // this.setState({ arrOfPapers: this._arr });
      this.setState({ papersAssigned: this._tempArr });
      axios
        .post("/assignPaper", { evaluatorName, evaluatorID, papersAssigned })
        .then((result) => {
          this.notify();
          this._tempArr = [];
          this._stateArr = [false];
          this.setState({ st: this._stateArr });
        });
    }
    //this._numberArr = [];
  };

  render() {
    return (
      <div>
        <ToastContainer autoClose={3000} />
        <div
          class="container"
          style={{
            paddingTop: "120px",
            width: "20%",
            float: "left",
            marginLeft: "10px",
            marginTop: "10px",
            position: "fixed",
          }}
        >
          <div class="form-group">
            <label
              style={{
                fontSize: "20px",
                fontStyle: "bold",
              }}
            >
              Select the evaluator *
              <select
                name="role"
                style={{
                  padding: "12px",
                  fontSize: "18px",
                  marginTop: "10px",
                  display: "inline-block",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                onChange={this.handleChange}
              >
                {this.state.evaluatorNames.map((c, index) => (
                  <option value={c} index={index}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div style={{ paddingTop: "125px", width: "70%", float: "right" }}>
          <label
            className="devcon "
            style={{
              padding: "10px",
              fontSize: "22px",
              fontStyle: "bold",
              position: "fixed",

              backgroundImage: "linear-gradient(to right, #1890d8,white)",
              width: "100%",
              zIndex: "2",
              color: "white",
            }}
          >
            Select the papers to be assigned..
          </label>

          <div
            style={{
              paddingTop: "50px",
              paddingLeft: "20px",
            }}
            class="row"
          >
            {this.state.arrOfPapers.map((c, index) => (
              <div
                class="custom-control custom-checkbox"
                style={{ margin: "10px 25px" }}
              >
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id={c}
                  onChange={(event) => this.change(event, c, index)}
                  checked={this.state.st[index]}
                />
                <label class="custom-control-label" for={c}>
                  {c}
                </label>
              </div>
            ))}
          </div>
          <Button
            //style={{ float: "center", marginLeft: "250px" }}
            onClick={this.onSubmit}
            text="Click to Assign.."
            variant="action"
          />
        </div>
      </div>
    );
  }
}

export default Assign;
