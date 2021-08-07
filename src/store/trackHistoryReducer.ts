import { tracksHistoryAPI } from "../axios/api";
import {GetActionsType, TrackHistoryType} from "./reducerTypes";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../index";


export const SET_TRACKS_HISTORY = "SET_TRACKS_HISTORY";
export const ADD_TRACK_HISTORY = "ADD_TRACK_HISTORY";
export const SET_LOADING = "SET_LOADING";

export const tracksHistoryActions = {
   setTracksHistory: (tracksHistory: Array<TrackHistoryType>) => ({type: SET_TRACKS_HISTORY, tracksHistory} as const),
   setLoading: (loading: boolean) => ({type: SET_LOADING, loading} as const),
}

export type tracksHistoryActionsType = GetActionsType<typeof tracksHistoryActions>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, tracksHistoryActionsType> ;

export const selectTracksHistoryAction = (): ThunkType => {
   return async (dispatch) => {
      dispatch(tracksHistoryActions.setLoading(true));
      let response;
      try {
         response = await tracksHistoryAPI.selectTracksHistory();
         dispatch(tracksHistoryActions.setTracksHistory(response));
      } catch (error) {
         console.log(error)
      } finally {
         dispatch(tracksHistoryActions.setLoading(false));
      }
   };
};

export const addTrackHistoryAction = (trackHistory: TrackHistoryType): ThunkType => {
   return async (dispatch) => {
      try {
         dispatch(tracksHistoryActions.setLoading(true));
         await tracksHistoryAPI.insertTrackHistory(trackHistory);
         const response = await tracksHistoryAPI.selectTracksHistory();
         dispatch(tracksHistoryActions.setTracksHistory(response));
      } catch (error) {
         console.error(error.response.data.error);
      } finally {
         dispatch(tracksHistoryActions.setLoading(false));
      }
   }
}

export const deleteTrackHistoryAction = (): ThunkType => {
   return async (dispatch) => {
      try {
         dispatch(tracksHistoryActions.setLoading(true));
         await tracksHistoryAPI.deleteTracksHistory();
         const response = await tracksHistoryAPI.selectTracksHistory();
         dispatch(tracksHistoryActions.setTracksHistory(response));
      } catch (error) {
         console.error(error.response.data.error);
      } finally {
         dispatch(tracksHistoryActions.setLoading(false));
      }
   }
}


type InitialStateType = {
   tracksHistory: Array<TrackHistoryType>
   loading: boolean
}


const initialState = {
   tracksHistory: [],
   loading: false
};

const trackHistoryReducer = (state:InitialStateType = initialState, action: tracksHistoryActionsType): InitialStateType => {
   switch (action.type) {
      case SET_TRACKS_HISTORY:
         return {
            ...state,
            tracksHistory: action.tracksHistory
         };
      case SET_LOADING:
         return {
            ...state,
            loading: action.loading
         };
      default:
         return state;
   }
};

export default trackHistoryReducer;
