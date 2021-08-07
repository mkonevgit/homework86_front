import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from "../store/usersReducer";
import FormElement from "./FormElement";
import UserForm from "./UserForm";
import {Alert, AlertTitle}  from '@material-ui/lab';
import {makeStyles} from "@material-ui/core/styles";
import Frame from "./Frame";



const useStyles = makeStyles((theme) => ({
   alert: {
      width: '100%'
   }
}));


const Login = (props) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const error = useSelector(state => state.users.loginError);

    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const inputChangeHandler = (e) => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...state, [name]: value};
        });
    };

    const submitFormHandler = async (e) => {
        e.preventDefault();
        await dispatch(loginUser({...state}));
    };

    return (

       <UserForm
          onSubmit={submitFormHandler}
          title="Sign In"
          sign="Don't have an account? Sign Up"
          link="/register"
       >
          {error && <Alert
             severity="error"
             className={classes.alert}
          >
             <AlertTitle>Error</AlertTitle>
             {error.response.data.error}
          </Alert>}

           <FormElement
              name="username"
              value={state.username}
              onChange={inputChangeHandler}
              label={"Username"}
              type="text"
           />

           <FormElement
              name="password"
              value={state.password}
              onChange={inputChangeHandler}
              label={"Password"}
              type="password"
           />
       </UserForm>

    )
}

export default Login;