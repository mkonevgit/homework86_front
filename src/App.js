import React from 'react';
import {Container} from "@material-ui/core";
import {Switch, Route, Redirect} from "react-router-dom";
import Artists from './components/Artists';
import CssBaseline from '@material-ui/core/CssBaseline';
import Albums from './components/Albums';
import TracksList from "./components/TracksList";
import Register from './components/Register';
import Login from "./components/Login";
import TracksHistoryTableContainer from "./components/TracksHistoryTableContainer";
import {useSelector} from "react-redux";
import Layout from "./components/Layout";
import NewArtist from "./components/NewArtist/NewArtist";
import NewAlbum from "./components/NewAlbum/NewAlbum";
import NewTrack from "./components/NewTrack/NewTrack";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
   return isAllowed ? <Route {...props} /> : <Redirect to={redirectTo}/>
}

const App = () => {
   const user = useSelector(state => state.users.user);
   return (
      <>
         <CssBaseline/>
         <Layout>
            <main>
               <Container maxWidth="xl">
                  <Switch>

                     <Route path="/" exact component={Artists}/>

                     <Route path="/artists/new" exact component={NewArtist}/>

                     <Route path="/albums/new" exact component={NewAlbum}/>

                     <Route path="/tracks/new" exact component={NewTrack}/>

                     <Route path="/tracks/:albumId/:albumName" component={TracksList}/>

                     <ProtectedRoute
                        isAllowed={!user}
                        redirectTo={"/"}
                        path="/register"
                        exact
                        component={Register}
                     />
                     <ProtectedRoute
                        isAllowed={!user}
                        redirectTo={"/"}
                        path="/login"
                        exact
                        component={Login}
                     />
                     <Route path="/albums/:id/:name" exact component={Albums}/>

                     <Route path="/tracksHistory" exact component={TracksHistoryTableContainer}/>
                  </Switch>
               </Container>
            </main>
         </Layout>
      </>
   );
};

export default App;