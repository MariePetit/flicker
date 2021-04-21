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
      res.status(400).json({ status: 400, msg: "This email already exists." });
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
        jointWatchlist: [],
        linkedUser: [],
      });
      assert.strictEqual(1, result.insertedCount);

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

//LOGGING IN
const logUser = async (req, res) => {
  const { email, password } = req.body;
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("flicker");
  console.log("Connected!");

  try {
    const mainUser = await db.collection("users").findOne({ email });
    const mainUserId = { _id: ObjectId(mainUser._id) };

    if (!mainUser) {
      return res.status(404).json({ status: 404, msg: "Not Found" });
    }
    const validPassword = await bcrypt.compare(password, mainUser.password);

    if (validPassword) {
      if (mainUser.linkedUser.length > 0) {
        const otherUser = mainUser.linkedUser[0];
        const otherUserId = { _id: ObjectId(otherUser._id) };

        const updatedOtherUser = await db
          .collection("users")
          .findOne(otherUserId);

        const newValue = [{ $set: { linkedUser: updatedOtherUser } }];

        const updatingOtherUserInMain = await db
          .collection("users")
          .updateOne(mainUserId, newValue);

        assert.strictEqual(updatingOtherUserInMain.matchedCount, 1);

        return res.status(200).json({ status: 200, data: mainUser });
      } else {
        return res.status(200).json({ status: 200, data: mainUser });
      }
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

//FIND USER
const findUser = async (req, res) => {
  const { id } = req.params;

  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("flicker");
  console.log("Connected!");

  try {
    //finding main user
    const mainUserId = { _id: ObjectId(id) };
    const mainUser = await db.collection("users").findOne(mainUserId);

    return res.status(200).json({ status: 200, data: mainUser });
  } catch (err) {
    console.log(err.message);
  }
  client.close();
  console.log("Disconnected!");
};

//LINK USER
const linkUser = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("flicker");
  console.log("Connected!");

  try {
    //finding main user and other user
    const mainUserId = { _id: ObjectId(id) };
    const mainUser = await db.collection("users").findOne(mainUserId);
    const otherUser = await db.collection("users").findOne({ email });
    const otherUserId = { _id: ObjectId(otherUser._id) };

    //adding otherUser as a LinkedUser
    const newValue = { $addToSet: { linkedUser: otherUser } };
    const newValueOther = { $addToSet: { linkedUser: mainUser } };

    //if no otherUser, return error
    if (!otherUser) {
      console.log("User not found");
      return res.status(404).json({ status: 404, msg: "User Not Found" });
    } else {
      //if otherUser, adds them to main user's linkedAccount array
      const addingOtherUserToMain = await db
        .collection("users")
        .updateOne(mainUserId, newValue);

      //now add main user to second user's linked account
      const addingMainUserToOtheruser = await db
        .collection("users")
        .updateOne(otherUserId, newValueOther);

      assert.strictEqual(addingOtherUserToMain.matchedCount, 1);
      assert.strictEqual(addingMainUserToOtheruser.matchedCount, 1);

      res.status(202).json({
        status: 202,
        data: { mainUser, otherUser },
        msg: "Accounts linked!",
      });
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

  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("flicker");
  console.log("Connected!");

  try {
    const mainUserId = { _id: ObjectId(id) };
    const mainUser = await db.collection("users").findOne(mainUserId);

    const removeValue = {
      $pull: { personalWatchlist: { id: watchlistItem.id } },
    };

    //CHECK IF ALREADY IN PERSONAL WATCHLIST
    const alreadyAdded = mainUser.personalWatchlist.some(
      (item) => item.id === watchlistItem.id
    );

    //IF NO OTHER USER
    if (mainUser.linkedUser.length === 0) {
      //if already added, then remove movie

      if (alreadyAdded) {
        console.log("no other user, already in personal watchlist");
        const result = await db
          .collection("users")
          .updateOne(mainUserId, removeValue);
        assert.strictEqual(result.matchedCount, 1);

        res.status(202).json({
          status: 202,
          data: removeValue,
          msg: "Removed from personal watchlist!",
        });

        //if not already in personal watchlist, then add it
      } else {
        console.log("no other user, not yet in personal watchlist");
        let newValue = { $addToSet: { personalWatchlist: watchlistItem } };
        const result = await db
          .collection("users")
          .updateOne(mainUserId, newValue);

        assert.strictEqual(result.matchedCount, 1);

        res.status(202).json({
          status: 202,
          data: newValue,
          msg: "Added to personal watchlist!",
        });
      }
    }
    //IF THERE IS A LINKED USER
    else {
      const otherUser = mainUser.linkedUser[0];
      const otherUserId = { _id: ObjectId(otherUser._id) };

      const alreadyAddedOther = otherUser.personalWatchlist.some(
        (item) => item.id === watchlistItem.id
      );
      //check if movie is already in main user's personal watchlist
      if (alreadyAdded) {
        console.log("linked user, already in personal watchlist");
        const result = await db
          .collection("users")
          .updateOne(mainUserId, removeValue);
        assert.strictEqual(result.matchedCount, 1);

        res.status(202).json({
          status: 202,
          data: removeValue,
          msg: "Removed from personal watchlist!",
        });

        //if not already in watchlist, but movie is already in linked user's watchlist
      } else if (!alreadyAdded && alreadyAddedOther) {
        console.log(
          "linked user, not in personal watchlist, in linked's watched list"
        );
        let newValue = { $addToSet: { jointWatchlist: watchlistItem } };
        const addMovieToMainJointWatchlist = await db
          .collection("users")
          .updateOne(mainUserId, newValue);

        const addMovieToOtherJointWatchlist = await db
          .collection("users")
          .updateOne(otherUserId, newValue);

        const removeMovieFromOtherPersonalWatchlist = await db
          .collection("users")
          .updateOne(otherUserId, removeValue);

        assert.strictEqual(addMovieToMainJointWatchlist.matchedCount, 1);
        assert.strictEqual(addMovieToOtherJointWatchlist.matchedCount, 1);
        assert.strictEqual(
          removeMovieFromOtherPersonalWatchlist.matchedCount,
          1
        );

        res.status(202).json({
          status: 202,
          data: watchlistItem,
          msg: "Added to joint watchlist!",
        });
      }

      //if not in anyone's watchlist already
      else {
        console.log("linked user, not in anyone's personal watchlist");
        let newValue = { $addToSet: { personalWatchlist: watchlistItem } };
        const result = await db
          .collection("users")
          .updateOne(mainUserId, newValue);

        assert.strictEqual(result.matchedCount, 1);

        res.status(202).json({
          status: 202,
          data: newValue,
          msg: "Added to personal watchlist!",
        });
      }

      await client.close();
      console.log("Disconnected!");
    }
  } catch (err) {
    console.log(err);
  }
};

//REMOVE FROM WATCHLIST
const removeFromWatchlist = async (req, res) => {
  const item = req.body;
  const { id } = req.params;

  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("flicker");
  console.log("Connected!");

  try {
    const query = { _id: ObjectId(id) };
    const removeValue = {
      $pull: { personalWatchlist: { id: item.id } },
    };

    const result = await db.collection("users").updateOne(query, removeValue);
    assert.strictEqual(result.matchedCount, 1);

    console.log("removed?");

    res.status(202).json({
      status: 202,
      data: removeValue,
      msg: "Removed from personal watchlist!",
    });
    await client.close();
    console.log("Disconnected!");
  } catch (err) {
    console.log(err);
  }
};

//ADD TO WATCHED
const addToWatched = async (req, res) => {
  const watchedItem = req.body;
  const { id } = req.params;

  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("flicker");
  console.log("Connected!");

  try {
    const query = { _id: ObjectId(id) };
    const newValue = { $addToSet: { watched: watchedItem } };
    const removeValue = { $pull: { id: watchedItem.id } };

    //CHECK IF ALREADY WATCHED
    const loggedUser = await db.collection("users").findOne(query);

    const alreadyAdded = loggedUser.watched.some(
      (item) => item.id === watchedItem.id
    );

    if (alreadyAdded) {
      const result = await db.collection("users").updateOne(query, removeValue);
      assert.strictEqual(result.matchedCount, 1);

      console.log("removed?");

      res.status(202).json({
        status: 202,
        data: removeValue,
        msg: "Removed from watched!",
      });

      //IF NOT ALREADY WATCHED, THEN ADD TO DB
    } else {
      const result = await db.collection("users").updateOne(query, newValue);

      assert.strictEqual(result.modifiedCount, 1);

      res.status(202).json({
        status: 202,
        movie: watchedItem,
        msg: "Added to watched!",
      });
    }

    await client.close();
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
  logUser,
  findUser,
  linkUser,
  getAllMovies,
  getGenres,
  getTvShows,
  getMovieDetails,
  getTvShowDetails,
  addToPersonalWatchlist,
  addToWatched,
  removeFromWatchlist,
};
