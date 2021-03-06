import React, { Component } from "react";
import EventModal from "./Modal/EventSelectionModal";

class Home extends Component {
  _path = "Quarter Awards";
  constructor(props) {
    super(props);
    this.state = {
      isShowing: true,
      username: "",
    };
  }

  openModalHandler = (_id, _index) => {
    this.setState({ isShowing: true });
  };

  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }
  submit = () => {
    this.setState({ isShowing: false });
    if (this._path === "Quarter Awards") {
      this.props.history.push(
        "/showquarter/" + this.props.match.params.username
      );
      /*return (
        <Redirect
          to={{
            pathname: `/showquarter/${this.props.match.params.username}`
          }}
        />
      );*/
    } else {
      this.props.history.push(
        "/showdevcon/" + this.props.match.params.username
      );
    }
  };
  handleDropdownChange = (event) => {
    this._path = event.target.value;
  };

  render() {
    return (
      <div>
        {this.state.isShowing ? (
          <div className="back-drop" style={{ textAlign: "center" }}>
            <EventModal
              className="eventmodal"
              show={this.state.isShowing}
              submit={() => this.submit()}
            >
              <div>
                <label
                  style={{
                    fontSize: "22px",
                    fontFamily: "ariel",
                  }}
                >
                  Choose the event:
                  <select
                    onChange={this.handleDropdownChange}
                    style={{
                      padding: "10px",
                      margin: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    <option>Quarter Awards</option>
                    <option>Devcon</option>
                  </select>
                </label>
              </div>
            </EventModal>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Home;
