import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { WatchlistItem } from "./WatchlistItem";
import { getWatchlist } from "../reducers";

export const Watchlist = () => {
  const addedItems = useSelector(getWatchlist);

  return (
    <Wrapper>
      <h3>Personal Watchlist</h3>
      <WatchlistSection>
        {addedItems.map((item) => {
          return <WatchlistItem item={item} />;
        })}
      </WatchlistSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 10px 0;
    font-size: 20px;
  }
`;

const WatchlistSection = styled.div`
  border: 1px solid var(--primary-user-color);
`;
