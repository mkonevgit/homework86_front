import React from 'react';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";


const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   }
}));

const UserForm = (props) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const pushHandler = () => {
      dispatch(push("/"));
   }

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline/>
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
               {props.title}
            </Typography>
            <form className={classes.form} onSubmit={props.onSubmit}>
               <Grid container spacing={2}>
                  {props.children}
               </Grid>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  {props.title}
               </Button>
               <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={pushHandler}
               >
                  Cancel
               </Button>
               <Grid container justify="flex-end">
                   <Grid item>
                       <Link to={props.link} variant="body2" component={RouterLink}>
                          {props.sign}
                       </Link>
                   </Grid>
               </Grid>
            </form>
         </div>
      </Container>

   );
};

export default UserForm;