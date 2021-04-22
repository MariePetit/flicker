import React, { useContext } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { removeItemJoint } from "../actions";
import FlickerContext from "../Global/FlickerContext";
import { IconBtn } from "../Global/IconBtn";

export const SmallCardJoint = ({ item }) => {
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
    <Wrapper
      style={{
        backgroundImage: `url(http://image.tmdb.org/t/p/w500${item.poster_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Header>
        <div>
          <h4>{item.title || item.name}</h4>
        </div>
        <div>
          <IconBtn onClick={removeFromWatchlist}>
            <FiX size={30} />
          </IconBtn>
        </div>
      </Header>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 300px;
  height: 450px;
  margin: 10px;
  border: 2px solid var(--secondary-user-color);
  border-radius: 8px;
  transition: 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  z-index: 1;
  transition: 1s ease-in-out;

  h4 {
    padding: 0 5px;
    color: white;
    text-align: center;
  }

  &:hover {
    button {
      color: var(--third-user-color);
    }
  }
`;
