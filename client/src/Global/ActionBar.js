import React from "react";
import { useDispatch } from "react-redux";

import { FiHeart, FiX } from "react-icons/fi";
import styled from "styled-components";
import { IconBtn } from "./IconBtn";

import { addItem } from "../actions";

export const ActionBar = ({ movie }) => {
  const dispatch = useDispatch();

  const addToWatchlist = () => {
    console.log(movie);
    dispatch(addItem(movie));
    fetch("/personalWatchlist/:id", {
      method: "POST",
      body: JSON.stringify({ ...movie }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Wrapper>
      <IconBtn size={30} color="rgb(224, 36, 94)">
        <FiX size={30} />
      </IconBtn>
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
