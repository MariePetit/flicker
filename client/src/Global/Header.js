import React from "react";
import MediaQuery from "react-responsive";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

export const Header = () => {
  return (
    <div>
      <MediaQuery maxWidth={1048}>
        <MobileNavBar />
      </MediaQuery>
      <MediaQuery minWidth={1049}>
        <DesktopNavBar />
      </MediaQuery>
    </div>
  );
};
