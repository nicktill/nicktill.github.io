import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import React from "react";
import data from "../components/ProjectsData";

const Projects = () => {
  const [showProjects, setShowProjects] = useState(true);
  // Add an event listener to check whether the user has scrolled down to show the projects

  return (
    <div id="projects" className="projects-container">
      <div className="arrow-container">
        <div className="projects-soon">
          <FaChevronDown className="arrow arrow-blink arrow-container" />
        </div>
        <div className="projects-grid">
          {data.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <img src={project.image} alt={project.title} />
              <p>{project.description}</p>
              <div className="buttons">
                <a href={project.githubUrl}>View Github</a>
                <a href={project.projectUrl}>View Site</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
