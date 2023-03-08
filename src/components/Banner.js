import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-astro.png";
import headerImgBackground from "../assets/img/planet2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";
import React from "react";

export const Banner = () => {
  const titles = [
    "Software Engineer",
    "Front-End Developer",
    "UI/UX Designer",
    "Back-End Developer",
    "Mobile Developer",
  ];

  // State variables to keep track of the title index, title text, and typing state
  const [titleIndex, setTitleIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [typing, setTyping] = useState(true);

  // useEffect hook that updates the title text in a timed loop
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTyping(false); // Set the typing state to false to start the deleting effect
      setTimeout(() => {
        setTitle(""); // Clear the title text
        setTyping(true); // Set the typing state to true to start the typing effect
        setTitleIndex((titleIndex) => (titleIndex + 1) % titles.length); // Increment the title index
      }, 1500); // Wait for 1.5 seconds before starting the next cycle
    }, 3000); // Repeat the cycle every 3 seconds

    // Cleanup function that clears the interval when the component unmounts or when the titles array changes
    return () => {
      clearInterval(intervalId);
    };
  }, [titles]);

  // useEffect hook that types and deletes the title text
  useEffect(() => {
    let timeoutId;
    if (typing) {
      let i = 0;
      const word = titles[titleIndex];
      timeoutId = setInterval(() => {
        setTitle((title) => title + word[i]);
        i++;
        if (i >= word.length) {
          clearInterval(timeoutId); // Stop the interval when the word has been fully typed
        }
      }, 100); // Type one character every 100 milliseconds
    } else {
      let i = title.length - 1;
      timeoutId = setInterval(() => {
        setTitle((title) => title.substring(0, i));
        i--;
        if (i < 0) {
          clearInterval(timeoutId); // Stop the interval when the word has been fully deleted
        }
      }, 100); // Delete one character every 100 milliseconds
    }

    // Cleanup function that clears the interval when the titleIndex or typing state changes
    return () => clearInterval(timeoutId);
  }, [titleIndex, typing]);

  // Render the banner section with two columns of content
  return (
    <>
      <section className="banner" id="home">
        <Container>
          <Row className="aligh-items-center">
            <Col xs={12} md={6} xl={7}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div className="animate__animated animate__fadeInDown ">
                    <span className="tagline  ">Welcome to my Portfolio!</span>
                    <h1>
                      {`Hi! I'm Nick,`} <br />
                      <span className="txt-rotate">
                        <span className="wrap gradient no-show-mobile">
                          {title}
                        </span>
                      </span>
                    </h1>
                    <p>
                      I love creating beautiful and intuitive interfaces that
                      make users' lives easier
                    </p>{" "}
                  </div>
                )}
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={5}>
              <TrackVisibility>
                {({ isVisible }) => (
<<<<<<< HEAD
                  <div className={"animate__animated animate__fadeInRight"}>
=======
                  <div
                    className={
                      "mobileflag animate__animated animate__fadeInRight"
                    }
                  >
>>>>>>> 3426aaaf2a32b30eba25814e8c9b6b160d892423
                    <img src={headerImg} alt="Header Img" />
                  </div>
                )}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Banner;
