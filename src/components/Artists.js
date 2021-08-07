import React, {useEffect} from "react";
import { Grid } from "@material-ui/core";
import { selectArtistsAction } from '../store/artistsReducer';
import ArtistItem from '../components/ArtistItem';

import { useParams } from 'react-router-dom';
import { setParams } from "../store/paramsReducer";

import {useSelector, useDispatch} from "react-redux";
import {deleteArtistAction, updArtistAction} from "../store/artistsReducer";

const Artists = () => {
  const params = useParams();
  params.component = "Artists";
  const dispatch = useDispatch();
  const artists = useSelector(state => state.artists.artists);
  const user = useSelector(state => state.users.user);

  const deleteArtistHandler = (id) => dispatch(deleteArtistAction(id));
  const updArtistHandler = (id) => dispatch(updArtistAction(id));

  useEffect(() => {
    if (user) {
      dispatch(selectArtistsAction());
      dispatch(setParams(params));
    }
  }, [dispatch]);

  return (
    <>
    <Grid container direction="column" spacing={2}>
      <Grid
        item
        container
        direction="row"
        spacing={2}
      >
        {user ?
        artists.map(artist => {
          return <ArtistItem
             published={artist.published}
            key={artist._id}
            id={artist._id}
            name={artist.name}
            info={artist.info}
            image={artist.image}
            user={artist.user}
            deleteArtistHandler={() => deleteArtistHandler(artist._id)}
            updArtistHandler={() => updArtistHandler(artist._id)}
          />
        }) : null}
      </Grid>
    </Grid>
    </>
  );
};

export default Artists;