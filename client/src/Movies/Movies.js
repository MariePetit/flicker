import React from "react";
import styled from "styled-components";
import { PopularMovies } from "./PopularMovies";

export const Movies = () => {
  return (
    <Wrapper>
      <div>
        <h3>Popular Movies</h3>
        <PopularMovies />
      </div>
      <div></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div > h3 {
    font-size: 26px;
  }
`;
