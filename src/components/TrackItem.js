import React, {useState} from "react";
import {Grid, Typography, Paper, IconButton, CardActions} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import config from "../config";
import defaultImage from "../assets/images/default.png";
import {push, goBack} from "connected-react-router";
import {Progress} from "./Progress";
import YouTube from '@material-ui/icons/YouTube';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MyModal from "./MyModal";
import {withRouter} from "react-router";
import {Switch, Route} from "react-router-dom";
import Frame from "./Frame";
import {useDispatch, useSelector} from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import PublicIcon from "@material-ui/icons/Public";


const useStyles = makeStyles({
   img: {
      // margin: 'auto',
      display: 'block',
      // maxWidth: '100%',
      // maxHeight: '100%',
      width: "140px",
      height: "95px",
      objectFit: "cover"
   },
   paperPublished: {
      marginTop: 10,
      backgroundColor: "#F0F2FF"
   },
   paperUnpublished: {
      marginTop: 10,
      backgroundColor: "#FFF"
   },
   imgWrapper: {
      padding: 5
   },
   arrowBack: {
      marginRight: 10
   },
   text: {
      marginLeft: 20,
      marginRight: 20,
      paddingTop: 35,
   },
   youtube: {
      paddingTop: 26,
      paddingRight: 16
   },
   grid: {
      // paddingTop: 35,
      flexWrap: "nowrap"
   }
})


const TrackItem = ({
                      image, 
                      trackNumber, 
                      name, 
                      duration, 
                      trackLink, 
                      addTrackHistoryHandler,
                      deleteTrackHandler,
                      updTrackHandler,
                   ...props}) => {


   const dispatch = useDispatch();
   const user = useSelector(state => state.users.user);

   const goBackHandler = () => {
      dispatch(goBack());
   }

   const showModalHandler = () => {
      dispatch(push(props.match.url + "/" + trackLink));
   }

   const [showProgress, setShowProgress] = useState(false);

   const setShowProgressHandler = (value) => {
      user && setShowProgress(value)
   };

   let trackImage = defaultImage;
   if (image) {
      trackImage = config.tracksApiUrl + image;
   }

   const classes = useStyles();

   let paperStyle;
   if (props.published)
   {paperStyle = classes.paperPublished} else {paperStyle = classes.paperUnpublished}

   let deleteIcon;
   if ((user && user.role === "admin") || (user && user._id === props.user)) {
      deleteIcon = <Grid item className={classes.youtube}>
         <IconButton aria-label="delete" onClick={deleteTrackHandler}>
            <DeleteIcon fontSize="inherit"/>
         </IconButton>
      </Grid> ;
   } else {
      deleteIcon = null;
   }

   let publicIcon;
   if ((user && user.role === "admin") || (user && user._id === props.user)) {
      publicIcon = <Grid item className={classes.youtube}>
         <IconButton onClick={updTrackHandler}>
            <PublicIcon/>
         </IconButton>
      </Grid>;
   } else {
      publicIcon = null;
   }


   return (
      <>
         <Paper className={paperStyle}>
            <Grid container direction="row">
               <Grid item className={classes.imgWrapper}>
                  <img src={trackImage} alt="" className={classes.img}/>
               </Grid>
               <Grid container item xs direction="column">
                  <Grid container item xs direction="row" className={classes.grid}>
                     <Grid item className={classes.text}>
                        <Typography variant="h6">
                           {trackNumber}
                        </Typography>
                     </Grid>
                     <Grid item className={classes.text}>
                        <Typography variant="h6">
                           {name}
                        </Typography>
                     </Grid>

                  </Grid>
                  <Grid item>
                     {showProgress ?
                        <Progress
                           timeout={4000}
                           setShowProgress={setShowProgress}
                           addTrackHistoryHandler={addTrackHistoryHandler}
                        /> : null}
                  </Grid>
               </Grid>
               <Grid item className={classes.text}>
                  <Typography variant="h6">
                     {duration}
                  </Typography>
               </Grid>
               {user ?
                  <Grid item className={classes.youtube}>
                     <IconButton aria-label="YouTube" onClick={() => setShowProgressHandler(true)}>
                        <PlayCircleFilledIcon/>
                     </IconButton>
                  </Grid> : null}
               {user ?
                  <Grid item className={classes.youtube}>
                     <IconButton aria-label="YouTube" onClick={showModalHandler}>
                        <YouTube/>
                     </IconButton>
                  </Grid> : null}
               {deleteIcon}
               {publicIcon}
            </Grid>
            <Route
               path={props.match.url + "/" + trackLink} exact
               render={props => (
                  <MyModal>
                     <Frame trackLink={trackLink}/>
                  </MyModal>
               )}
            />
         </Paper>
      </>

   )
}

export default withRouter(TrackItem);
