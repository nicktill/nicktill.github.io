import { useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React from "react";
import data from "./ProjectsData";
import "animate.css";

const Projects = ({ onShowBannerText }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [showProjects, setShowProjects] = useState(false);

  const handlePrevClick = () => {
    setSelectedProjectIndex(
      (selectedProjectIndex - 1 + data.length) % data.length
    );
  };

  const handleNextClick = () => {
    setSelectedProjectIndex((selectedProjectIndex + 1) % data.length);
  };

  const handleShowProjects = () => {
    setShowProjects(true);
    onShowBannerText(false); // Notify the Banner component to hide the text
  };

  return (
    <>
      {showProjects && (
        <div className="overlay">
          <div className="projects-container">
            <div className="arrow-container">
              <div className="projects-soon"></div>
              <div className="projects-grid">
                <div className="project-carousel">
                  <div className="project-carousel-image">
                    <img
                      className="project-carousel-img"
                      src={data[selectedProjectIndex].image}
                      alt={data[selectedProjectIndex].title}
                    />
                  </div>
                  <div className="project-carousel-info animate__animated animate__fadeInRight">
                    <h3 className="text-center">
                      {data[selectedProjectIndex].title}
                    </h3>
                    <p>{data[selectedProjectIndex].description}</p>
                    <div className="buttons">
                      <a
                        href={data[selectedProjectIndex].githubUrl}
                        className="button"
                      >
                        View Github
                      </a>
                      <a
                        href={data[selectedProjectIndex].projectUrl}
                        className="button"
                      >
                        View Site
                      </a>
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
        </div>
      )}

      {!showProjects && (
        <button className="showProjectsBtn" onClick={handleShowProjects}>
          Show Projects
        </button>
      )}

      <style jsx>{`
    .projects-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
      
      .projects-container .project-carousel {
        width: 600px;
        height: 400px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(128, 128, 128, 0.5);
      }
      
      .projects-container .project-carousel-image {
        width: 100%;
        height: 200px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .projects-container .project-carousel-image img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        object-position: center;
      }
      
      .projects-container .project-carousel-info {
        padding: 1.5rem;
        color: white;
        text-align: center;
      }
      
      .projects-container .project-carousel-info h3 {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      
      .projects-container .project-carousel-info p {
        margin-bottom: 1rem;
      }
      
      .projects-container .buttons {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
      }
      
      .projects-container .buttons a {
        background-color: transparent;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        text-decoration: none;
        transition: all 0.2s ease-in-out;
        margin: 0 1rem;
        border: 1px solid white;
      }
      
      .projects-container .buttons a:hover {
        background-color: white;
        color: black;
      }
      
      .projects-container .project-carousel-buttons {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0 1.5rem;
      }
      
      .projects-container .project-carousel-buttons button {
        background-color: transparent;
        color: white;
        border: none;
        outline: none;
        font-size: 2rem;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }
      
      .projects-container .project-carousel-buttons button:hover {
        transform: scale(1.2);
      }
      
      .showProjectsBtn {
        --b: 3px; /* border thickness */
        --s: 0.45em; /* size of the corner */
        --color: #2b2b2b;
        opacity: 50%;
  
        padding: calc(0.5em + var(--s)) calc(0.9em + var(--s));
        color: var(--color);
        --_p: var(--s);
        background: conic-gradient(
            from 90deg at var(--b) var(--b),
            #0000 90deg,
            var(--color) 0
          )
          var(--_p) var(--_p) / calc(100% - var(--b) - 2 * var(--_p))
          calc(100% - var(--b) - 2 * var(--_p));
        transition: 0.3s linear, color 0s, background-color 0s;
        outline: var(--b) solid #0000;
        outline-offset: 0.6em;
        font-size: 16px;
  
        border: 0;
  
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
      }
  
      .showProjectsBtn:hover,
      .showProjectsBtn:focus-visible {
        --_p: 0px;
        outline-color: var(--color);
        outline-offset: 0.05em;
      }
  
      .showProjectsBtn:active {
        background: var(--color);
        color: #fff;
      }
      `}</style>
    </>
  );
};

export default Projects;
