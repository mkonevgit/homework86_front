import React from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardHeader, CardContent, CardActions, IconButton, Typography, CardMedia } from "@material-ui/core";
import config from "../config";
import defaultImage from "../assets/images/default.png";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { makeStyles } from '@material-ui/core/styles';
import {ArrowBack} from "@material-ui/icons";
import {push} from "connected-react-router";
import {useDispatch, useSelector} from 'react-redux';
import DeleteIcon from "@material-ui/icons/Delete";
import PublicIcon from '@material-ui/icons/Public';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';



const useStyles = makeStyles((theme) => ({
  cardPublished: {
    // height: "100%",
    width: 300,
    backgroundColor: "#F0F2FF"
  },
  cardUnpublished: {
    // height: "100%",
    width: 300,
    backgroundColor: "#FFF"
  },
  media: {
    height: 0,
    paddingTop: "56.25%", //16:9
    cursor: "pointer"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}));

const AlbumItem = props => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  const goBackHandler = () => {
    dispatch(push("/"));
  }

  let albumImage = defaultImage;
  if (props.image) {
    albumImage = config.albumsApiUrl + props.image;
  }

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let cardStyle;
  if (props.published)
  {cardStyle = classes.cardPublished} else {cardStyle = classes.cardUnpublished}

  let deleteIcon;
  if ((user && user.role === "admin") || (user && user._id === props.user)) {
    deleteIcon = <IconButton aria-label="delete" onClick={props.deleteAlbumHandler}>
      <DeleteIcon fontSize="inherit"/>
    </IconButton> ;
  } else {
    deleteIcon = null;
  }

  let publicIcon;
  if ((user && user.role === "admin") || (user && user._id === props.user)) {
    publicIcon = <IconButton onClick={props.updAlbumHandler}>
      <PublicIcon/>
    </IconButton>;
  } else {
    publicIcon = null;
  }

  return (
    <Grid item>
      <Card className={cardStyle}>
        <CardHeader title={props.name} subheader={"Year of Issue: "+props.year}/>
        <CardMedia
          className={classes.media}
          image={albumImage}
          component={Link} to={"/tracks/"+props.id+"/"+props.name}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.info}
          </Typography>
        </CardContent>
        </Collapse>
        <CardActions>
          <IconButton onClick={goBackHandler}>
            <ArrowBack/>
          </IconButton>
          <IconButton component={Link} to={"/tracks/"+props.id+"/"+props.name}>
            <ArrowForwardIcon />
          </IconButton>
          {deleteIcon}
          {publicIcon}
          <IconButton
             className={clsx(classes.expand, {
               [classes.expandOpen]: expanded,
             })}
             onClick={handleExpandClick}
             aria-expanded={expanded}
             aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AlbumItem;