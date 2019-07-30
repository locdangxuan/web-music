import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import React from "react";
import "./confirmalert.css";
import { Button } from "reactstrap";

export function Alert(title, message) {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-ui">
          {(title === "Warning" && (
            <h1 className="title-warning">{title}</h1>
          )) || <h1 className="title-message">{title}</h1>}
          <p className="message-alert">{message}</p>
          <Button outline color="primary" onClick={onClose}>OK</Button>
        </div>
      );
    },
    closeOnClickOutside: true,
    closeOnEscape: true
  });
}
