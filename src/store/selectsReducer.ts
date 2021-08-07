import {artistsAPI} from "../axios/api";
import {albumsAPI} from "../axios/api";
import {OptionsType, ArtistType, AlbumType, GetActionsType} from "./reducerTypes";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../index";
import {albumActions} from "./albumsReducer";

export const SET_LIST_ARTISTS = "SET_LIST_ARTISTS";
export const SET_ALBUMS = "SET_ALBUMS";
export const SET_LOADING = "SET_LOADING";

export const selectActions = {
   setArtists: (artists: Array<OptionsType>) => ({type: SET_LIST_ARTISTS, artists} as const),
   setAlbums: (albums: Array<OptionsType>) => ({type: SET_ALBUMS, albums} as const),
   setLoading: (loading: boolean) => ({type: SET_LOADING, loading}  as const),
}

export type SelectActionsType = GetActionsType<typeof selectActions>
// | CallHistoryMethodAction<[string, unknown?]>;
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, SelectActionsType> ;

export const selectArtistsAction = (): ThunkType => {
   return async (dispatch) => {
      dispatch(selectActions.setLoading(true));
      let response: Array<ArtistType>;
      try {
         response = await artistsAPI.selectArtists();
         let options: Array<OptionsType> = [];
         response.forEach(artist => {
            options.push({_id: artist._id, title: artist.name})
         })
         dispatch(selectActions.setArtists(options));
      } catch (error) {
         console.log(error)
      } finally {
         dispatch(selectActions.setLoading(false));
      }
   };
};

export const selectAlbumsAction = (artistId: string): ThunkType => {
   return async (dispatch ) => {
      dispatch(selectActions.setLoading(true));
      let response: Array<AlbumType>;
      try {
         response = await albumsAPI.selectAlbumsByArtist(artistId);
         let options: Array<OptionsType> = [];
         response.forEach(album => {
            options.push({_id: album._id, title: album.name})
         })
         dispatch(selectActions.setAlbums(options));
      } catch (error) {
         console.log(error)
      } finally {
         dispatch(selectActions.setLoading(false));
      }
   };
};

type InitialStateType = {
   artists: Array<OptionsType>
   albums: Array<OptionsType>
   loading: boolean
}

const initialState = {
   artists: [],
   albums: [],
   loading: false,
   error: null
};

const selectsReducer = (state: InitialStateType = initialState, action: SelectActionsType): InitialStateType => {
   switch (action.type) {
      case SET_LIST_ARTISTS:
         return {
            ...state,
            artists: action.artists
         };
      case SET_ALBUMS:
         return {
            ...state,
            albums: action.albums
         };
      case SET_LOADING:
         return {
            ...state,
            loading: action.loading
         };
      default:
         return state;
   }
   ;
};

export default selectsReducer;