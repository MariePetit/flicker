import React, { useContext } from "react";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { removeItemJoint } from "../actions";
import FlickerContext from "../Global/FlickerContext";
import { IconBtn } from "../Global/IconBtn";

export const WatchlistItemJoint = ({ item }) => {
  const { currentUser } = useContext(FlickerContext);
  const dispatch = useDispatch();

  const removeFromWatchlist = () => {
    fetch(`/watchlist/${currentUser._id}`, {
      method: "DELETE",
      body: JSON.stringify({ ...item }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      dispatch(removeItemJoint(item));
    });
  };

  return (
    <Wrapper>
      <Section>
        <div>
          <h3>{item.title || item.name}</h3>
        </div>
        <div>
          <IconBtn onClick={removeFromWatchlist}>
            <FiX size={30} />
          </IconBtn>
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
