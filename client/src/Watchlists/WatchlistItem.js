import React from "react";
import { FiX } from "react-icons/fi";

import styled from "styled-components";

export const WatchlistItem = ({ item }) => {
  console.log(item);
  return (
    <Wrapper>
      <Section>
        <div>
          <h3>{item.title}</h3>
        </div>
        <div>
          <FiX size={30} />
        </div>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    padding: 10px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
