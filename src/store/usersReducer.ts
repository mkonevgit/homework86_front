import {usersAPI} from "../axios/api";
import {push} from "connected-react-router";
import {artistActions} from "./artistsReducer";
import {UserType} from "./reducerTypes";

export const UNSET_CREATE_ERROR = "UNSET_CREATE_ERROR";
export const UNSET_REGISTER_ERROR = "UNSET_CREATE_ERROR";

export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";
export const INIT_USER = "INIT_USER";

export const userActions = {
initUser: () => ({type: INIT_USER} as const),
createUserSuccess: () => {return {type: CREATE_USER_SUCCESS} as const},
createUserFailure: (error: any) => {return {type: CREATE_USER_FAILURE, error} as const},
unsetRegisterError: () => {return {type: UNSET_REGISTER_ERROR}  as const},
loginUserSuccess: (user: UserType) => { return {type: LOGIN_USER_SUCCESS, user} as const},
loginUserFailure: (error: any) => { return {type: LOGIN_USER_FAILURE, error} as const},
}

export const createUser = (userData: UserType) => {
   return async (dispatch: any) => {
      try {
         await usersAPI.insertUser(userData);
         dispatch(userActions.createUserSuccess());
         dispatch(userActions.initUser());
         dispatch(artistActions.initState());
         dispatch(push("/"))
      } catch (error) {

         if (error.response && error.response.data) {
            dispatch(userActions.createUserFailure(error.response.data));
         } else {
            dispatch(userActions.createUserFailure(error));
         }

      }
   };
};


export const loginUser = (userData: UserType) => {
   return async (dispatch: any) => {
      try {
         const response = await usersAPI.loginUser(userData);
         // console.log(response)
         dispatch(userActions.loginUserSuccess(response));
         dispatch(push("/"));
      } catch (err) {
         dispatch(userActions.loginUserFailure(err));
      }
   }
}

export const logoutUser = () => {
   return async (dispatch: any) => {
      await usersAPI.logoutUser();
      dispatch({type: LOGOUT_USER});
      dispatch(artistActions.initState());
      dispatch(push("/login"));
   }
}

export type UserInitialStateType = {
   registerError: any | null
   loginError: any | null
   user: UserType | null
}

const initialState = {
   registerError: null,
   loginError: null,
   user: null
}

const usersReducer = (state: UserInitialStateType = initialState, action: any) => {
   switch (action.type) {
      case CREATE_USER_FAILURE:
         return {...state, registerError: action.error};
      case UNSET_REGISTER_ERROR:
         return {...state, registerError: null};
      case CREATE_USER_SUCCESS:
         return {...state, registerError: null};
      case LOGIN_USER_SUCCESS:
         return {...state, user: action.user, loginError: null};
      case LOGIN_USER_FAILURE:
         return {...state, loginError: action.error};
      case LOGOUT_USER:
         return { ...state, user: null };
      case INIT_USER:
         return {
            ...state,
            ...initialState
         };
      default:
         return state;
   }
}

export default usersReducer;