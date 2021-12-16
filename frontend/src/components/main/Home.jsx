import React from "react";
import { Home_Page } from "../../helpers_section/helperString";
import "../components.css";
const Home = () => {
  return (
    <>
      <div>
        <div className="content">
          <h1 className="heading">{Home_Page.GREETING}</h1>
          <img
            src="name.png"
            className="center"
            alt="The Gourmet Tavern"
          ></img>
        </div>
      </div>
    </>
  );
};

export default Home;
