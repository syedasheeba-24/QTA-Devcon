import React from "react";
import Button from "terra-button/lib/Button";
import "./EventModal.css";

const eventmodal = props => {
  return (
    <div className="back-drop-1">
      <div
        className="modal-wrapper-1"
        style={{
          transform: props.show ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        <div className="modal-header-1">
          <h3>Welcome!</h3>
        </div>
        <div className="modal-body-2">
          <p>{props.children}</p>
        </div>

        <div className="modal-footer-1">
          <Button
            style={{
              float: "right"
            }}
            text="Submit"
            variant="emphasis"
            onClick={props.submit}
          />
        </div>
      </div>
    </div>
  );
};

export default eventmodal;
