import { confirmAlert } from 'react-confirm-alert';

export function Alert (title,message)
{
    confirmAlert({
        title: title,
        message: message,
        buttons: [
            {
                label: 'OK'
            }
        ],
        closeOnClickOutside : true,
        closeOnEscape : true
    })
}
