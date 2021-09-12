import axios from "axios";
import config from "./../config";
import {store} from "./../index";
import {nanoid} from "nanoid";
import {alertActions} from "../store/alertsReducer";
import {scrollToPageUp} from "./../components/utils";
import {
   AlbumType,
   AlertType,
   ArtistType,
   ErrorType,
   TrackHistoryType,
   TrackType,
   UserType
} from "../store/reducerTypes";


export const instance = axios.create({
   baseURL: config.apiUrl
});

const localValue = localStorage.getItem('showNotifications');
if (!localValue) {localStorage.setItem('showNotifications', 'true');}

const showNotifications = localStorage.getItem("showNotifications") === "true" ? true : false;

if (showNotifications) {

   instance.interceptors.request.use((req) => {
      const users = store.getState().users;
      if (users.user) {
         req.headers["Authentication"] = users.user.token;
      } else {
         req.headers["Authentication"] = "anonymous"
      }
      return req;
   });

   instance.interceptors.response.use((res) => {
         const addAlertHandler = (alert: AlertType) => {
            store.dispatch(alertActions.addAlert(alert))
         }
         // console.log(res.data)
         let id = nanoid();
         let method = res.config.method;
         let url = res.config.url;
         let status = res.status;
         let count = 1;
         if (method === "get") count = res.data.length;
         if (method === "delete") count = res.data.deletedCount;
         addAlertHandler({id, status, method, url, count});
         scrollToPageUp();
         return res;
      },
      (err) => {
         const addErrorHandler = (error: ErrorType) => {
            store.dispatch(alertActions.addError(error))
         }
         let id = nanoid();
         console.log(err.response);
         let method = err.config.method;
         let url = err.config.url;
         let status = err.response.status;
         let statusText = err.response.statusText;
         let name = err.response.data.name;
         let message = err.response.data.message;
         let error = err.response.data.error;
         let responseDataMessage = err.response.data;
         if (typeof responseDataMessage === "object") {
            responseDataMessage = ""
         }
         addErrorHandler({id, method, url, status, statusText, name, message, error, responseDataMessage});
         scrollToPageUp();
         throw err;
         //return err;
      }
   );
} else {
   instance.interceptors.request.use((req) => {
      const users = store.getState().users;
      if (users.user) {
         req.headers["Authentication"] = users.user.token;
      } else {
         req.headers["Authentication"] = "anonymous"
      }
      return req;
   });
}


export const artistsAPI = {
   selectArtists() {
      return instance.get<Array<ArtistType>>("/artists")
         .then(response => {
            return response.data;
         });
   },
   deleteArtist(id: string) {
      return instance.delete("/artists/" + id)
         .then(response => {
            return response.data;
         });
   },
   insertArtist(artist: FormData) {
      return instance.post<ArtistType>("/artists/", artist)
         .then(response => {
            return response.data;
         });
   },
   updateArtist(id: string) {
      return instance.put<ArtistType>("/artists/published/" + id)
         .then(response => {
            return response.data;
         });
   }
}




export const usersAPI = {
   insertUser(userData: UserType) {
      return instance.post<UserType>("/users", userData)
         .then(response => {
            return response.data;
         });
   },
   loginUser(userData: UserType) {
      return instance.post<UserType>("/users/sessions", userData)
         .then(response => {
            return response.data;
         });
   },
   logoutUser() {
      return instance.delete("/users/sessions")
         .then(response => {
            return response.data;
         });
   },

}



export const albumsAPI = {
   selectAlbums() {
      return instance.get<Array<AlbumType>>("/albums")
         .then(response => {
            return response.data;
         });
   },
   selectAlbumsByArtist(artistId: string) {
      return instance.get<Array<AlbumType>>("/albums?artist=" + artistId)
         .then(response => {
            return response.data;
         });
   },
   deleteAlbum(id: string) {
      return instance.delete("/albums/" + id)
         .then(response => {
            return response.data;
         });
   },
   insertAlbum(album: FormData) {
      return instance.post<AlbumType>("/albums/", album)
         .then(response => {
            return response.data;
         });
   },
   updateAlbum(id: string) {
      return instance.put<AlbumType>("/albums/published/" + id)
         .then(response => {
            return response.data;
         });
   }
}


export const tracksAPI = {
   selectTracks() {
      return instance.get<Array<TrackType>>("/tracks")
         .then(response => {
            return response.data;
         });
   },
   selectTracksByAlbum(albumId: string) {
      return instance.get<Array<TrackType>>("/tracks?album=" + albumId)
         .then(response => {
            return response.data;
         });
   },
   deleteTrack(id: string) {
      return instance.delete("/tracks/" + id)
         .then(response => {
            return response.data;
         });
   },
   insertTrack(track: FormData) {
      return instance.post<TrackType>("/tracks/", track)
         .then(response => {
            return response.data;
         });
   },
   updateTrack(id: string) {
      return instance.put<TrackType>("/tracks/published/" + id)
         .then(response => {
            return response.data;
         });
   }
}

export const tracksHistoryAPI = {
   selectTracksHistory() {
      return instance.get<Array<TrackHistoryType>>("/tracksHistory")
         .then(response => {
            return response.data;
         });
   },
   deleteTracksHistory() {
      return instance.delete("/tracksHistory")
         .then(response => {
            return response.data;
         });
   },
   insertTrackHistory(trackHistory: TrackHistoryType) {
      return instance.post<TrackHistoryType>("/tracksHistory/", trackHistory)
         .then(response => {
            return response.data;
         });
   }
}



















