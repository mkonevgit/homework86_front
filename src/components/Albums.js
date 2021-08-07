import React, {useEffect} from "react";
import { Grid } from "@material-ui/core";
import { selectAlbumsAction } from '../store/albumsReducer';
import AlbumItem from './AlbumItem';
import {deleteAlbumAction, updAlbumAction} from "../store/albumsReducer";
import {useDispatch, useSelector} from 'react-redux';

import { useParams } from 'react-router-dom';
import { setParams } from "../store/paramsReducer";

const Albums = (props) => {
  const params = useParams();
  params.component = "Albums of ";
  const dispatch = useDispatch();
  const albums = useSelector(state => state.albums.albums);

  const deleteAlbumHandler = (id) => dispatch(deleteAlbumAction(id));
  const updAlbumHandler = (albumId, artistId) => dispatch(updAlbumAction(albumId, artistId));

  useEffect(() => {
    dispatch(selectAlbumsAction(props.match.params.id));
    dispatch(setParams(params));
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
        {albums.map(album => {
          return <AlbumItem
            key={album._id}
            id={album._id}
            name={album.name}
            info={album.info}
            year={album.year}
            image={album.image}
            artist={props.match.params.id}
            published={album.published}
            user={album.user}
            deleteAlbumHandler={() => deleteAlbumHandler(album._id)}
            updAlbumHandler={() => updAlbumHandler(album._id, props.match.params.id)}
          />
        })}
      </Grid>
    </Grid>
    </>
  );
};

export default Albums;