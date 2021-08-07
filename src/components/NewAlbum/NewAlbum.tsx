import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from '@material-ui/core';
import AlbumForm from './AlbumForm';
import {createAlbumAction} from "../../store/albumsReducer";
import {AppStateType} from "../../index";

const NewAlbum = () => {
  const user = useSelector((state: AppStateType) => state.users.user);
  const dispatch = useDispatch();
  const formSubmitHandler = async (artistId: string, artistName: string, album: FormData) => {
    await dispatch(createAlbumAction(artistId, artistName, album));
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
            New Album
          </Typography>
        </Grid>
      </Grid>
      <AlbumForm
        onSubmit={formSubmitHandler}
        user={user}/>
    </>
  );
};

export default NewAlbum;