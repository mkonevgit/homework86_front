import {AlertType, GetActionsType} from "./reducerTypes";
import {ErrorType} from "./reducerTypes";
export const ADD_ALERT = "ADD_ALERT";
export const DELETE_ALERT = "DELETE_ALERT";
export const ADD_ERROR = "ADD_ERROR";
export const DELETE_ERROR = "DELETE_ERROR";

export const alertActions = {
   addAlert: (alert: AlertType) => {return {type: ADD_ALERT, alert} as const },
   deleteAlert: (id: string) => {return {type: DELETE_ALERT, id} as const },
   addError: (error: ErrorType) => {return {type: ADD_ERROR, error} as const },
   deleteError: (id: string) => { return {type: DELETE_ERROR, id} as const},
}

export type AlertsActionsType = GetActionsType<typeof alertActions>

type initialStateType = {
  alerts: Array<AlertType>
  errors: Array<ErrorType>
}

const initialState = {
  alerts: [],
  errors: []
};

const reducer = (state: initialStateType = initialState, action: AlertsActionsType): initialStateType => {
  switch (action.type) {
    case ADD_ALERT:
    {
      const stateCopy = {
        ...state,
        alerts: [...state.alerts, action.alert]
      };
      return stateCopy;
    }
    case ADD_ERROR:
    {
      const stateCopy = {
        ...state,
        errors: [...state.errors, action.error]
      };
      return stateCopy;
    }
    case DELETE_ALERT:
    {
      const index = state.alerts.findIndex(a => a.id === action.id);
      const alertsCopy = [...state.alerts];
      alertsCopy.splice(index, 1);
      const stateCopy = {
        ...state,
        alerts: alertsCopy
      };

      return stateCopy;
    }
    case DELETE_ERROR:
    {
      const index = state.errors.findIndex(a => a.id === action.id);
      const errorsCopy = [...state.errors];
      errorsCopy.splice(index, 1);
      const stateCopy = {
        ...state,
        errors: errorsCopy
      };

      return stateCopy;
    }
    default:
      return state;
  }
};

export default reducer;