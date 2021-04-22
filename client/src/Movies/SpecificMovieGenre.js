import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import FlickerContext from "../Global/FlickerContext";
import { SmallCard } from "../Global/SmallCard";

export const SpecificMovieGenre = () => {
  const genre = useParams();
  const { popularMovies, movieGenres, shows, showGenres } = useContext(
    FlickerContext
  );

  let matchedMovieGenre = movieGenres.filter((singleGenre) => {
    return singleGenre.name.toLowerCase() === genre.name;
  });

  let filteredMovies = popularMovies.filter((movie) => {
    return movie.genre_ids.includes(matchedMovieGenre[0].id);
  });

  return movieGenres && popularMovies ? (
    <Wrapper>
      <div>
        {filteredMovies.map((movie) => {
          return <SmallCard movie={movie} />;
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
