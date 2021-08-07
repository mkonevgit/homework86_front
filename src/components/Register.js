import React, {useEffect} from 'react';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createUser, userActions} from "../store/usersReducer";
import FormElement from "./FormElement";
import UserForm from "./UserForm";

const Register = (props) => {

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(userActions.unsetRegisterError());
   }, []);

   const error = useSelector(state => state.users.registerError);

   const [state, setState] = useState({
      username: "",
      password: "",
      display: "",
      phone: "",
      role: ""
   });

   const inputChangeHandler = (e) => {
      const {name, value} = e.target;
      setState(prevState => {
         return {...state, [name]: value};
      });
   };

   const submitFormHandler = async (e) => {
      e.preventDefault();
      await dispatch(createUser({...state}));
   };


   const getFieldError = (fieldName) => {
      try {
         if (error.errors[fieldName].message) {
            return error.errors[fieldName].message;
         } else if (error.errors[fieldName] && error.errors[fieldName].value === "") {
            return "Path '"+fieldName+"' is required"
         } else if (error.errors[fieldName] && error.errors[fieldName].value.length > 0) {
            return "Invalid field value"
         }
      } catch (error) {
         return undefined;
      }
   }

   return (
      <UserForm
         onSubmit={submitFormHandler}
         title="Sign Up"
         sign="Have an account? Sign In"
         link="/login"
      >
         <FormElement
            name="username"
            value={state.username}
            onChange={inputChangeHandler}
            error={getFieldError("username")}
            label={"Username"}
            type="text"
         />
         <FormElement
            name="password"
            value={state.password}
            onChange={inputChangeHandler}
            error={getFieldError("password")}
            label={"Password"}
            type="password"
         />
         <FormElement
            name="display"
            value={state.display}
            onChange={inputChangeHandler}
            error={getFieldError("display")}
            label={"Display name"}
            type="text"
         />
         <FormElement
            name="phone"
            value={state.phone}
            onChange={inputChangeHandler}
            error={getFieldError("phone")}
            label={"Phone number"}
            type="text"
         />
         <FormElement
            name="role"
            value={state.role}
            onChange={inputChangeHandler}
            error={getFieldError("role")}
            label={"User role"}
            type="text"
         />
      </UserForm>

   );
}

export default Register;