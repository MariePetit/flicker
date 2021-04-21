import React, { useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import FlickerContext from "../Global/FlickerContext";
import { SmallCard } from "../Global/SmallCard";

export const SpecificGenre = () => {
  const genre = useParams();
  const { popularMovies, genres } = useContext(FlickerContext);

  let matchedGenre = genres.filter((singleGenre) => {
    return singleGenre.name.toLowerCase() === genre.name;
  });

  let filteredMovies = popularMovies.filter((movie) => {
    return movie.genre_ids.includes(matchedGenre[0].id);
  });

  return genres && popularMovies ? (
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
