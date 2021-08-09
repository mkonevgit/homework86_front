let port = 8000;
let host = "http://localhost";

if (process.env.REACT_APP_CI) {
  host = "http://glamping-ci.ddns.net";
}

export default {
  apiUrl: host + ":" + port,
  artistsApiUrl: host + ":" + port + "/uploads/artists/",
  albumsApiUrl: host + ":" + port + "/uploads/albums/",
  tracksApiUrl: host + ":" + port + "/uploads/tracks/",
};