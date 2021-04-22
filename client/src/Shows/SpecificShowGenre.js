import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import FlickerContext from "../Global/FlickerContext";
import { SmallCard } from "../Global/SmallCard";

export const SpecificShowGenre = () => {
  const genre = useParams();
  const { shows, showGenres } = useContext(FlickerContext);

  let matchedShowGenre = showGenres.filter((singleGenre) => {
    return singleGenre.name.toLowerCase() === genre.name;
  });

  let filteredShows = shows.filter((show) => {
    return show.genre_ids.includes(matchedShowGenre[0].id);
  });

  return shows && showGenres ? (
    <Wrapper>
      <div>
        {filteredShows.map((show) => {
          return <SmallCard show={show} />;
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
