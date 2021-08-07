import {tracksAPI} from "../axios/api";
import {CallHistoryMethodAction, push} from "connected-react-router";
import {GetActionsType, TrackType} from "./reducerTypes";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../index";


export const SET_TRACKS = "SET_TRACKS";
export const DELETE_TRACK = "DELETE_TRACK";
export const ADD_TRACK = "ADD_TRACK";
export const SET_LOADING = "SET_LOADING";

export const CREATE_TRACK_FAILURE = "CREATE_TRACK_FAILURE";
export const UNSET_CREATE_TRACK_ERROR = "UNSET_CREATE_TRACK_ERROR";

export const tracksActions = {
setTracks: (tracks: Array<TrackType>) => ({ type: SET_TRACKS, tracks } as const),
setLoading: (loading: boolean) => ({ type: SET_LOADING, loading } as const),
addTrack: (track: TrackType) => ({ type: ADD_TRACK, track } as const),
deleteTrack: (id: string) => ({ type: DELETE_TRACK, id } as const),
createTrackFailure: (error: any) => { return {type: CREATE_TRACK_FAILURE, error} as const},
unsetCreateTrackError: () => { return {type: UNSET_CREATE_TRACK_ERROR} as const}
}

export type TracksActionsType = GetActionsType<typeof tracksActions>;
 // | CallHistoryMethodAction<[string, unknown?]>;
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TracksActionsType> ;

export const selectTracksAction = (albumId: string): ThunkType => {
    return async (dispatch) => {
        dispatch(tracksActions.setLoading(true));
        let response;
        try {
            response = await tracksAPI.selectTracksByAlbum(albumId);
            dispatch(tracksActions.setTracks(response));
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(tracksActions.setLoading(false));
        }
    };
};


export const createTrackAction = (albumId: string, albumName: string, track:FormData): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(tracksActions.setLoading(true));
            await tracksAPI.insertTrack(track);
            let response = await tracksAPI.selectTracksByAlbum(albumId);
            dispatch(tracksActions.setTracks(response));
            // @ts-ignore
            dispatch(push("/tracks/"+albumId+"/"+albumName));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(tracksActions.createTrackFailure(error.response.data));
            } else {
                dispatch(tracksActions.createTrackFailure(error));
            }
        } finally {
            dispatch(tracksActions.setLoading(false));
        }
    }
}

export const updTrackAction = (trackId: string, albumId: string): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(tracksActions.setLoading(true));
            await tracksAPI.updateTrack(trackId);
            const response = await tracksAPI.selectTracksByAlbum(albumId);
            dispatch(tracksActions.setTracks(response));
        } catch (error) {
            console.error(error.response.data.error);
            // throw new Error(error.response.data.error);
        } finally {
            dispatch(tracksActions.setLoading(false));
        }
    }
}

export const deleteTrackAction = (id: string): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(tracksActions.setLoading(true));
            await tracksAPI.deleteTrack(id);
            dispatch(tracksActions.deleteTrack(id));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(tracksActions.setLoading(false));
        }
    }
}

type InitialStateType = {
    tracks: Array<TrackType>
    loading: boolean
    createError: any | null
};


const initialState: InitialStateType = {
    tracks: [],
    loading: false,
    createError: null
};

const trackReducer = (state :InitialStateType = initialState, action: TracksActionsType) => {
    switch (action.type) {
        case CREATE_TRACK_FAILURE:
            return {...state, createError: action.error};
        case UNSET_CREATE_TRACK_ERROR:
            return {...state, createError: null};
        case SET_TRACKS:
            return {
                ...state,
                tracks: action.tracks
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case ADD_TRACK:
            {
                const stateCopy = {
                    ...state,
                    track: [...state.tracks, action.track]
                };
                return stateCopy;
            }
        case DELETE_TRACK:
            {
                const index = state.tracks.findIndex(t => t._id === action.id);
                console.log(index);
                const tracksCopy = [...state.tracks];
                tracksCopy.splice(index, 1);
                const stateCopy = {
                    ...state,
                    tracks: tracksCopy
                };
                return stateCopy;
            }
        default:
            return state;
    }
};

export default trackReducer;
