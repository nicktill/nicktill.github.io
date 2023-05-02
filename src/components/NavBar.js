import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FaLinkedin, FaFilePdf, FaGithub } from "react-icons/fa";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home"); //used to tell us which link is active (which part the user is on)
  const [scrolled, setScroll] = useState(false); //used to tell us if the user has scrolled down

  // will run when the component mounts and when the scroll state changes (user scrolls)
  useEffect(() => {
    const onScroll = () => {
      // do something
      window.scrollY > 50 ? setScroll(true) : setScroll(false);
    };

    // add the event listener to the window object when the component mounts and remove it when it unmounts (cleanup function)
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  const onUpdateActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/">
          <h1 className="nicktill">/nicktill</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"></Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="/resume.pdf" target="_blank">
                <FaFilePdf className="resume" color="white" />
              </a>
              <a
                target="_blank"
                href="https://linkedin.com/in/nicholastillmann"
              >
                <FaLinkedin className="linkedin" color="white" />
              </a>
              <a target="_blank" href="https://github.com/nicktill">
                <FaGithub className="github" color="white" />
              </a>
            </div>
            <a href="mailto:ntillmann1439@gmail.com?subject=Reaching Out!">
              <button className="vvd">Let's Chat</button>
            </a>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
