import {ParamsType} from "./reducerTypes";

export const SET_PARAMS = "SET_PARAMS";
export const UNSET_PARAMS = "SET_PARAMS";


type SetParamsType = {
   type: typeof SET_PARAMS
   params: ParamsType
}

type UnsetParamsType = {
   type: typeof UNSET_PARAMS
   params: ParamsType
}

export const setParams = (params: ParamsType) => ({ type: SET_PARAMS, params });
export const unsetParams = () => ({ type: UNSET_PARAMS});

type initialStateType = {
   params: ParamsType | {}
}

const initialState = {
   params: {}
};

const paramsReducer = (state: initialStateType = initialState, action:
   SetParamsType | UnsetParamsType): initialStateType => {
   switch (action.type) {
      case SET_PARAMS:
         return {
            ...state,
            params: action.params
         };
      case UNSET_PARAMS:
         return {
            ...state,
            params: {}
         };
      default:
         return state;
   }
};

export default paramsReducer;