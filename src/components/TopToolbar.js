import React from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {Toolbar, Typography, Grid, Button, Box} from "@material-ui/core";
import AnonymousMenu from "./AnonymousMenu";
import UserMenu from "./UserMenu";

const useStyles = makeStyles(theme => {
   return {
      mainLink: {
         color: "inherit",
         textDecoration: "none",
         "&:hover": {
            color: "#ccc"
         }
      }

   };
});

const TopToolbar = () => {
   const classes = useStyles();
   const user = useSelector(state => state.users.user);
   return (
      <>
         <Box border={1}>
            <Toolbar>
               <Grid container justify="space-between" alignItems="center">
                  <Typography variant="h5">
                     <Link className={classes.mainLink} to="/">
                        Popular Tracks Library. Assembly 1.5
                     </Link>
                  </Typography>
                  <Grid item>
                     {user ? <UserMenu user={user}/> : <AnonymousMenu/>}
                  </Grid>
               </Grid>
            </Toolbar>
         </Box>
      </>
   );
};

export default TopToolbar;