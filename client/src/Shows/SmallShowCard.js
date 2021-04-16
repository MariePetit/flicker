import React from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import { ActionBar } from "../Global/ActionBar";

const SmallShowCard = ({ show }) => {
  return (
    <Wrapper>
      <div>
        <h2>{show.name}</h2>
      </div>
      <Poster
        to={`/shows/${show.id}`}
        style={{
          backgroundImage: `url(http://image.tmdb.org/t/p/w500${show.poster_path})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "none",
        }}
      ></Poster>
      <div>
        <ActionBar />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 400px;
  height: 600px;
  margin: 20px;
  border: 2px solid var(--secondary-user-color);
  border-radius: 8px;
  transition: 0.2s ease-in-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  h2 {
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 15px;
    width: 100%;
    text-align: center;
    z-index: 1;
  }

  div {
    width: 100%;
    height: 540px;
  }
`;

const Poster = styled(NavLink)`
  position: absolute;
  width: 400px;
  height: 600px;
  transition: 0.2s ease-in-out;
  border: none;
  transform: scale(1);

  &:hover {
    transform: scale(1.1);
  }
`;

export default SmallShowCard;
