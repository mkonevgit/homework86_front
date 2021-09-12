let port = 8001;
let host = "http://localhost";

if (process.env.REACT_APP_CI) {
  host = "http://164.90.180.194";
}

export default {
  apiUrl: host + ":" + port,
  artistsApiUrl: host + ":" + port + "/uploads/artists/",
  albumsApiUrl: host + ":" + port + "/uploads/albums/",
  tracksApiUrl: host + ":" + port + "/uploads/tracks/",
};