import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import { WatchlistItemPersonal } from "./WatchlistItemPersonal";
import FlickerContext from "../Global/FlickerContext";
import { useSelector } from "react-redux";
import { getPersonalWatchlist } from "../reducers";

export const PersonalWatchlist = () => {
  const { currentUser } = useContext(FlickerContext);
  const [personalWatchlist, setPersonalWatchlist] = useState([]);

  const watchlistItems = useSelector(getPersonalWatchlist);

  useEffect(() => {
    if (currentUser) {
      setPersonalWatchlist(currentUser.personalWatchlist);
    }
  }, [currentUser]);

  return currentUser ? (
    <Wrapper>
      <h3>Personal Watchlist</h3>
      <WatchlistSection>
        {watchlistItems.length > 0 &&
          watchlistItems.map((item) => {
            return <WatchlistItemPersonal item={item} />;
          })}
        {(watchlistItems === 0 || personalWatchlist.length === 0) && (
          <Default>Your watchlist is empty!</Default>
        )}
      </WatchlistSection>
    </Wrapper>
  ) : (
    <div>Loading...</div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 10px 0;
    font-size: 20px;
    padding: 10px 0;
  }
`;

const WatchlistSection = styled.div`
  border: 1px solid var(--primary-user-color);
  border-radius: 12px;
`;

const Default = styled.div`
  padding: 30px;
  text-align: center;
  color: white;
  font-size: 30px;
  opacity: 0.3;
`;
