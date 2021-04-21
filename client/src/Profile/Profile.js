import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import FlickerContext from "../Global/FlickerContext";
import photo from "../assets/placeholder-profile-img.png";
import { NavLink } from "react-router-dom";

const moment = require("moment");

export const Profile = () => {
  const { currentUser, linkedUser } = useContext(FlickerContext);
  const [lastMovieWatched, setLastMovieWatched] = useState(null);

  useEffect(() => {
    if (currentUser.watched.length > 0) {
      setLastMovieWatched(currentUser.watched[currentUser.watched.length - 1]);
    }
  }, [currentUser.watched]);

  return (
    <Wrapper>
      <Section1>
        <Frame>
          <ProfilePhoto src={photo} />
        </Frame>
        <SubSection>
          <h2>
            {currentUser.firstName} {currentUser.lastName}
          </h2>
          <p>Member since {moment(currentUser.joinedDate).format("YYYY")}</p>
          <LinkedSection>
            {linkedUser ? (
              <>
                <div>Flickering with:</div>
                <LinkedUserDetails>
                  <NavLink to="/flicker-partner">
                    {linkedUser.firstName} {linkedUser.lastName}
                  </NavLink>
                </LinkedUserDetails>
              </>
            ) : (
              <LinkedUserDetails>
                <NavLink to="/link-account">
                  Choose your Flicker Partner!
                </NavLink>
              </LinkedUserDetails>
            )}
          </LinkedSection>
        </SubSection>
      </Section1>
      <Section2>
        <UserInfo>Favorites</UserInfo>
        <SubDiv>
          <UserInfo>Last movie watched: </UserInfo>
          {lastMovieWatched ? (
            <div>{lastMovieWatched.title}</div>
          ) : (
            <div>No movies watched yet.</div>
          )}
        </SubDiv>

        <UserInfo>Shows currently watching</UserInfo>
        <UserInfo>See watchlists</UserInfo>
      </Section2>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin: 150px 100px 0 100px;
`;

const Section1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid var(--secondary-user-color);
  padding: 20px;
`;

const Frame = styled.div`
  border: 2px solid var(--secondary-user-color);
  height: 200px;
  width: 200px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 1;
`;

const ProfilePhoto = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin-top: 10px;
`;

const SubSection = styled.div`
  text-align: center;

  h2 {
    margin-top: 15px;
    font-size: 28px;
  }

  p {
    font-weight: normal;
    font-style: italic;
    margin-bottom: 15px;
  }
`;

const Section2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 20px;
  width: 100%;
  border: 1px solid var(--secondary-user-color);
`;

const LinkedSection = styled.div`
  display: flex;
  margin: 10px 0;
  padding: 20px;
  border: 1px solid var(--third-other-color);
  border-radius: 16px;
  background-color: var(--secondary-other-color);
`;

const LinkedUserDetails = styled.div`
  margin-left: 10px;
`;

const SubDiv = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  margin-right: 10px;
`;
