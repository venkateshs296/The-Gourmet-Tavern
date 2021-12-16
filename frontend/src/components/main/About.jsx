import React from "react";
import { about_page } from "../../helpers_section/helperString";

const About = () => {
  return (
    <div>
      <h4>{about_page.ABOUT_US}</h4>
      <div className="team">
        <img src="Aakash.jpg" alt="Aakash" width="200" height="225"></img>
        <img src="raghav.jpg" alt="Raghav" width="200" height="225"></img>
        <img src="venkatesh.jpg" alt="Venkatesh" width="200" height="225"></img>
      </div>
      <p className="about">{about_page.ABOUT_US_DESCRIPTION}</p>
    </div>
  );
};

export default About;
