import React from "react";
import Button from "terra-button/lib/Button";
import "./Modal.css";

const modal = props => {
  return (
    <div>
      <div
        className="modal-wrapper"
        style={{
          transform: props.show ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        <div className="modal-header">
          <h3>Form Details</h3>
          <span className="close-modal-btn" onClick={props.close}>
            ×
          </span>
        </div>
        <div className="modal-body">
          <p>{props.children}</p>
        </div>
        <div className="modal-footer">
          <Button
            style={{
              float: "right"
            }}
            text="Submit"
            variant="emphasis"
            onClick={props.submit}
          />
          <Button
            style={{
              float: "left"
            }}
            text="Close"
            variant="neutral"
            onClick={props.close}
          />
        </div>
      </div>
    </div>
  );
};

export default modal;
