import React from "react";

import styled from "styled-components";
import { JointWatchlist } from "./JointWatchlist";
import { PersonalWatchlist } from "./PersonalWatchlist";

export const WatchlistsPage = () => {
  return (
    <Wrapper>
      <h2>Your Watchlists</h2>
      <Section>
        <Item>Personal Watchlist</Item>
        <Item>Joint Watchlist</Item>
      </Section>
      <PersonalWatchlist />
      <JointWatchlist />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;

  h2 {
    text-align: center;
    margin: 10px;
    font-size: 26px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Item = styled.div`
  margin: 0 10px;
`;
