import { useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React from "react";
import data from "./ProjectsData";
import "animate.css";

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handlePrevClick = () => {
    setSelectedProjectIndex(
      (selectedProjectIndex - 1 + data.length) % data.length
    );
  };

  const handleNextClick = () => {
    setSelectedProjectIndex((selectedProjectIndex + 1) % data.length);
  };

  return (
    <div id="projects" className="projects-container">
      <div className="arrow-container">
        <div className="projects-soon">
          <FaChevronDown className="arrow arrow-blink arrow-container" />
        </div>
        <div className="projects-grid">
          <div className="project-carousel">
            <div className="project-carousel-image">
              <img
                src={data[selectedProjectIndex].image}
                alt={data[selectedProjectIndex].title}
              />
            </div>
            <div className="project-carousel-info animate__animated animate__fadeInRight">
              <h3>{data[selectedProjectIndex].title}</h3>
              <p>{data[selectedProjectIndex].description}</p>
              <div className="buttons">
                <a href={data[selectedProjectIndex].githubUrl}>View Github</a>
                <a href={data[selectedProjectIndex].projectUrl}>View Site</a>
              </div>
            </div>
            <div className="project-carousel-buttons">
              <button onClick={handlePrevClick}>
                <FaChevronLeft />
              </button>
              <button onClick={handleNextClick}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
