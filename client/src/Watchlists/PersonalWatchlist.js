import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import FlickerContext from "../Global/FlickerContext";

import { getPersonalWatchlist } from "../reducers";
import { SmallCardPersonal } from "./SmallCardPersonal";

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
            return <SmallCardPersonal item={item} />;
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
    margin: 10px 15px 0 15px;
    font-size: 30px;
    padding: 10px 0;
  }
`;

const WatchlistSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Default = styled.div`
  padding: 30px;
  text-align: center;
  color: white;
  font-size: 30px;
  opacity: 0.3;
`;
