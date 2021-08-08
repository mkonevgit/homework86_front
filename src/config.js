let port = 8000;
let host = "http://localhost";

if (process.env.REACT_APP_NODE_ENV === 'test') {
  port = 8010;
}

if (process.env.REACT_APP_CI) {
  host = "http://glamping-ci.ddns.net";
}

export default {
  apiUrl: host + ":" +port,
  artistsApiUrl: "http://localhost:8000/uploads/artists/",
  albumsApiUrl: "http://localhost:8000/uploads/albums/",
  tracksApiUrl: "http://localhost:8000/uploads/tracks/"
};