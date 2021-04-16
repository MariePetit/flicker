import React, { useContext } from "react";

import styled from "styled-components";
import FlickerContext from "../Global/FlickerContext";
import photo from "../assets/placeholder-profile-img.png";

const moment = require("moment");

export const Profile = () => {
  const { currentUser } = useContext(FlickerContext);

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
        </SubSection>
      </Section1>
      <Section2>
        <div>Favorites</div>
        <div>Last movie watched</div>
        <div>Shows currently watching</div>
        <div>See watchlists</div>
        <div>Flickered with:</div>
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
  flex-direction: row;
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
  margin-left: 20px;

  h2 {
    font-size: 28px;
  }

  p {
    font-weight: normal;
    font-style: italic;
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
