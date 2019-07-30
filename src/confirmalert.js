/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Button } from 'reactstrap';

export function Alert(title, message, success) {
    console.log(title + message + success);
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
                {success &&
                    <p style = {{color:"blue", fontSize: "xx-large" }}>{title}</p>}
                {!success &&
                    <p style = {{color:"red", fontSize: "xx-large"}}>{title}</p>}
                {/* <p>{title}</p> */}
                <p>{message}</p>
                <Button outline color='primary' onClick={onClose} >{'  OK  '}</Button>
            </div>
            )}
    });
}