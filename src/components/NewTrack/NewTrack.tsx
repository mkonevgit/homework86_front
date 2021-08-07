import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from '@material-ui/core';
import TrackForm from './TrackForm';
import {createTrackAction} from "../../store/tracksReducer";
import {AppStateType} from "../../index";

const NewTrack = () => {
  const user = useSelector((state: AppStateType) => state.users.user);
  const dispatch = useDispatch();
  const formSubmitHandler = async (albumId: string, albumName: string, track: FormData) => {
    await dispatch(createTrackAction(albumId, albumName, track));
  };

  return (
    <>
      <Grid
        item
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h3">
            New Track
          </Typography>
        </Grid>
      </Grid>
      <TrackForm
        onSubmit={formSubmitHandler}
        user={user}/>
    </>
  );
};

export default NewTrack;