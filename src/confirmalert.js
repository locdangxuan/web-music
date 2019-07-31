/* eslint-disable react/react-in-jsx-scope */
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import React from "react";
import "./confirmalert.css";
import { Button } from "reactstrap";
export function Alert(title, message, success) {
    confirmAlert({
        title: title,
        message: message,
        buttons: [
            {
                label: 'OK'
            }
        ],
        closeOnClickOutside: true,
        closeOnEscape: true,
        customUI: ({onClose}) => {
            return(
            <div className='custom-ui'>
                {(success &&
                    (<p className="title-success">{title}</p>))||
                    (<p className="title-warning">{title}</p>)}
                <p>{message}</p>
                <Button outline color='primary' onClick={onClose} >{'  OK  '}</Button>
            </div>
            )}
    });
}