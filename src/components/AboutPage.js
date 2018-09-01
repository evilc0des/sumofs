import React from 'react';
//import { Link } from 'react-router-dom';
import '../styles/about-page.scss';

// Since this component is simple and static, there's no parent container for it.
const AboutPage = () => {
  return (
    <div className="main-about-container">
      <h2 className="alt-header">About</h2>
      <p>
        SumoFS has been created as a testing project for the recruitment process of Sumo Logic
        <br/>
        <br/>
        &copy;Dk Saha. 2018.
        <br/>
        Contact: <a href="mailto:dhrtklpsh82@gmail.com">dhrtklpsh82@gmail.com</a>
      </p>
    </div>
  );
};

export default AboutPage;