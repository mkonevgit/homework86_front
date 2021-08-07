import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from '@material-ui/core';
import ArtistForm from './ArtistForm';
import {createArtistAction} from "../../store/artistsReducer";
import {ArtistType} from "../../store/reducerTypes";
import {AppStateType} from "../../index";

const NewArtist = () => {
  const user = useSelector((state: AppStateType) => state.users.user);
  const dispatch = useDispatch();
  const formSubmitHandler = async (artist: FormData) => {
    await dispatch(createArtistAction(artist));
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
            New Artist
          </Typography>
        </Grid>
      </Grid>
      <ArtistForm
        onSubmit={formSubmitHandler}
        user={user}/>
    </>
  );
};

export default NewArtist;