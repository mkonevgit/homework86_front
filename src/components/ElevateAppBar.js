import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {Button, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import {goBack, push} from "connected-react-router";
import {useDispatch, useSelector} from "react-redux";
import TopToolbar from "./TopToolbar";
import MenuIcon from '@material-ui/icons/Menu';
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import MenuItem from "@material-ui/core/MenuItem";
import {deleteTrackHistoryAction} from "../store/trackHistoryReducer";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
   appBar: {
      color: "#3476D1"
   },
   root: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      flexGrow: 1
   },
   toolBar: {
      borderColor: "red",
      borderWidth: 1
   },
   margin: {
      margin: theme.spacing(1),
      color: "#fff"
   },
   staticToolbar: {
      // marginBottom: theme.spacing(2),
      backgroundColor: "#3476D1"
   }
}));


function ElevationScroll(props) {
   const {children, window} = props;
   const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
   });

   return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
   });
}

ElevationScroll.propTypes = {
   children: PropTypes.element.isRequired,
   window: PropTypes.func,
};


const scrollToPageDown = () => {
   window.scrollTo(0, document.body.scrollHeight);
}

const scrollToPageUp = () => {
   window.scrollTo(0, 0);
}


function ElevateAppBar(props) {

   const dispatch = useDispatch();
   const user = useSelector(state => state.users.user);
   const params = useSelector(state => state.params.params);
   const deleteTrackHistoryHandler = () => dispatch(deleteTrackHistoryAction());

   let titleStr = "";


   switch (params.component) {
      case "Albums of ":
         titleStr = params.component + '"' + params.name + '"';
         break;
      case "Tracklist of album ":
         titleStr = params.component + '"' + params.albumName + '"';
         break;
      case "Tracks History of ":
         titleStr = user ? params.component + user.username : "";
         break;
      case "Artists":
         titleStr = params.component;
         break;
      default:
         break;
   }


   const goBackHandler = () => {
      dispatch(goBack());
   }

   const showTrackHistory = () => {
      dispatch(push("/tracksHistory"));
      setAnchorEl(null);
   }

   const newArtistHandler = () => {
      dispatch(push("/artists/new"));
      setAnchorEl(null);
   }


   const newAlbumHandler = () => {
      dispatch(push("/albums/new"));
      setAnchorEl(null);
   }

   const newTrackHandler = () => {
      dispatch(push("/tracks/new"));
      setAnchorEl(null);
   }




   useEffect(() => {
      let checkedA = localStorage.getItem("showNotifications") === "true" ? true : false;
      setState(prevState => { return {...prevState, checkedA: checkedA}});
   }, []);

   const [state, setState] = React.useState({
      checkedA: false
   });

   const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
      switch (event.target.name) {
         case "checkedA":
            localStorage.setItem("showNotifications", event.target.checked);
            break;
         case "checkedB":
            localStorage.setItem("filterEvents", event.target.checked);
            break;

         default:
            break;
      }


   };




   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const classes = useStyles();

   return (
      <React.Fragment>
         <ElevationScroll {...props}>
            <AppBar>
               <Box border={1}>
                  <TopToolbar/>
                  <Toolbar component="div" className={classes.staticToolbar}>
                     <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        aria-controls="fade-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                     >
                        <MenuIcon/>
                     </IconButton>
                        <Menu
                        id="fade-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}

                     >
                        { user ? <MenuItem onClick={newArtistHandler}>Add Artist</MenuItem> : null}
                        { user ? <MenuItem onClick={newAlbumHandler}>Add Album</MenuItem> : null}
                        { user ? <MenuItem onClick={newTrackHandler}>Add Track</MenuItem> : null}
                        { user ? <MenuItem onClick={showTrackHistory}>Track History</MenuItem> : null}

                     </Menu>
                     <Typography variant="h5" fontWeight="bold" className={classes.title}>
                        {titleStr}
                     </Typography>
                     {user && params.component !== "Tracks History of "?
                     <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={showTrackHistory}
                     >
                        Track History
                     </IconButton> : null }
                     {user && params.component === "Tracks History of "?
                        <IconButton
                           edge="start"
                           className={classes.menuButton}
                           color="inherit"
                           aria-label="menu"
                           onClick={deleteTrackHistoryHandler}
                        >
                           Delete History
                        </IconButton> : null }
                     {params.component !== "Artists" ?
                        <IconButton aria-label="delete" className={classes.margin} size="medium"
                                    onClick={goBackHandler}>
                           <ArrowBackIcon/>
                        </IconButton> : null}
                     <IconButton aria-label="delete" className={classes.margin} size="medium"
                                 onClick={scrollToPageDown}>
                        <ArrowDownwardIcon/>
                     </IconButton>
                     <IconButton aria-label="delete" className={classes.margin} size="medium" onClick={scrollToPageUp}>
                        <ArrowUpwardIcon/>
                     </IconButton>

                     <FormControlLabel
                        control={
                           <Checkbox
                              checked={state.checkedA}
                              onChange={handleChange}
                              name="checkedA"
                              color="secondary"
                           />
                        }
                        label="Show app notifications"
                        labelPlacement="start"
                     />
                  </Toolbar>
               </Box>
            </AppBar>
         </ElevationScroll>
         <Toolbar/>
         <Toolbar/>
         <Toolbar/>
       </React.Fragment>
   );
}

export default ElevateAppBar;


