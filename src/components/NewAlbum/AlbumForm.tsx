import React, {useState, useEffect} from "react";
import {Grid, Button, IconButton} from "@material-ui/core";
import FileInput from '../FileInput';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import {useSelector, useDispatch} from "react-redux";
import {albumActions} from "../../store/albumsReducer";
import {Link} from "react-router-dom";
import FormElement from "../FormElement";
import {selectArtistsAction} from "../../store/selectsReducer";
import {UserType} from "../../store/reducerTypes";
import {AppStateType} from "../../index";

const useStyles = makeStyles({
  form: {
    marginTop: 10
  },
  button: {
    marginRight: 5
  }
});

type AlbumFormPropsType = {
  onSubmit(artistId: string, artistName: string, album: FormData): void
  user: UserType
}

const AlbumForm: React.FC<AlbumFormPropsType> = ({onSubmit, user}) => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const unsetCreateAlbumHandler = () => { dispatch(albumActions.unsetCreateAlbumError()); }
  const selectArtistsHandler = () => { dispatch(selectArtistsAction()); }
  const options = useSelector((state: AppStateType) => state.selects.artists);

  useEffect(() => {
    if (user) {
      setState(prevState => {
        return {
          ...prevState,
          user: user._id
        };
      });
    }
    unsetCreateAlbumHandler();
    selectArtistsHandler();
  }, []);

  const error = useSelector((state: AppStateType) => state.albums.createError);

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


  type AlbumFormStateType = {
    name: string
    info: string
    year: string
    artist: string
    image: File | null
    user: string
  }

  const [state, setState] = useState<AlbumFormStateType>({
    name: "",
    info: "",
    year: "",
    artist: "",
    image: null,
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
    Object.keys(state).forEach(key => {
      // @ts-ignore
      formData.append(key, state[key]);
    });


    const selectedArtist = options.filter(option => option._id === state.artist);
    if (selectedArtist[0]) {
      onSubmit(selectedArtist[0]._id, selectedArtist[0].title, formData);
    } else {
      onSubmit("", "", formData);
    }

  };



  // let options = [{_id: "1", title: "category1"}, {_id: "2", title: "category2"}];

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
          <TextField
             fullWidth
             multiline
             rows={3}
             variant="outlined"
             label="Info"
             name="info"
             onChange={inputChangeHandler}
             value={state.info}
             error={!!getFieldError("info")}
             helperText={getFieldError("info")}
          />
        </Grid>
        <Grid item>
          <TextField
             fullWidth
             variant="outlined"
             label="Year"
             name="year"
             onChange={inputChangeHandler}
             value={state.year}
             error={!!getFieldError("year")}
             helperText={getFieldError("year")}
          />
        </Grid>
        <Grid item>
          <FormElement
             name="artist"
             label="Artist"
             required={false}
             select={true}
             options={options}
             value={state.artist}
             onChange={inputChangeHandler}
             error={getFieldError("artist")}
             type="select"
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
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="medium"
            className={classes.button}
            startIcon={<AddIcon />}
          >
            Add album
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

export default AlbumForm;