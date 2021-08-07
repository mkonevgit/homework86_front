import {albumsAPI} from "../axios/api";
import {CallHistoryMethodAction, push} from "connected-react-router";
import {AlbumType, GetActionsType} from "./reducerTypes";
import {AppStateType} from "../index";
import {ThunkAction} from "redux-thunk";

export const SET_ALBUMS = "SET_ALBUMS";
export const SET_NEWS = "SET_NEWS";
export const DELETE_ALBUM = "DELETE_ALBUM";
export const ADD_ALBUM = "ADD_ALBUM";
export const UPD_ALBUM = "UPD_ALBUM";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export const CREATE_ALBUM_FAILURE = "CREATE_ALBUM_FAILURE";
export const UNSET_CREATE_ALBUM_ERROR = "UNSET_CREATE_ALBUM_ERROR";

export const albumActions = {
    setAlbums: (albums: Array<AlbumType>) => ({ type: SET_ALBUMS, albums } as const),
    setLoading: (loading: boolean)  => ({ type: SET_LOADING, loading } as const),
    addAlbum: (album: AlbumType) => ({ type: ADD_ALBUM, album: album } as const),
    updAlbum: (id: string) => ({ type: UPD_ALBUM, id } as const),
    deleteAlbum: (id: string) => ({ type: DELETE_ALBUM, id } as const),
    createAlbumFailure: (error: any) => { return {type: CREATE_ALBUM_FAILURE, error} as const},
    unsetCreateAlbumError: () => {  return {type: UNSET_CREATE_ALBUM_ERROR} as const},
}

export type AlbumsActionsType = GetActionsType<typeof albumActions>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AlbumsActionsType> ;


export const selectAlbumsAction = (artistId: string): ThunkType => {
    return async (dispatch) => {
        dispatch(albumActions.setLoading(true));
        let response;
        try {
            response = await albumsAPI.selectAlbumsByArtist(artistId);
            dispatch(albumActions.setAlbums(response));
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(albumActions.setLoading(false));
        }
    };
};

export const createAlbumAction = (artistId: string, artistName: string, album: FormData): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(albumActions.setLoading(true));
            await albumsAPI.insertAlbum(album);
            let response = await albumsAPI.selectAlbumsByArtist(artistId);
            dispatch(albumActions.setAlbums(response));
            // @ts-ignore
            dispatch(push("/albums/"+artistId+"/"+artistName));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(albumActions.createAlbumFailure(error.response.data));
            } else {
                dispatch(albumActions.createAlbumFailure(error));
            }
        } finally {
            dispatch(albumActions.setLoading(false));
        }
    }
}


export const insertAlbumAction = (album: FormData): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(albumActions.setLoading(true));
            let response = await albumsAPI.insertAlbum(album);
            dispatch(albumActions.addAlbum(response));
        } catch (error) {
            console.error(error.response.data.error);
            // throw new Error(error.response.data.error);
        } finally {
            dispatch(albumActions.setLoading(false));
        }
    }
}

export const updAlbumAction = (albumId: string, artistId: string): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(albumActions.setLoading(true));
            await albumsAPI.updateAlbum(albumId);
            const response = await albumsAPI.selectAlbumsByArtist(artistId);
            dispatch(albumActions.setAlbums(response));
        } catch (error) {
            console.error(error.response.data.error);
            // throw new Error(error.response.data.error);
        } finally {
            dispatch(albumActions.setLoading(false));
        }
    }
}

export const deleteAlbumAction = (id: string): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(albumActions.setLoading(true));
            await albumsAPI.deleteAlbum(id);
            dispatch(albumActions.deleteAlbum(id));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(albumActions.setLoading(false));
        }
    }
}



type InitialStateType = {
    albums: Array<AlbumType>
    loading: boolean
    createError: any | null
}


const initialState: InitialStateType = {
    albums: [],
    loading: false,
    createError: null
};


const albumReducer = (state :InitialStateType = initialState, action: AlbumsActionsType): InitialStateType => {
    switch (action.type) {
        case CREATE_ALBUM_FAILURE:
            return {...state, createError: action.error};
        case UNSET_CREATE_ALBUM_ERROR:
            return {...state, createError: null};
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
        case ADD_ALBUM:
            {
                const stateCopy = {
                    ...state,
                    albums: [...state.albums, action.album]
                };
                return stateCopy;
            }
        case DELETE_ALBUM:
            {
                const index = state.albums.findIndex(t => t._id === action.id);
                const albumsCopy = [...state.albums];
                albumsCopy.splice(index, 1);
                const stateCopy = {
                    ...state,
                    albums: albumsCopy
                };
                return stateCopy;
            }
        default:
            return state;
    }
};

export default albumReducer;