import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';

import { useParams } from 'react-router-dom';
import { setParams } from "../store/paramsReducer";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {selectTracksAction} from "../store/tracksReducer";

export default function TracksHistoryTable(props) {
   const params = useParams();
   params.component = "Tracks History of ";
   const user = useSelector(state => state.users.user);
   params.username = user.username;
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(setParams(params));
   }, [dispatch]);

return (
         <>
         <div style={{height: 750, width: '100%'}}>
            <DataGrid rows={props.rows} columns={props.columns} pageSize={15} checkboxSelection/>
         </div>
      </>
)

}
