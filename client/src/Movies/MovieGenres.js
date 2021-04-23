import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import { FlickerContext } from "../Global/FlickerContext";

export const MovieGenres = () => {
  const { movieGenres } = useContext(FlickerContext);

  return movieGenres ? (
    <>
      <Wrapper>
        <ItemList>
          <Item to={`/movies`}>All</Item>
          {movieGenres.map((genre) => {
            return (
              <Item
                to={`/movie-genres/${genre.name.toLowerCase()}`}
                genre={genre}
              >
                {genre.name}
              </Item>
            );
          })}
        </ItemList>
      </Wrapper>
    </>
  ) : (
    <div>Loading...</div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
`;

const ItemList = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const Item = styled(NavLink)`
  border-radius: 12px;
  margin: 6px;
  padding: 8px 15px;
  font-size: 20px;
  font-weight: normal;
  transition: 0.5s ease;

  &:hover,
  :focus {
    cursor: pointer;
    background-color: var(--third-user-color);
    color: black;
    font-weight: bold;
  }
`;
