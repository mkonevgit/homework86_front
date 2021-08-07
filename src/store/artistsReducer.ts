import {artistsAPI} from "../axios/api";
import {CallHistoryMethodAction, push} from "connected-react-router";
import {ArtistType, GetActionsType} from "./reducerTypes";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../index";

export const SET_ARTISTS = "SET_ARTISTS";
export const SET_NEWS = "SET_NEWS";
export const DELETE_ARTIST = "DELETE_ARTIST";
export const ADD_ARTIST = "ADD_ARTIST";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const INIT_STATE = "INIT_STATE";

export const CREATE_ARTIST_FAILURE = "CREATE_ARTIST_FAILURE";
export const UNSET_CREATE_ARTIST_ERROR = "UNSET_CREATE_ARTIST_ERROR";

export const artistActions = {
initState: () => ({type: INIT_STATE} as const),
setArtists: (artists: Array<ArtistType>) => ({type: SET_ARTISTS, artists} as const),
setLoading: (loading: boolean) => ({type: SET_LOADING, loading} as const),
addArtist: (artist: ArtistType) => ({type: ADD_ARTIST, artist} as const),
deleteArtist: (id: string) => ({type: DELETE_ARTIST, id} as const),
createArtistFailure: (error: any) => { return {type: CREATE_ARTIST_FAILURE, error} as const},
unsetCreateArtistError: () => { return {type: UNSET_CREATE_ARTIST_ERROR} as const}
}

export type ArtistsActionsType = GetActionsType<typeof artistActions>
   // | CallHistoryMethodAction<[string, unknown?]>;
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ArtistsActionsType> ;



export const selectArtistsAction = (): ThunkType => {
   return async (dispatch) => {
      dispatch(artistActions.setLoading(true));
      let response;
      try {
         response = await artistsAPI.selectArtists();
         dispatch(artistActions.setArtists(response));
      } catch (error) {
         console.log(error)
      } finally {
         dispatch(artistActions.setLoading(false));
      }
   };
};

export const createArtistAction = (artist: FormData): ThunkType => {
   return async (dispatch) => {
      try {
         dispatch(artistActions.setLoading(true));
         await artistsAPI.insertArtist(artist);
         let response = await artistsAPI.selectArtists();
         dispatch(artistActions.setArtists(response));
         // @ts-ignore
         dispatch(push("/"));
      } catch (error) {
         if (error.response && error.response.data) {
            dispatch(artistActions.createArtistFailure(error.response.data));
         } else {
            dispatch(artistActions.createArtistFailure(error));
         }
      } finally {
         dispatch(artistActions.setLoading(false));
      }
   }
}

export const updArtistAction = (id: string): ThunkType => {
   return async (dispatch) => {
      try {
         dispatch(artistActions.setLoading(true));
         await artistsAPI.updateArtist(id);
         let response = await artistsAPI.selectArtists();
         dispatch(artistActions.setArtists(response));
      } catch (error) {
         console.error(error.response.data.error);
         // throw new Error(error.response.data.error);
      } finally {
         dispatch(artistActions.setLoading(false));
      }
   }
}

export const deleteArtistAction = (id: string): ThunkType => {
   return async (dispatch) => {
      try {
         dispatch(artistActions.setLoading(true));
         await artistsAPI.deleteArtist(id);
         dispatch(artistActions.deleteArtist(id));
         // @ts-ignore
         dispatch(push('/'));
      } catch (error) {
         console.error(error);
      } finally {
         dispatch(artistActions.setLoading(false));
      }
   }
}

type InitialStateType = {
   artists: Array<ArtistType>,
   loading: boolean,
   createError: any | null
}

const initialState = {
   artists: [],
   loading: false,
   createError: null
};

const artistReducer = (state :InitialStateType = initialState, action: ArtistsActionsType): InitialStateType => {
   switch (action.type) {
      case CREATE_ARTIST_FAILURE:
         return {...state, createError: action.error};
      case UNSET_CREATE_ARTIST_ERROR:
         return {...state, createError: null};
      case SET_ARTISTS:
         return {
            ...state,
            artists: action.artists
         };
      case SET_LOADING:
         return {
            ...state,
            loading: action.loading
         };
      case ADD_ARTIST: {
         const stateCopy = {
            ...state,
            artist: [...state.artists, action.artist]
         };
         return stateCopy;
      }
      case INIT_STATE:
         return {
            ...state,
            ...initialState
         };
      default:
         return state;
   }
};

export default artistReducer;