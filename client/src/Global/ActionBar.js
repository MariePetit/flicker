import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  FiHeart,
  FiStar,
  FiThumbsDown,
  FiThumbsUp,
  FiEye,
} from "react-icons/fi";
import styled from "styled-components";
import { IconBtn } from "./IconBtn";

import { addItemJoint, addItemPersonal } from "../actions";
import FlickerContext from "./FlickerContext";

export const ActionBar = ({ movie, show }) => {
  const dispatch = useDispatch();
  const { currentUser, updatingUser, setUpdatingUser } = useContext(
    FlickerContext
  );

  const [isInterested, setIsInterested] = useState(false);
  const [watched, setWatched] = useState(false);

  //INDICATE MOVIES/SHOWS FROM WATCHLIST AS ALREADY ADDED
  let alreadyAddedMoviePersonal =
    movie && currentUser.personalWatchlist.some((item) => item.id === movie.id);

  let alreadyAddedShowPersonal =
    show && currentUser.personalWatchlist.some((item) => item.id === show.id);

  let alreadyAddedMovieJoint =
    movie && currentUser.jointWatchlist.some((item) => item.id === movie.id);

  let alreadyAddedShowJoint =
    show && currentUser.jointWatchlist.some((item) => item.id === show.id);

  useEffect(() => {
    if (alreadyAddedMoviePersonal || alreadyAddedShowPersonal) {
      dispatch(addItemPersonal(movie || show));
      setIsInterested(true);
    }
  }, [alreadyAddedMoviePersonal, alreadyAddedShowPersonal]);

  useEffect(() => {
    if (alreadyAddedMovieJoint || alreadyAddedShowJoint) {
      dispatch(addItemJoint(movie || show));
      setIsInterested(true);
    }
  }, [alreadyAddedMovieJoint, alreadyAddedShowJoint]);

  //INDICATE MOVIES/SHOWS ALREADY WATCHED AS WATCHED
  let alreadyWatchedMovies =
    movie && currentUser.watched.some((item) => item.id === movie.id);

  let alreadyWatchedShows =
    show && currentUser.watched.some((item) => item.id === show.id);

  useEffect(() => {
    if (alreadyWatchedMovies || alreadyWatchedShows) {
      setWatched(true);
    }
  }, [alreadyWatchedMovies, alreadyWatchedShows]);

  const toggleWatchlist = () => {
    // console.log(currentUser);
    setIsInterested(!isInterested);
    fetch(`/watchlist/${currentUser._id}`, {
      method: "POST",
      body: JSON.stringify({ ...(movie || show) }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { status, msg } = data;
        if (status === 202) {
          if (msg === "Added to personal watchlist!") {
            dispatch(addItemPersonal(movie || show));
          } else if (msg === "Added to joint watchlist!") {
            dispatch(addItemJoint(movie || show));
          }
        } else {
          alert("Unexpected error, please try again");
        }
      })
      .then(setUpdatingUser(!updatingUser));
  };

  const toggleWatched = () => {
    setWatched(!watched);
    fetch(`/watched/${currentUser._id}`, {
      method: "POST",
      body: JSON.stringify({ ...(movie || show) }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(setUpdatingUser(!updatingUser));
  };

  return (
    <Wrapper>
      {/* FAVORITE */}
      <IconBtn size={30} color="rgb(255, 215, 0)">
        <FiStar size={30} />
      </IconBtn>

      {watched ? (
        <>
          {/* //DIDN'T LIKE */}
          <IconBtn size={30} color="rgb(255, 0, 0)">
            <FiThumbsDown size={30} />
          </IconBtn>

          {/* WATCHED */}
          <IconBtn size={30} color="rgb(30, 144, 255)" onClick={toggleWatched}>
            <FiEye size={30} isToggled={watched} color="rgb(30, 144, 255)" />
          </IconBtn>

          {/* //LIKED */}
          <IconBtn size={30} color="rgb(30, 144, 255)">
            <FiThumbsUp size={30} />
          </IconBtn>
        </>
      ) : (
        // DIDN'T WATCH
        <IconBtn size={30} color="rgb(30, 144, 255)" onClick={toggleWatched}>
          <FiEye size={30} isToggled={watched} />
        </IconBtn>
      )}

      {/* //INTERESTED */}
      <IconBtn size={30} color="rgb(224, 36, 94)" onClick={toggleWatchlist}>
        {isInterested ? (
          <FiHeart
            size={30}
            isToggled={isInterested}
            color="rgb(224, 36, 94)"
          />
        ) : (
          <FiHeart size={30} isToggled={isInterested} />
        )}
      </IconBtn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  width: 100%;
  z-index: 1;
`;
