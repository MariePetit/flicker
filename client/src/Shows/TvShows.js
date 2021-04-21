import React, { useContext } from "react";

import styled from "styled-components";
import FlickerContext from "../Global/FlickerContext";
import { SmallCard } from "../Global/SmallCard";

export const TvShows = () => {
  const { shows } = useContext(FlickerContext);

  return shows ? (
    <Wrapper>
      <div>
        {shows.map((show) => {
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
