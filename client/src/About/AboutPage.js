import React from "react";

import styled from "styled-components";
import photo from "../assets/marie-photo.jpg";
import currentUserBg from "../assets/marie-bg.jpg";

export const AboutPage = () => {
  return (
    <Wrapper>
      <CreatorOverview
        style={{
          backgroundImage: `url(${currentUserBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundPositionY: "15%",
        }}
      >
        <Backdrop>
          <Frame>
            <ProfilePhoto src={photo} />
          </Frame>
          <SubSection>
            <h2>Marie Petit</h2>
            <h3>Concordia Journey Bootcamp Graduate - April 2021</h3>
            <p>
              Web developer, ukulele learner, talented shower singer & mom of
              the cutest doggo.
            </p>
          </SubSection>
        </Backdrop>
      </CreatorOverview>

      <CreatorMessage>
        <h2>Author's Note</h2>
        <p>
          Inspired to do a career change at the end of last year, I decided to
          follow my passion for technology and learn more about web development.
          As an avid gamer and technology user, I have been pursuing my infinite
          curiosity in understanding what happens behind the scenes of The
          Internet. Now that I graduated... Let the adventure begin!
        </p>
      </CreatorMessage>
      <FlickerDescription>
        <h2>🔥 What is Flicker? 🔥</h2>
        <p>
          Flicker is a web app designed to help you keep track of movies or
          shows you want to watch or have watched. To get started, set up your
          account and start browsing through our site! However, what makes
          Flicker so special is the possibility of linking your account with
          your significant other or BFF. Once you are Flicker Partners, any
          movies or shows you are both interested in will be added to a joint
          watchlist you can each access. No more browsing for endless hours on a
          streaming app, looking for something your both want to watch!
        </p>
        <p>
          This app is still in early development, and there are many more
          features to come, so make sure you keep a lookout for upcoming
          updates!
        </p>
        <h3>What can you do on Flicker at this time?</h3>
        <h4>Add to personal or joint watchlist</h4>
        <p>
          To make it extra easy for you on managing your watchlists, we do all
          the work in the background. All you have to do is click the ❤️ on the
          item card, and our algorithm will verify a few things:
        </p>
        <div></div>
        <ul>
          <li>
            If this movie/TV show is already in your personal watchlist, it will
            remove it from it (simply put, you're no longer interested in
            watching it).
          </li>
          <li>
            If it isn't already in your personal watchlist, it will check if
            your account is linked with someone, and if so, check if this movie
            is in their watchlist. If it is, then you guys are flickering and
            the item is added to both your joint watchlist. As a bonus, we're
            also taking it out of their personal watchlist - that way, they
            can't use the excuse "Oh, I didn't know you wanted to watch it... so
            I watched it without you!".
          </li>
          <li>
            If you have no one you're flickering with, then it simply gets added
            to your personal watchlist. The best part is... all you have to do
            is click and unclick the ❤️ for the magic to happen!
          </li>
        </ul>
        <h4>Add to favorites</h4>
        <p>
          A cool feature is the possibility to mark which movies or TV shows you
          really liked. It's pretty straightforward - just click the ⭐! This
          will show up on your profile page where your Flicker partner can take
          a peek and plan you the best movie night when you need it!
        </p>
        <h4>What if I already watched that?</h4>
        <p>
          You've already watched this movie? Well, just click on the 👀 to keep
          track of what you've already watched! Added bonus - you can then
          select whether you liked it or not by clicking the 👍 or 👎 that will
          magically appear!
        </p>
        <h4>Browsing movies or TV shows</h4>
        <p>
          Browse our database of 100 movies or TV shows by simply navigating to
          the appropriate tab. You can select a specific genre at the top of the
          list to help filter your search! Moreover, clicking on a movie or TV
          show card will take you a more detailed page, with a wide variety of
          information, like the year of release, all the tagged genres, a
          synopsis of the movie and the top cast!
        </p>
        <h4>Your profile page</h4>
        <p>
          Your profile page was designed to reflect your flickering interests!
          It will show you (and your Flicker Partner if you have one) what
          you've added as favorites, the movie/TV show you've most recently
          watched, and the last 5 movies/TV shows you liked! And guess what? You
          can see that same information for your Flicker Partner too!
        </p>
        ¨
      </FlickerDescription>

      <Credits />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreatorOverview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid var(--secondary-user-color);
  margin-top: -5px;

  h3 {
    margin: 5px 0;
  }

  div {
    margin-top: 5px;
  }
`;

const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(1px);
  width: 100%;
  padding: 20px;
`;

const Frame = styled.div`
  border: 4px solid var(--secondary-user-color);
  height: 200px;
  width: 200px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 1;
`;

const ProfilePhoto = styled.img`
  max-width: 100%;
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

const CreatorMessage = styled.div`
  margin: 0 75px;

  h2 {
    font-size: 30px;
    padding: 20px;
    text-align: center;
  }

  h4 {
    font-size: 24px;
    text-align: center;
    padding: 20px;
  }

  p {
    font-weight: normal;
    font-size: 20px;
    line-height: 1.6;
    margin: 15px auto;
  }
`;

const FlickerDescription = styled.div`
  margin: 20px 75px;
  border-top: 1px solid var(--secondary-user-color);

  h2 {
    font-size: 30px;
    padding: 20px;
    text-align: center;
  }

  h3 {
    font-size: 24px;
    text-align: center;
    padding: 20px;
  }

  h4 {
    font-size: 20px;
    text-align: center;
    padding: 20px;
  }

  p {
    font-weight: normal;
    font-size: 20px;
    line-height: 1.6;
    margin: 15px auto;
  }

  ul {
    list-style-type: disc;
    margin: 0 20px;
    font-weight: normal;

    li {
      margin: 20px 0;
      font-size: 20px;
    }
  }
`;
const Credits = styled.div``;
