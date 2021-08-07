import * as React from 'react';
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectTracksHistoryAction} from "./../store/trackHistoryReducer";
import {goBack, push} from "connected-react-router";
import TracksHistoryTable from "./TracksHistoryTable";
import {getDateStr} from "./utils";

export default function TracksHistoryTableContainer() {

   const selectTracksHistoryHandler = () => dispatch(selectTracksHistoryAction());

   useEffect(() => {
      selectTracksHistoryHandler();
   }, []);

   const columns = [
      {field: 'id', headerName: 'ID', width: 70},
      {field: 'artist', headerName: 'Artist Name', width: 130},
      {field: 'album', headerName: 'Album Name', width: 270},
      {field: 'track', headerName: 'Track Name', width: 170},
      {field: 'dateStr', headerName: 'Date and time of listening', width: 230}
   ];


   const rows = [];

   const dispatch = useDispatch();
   const user = useSelector(state => state.users.user);
   const tracksHistory = useSelector(state => state.trackHistory.tracksHistory);

   if (user && tracksHistory ) {
      let i = 1;
      tracksHistory.forEach((item, index) => {
         let dateStr = getDateStr(item.datetime);
         rows.push(
            {id: i++,
               artist: item.track.album.artist.name,
               album: item.track.album.name,
               track: item.track.name,
               dateStr: dateStr
            });
      });
      return <TracksHistoryTable columns={columns} rows={rows} username={user.username}/>;
   } else {
      dispatch(push("/login"));
      return null;
   }

}
