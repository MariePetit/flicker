import React, { useContext, useEffect } from "react";
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

import { addItem } from "../actions";
import FlickerContext from "./FlickerContext";

export const ActionBar = ({ movie }) => {
  const dispatch = useDispatch();
  const { currentUser, watched, setWatched } = useContext(FlickerContext);
  console.log(currentUser);
  console.log(watched);

  const addToWatchlist = () => {
    dispatch(addItem(movie));
    fetch(`/personalWatchlist/${currentUser._id}`, {
      method: "POST",
      body: JSON.stringify({ ...movie }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  const addToWatched = async () => {
    await fetch(`/watched/${currentUser._id}`, {
      method: "POST",
      body: JSON.stringify({ ...movie }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        await fetch(``);
      })
      .then((data) => {
        const { status, movie } = data;
        console.log("status", status);
        console.log("movie", movie);
        if (status === 202) {
          setWatched(true);
        }
      });
  };

  return (
    <Wrapper>
      <IconBtn size={30} color="rgb(255, 215, 0)">
        <FiStar size={30} />
      </IconBtn>

      {watched ? (
        <>
          <IconBtn size={30} color="rgb(255, 0, 0)">
            <FiThumbsDown size={30} />
          </IconBtn>
          <IconBtn size={30} color="rgb(30, 144, 255)">
            <FiThumbsUp size={30} />
          </IconBtn>
        </>
      ) : (
        <IconBtn size={30} color="rgb(30, 144, 255)">
          <FiEye size={30} onClick={addToWatched} />
        </IconBtn>
      )}

      <IconBtn size={30} color="rgb(23, 191, 99)" onClick={addToWatchlist}>
        <FiHeart size={30} />
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
