import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import FlickerContext from "../Global/FlickerContext";
import photo from "../assets/placeholder-profile-img.png";
import logo from "../assets/flicker-logo.png";
import { NavLink } from "react-router-dom";
import { FiEye, FiStar, FiThumbsUp } from "react-icons/fi";
import { SmallCardAlt } from "../Global/SmallCard-Alt";

const moment = require("moment");

export const FlickerPartnerProfile = () => {
  const { currentUser, linkedUser } = useContext(FlickerContext);
  const [lastMovieWatched, setLastMovieWatched] = useState(null);
  const [lastLiked, setLastLiked] = useState(null);

  console.log(linkedUser);
  useEffect(() => {
    if (linkedUser && linkedUser.watched.length > 0) {
      setLastMovieWatched(linkedUser.watched[linkedUser.watched.length - 1]);
    }
  }, [linkedUser]);

  useEffect(() => {
    if (linkedUser && linkedUser.liked.length > 0) {
      setLastLiked(
        linkedUser.liked.slice((Math.max(linkedUser.liked.length) - 5, 0))
      );
    }
  }, [linkedUser]);

  return linkedUser ? (
    <Wrapper>
      <InfoSection>
        <Frame>
          <ProfilePhoto src={photo} />
        </Frame>

        <SubSection1>
          <h2>
            {linkedUser.firstName} {linkedUser.lastName}
          </h2>
          <p>Member since {moment(linkedUser.joinedDate).format("YYYY")}</p>
          <LinkedSection>
            <div>Flickering with:</div>
            <LinkedUserDetails>
              <NavLink to="/profile">
                {currentUser.firstName} {currentUser.lastName}
              </NavLink>
            </LinkedUserDetails>
          </LinkedSection>
        </SubSection1>
      </InfoSection>

      <DetailsSection>
        <SubDiv>
          <UserInfo>
            <FiStar size={25} color="rgb(255, 215, 0)" />
            Their Favorites
          </UserInfo>
          <CardsSection>
            {linkedUser.favorites.length > 0 ? (
              linkedUser.favorites.map((favorite) => {
                return <SmallCardAlt item={favorite} />;
              })
            ) : (
              <Text>No favorites yet.</Text>
            )}
          </CardsSection>
        </SubDiv>

        <SubDiv>
          <UserInfo>
            <FiEye size={25} color="rgb(30, 144, 255)" /> Last watched:{" "}
          </UserInfo>
          {lastMovieWatched ? (
            <SmallCardAlt item={lastMovieWatched} />
          ) : (
            <Text>No movies watched yet.</Text>
          )}
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
              <Text>No movies liked yet.</Text>
            )}
          </CardsSection>
        </SubDiv>
      </DetailsSection>
    </Wrapper>
  ) : (
    <Default>
      <div>Find a Flicker Partner to see their profile page!</div>
      <div>
        <Logo src={logo} />
      </div>
    </Default>
  );
};

const Default = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
  margin: 150px 100px 0 100px;

  div {
    font-size: 26px;
  }
`;

const Logo = styled.img`
  margin-top: 40px;
  height: 110px;
  width: 120px;
`;

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
  border: 1px solid var(--secondary-other-color);
  padding: 20px;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 20px;
  width: 100%;
  border: 1px solid var(--secondary-other-color);
`;

const Frame = styled.div`
  border: 2px solid var(--secondary-other-color);
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
  border: 1px solid var(--third-user-color);
  border-radius: 16px;
  background-color: var(--secondary-user-color);
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

const Text = styled.div`
  margin-left: 50px;
  font-weight: normal;
  opacity: 0.5;
`;
