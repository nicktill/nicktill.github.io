import { useState, useEffect } from "react";
import React from "react";
import data from "./ProjectsData";
import "animate.css";

const Projects = ({ onShowBannerText }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [showProjects, setShowProjects] = useState(false);
  const [animationClass, setAnimationClass] = useState("slide-in-center");
  const [introAnimationClass, setIntroAnimationClass] = useState("animate__jackInTheBox");
  const [viewedProjects, setViewedProjects] = useState(new Set([0])); // Track which projects have been viewed
  const [hasBeenShownBefore, setHasBeenShownBefore] = useState(false); // Track if component has been opened before

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handlePrevClick = () => {
    setAnimationClass("slide-out-right");
    setTimeout(() => {
      let newIndex;
      if (selectedProjectIndex === 0) {
        newIndex = data.length - 1;
      } else {
        newIndex = (selectedProjectIndex - 1) % data.length;
      }
      setSelectedProjectIndex(newIndex);
      
      // Track viewed projects
      const newViewedProjects = new Set(viewedProjects);
      newViewedProjects.add(newIndex);
      setViewedProjects(newViewedProjects);
      
      setAnimationClass("slide-in-left");
    }, 300);
  };

  const handleNextClick = () => {
    // Check if we're on the last project and user has seen all projects
    if (selectedProjectIndex === data.length - 1 && viewedProjects.size === data.length) {
      // Auto-close immediately instead of cycling
      handleAutoClose();
      return;
    }
    
    setAnimationClass("slide-out-left");
    setTimeout(() => {
      const newIndex = (selectedProjectIndex + 1) % data.length;
      setSelectedProjectIndex(newIndex);
      
      // Track viewed projects
      const newViewedProjects = new Set(viewedProjects);
      newViewedProjects.add(newIndex);
      setViewedProjects(newViewedProjects);
      
      setAnimationClass("slide-in-right");
    }, 300);
  };

  const handleAutoClose = () => {
    // Use smooth slide-out animation for auto-close
    setIntroAnimationClass("slide-out-smooth");
    setTimeout(() => {
      setShowProjects(false);
      onShowBannerText && onShowBannerText(true);
      document.body.style.overflow = 'auto';
      
      // Reset states for next time
      setSelectedProjectIndex(0);
      setViewedProjects(new Set([0]));
      setIntroAnimationClass("animate__jackInTheBox");
      setAnimationClass("slide-in-center");
    }, 600); // Match the slide-out animation duration
  };

  const handleShowProjects = () => {
    setShowProjects(true);
    setHasBeenShownBefore(true); // Mark that projects have been shown at least once
    onShowBannerText && onShowBannerText(false);
    // Lock body scroll on mobile
    document.body.style.overflow = 'hidden';
  };

  const handleCloseProjectsModal = () => {
    // Use the same smooth slide-out animation for manual close
    setIntroAnimationClass("slide-out-smooth");
    setTimeout(() => {
      setShowProjects(false);
      onShowBannerText && onShowBannerText(true);
      // Restore body scroll
      document.body.style.overflow = 'auto';
      
      // Reset states for next time
      setSelectedProjectIndex(0);
      setViewedProjects(new Set([0]));
      setIntroAnimationClass("animate__jackInTheBox");
      setAnimationClass("slide-in-center");
    }, 600); // Match the slide-out animation duration
  };

  return (
    <>
      {showProjects && (
        <div className="projects-section">
          {/* Main container */}
          <div className={`projects-container animate__animated ${introAnimationClass}`}>
            {/* New close button inside container */}
            <button
              className="close-btn"
              onClick={handleCloseProjectsModal}
              aria-label="Close projects"
            >
              ×
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
                    className={`project-carousel-img ${animationClass}`}
                    src={data[selectedProjectIndex].image}
                    alt={data[selectedProjectIndex].title}
                  />
                </a>
              </div>
              
              {/* Project info */}
              <div className={`project-carousel-info ${animationClass}`}>
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
        <button 
          className={`showProjectsBtn animate__animated animate__fadeIn animate__slower ${!hasBeenShownBefore ? 'animate__delay-5s' : ''}`}
          onClick={handleShowProjects}
          style={{ animationFillMode: 'both' }}
        >
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

        /* Custom slide animations for project transitions */
        .slide-in-center {
          animation: slideInCenter 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .slide-in-left {
          animation: slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .slide-in-right {
          animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .slide-out-left {
          animation: slideOutLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .slide-out-right {
          animation: slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .slide-out-smooth {
          animation: slideOutSmooth 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes slideInCenter {
          from {
            transform: scale(0.9) translateY(20px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100px);
            opacity: 0;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100px);
            opacity: 0;
          }
        }

        @keyframes slideOutSmooth {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateX(150px) scale(0.95);
            opacity: 0.7;
          }
          100% {
            transform: translateX(400px) scale(0.8);
            opacity: 0;
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

        .close-btn {
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
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
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
          /* Safari-compatible background */
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
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
          transform: translateZ(0);
          
          /* Safari-specific fixes */
          -webkit-appearance: none;
          -webkit-border-radius: 50%;
          outline: none;
        }

        .arrow-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          transform: scale(1.1);
          border-color: rgba(255, 255, 255, 0.25);
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
          background: rgba(255, 255, 255, 0.08);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.25);
          -webkit-appearance: none;
          -webkit-border-radius: 50px;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          outline: none;
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
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 25px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.4px;
          cursor: pointer;
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
          position: relative;
          transform-origin: center;
          will-change: transform;
          margin-top: 8px;
        }

        .showProjectsBtn:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.45);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
          transform: scale(1.05);
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
            top: -300px;
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
            -webkit-backdrop-filter: blur(20px);
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

          .close-btn {
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
            font-size: 12px;
            padding: 10px 16px;
            margin: 12px auto 0 auto;
            width: fit-content;
            border-radius: 20px;
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
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            margin: 0 auto;
          }

          .close-btn {
            top: -35px;
            right: 15px;
            width: 30px;
            height: 30px;
          }

          .close-btn {
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

        /* Strong styling for light background 17.jpg - ONLY for project navigation */
        :global(.light-background-17) .arrow-btn,
        :global(.light-background-17) .arrow-btn.left-arrow,
        :global(.light-background-17) .arrow-btn.right-arrow {
          background: rgb(0, 0, 0) !important;
          border: 3px solid rgb(0, 0, 0) !important;
          backdrop-filter: blur(10px) !important;
          color: rgb(255, 255, 255) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8) !important;
          opacity: 1 !important;
        }

        :global(.light-background-17) .arrow-btn:hover,
        :global(.light-background-17) .arrow-btn.left-arrow:hover,
        :global(.light-background-17) .arrow-btn.right-arrow:hover {
          background: rgb(0, 0, 0) !important;
          border: 3px solid rgb(255, 255, 255) !important;
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.9) !important;
          transform: scale(1.1) !important;
          color: rgb(255, 255, 255) !important;
        }

        :global(.light-background-17) .secondary-btn,
        :global(.light-background-17) .button.secondary-btn {
          background: rgb(0, 0, 0) !important;
          border: 3px solid rgb(0, 0, 0) !important;
          backdrop-filter: blur(10px) !important;
          color: rgb(255, 255, 255) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8) !important;
          opacity: 1 !important;
        }

        :global(.light-background-17) .secondary-btn:hover,
        :global(.light-background-17) .button.secondary-btn:hover {
          background: rgb(0, 0, 0) !important;
          border: 3px solid rgb(255, 255, 255) !important;
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.9) !important;
          transform: scale(1.1) !important;
          color: rgb(255, 255, 255) !important;
        }
      `}</style>
    </>
  );
};

export default Projects;