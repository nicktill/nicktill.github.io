import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import React from "react";
import GradeMyAid from "../assets/img/GradeMyAid.png";
import CryptoTracker from "../assets/img/CryptoTracker.png";
import Translator from "../assets/img/translator.png";
import Cookbook from "../assets/img/cookbook.png";
import MiniTwit from "../assets/img/minitwit.png";
import CostOfLiving from "../assets/img/costofliving.png";

const Projects = () => {
  const [showProjects, setShowProjects] = useState(true);
  const data = [
    {
      id: 1,
      title: "GradeMyAid",
      image: GradeMyAid,
      description: "Financial Aid Grade Scorer",
      projectUrl: "https://cs1530-finance-group.vercel.app/",
      githubUrl: "https://github.com/nicktill/cs1530-finance-group",
    },
    {
      id: 2,
      title: "CryptoTracker",
      image: CryptoTracker,
      description: "Crypto Tracker Dashboard",
      projectUrl: "https://crypto-tracker-nicktill.vercel.app/",
      githubUrl: "https://github.com/nicktill/crypto-tracker",
    },
    {
      id: 3,
      title: "Translator",
      image: Translator,
      description: "Translator App",
      projectUrl: "https://translator-app-nicktill.vercel.app/",
      githubUrl: "https://github.com/nicktill/translator-app",
    },
    {
      id: 4,
      title: "Mini-Twit",
      image: MiniTwit,
      description: "Description of Project 1",
      projectUrl: "https://mini-twit.vercel.app/",
      githubUrl: "https://github.com/nicktill/mini-twit",
    },
    {
      id: 5,
      title: "Cookbook",
      image: Cookbook,
      description: "Description of Project 1",
      projectUrl: "https://cookbookofficial.com",
      githubUrl: "https://github.com/nicktill/cookbook",
    },
    {
      id: 6,
      title: "Cost Of Living Calculator",
      image: CostOfLiving,
      description: "Description of Project 1",
      projectUrl: "https://cost-of-living-dusky.vercel.app/",
      githubUrl: "https://github.com/nicktill/cost-of-living",
    },
  ];

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
