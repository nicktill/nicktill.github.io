import { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import React from "react";
import data from "./ProjectsData";
import "animate.css";

const Projects = ({ onShowBannerText }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [showProjects, setShowProjects] = useState(false);
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [animationClass, setAnimationClass] = useState("animate__jackInTheBox");

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handlePrevClick = () => {
    setAnimationClass("animate__backOutLeft");
    setTimeout(() => {
      if (selectedProjectIndex === 0) {
        setSelectedProjectIndex(data.length - 1);
      } else {
        setSelectedProjectIndex((selectedProjectIndex - 1) % data.length);
      }
      setAnimationClass("animate__backInRight");
    }, 1000);
  };

  const handleNextClick = () => {
    setAnimationClass("animate__backOutLeft");
    setTimeout(() => {
      // Fixed: Just move to next project, don't close modal
      setSelectedProjectIndex((selectedProjectIndex + 1) % data.length);
      setAnimationClass("animate__backInRight");
    }, 1000);
  };

  const handleShowProjects = () => {
    setShowProjects(true);
    setShowProjectsModal(true);
    onShowBannerText && onShowBannerText(false);
    // Lock body scroll on mobile
    document.body.style.overflow = 'hidden';
  };

  const handleCloseProjectsModal = () => {
    setShowProjectsModal(false);
    setShowProjects(false);
    onShowBannerText && onShowBannerText(true);
    // Restore body scroll
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {showProjects && (
        <div className="projects-section">
          {/* Main container */}
          <div className="projects-container">
            {/* New close button inside container */}
            <button
              className="close-btn"
              onClick={handleCloseProjectsModal}
              aria-label="Close projects"
            >
              <span>×</span>
            </button>
            
            <div className="project-carousel">
              {/* Project image */}
              <div className="project-carousel-image">
                <a
                  href={data[selectedProjectIndex].projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={`project-carousel-img animate__animated ${animationClass}`}
                    src={data[selectedProjectIndex].image}
                    alt={data[selectedProjectIndex].title}
                  />
                </a>
              </div>
              
              {/* Project info */}
              <div className={`project-carousel-info animate__animated ${animationClass}`}>
                <h3>{data[selectedProjectIndex].title}</h3>
                <p>{data[selectedProjectIndex].description}</p>
                <div className="buttons-container">
                  {/* Navigation arrows positioned around buttons */}
                  <button
                    className="arrow-btn left-arrow"
                    onClick={handlePrevClick}
                    aria-label="Previous project"
                  >
                    ‹
                  </button>
                  
                  <div className="buttons">
                    <a
                      href={data[selectedProjectIndex].githubUrl}
                      className="button secondary-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Github
                    </a>
                    <a
                      href={data[selectedProjectIndex].projectUrl}
                      className="button primary-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Site
                    </a>
                  </div>
                  
                  <button
                    className="arrow-btn right-arrow"
                    onClick={handleNextClick}
                    aria-label="Next project"
                  >
                    ›
                  </button>
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="progress-indicator">
                {data.map((_, index) => (
                  <div
                    key={index}
                    className={`progress-dot ${index === selectedProjectIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!showProjects && (
        <button className="showProjectsBtn" onClick={handleShowProjects}>
          <span>View Projects</span>
          <span className="btn-icon">→</span>
        </button>
      )}

      <style jsx>{`
        .projects-section {
          position: absolute;
          top: -15%;
          right: -75%;
          width: 85%;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          z-index: 100;
          animation: slideInRight 0.6s ease-out;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .close-btn {
          position: absolute;
          top: -70px;
          right: -5px;
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.5) 0%, rgba(220, 38, 38, 0.9) 100%);
          border: 1px solid rgba(239, 68, 68, 0.6);
          border-radius: 50%;
          color: white;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1002;
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
        }

        .close-btn span {
          font-size: 18px;
          line-height: 1;
          font-weight: 400;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .close-btn:hover {
          background: linear-gradient(135deg, rgba(239, 68, 68, 1) 0%, rgba(220, 38, 38, 1) 100%);
          border-color: rgba(239, 68, 68, 0.8);
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        }

        .close-btn:active {
          transform: scale(0.95);
        }

        .projects-container {
          position: relative;
          width: 100%;
          height: auto;
          max-width: none;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-carousel {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }

        .project-carousel-image {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }

        .project-carousel-image::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            rgba(131, 169, 236, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
          border-radius: 16px;
          pointer-events: none;
        }

        .project-carousel-img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          object-position: top;
          border-radius: 16px;
          transition: transform 0.3s ease;
        }

        .project-carousel-image:hover .project-carousel-img {
          transform: scale(1.02);
        }

        .project-carousel-info {
          text-align: center;
          color: white;
        }

        .project-carousel-info h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .project-carousel-info p {
          font-size: 0.9rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        /* New container for buttons with arrows */
        .buttons-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 0.5rem;
        }

        .buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .arrow-btn {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: white;
          font-size: 1.3rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          flex-shrink: 0;
        }

        .arrow-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .arrow-btn:active {
          transform: scale(0.95);
        }

        .button {
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .primary-btn {
          background: linear-gradient(
            to right,
            rgba(79, 118, 185, 0.9),
            rgba(86, 137, 180, 0.9),
            rgba(93, 156, 175, 0.85),
            rgba(100, 175, 170, 0.85),
            rgba(107, 194, 165, 0.8),
            rgba(110, 208, 159, 0.8),
            rgba(115, 215, 165, 0.75),
            rgba(120, 222, 170, 0.75)
          );
          background-size: 200% 100%;
          color: white;
          border: none;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
          animation: gradient-shift 15s linear infinite;
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          filter: brightness(1.1);
          color: white;
        }

        .secondary-btn {
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .secondary-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          color: white;
        }

        .progress-indicator {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .progress-dot.active {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          transform: scale(1.2);
        }

        .showProjectsBtn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .showProjectsBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .btn-icon {
          transition: transform 0.3s ease;
        }

        .showProjectsBtn:hover .btn-icon {
          transform: translateX(2px);
        }

        /* Mobile responsiveness */
        @media screen and (max-width: 768px) {
          .projects-section {
            top: -200px;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: url('../assets/img/banner-2.jpg');
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            z-index: 1001;
          }
          
          .projects-container {
            width: 90%;
            max-width: 420px;
            height: auto;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            overflow: visible;
            margin: -2rem auto 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .project-carousel {
            gap: 0.75rem;
          }

          .close-btn {
            top: -40px;
            right: 10px;
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(220, 38, 38, 1) 100%);
            border: 1px solid rgba(239, 68, 68, 0.8);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
          }

          .close-btn span {
            font-size: 18px;
          }

          .project-carousel-img {
            height: 220px;
          }

          .project-carousel-info {
            padding: 0.5rem 0;
          }

          .project-carousel-info h3 {
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
          }

          .project-carousel-info p {
            font-size: 0.9rem;
            margin-bottom: 1rem;
            line-height: 1.5;
          }

          .buttons-container {
            gap: 1.2rem;
            margin-top: 0.5rem;
          }

          .arrow-btn {
            width: 36px;
            height: 36px;
            font-size: 1.2rem;
          }

          .buttons {
            gap: 0.8rem;
          }

          .button {
            padding: 0.7rem 1.3rem;
            font-size: 0.9rem;
          }

          .progress-indicator {
            margin-top: 0.75rem;
          }

          .progress-dot {
            width: 6px;
            height: 6px;
          }

          .showProjectsBtn {
            font-size: 0.9rem;
            padding: 0.6rem 1.2rem;
            margin: 1rem auto 0 auto;
            width: fit-content;
          }
        }

        @media screen and (max-width: 480px) {
          .projects-section {
            padding: 1rem 0.8rem;
            background: url('../assets/img/banner-2.jpg');
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
          }

          .projects-container {
            width: 90%;
            max-width: 380px;
            padding: 1.2rem;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            margin: -3rem auto 0 auto;
          }

          .close-btn {
            top: -35px;
            right: 15px;
            width: 30px;
            height: 30px;
          }

          .close-btn span {
            font-size: 16px;
          }

          .project-carousel-img {
            height: 180px;
          }

          .project-carousel-info h3 {
            font-size: 1.2rem;
          }

          .project-carousel-info p {
            font-size: 0.85rem;
          }
          
          .buttons-container {
            gap: 1rem;
          }

          .arrow-btn {
            width: 32px;
            height: 32px;
            font-size: 1rem;
          }

          .buttons {
            gap: 0.6rem;
          }

          .button {
            padding: 0.6rem 1.1rem;
            font-size: 0.85rem;
          }

          .progress-dot {
            width: 6px;
            height: 6px;
          }
        }
      `}</style>
    </>
  );
};

export default Projects;