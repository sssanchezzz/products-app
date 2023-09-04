import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { dismissMessage, getMessage } from 'features/message/message_slice';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';

const Message: FC = () => {
    const dispatch = useAppDispatch();
    const message = useSelector(getMessage);

    const handleSnackBarClose = (
        event: Event | React.SyntheticEvent<any, Event>,
        reason: SnackbarCloseReason,
    ) => {
        if (reason === 'timeout') {
            dispatch(dismissMessage());
        }
    };
    return (
        <Snackbar
            open={message !== null}
            autoHideDuration={3000}
            onClose={handleSnackBarClose}
        >
            <Alert severity="success">{message}</Alert>
        </Snackbar>
    );
};

export default Message;
