import React, { useContext } from "react";

import styled from "styled-components";

import { FlickerContext } from "../Global/FlickerContext";
import { SmallMovieCard } from "./SmallMovieCard";

export const PopularMovies = () => {
  const { popularMovies } = useContext(FlickerContext);

  return popularMovies ? (
    <Wrapper>
      <div>
        {popularMovies.map((movie) => {
          return <SmallMovieCard movie={movie} />;
        })}
      </div>
    </Wrapper>
  ) : (
    <div>Loading...</div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: flex-start;
    flex-wrap: wrap;
  }
`;
