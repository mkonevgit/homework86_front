import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Alert, AlertTitle} from '@material-ui/lab';
import {useSelector, useDispatch} from "react-redux";
import {alertActions} from "../store/alertsReducer";
import {ERROR_DELAY} from "../components/utils";

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      margin: theme.spacing(1)
   }
}));

const ErrorItem = ({id, method, url, status, name, message, statusText, error, responseDataMessage}) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const deleteErrorHandler = (id) => dispatch(alertActions.deleteError(id));
   const [state, setState] = useState(true);
   useEffect(() => {
      let timerId = setTimeout(() => {
         setState(false);
         deleteErrorHandler(id);
      }, ERROR_DELAY);
      return () => {
         clearTimeout(timerId);
         deleteErrorHandler(id);
      }
   }, []);
   return state ?
      <Alert severity="error"  className={classes.root}>
         <AlertTitle>Status: {status} {statusText} </AlertTitle>
         Operation type: <strong>{method}</strong> <br/>
         Resource: <strong>{url}</strong> <br/>
         {name ? <div> Error name: <strong>{name}</strong></div> : null}
         {message ? <div> Error message: <strong>{message}</strong></div> : null}
         {error ? <div> Error message: <strong>{error}</strong></div> : null}
         {responseDataMessage ? <div> Error message: <strong>{responseDataMessage}</strong></div> : null}
      </Alert> : null;
};


const ErrorList = () => {
  const errors = useSelector(state => state.alerts.errors);
   let errorList = errors.map((error) => {
      return (
         <ErrorItem
            key={error.id}
            id={error.id}
            method={error.method}
            url={error.url}
            status={error.status}
            statusText={error.statusText}
            name={error.name}
            message={error.message}
            error={error.error}
            responseDataMessage={error.responseDataMessage}
         />
      );
   });

   return (
      <div>
         {errorList}
      </div>
   );
}

export default ErrorList;