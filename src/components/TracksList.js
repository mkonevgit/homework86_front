import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import ElevateAppBar from "../components/ElevateAppBar";

import { selectTracksAction } from '../store/tracksReducer';
import { addTrackHistoryAction } from "../store/trackHistoryReducer";
import TrackItem from "../components/TrackItem";

import {deleteTrackAction, updTrackAction} from "../store/tracksReducer";
import { useSelector, useDispatch } from "react-redux";

import { useParams } from 'react-router-dom';
import { setParams } from "../store/paramsReducer";
import {deleteAlbumAction, updAlbumAction} from "../store/albumsReducer";



const useStyles = makeStyles({
    img: {
        height: "100px",
        borderRadius: 3
    },
    grid: {
        width: "100%"
    },
    text: {
        marginLeft: 20,
        marginRight: 20
    },
    imgWrapper: {
        paddingTop: 5,
        paddingLeft: 5
    },
    paper: {
        marginTop: 20,
    }

})


const TracksList = (props) => {
    const classes = useStyles();

    const params = useParams();
    params.component = "Tracklist of album ";

    const dispatch = useDispatch();
    const tracks = useSelector(state => state.tracks.tracks);
    const user = useSelector(state => state.users.user);

    const addTrackHistoryHandler = (trackHistory) => {dispatch(addTrackHistoryAction(trackHistory))};

    const deleteTrackHandler = (id) => dispatch(deleteTrackAction(id));
    const updTrackHandler = (trackId, albumId) => dispatch(updTrackAction(trackId, albumId));

    useEffect(() => {
        dispatch(selectTracksAction(props.match.params.albumId));
        dispatch(setParams(params));
    }, [dispatch]);

    return (
        <>
            {tracks.map(track => {
                return <TrackItem
                    key={track._id}
                    id={track._id}
                    trackNumber={track.trackNumber}
                    name={track.name}
                    duration={track.duration}
                    image={track.image}
                    published={track.published}
                    trackLink={track.trackLink}
                    addTrackHistoryHandler={() => addTrackHistoryHandler({user: user._id, track: track._id})}
                    user={track.user}
                    deleteTrackHandler={() => deleteTrackHandler(track._id)}
                    updTrackHandler={() => updTrackHandler(track._id, props.match.params.albumId)}
                />
            })}
        </>


    )
}

export default TracksList;