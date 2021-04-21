"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getAllMovies,
  createUser,
  logUser,
  findUser,
  getGenres,
  getTvShows,
  getMovieDetails,
  getTvShowDetails,
  addToPersonalWatchlist,
  addToWatched,
  removeFromWatchlist,
} = require("./handlers");

const PORT = 8000;

const app = express();

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("tiny"));
app.use(express.static("./server/assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

//ENDPOINTS
app.get("/popular-movies", getAllMovies);
app.post("/movies/:id", getMovieDetails);
app.get("/genres", getGenres);
app.post("/create-account", createUser);
app.post("/log-user", logUser);
app.get("/user/:id", findUser);
app.post("/link-user/:id", findUser);
app.get("/shows", getTvShows);
app.post("/shows/:id", getTvShowDetails);
app.post("/watchlist/:id", addToPersonalWatchlist);
app.delete("/watchlist/:id", removeFromWatchlist);
app.post("/watched/:id", addToWatched);

//CATCH-ALL ENDPOINT
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "🚧 Flicker - Under Construction 🚧",
  });
});

app.listen(PORT, () => console.info(`🌎 Listening on port ${PORT}`));
