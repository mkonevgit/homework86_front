import React, {useState, useEffect} from "react";
import {Grid, Button, IconButton} from "@material-ui/core";
import FileInput from '../FileInput';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import {useSelector, useDispatch} from "react-redux";
import {tracksActions} from "../../store/tracksReducer";
import {Link} from "react-router-dom";
import FormElement from "../FormElement";
import {selectArtistsAction, selectAlbumsAction} from "../../store/selectsReducer";
import {AppStateType} from "../../index";
import {UserType} from "../../store/reducerTypes";

const useStyles = makeStyles({
  form: {
    marginTop: 10
  },
  button: {
    marginRight: 5
  }
});

type TrackFormPropsType = {
  onSubmit(albumId: string, albumName: string, track: FormData): void
  user: UserType
}

const TrackForm: React.FC<TrackFormPropsType> = ({onSubmit, user}) => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const unsetCreateTrackHandler = () => { dispatch(tracksActions.unsetCreateTrackError()); }
  const selectArtistsHandler = () => { dispatch(selectArtistsAction()); }
  const selectAlbumsHandler = (albumId: string) => { dispatch(selectAlbumsAction(albumId)); }
  const artistsOptions = useSelector((state: AppStateType) => state.selects.artists);
  const albumsOptions = useSelector((state: AppStateType) => state.selects.albums);

  useEffect(() => {
    if (user) {
      setState(prevState => {
        return {
          ...prevState,
          user: user._id
        };
      });
    }
    unsetCreateTrackHandler();
    selectArtistsHandler();
  }, []);

  const error = useSelector((state: AppStateType) => state.tracks.createError);

  const getFieldError = (fieldName: string) => {
    try {
      if (error.errors[fieldName].message) {
        return error.errors[fieldName].message;
      } else if (error.errors[fieldName] && error.errors[fieldName].value === "") {
        return "Path '"+fieldName+"' is required"
      } else if (error.errors[fieldName] && error.errors[fieldName].value.length > 0) {
        return "Invalid field value"
      }
    } catch (error) {
      return undefined;
    }
  }

  type TrackFormStateType = {
    name:string
    artist: string
    album: string
    duration: string
    image: File | null
    trackNumber: string
    trackLink: string
    user: string
  }

  const [state, setState] = useState<TrackFormStateType>({
    name: "",
    artist: "",
    album: "",
    duration: "",
    image: null,
    trackNumber: "",
    trackLink: "",
    user: ""
  });


  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };


  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setState(prevState => {
      return {
        ...prevState,
        image: file
      };
    });
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    const stateCopy = {...state};
    // @ts-ignore
    delete stateCopy.artist;
    Object.keys(stateCopy).forEach(key => {
      // @ts-ignore
      formData.append(key, stateCopy[key]);
    });

    const selectedAlbum = albumsOptions.filter(option => option._id === state.album);
    if (selectedAlbum[0]) {
      onSubmit(selectedAlbum[0]._id, selectedAlbum[0].title, formData);
    } else {
      onSubmit("", "", formData);
    }
  };


  return (
    <form onSubmit={formSubmitHandler} >
      <Grid container direction="column" spacing={2} className={classes.form}>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            name="name"
            onChange={inputChangeHandler}
            value={state.name}
            error={!!getFieldError("name")}
            helperText={getFieldError("name")}
          />
        </Grid>

        <Grid item>
          <FormElement
             name="artist"
             label="Artist"
             required={false}
             select={true}
             options={artistsOptions}
             value={state.artist}
             onChange={(event) => {inputChangeHandler(event); selectAlbumsHandler(event.target.value);}}
             error={getFieldError("artist")}
             type="select"
          />
        </Grid>

        <Grid item>
          <FormElement
             name="album"
             label="Album"
             required={false}
             select={true}
             options={albumsOptions}
             value={state.album}
             onChange={inputChangeHandler}
             error={getFieldError("album")}
             type="select"
          />
        </Grid>

        <Grid item>
          <TextField
             fullWidth
             variant="outlined"
             label="Duration"
             name="duration"
             onChange={inputChangeHandler}
             value={state.duration}
             error={!!getFieldError("duration")}
             helperText={getFieldError("duration")}
          />
        </Grid>

        <Grid item>
          <FileInput
            label="Image"
            name="image"
            onChange={fileChangeHandler}
            error={getFieldError("image")}
          />
        </Grid>

        <Grid item>
          <TextField
             fullWidth
             variant="outlined"
             label="Track Number"
             name="trackNumber"
             onChange={inputChangeHandler}
             value={state.trackNumber}
             error={!!getFieldError("trackNumber")}
             helperText={getFieldError("trackNumber")}
          />
        </Grid>

        <Grid item>
          <TextField
             fullWidth
             variant="outlined"
             label="Track Link"
             name="trackLink"
             onChange={inputChangeHandler}
             value={state.trackLink}
             error={!!getFieldError("trackLink")}
             helperText={getFieldError("trackLink")}
          />
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="medium"
            className={classes.button}
            startIcon={<AddIcon />}
          >
            Add track
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            component={Link} to={"/"}
            className={classes.button}
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TrackForm;