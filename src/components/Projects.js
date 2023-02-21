import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Projects = () => {
  return (
    <div className="projects-container">
      <div className="arrow-container">
        <p>Projects Coming Soon</p>
        <FaChevronDown className="arrow arrow-blink" />
      </div>
    </div>
  );
};

export default Projects;
