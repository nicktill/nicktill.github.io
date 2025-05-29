import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-astro.png";
import headerImgBackground from "../assets/img/planet2.png";
import "animate.css";
import TrackVisibility from "react-on-screen";
import React from "react";
import Projects from "./Projects";

export const Banner = () => {
  const titles = [
    "Software Engineer",
    "Front-End Developer",
    "UI/UX Designer",
    "Back-End Developer",
    "Mobile Developer",
  ];

  const [titleIndex, setTitleIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [typing, setTyping] = useState(true);
  const [showBannerText, setShowBannerText] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTyping(false);
      setTimeout(() => {
        setTitle("");
        setTyping(true);
        setTitleIndex((titleIndex) => (titleIndex + 1) % titles.length);
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

  const handleShowProjects = () => {
    setShowBannerText(false);
  };

  return (
    <>
      <section className="banner" id="home" style={{ position: 'relative' }}>
        <Container>
          <Row className="aligh-items-center">
            <Col xs={12} md={6} xl={7}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div className="animate__animated animate__fadeInDown ">
                    <div className={`banner-content ${!showBannerText ? 'hide-on-mobile' : ''}`}>
                      <span className="tagline  ">
                        Welcome to my Portfolio!
                      </span>
                      <h1>
                        {`Hi! I'm Nick,`} <br />
                        <span className="txt-rotate">
                          <span className="wrap gradient no-show-mobile">
                            {title}
                          </span>
                        </span>
                      </h1>
                      <p>
                        I love creating intuitive interfaces and software that
                        make users lives easier
                      </p>
                    </div>
                    <Projects onShowBannerText={setShowBannerText} />
                  </div>
                )}
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={5}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div
                    className={
                      "mobileflag animate__animated animate__fadeInRight"
                    }
                  >
                    {/* <img
                      loading="lazy"
                      className="headerImg"
                      src={headerImg}
                      alt="Header Img"
                    />
                    <img
                      loading="lazy"
                      className="headerImgBackground"
                      src={headerImgBackground}
                      alt="Header Img Background"
                    /> */}
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
