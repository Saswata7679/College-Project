import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import saswata from "../../../images/saswata.jpg"
import ankit from "../../../images/ankit.png"
const About = () => {
  const visitInstagram = () => {
    window.location = "";
  };
  return (
    <div className="aboutSection">
      <div className="aboutSectionGradient1"></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "1vmax 0" }}
              src={saswata}
              alt="Founder"
            />
            <Typography>Saswata Rakshit</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @rsaswata.
            </span>
          </div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={ankit}
              alt="Founder"
            />
            <Typography>Ankit Kumar</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @kankit. 
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
