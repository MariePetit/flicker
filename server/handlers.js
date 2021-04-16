const fetch = require("isomorphic-fetch");
const { MongoClient, ObjectId } = require("mongodb");
const assert = require("assert");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { MONGO_URI } = process.env;
const { API_KEY } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const pageNumber = Math.floor(Math.random() * 500);

//CREATING A USER IN DB
const createUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  const { firstName, lastName, email, password } = req.body;

  await client.connect();
  const db = client.db("flicker");
  console.log("Connected!");

  //check if email already exists before adding user!

  try {
    //Encrypting passwords when added to db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const date = new Date();
    //check if email is already in db
    const result = await db.collection("users").findOne({ email });

    if (result) {
      res.status(400).json({ status: 40, msg: "This email already exists." });
    } else {
      const result = await db.collection("users").insertOne({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        joinedDate: date,
        favorites: [],
        watched: [],
        showsCurrentlyWatching: [],
        personalWatchlist: [],
        joinedWatchlist: [],
        linkedUser: "",
      });
      assert.strictEqual(1, result.insertedCount);
      console.log(result);
      console.log(result.ops[0]);
      return (
        res.status(201).json({ status: 201, data: result.ops[0] }),
        await client.close(),
        console.log("Disconnected!")
      );
    }
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  await client.close();
  console.log("Disconnected!");
};

//FINDING USER IN DB
const findUser = async (req, res) => {
  const { email, password } = req.body;
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("flicker");
  console.log("Connected!");

  try {
    const result = await db.collection("users").findOne({ email });

    if (!result) {
      return res.status(404).json({ status: 404, msg: "Not Found" });
    }
    const validPassword = await bcrypt.compare(password, result.password);

    if (validPassword) {
      return res.status(200).json({ status: 200, data: result });
    } else {
      return res
        .status(401)
        .json({ status: 401, msg: "Password is incorrect!" });
    }
  } catch (err) {
    console.log(err.message);
  }
  client.close();
  console.log("Disconnected!");
};

//GET POPULAR MOVIES
const getAllMovies = async (req, res) => {
  const url1 = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const url2 = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=2`;
  const url3 = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=3`;
  const url4 = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=4`;
  const url5 = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=5`;

  try {
    const popularMovies = await fetch(url1).then((response) => {
      response.json().then(async (data) => {
        await fetch(url2)
          .then((response2) => response2.json())
          .then(async (data2) => {
            await fetch(url3)
              .then((response3) => response3.json())
              .then(async (data3) => {
                await fetch(url4)
                  .then((response4) => response4.json())
                  .then(async (data4) => {
                    return await fetch(url5)
                      .then((response5) => response5.json())
                      .then(async (data5) => {
                        let combinedResults = [
                          ...data.results,
                          ...data2.results,
                          ...data3.results,
                          ...data4.results,
                          ...data5.results,
                        ];
                        res
                          .status(201)
                          .json({ status: 201, data: combinedResults });
                      });
                  });
              });
          });
      });
    });
    return popularMovies;
  } catch (err) {
    console.log("Error!");
  }
};

//GET MOVIE GENRES
const getGenres = async (req, res) => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  try {
    const genres = await fetch(url).then((response) => {
      response.json().then((data) => {
        res.status(201).json({ status: 201, data: data.genres });
      });
    });
    return genres;
  } catch (err) {
    console.log("Error!");
  }
};

//GET MOVIE DETAILS
const getMovieDetails = async (req, res) => {
  const movieId = req.body;
  const movie_id = movieId.id;

  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`;
  try {
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        res.status(200).json({ status: 200, data });
      });
  } catch (err) {
    console.log(err);
  }
};

//GET POPULAR TV SHOWS
const getTvShows = async (req, res) => {
  const url1 = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const url2 = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=2`;
  const url3 = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=3`;
  const url4 = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=4`;
  const url5 = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=5`;

  try {
    const tvShows = await fetch(url1).then((response) => {
      response.json().then(async (data) => {
        await fetch(url2)
          .then((response2) => response2.json())
          .then(async (data2) => {
            await fetch(url3)
              .then((response3) => response3.json())
              .then(async (data3) => {
                await fetch(url4)
                  .then((response4) => response4.json())
                  .then(async (data4) => {
                    return await fetch(url5)
                      .then((response5) => response5.json())
                      .then(async (data5) => {
                        let combinedResults = [
                          ...data.results,
                          ...data2.results,
                          ...data3.results,
                          ...data4.results,
                          ...data5.results,
                        ];
                        res
                          .status(201)
                          .json({ status: 201, data: combinedResults });
                      });
                  });
              });
          });
      });
    });
    return tvShows;
  } catch (err) {
    console.log("Error!");
  }
};

//GET TV SHOW DETAILS
const getTvShowDetails = async (req, res) => {
  const showId = req.body;
  const show_id = showId.id;
  const url = `https://api.themoviedb.org/3/tv/${show_id}?api_key=${API_KEY}&language=en-US`;

  try {
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        res.status(200).json({ status: 200, data });
      });
  } catch (err) {
    console.log(err);
  }
};

//ADD PERSONAL WATCHLIST ITEMS TO DB
const addToPersonalWatchlist = async (req, res) => {
  const watchlistItem = req.body;
  const { id } = req.params;

  console.log(watchlistItem);
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("flicker");
  console.log("Connected!");

  try {
    const query = { _id: ObjectId(id) };
    console.log("query", query);
    const newValue = { $addToSet: { personalWatchlist: watchlistItem } };
    console.log("newValue", newValue);

    const result = await db.collection("users").updateOne(query, newValue);
    console.log("matchedCount", result.matchedCount);
    console.log("modifiedCount", result.modifiedCount);
    assert.strictEqual(result.modifiedCount, 1);

    res.status(202).json({
      status: 202,
      data: newValue,
      msg: "Added to personal watchlist!",
    }),
      await client.close(),
      console.log("Disconnected!");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      data: "User Watchlist not found",
      msg: err.message,
    });
  }
};

//ADD TO WATCHED
const addToWatched = async (req, res) => {
  const watchedItem = req.body;
  const { id } = req.params;

  console.log(watchedItem);
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("flicker");
  console.log("Connected!");

  try {
    const query = { _id: ObjectId(id) };
    console.log("query", query);
    const newValue = { $addToSet: { watched: watchedItem } };
    console.log("newValue", newValue);

    const result = await db.collection("users").updateOne(query, newValue);
    console.log("matchedCount", result.matchedCount);
    console.log("modifiedCount", result.modifiedCount);
    assert.strictEqual(result.modifiedCount, 1);

    res.status(202).json({
      status: 202,
      movie: watchedItem,
      msg: "Added to watched!",
    }),
      await client.close(),
      console.log("Disconnected!");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      data: "User not found",
      msg: err.message,
    });
  }
};

//GET ALL WATCHED

module.exports = {
  createUser,
  findUser,
  getAllMovies,
  getGenres,
  getTvShows,
  getMovieDetails,
  getTvShowDetails,
  addToPersonalWatchlist,
  addToWatched,
};
