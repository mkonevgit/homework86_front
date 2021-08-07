import React, {Fragment} from 'react';
import ErrorList from "./ErrorList";
import AlertList from "./AlertList";
import ElevateAppBar from "./ElevateAppBar";
import Albums from "./Albums";
import {Route} from "react-router-dom";


const Layout = props => (
   <Fragment>
      <ElevateAppBar {...props}/>
      <AlertList/>
      <ErrorList/>
      {props.children}
   </Fragment>
);

export default Layout;
