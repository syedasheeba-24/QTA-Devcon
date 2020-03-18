import React, { Component } from "react";
import "./CreateForm.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CreateForm extends Component {
  _fields = [];
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      formName: "",
      category: "",
      id: "",
      arrOfId: [],
      arrOfForms: [],
      categories: []
    };
  }
  notify = () =>
    toast.success("Form created succesfully!!", {
      position: toast.POSITION.TOP_CENTER
    });

  onChange = event => {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  addField = (field, fieldType, fieldLength, isMandatoryField) => {
    let tempArray = this.state.fields.slice();
    tempArray.push({ field, fieldType, fieldLength, isMandatoryField });
    this.setState({ fields: tempArray });
  };
  componentWillMount() {
    axios.get("/get-id").then(res => {
      axios.get("/get-activated-ids").then(result => {
        this.setState({ arrOfId: result.data });
      });
      this.setState({ id: res.data });
    });
  }

  componentDidMount() {
    var _arrOfCategories = [];
    var _arrOfForms = [];
    axios.get("/get-categories").then(res => {
      _arrOfCategories = res.data;

      _arrOfCategories.map(c =>
        axios.get("/get-forms/" + c).then(res => {
          _arrOfForms.push(res.data);
          this.setState({
            arrOfForms: _arrOfForms,
            categories: _arrOfCategories
          });
        })
      );
    });
  }

  onFormInputChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = event => {
    const { fields, formName, category } = this.state;
    event.preventDefault();
    if (
      this.state.formName === "" ||
      this.state.category === "" ||
      this.state.fields.length === 0
    )
      alert("Please ensure the mandatory fields are filled");
    else {
      axios
        .post("/create-forms", { fields, formName, category })
        .then(
          this.notify(),
          this.setState({ fields: [] }),
          this.setState({ formName: "" }),
          this.setState({ category: "" })
        );
    }
  };

  removeField = fieldKey => {
    var array = [...this.state.fields];
    var index = fieldKey;
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ fields: array });
    }
  };

  render() {
    return (
      <div>
        <ToastContainer autoClose={3000} />

        <div
          style={{
            float: "left",
            marginRight: "2%",
            width: "45%",
            paddingTop: "130px"
          }}
        >
          <AddFieldForm
            style={{ width: "100%" }}
            addField={this.addField}
            onFormInputChange={this.onFormInputChange}
            formName={this.state.formName}
            category={this.state.category}
            fields={this.state.fields}
            onSubmit={this.onSubmit}
          />
        </div>
        <div style={{ float: "left", width: "50%", paddingTop: "140px" }}>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Field Name</th>
                <th>Field Type</th>
                <th>Field Length</th>
                <th>Is mandatory?</th>
                <th>Remove Field</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.fields).map(
                function(key) {
                  return (
                    <tr style={{ textAlign: "center" }}>
                      <td>{this.state.fields[key].field}</td>
                      <td>{this.state.fields[key].fieldType}</td>
                      <td>{this.state.fields[key].fieldLength}</td>
                      <td>{this.state.fields[key].isMandatoryField}</td>
                      <td>
                        <button
                          class="btn btn-primary"
                          style={{ float: "right", marginRight: "40px" }}
                          onClick={() => this.removeField(key)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                }.bind(this)
              )}
            </tbody>
          </table>
        </div>
        <div style={{ clear: "both" }} class="clearfix"></div>
      </div>
    );
  }
}

class AddFieldForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueOfFieldType: "text",
      isMandatory: "no",
      fieldName: "",
      fieldLength: ""
    };
  }
  createField = e => {
    e.preventDefault();
    var field = this.state.fieldName;
    var fieldType = this.state.valueOfFieldType;
    var fieldLength = this.state.fieldLength;
    var isMandatoryField = this.state.isMandatory;
    /* if (field.length > 0) {
      this.props.addField(field, fieldType, fieldLength, isMandatoryField);
    }*/
    if (field === "" || fieldLength === "") {
      alert("Please fill all the field specifications");
    } else {
      this.props.addField(field, fieldType, fieldLength, isMandatoryField);
      this.setState({ fieldName: "" });
      this.setState({ fieldLength: "" });
    }
  };

  handleFieldTypeChange = event => {
    this.setState({ valueOfFieldType: event.target.value });
  };
  handleMandatoryFieldChange = event => {
    this.setState({ isMandatory: event.target.value });
  };

  onFieldNameChange = event => {
    this.setState({ fieldName: event.target.value });
  };

  onFieldLengthChange = event => {
    this.setState({ fieldLength: event.target.value });
  };
  render() {
    return (
      <div class="form-22">
        <form autoComplete="off">
          <div>
            <label
              style={{
                width: "100%"
              }}
            >
              <button
                class="btn btn-primary"
                style={{ float: "right" }}
                onClick={this.props.onSubmit}
              >
                Submit Form
              </button>
              FormName *
            </label>
            <input
              type="text"
              name="formName"
              value={this.props.formName}
              onChange={this.props.onFormInputChange}
              placeholder="Form name.."
            />
          </div>
          <div>
            <label>Form Category *</label>
            <input
              type="text"
              name="category"
              value={this.props.category}
              onChange={this.props.onFormInputChange}
              placeholder="Form Category"
            />
          </div>

          <label
            style={{
              fontWeight: "bold",
              marginTop: "7px",
              fontSize: "23px",
              width: "100%"
            }}
          >
            * Field Specifications:
          </label>

          <div class="inner-form">
            <form>
              <div>
                <label>FieldName *</label>
                <input
                  type="text"
                  name="fieldName"
                  value={this.state.fieldName}
                  onChange={this.onFieldNameChange}
                  placeholder="Field Name"
                />
              </div>
              <div>
                <label>Field length *</label>
                <input
                  type="number"
                  name="fieldLength"
                  style={{ marginLeft: "10px" }}
                  value={this.state.fieldLength}
                  onChange={this.onFieldLengthChange}
                  placeholder="Max num of characters allowed"
                />
              </div>
              <div>
                <label>
                  Choose the field type *
                  <select
                    name="fieldType"
                    onChange={this.handleFieldTypeChange}
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  * Select if the field should appear for evaluation..
                  <select
                    name="isMandatoryField"
                    onChange={this.handleMandatoryFieldChange}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </label>
              </div>
              <button class="btn btn-primary" onClick={this.createField}>
                Add Field
              </button>
            </form>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateForm;
