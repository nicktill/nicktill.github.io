import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import React from "react";
import Projects from "./Projects";

export const Banner = () => {
  const titles = useMemo(() => [
    "Software Engineer",
    "Backend Developer", 
    "Cloud Engineer"
  ], []);

  const [titleIndex, setTitleIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [typing, setTyping] = useState(true);
  const [showBannerText, setShowBannerText] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [shouldCursorBlink, setShouldCursorBlink] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip typing effect on mobile
    
    const intervalId = setInterval(() => {
      if (isTypingComplete) {
        // Start erasing after grace period
        setShouldCursorBlink(false); // Stop blinking before erasing starts
        setTyping(false);
        setIsTypingComplete(false);
        setTimeout(() => {
          setTitle("");
          setTyping(true);
          setTitleIndex((titleIndex) => (titleIndex + 1) % titles.length);
        }, 1500); // Time for erasing + pause
      }
    }, 3000); // Reduced from 4500ms to 3000ms for much snappier cycles

    return () => {
      clearInterval(intervalId);
    };
  }, [titles, isTypingComplete, isMobile]);

  useEffect(() => {
    if (isMobile) return; // Skip typing effect on mobile
    
    let timeoutId;
    if (typing) {
      setShouldCursorBlink(false); // Stop blinking while typing
      let i = 0;
      const word = titles[titleIndex];
      timeoutId = setInterval(() => {
        setTitle((title) => title + word[i]);
        i++;
        if (i >= word.length) {
          clearInterval(timeoutId);
          setShouldCursorBlink(true); // Start blinking when typing is complete
          // Add grace period after typing completes
          setTimeout(() => {
            setIsTypingComplete(true);
          }, 400); // Reduced from 800ms to 400ms for faster transition
        }
      }, 100); // Reduced from 120ms to 100ms for faster typing
    } else {
      setShouldCursorBlink(false); // Stop blinking while erasing
      let i = title.length - 1;
      timeoutId = setInterval(() => {
        setTitle((title) => title.substring(0, i));
        i--;
        if (i < 0) {
          clearInterval(timeoutId);
        }
      }, 60); // Faster erasing
    }

    return () => clearInterval(timeoutId);
  }, [titleIndex, typing, titles, isMobile]);

  const handleShowProjects = () => {
    setShowBannerText(false);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const calculatePillTransform = (pillElement, mouseX, mouseY) => {
    if (!pillElement) return {};
    
    const rect = pillElement.getBoundingClientRect();
    const containerRect = pillElement.parentElement.getBoundingClientRect();
    
    const pillCenterX = rect.left - containerRect.left + rect.width / 2;
    const pillCenterY = rect.top - containerRect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(mouseX - pillCenterX, 2) + Math.pow(mouseY - pillCenterY, 2)
    );
    
    const maxDistance = 120;
    const maxScale = 1.08;
    
    if (distance < maxDistance) {
      const intensity = 1 - distance / maxDistance;
      const scale = 1 + (maxScale - 1) * intensity;
      
      return {
        transform: `scale(${scale})`,
        zIndex: Math.floor(intensity * 10) + 1
      };
    }
    
    return { transform: 'scale(1)', zIndex: 1 };
  };

  return (
    <>
      <section className="banner animate__animated animate__fadeIn animate__slow" id="home" style={{ position: 'relative' }}>
        <Container>
          <Row className="aligh-items-center">
            <Col xs={12} md={6} xl={7}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div className="animate__animated animate__fadeInDown animate__slower ">
                    <div className={`banner-content ${!showBannerText ? 'hide-on-mobile' : ''}`}>
                      <span className="tagline animate__animated animate__fadeIn animate__slow animate__delay-1s">
                        Welcome to my Portfolio!
                      </span>
                      <h1 className="animate__animated animate__fadeIn animate__slow animate__delay-2s">
                        {isMobile ? (
                          "Hi! I'm Nick"
                        ) : (
                          <>
                            {`Hi! I'm Nick,`} <br />
                            <span className="txt-rotate">
                              <span className={`wrap gradient ${shouldCursorBlink ? 'cursor-blink' : ''}`}>
                                {title || '\u00A0'}
                              </span>
                            </span>
                          </>
                        )}
                      </h1>
                      <p className="animate__animated animate__fadeIn animate__slow animate__delay-3s">I love building intuitive interfaces and software that make users' lives easier</p>
                      <div className="skill-pills animate__animated animate__fadeIn animate__slow animate__delay-4s">
                        {[
                          { emoji: "☁️", text: "cloud infra" },
                          { emoji: "📊", text: "observability" },
                          { emoji: "🌐", text: "distributed systems" },
                          { emoji: "🔧", text: "full-stack" }
                        ].map((skill) => (
                          <span 
                            key={skill.text}
                            className="skill-pill"
                          >
                            {skill.emoji} {skill.text}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Projects onShowBannerText={setShowBannerText} />
                  </div>
                )}
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={5}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div className="mobileflag animate__animated animate__fadeInRight animate__slower">
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
