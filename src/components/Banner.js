import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-astro.png";
import headerImgBackground from "../assets/img/planet2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";
import React from "react";

export const Banner = () => {
  const titles = ["Software Engineer", "Front End Developer", "UI/UX Designer"];
  const [titleIndex, setTitleIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTyping(false); // Set the typing state to false to start the deleting effect
      setTimeout(() => {
        setTitle(""); // Clear the title text
        setTyping(true); // Set the typing state to true to start the typing effect
        setTitleIndex((titleIndex) => (titleIndex + 1) % titles.length); // Increment the title index
      }, 1500);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [titles]);

  useEffect(() => {
    let timeoutId;
    if (typing) {
      let i = 0;
      const word = titles[titleIndex];
      timeoutId = setInterval(() => {
        setTitle((title) => title + word[i]);
        i++;
        if (i >= word.length) {
          clearInterval(timeoutId);
        }
      }, 100);
    } else {
      let i = title.length - 1;
      timeoutId = setInterval(() => {
        setTitle((title) => title.substring(0, i));
        i--;
        if (i < 0) {
          clearInterval(timeoutId);
        }
      }, 100);
    }

    return () => clearInterval(timeoutId);
  }, [titleIndex, typing]);

  return (
    <>
      <section className="banner" id="home">
        <Container>
          <Row className="aligh-items-center">
            <Col xs={12} md={6} xl={7}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div
                    className={
                      isVisible ? "animate__animated animate__fadeIn" : ""
                    }
                  >
                    <span className="tagline">Welcome to my Portfolio!</span>
                    <h1>
                      {`Hi! I'm Nick,`} <br />
                      <span
                        className="txt-rotate"
                        dataPeriod="1000"
                        data-rotate='[ "Web Developer", "Web Designer", "UI/UX Designer" ]'
                      >
                        <span className="wrap gradient no-show-mobile">
                          {title}
                        </span>
                      </span>
                    </h1>
                    <p>
                      I create beautiful and intuitive interfaces that make
                      users' lives easier
                    </p>
                  </div>
                )}
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={5}>
              {/* <TrackVisibility> */}
              {/* {({ isVisible }) => ( */}
              <div
              // className={isVisible ? "animate__animated animate__zoomIn" : ""}
              >
                <img src={headerImg} alt="Header Img" />
                {/* <img
                      className="header-background"
                      src={headerImgBackground}
                      alt="Header Img"
                    /> */}
              </div>
              {/* )} */}
              {/* </TrackVisibility> */}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Banner;
