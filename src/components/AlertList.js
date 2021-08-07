import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Alert, AlertTitle} from '@material-ui/lab';
import {useSelector, useDispatch} from "react-redux";
import {alertActions} from "../store/alertsReducer";
import {ALERT_DELAY} from "../components/utils";

const useStyles = makeStyles((theme) => ({
   root: {
      margin: theme.spacing(1),
      width: '100%'
   }
}));

const AlertItem = ({id, status, method, url, count}) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const deleteAlertHandler = (id) => dispatch(alertActions.deleteAlert(id));
   const [isRender, setIsRender] = useState(true);
   useEffect(() => {
      let timerId = setTimeout(() => {
         setIsRender(false);
         deleteAlertHandler(id);
      }, ALERT_DELAY);
      // console.log(timerId + " mount");
      return () => {
         clearTimeout(timerId);
         // console.log(timerId + " unmount");
      }
   }, []);
   return isRender ?
      <Alert severity="success" className={classes.root}>
         <AlertTitle>Status: {status}</AlertTitle>
         Operation type: <strong>{method}</strong> &nbsp;&nbsp; Resource: <strong>{url}</strong> &nbsp;&nbsp;
         Affected documents count: <strong>{count}</strong>
      </Alert> : null;
};


const AlertList = () => {
   const classes = useStyles();
   const alerts = useSelector(state => state.alerts.alerts);
   let alertList =
      <div >
         {alerts.map((alert) => {
            return (
               <AlertItem
                  key={alert.id}
                  id={alert.id}
                  status={alert.status}
                  method={alert.method}
                  count={alert.count}
                  url={alert.url}
               />
            );
         })}
      </div>

   return alertList;
}

export default AlertList;

