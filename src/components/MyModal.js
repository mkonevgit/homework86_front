import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {goBack} from "connected-react-router";
import {useDispatch} from "react-redux";


const useStyles = makeStyles((theme) => ({
   modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
   },
}));

export default function MyModal(props) {
   const classes = useStyles();
   const dispatch = useDispatch();
   const goBackHandler = () => {
      dispatch(goBack());
   }

   return (
      <div>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={true}
            onClose={() => {goBackHandler();}}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={true}>
               <div className={classes.paper}>
                  {props.children}
               </div>
            </Fade>
         </Modal>
      </div>
   );
}
