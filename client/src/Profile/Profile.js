import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import FlickerContext from "../Global/FlickerContext";
import photo from "../assets/placeholder-profile-img.png";
import { NavLink } from "react-router-dom";
import { SmallCardAlt } from "../Global/SmallCard-Alt";
import { FiEye, FiStar, FiThumbsUp } from "react-icons/fi";

const moment = require("moment");

export const Profile = () => {
  const { currentUser, linkedUser } = useContext(FlickerContext);
  const [lastMovieWatched, setLastMovieWatched] = useState(null);
  const [lastLiked, setLastLiked] = useState(null);

  useEffect(() => {
    if (currentUser.watched.length > 0) {
      setLastMovieWatched(currentUser.watched[currentUser.watched.length - 1]);
    }
  }, [currentUser.watched]);

  useEffect(() => {
    if (currentUser.liked.length > 0) {
      setLastLiked(
        currentUser.liked.slice((Math.max(currentUser.liked.length) - 5, 0))
      );
    }
  }, [currentUser.liked]);

  console.log(currentUser.liked);
  console.log(lastLiked);
  return (
    <Wrapper>
      <InfoSection>
        <Frame>
          <ProfilePhoto src={photo} />
        </Frame>
        <SubSection1>
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
        </SubSection1>
      </InfoSection>

      <DetailsSection>
        <SubDiv>
          <UserInfo>
            <FiStar size={25} color="rgb(255, 215, 0)" />
            My Favorites
          </UserInfo>

          <CardsSection>
            {currentUser.favorites.length > 0 ? (
              currentUser.favorites.map((favorite) => {
                return <SmallCardAlt item={favorite} />;
              })
            ) : (
              <div>No favorites yet.</div>
            )}
          </CardsSection>
        </SubDiv>

        <SubDiv>
          <UserInfo>
            <FiEye size={25} color="rgb(30, 144, 255)" /> Last watched:
          </UserInfo>

          <CardsSection>
            {lastMovieWatched ? (
              <SmallCardAlt item={lastMovieWatched} />
            ) : (
              <div>No movies watched yet.</div>
            )}
          </CardsSection>
        </SubDiv>

        <SubDiv>
          <UserInfo>
            <FiThumbsUp size={25} color="rgb(94, 198, 65)" />
            Most Recently Liked
          </UserInfo>
          <CardsSection>
            {lastLiked ? (
              lastLiked.map((item) => {
                return <SmallCardAlt item={item} />;
              })
            ) : (
              <div>No movies liked yet.</div>
            )}
          </CardsSection>
        </SubDiv>
      </DetailsSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin: 150px 100px 0 100px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid var(--secondary-user-color);
  padding: 20px;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 20px;
  width: 100%;
  border: 1px solid var(--secondary-user-color);
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

const SubSection1 = styled.div`
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
  flex-direction: column;

  h3 {
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 22px;

    svg {
      margin-right: 10px;
    }
  }
`;

const CardsSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserInfo = styled.h3`
  margin: 10px 0;
`;
