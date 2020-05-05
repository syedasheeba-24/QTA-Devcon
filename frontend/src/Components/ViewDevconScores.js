import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Score extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devconScores: [],
    };
  }
  componentWillMount() {
    axios.get("/getDevconScores").then((res) => {
      this.setState({ devconScores: res.data });
    });
  }

  render() {
    return (
      <div>
        <div
          class="main"
          style={{
            padding: "0px 10px",
            paddingTop: "130px",
            overflow: "auto",
          }}
        >
          <div>
            <table class="table table-bordered" style={{ tableLayout: "auto" }}>
              <thead style={{ backgroundColor: "#e1e6e8" }}>
                <tr>
                  <th style={{ textAlign: "center" }}>Paper Name</th>
                  <th style={{ textAlign: "center" }}>Evaluated By</th>
                  <th style={{ textAlign: "center" }}>Requirements</th>
                  <th style={{ textAlign: "center" }}>Weightage(%)</th>
                  <th style={{ textAlign: "center" }}>Score(1-10)</th>
                  <th style={{ textAlign: "center" }}>Comments</th>
                  <th style={{ textAlign: "center" }}>Weightage</th>
                  <th style={{ textAlign: "center" }}>Overall Weightage</th>
                </tr>
              </thead>
              <tbody>
                {this.state.devconScores.map((c) => (
                  <tr>
                    <td>{c.paperName}</td>
                    <td>{c.evaluatorName}</td>
                    <td>
                      {c.criteria.map((cc) => (
                        <tr>
                          <td>{cc}</td>
                        </tr>
                      ))}
                    </td>
                    <td>
                      {c.weightage.map((cc) => (
                        <tr>
                          <td>{cc}%</td>
                        </tr>
                      ))}
                    </td>
                    <td>
                      {c.score.map((cc) => (
                        <tr>
                          <td>{cc}</td>
                        </tr>
                      ))}
                    </td>
                    <td>
                      {c.comments.map((cc) => (
                        <tr>
                          <td>{cc}</td>
                        </tr>
                      ))}
                    </td>
                    <td>
                      {c.totalWeightage.map((cc) => (
                        <tr>
                          <td>{cc}</td>
                        </tr>
                      ))}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {c.finalWeightedScore}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Score;
