import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import AdminViewableModal from "./Modal/AdminViewableModal";

class ShowNominations extends Component {
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
      isShowing: false,
      fieldsArray: [],
      projectType: "",
      teamName: "",
      categories: [],
      nomination: {},
      nominations: [],
      fieldData: [],
      listOfPositions: [],
      index: "",
      headerValue: "",
      isLoaded: false
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
            .then(res => {
              this.setState({ nominations: res.data });
              this.setState({ headerValue: this.state.categories[0] });
              this.setState({ isLoaded: true });
            });
        });
    });
  }

  componentDidMount() {}

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

  route = event => {
    let _headerValue = event.target.text;
    let _idOfFormActivated = "";
    event.preventDefault();
    axios.get("/get-activated-form/" + _headerValue).then(result => {
      axios.get("/get-nomination-by-group/" + _idOfFormActivated).then(res => {
        this.setState({ nominations: res.data });
        this.setState({ headerValue: _headerValue });
        this.setState({ form: result.data });
        _idOfFormActivated = this.state.form.id;
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
          {this.state.isShowing ? (
            <div className="back-drop" style={{ textAlign: "center" }}>
              <AdminViewableModal
                className="modal"
                show={this.state.isShowing}
                close={this.closeModalHandler}
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
                  </dl>
                </div>
              </AdminViewableModal>
            </div>
          ) : null}
          <div>
            <div
              class="sidenav"
              style={{
                height: "100%",
                width: "160px",
                marginTop: "125px",
                position: "fixed",
                backgroundColor: "#f4f5f7",
                paddingTop: "20px",
                zIndex: "1"
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
                paddingTop: "125px"
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
          <div
            class="sidenav"
            style={{
              height: "100%",
              width: "160px",
              marginTop: "125px",
              position: "fixed",
              backgroundColor: "#f4f5f7",
              paddingTop: "20px",
              zIndex: "1"
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
              paddingTop: "125px"
            }}
          >
            <div class="container">
              <h3 class="panel-title">
                No nominations found for {this.state.headerValue}
              </h3>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ShowNominations;
