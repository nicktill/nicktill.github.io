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
          <h1>/nicktill</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="#home"
              className={
                activeLink === "home" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#projects"
              className={
                activeLink === "projects" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("projects")}
            >
              Projects
            </Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="https://nicktill.github.io/resume.pdf">Resume</a>
              <a href="https://linkedin.com/in/nicholastillmann">
                <FaLinkedin color="white" />
              </a>
              <a href="https://github.com/nicktill">
                {/* make this larger */}
                <FaGithub color="white" />
              </a>
            </div>
            <button className="vvd">
              <span>Let's Chat!</span>
            </button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
