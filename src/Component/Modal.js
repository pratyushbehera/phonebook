import React from "react";
import "./Modal.css";

const Modal = (props) => {
  return (
    <div className="modal-container">
      <div className="modal-shadow"></div>
      <div className="modal">
          {props.renderContent()}
      </div>
    </div>
  );
};

export default Modal;
