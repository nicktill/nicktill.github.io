import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import React from "react";
import Projects from "./Projects";
import { FaMapMarkerAlt } from "react-icons/fa";
import IBMLogo from "../assets/img/IBM_logo.svg.png";

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
    if (isMobile) return;
    
    const intervalId = setInterval(() => {
      if (isTypingComplete) {
        setShouldCursorBlink(false);
        setTyping(false);
        setIsTypingComplete(false);
        setTimeout(() => {
          setTitle("");
          setTyping(true);
          setTitleIndex((titleIndex) => (titleIndex + 1) % titles.length);
        }, 1500);
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [titles, isTypingComplete, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    
    let timeoutId;
    if (typing) {
      setShouldCursorBlink(false);
      let i = 0;
      const word = titles[titleIndex];
      timeoutId = setInterval(() => {
        setTitle((title) => title + word[i]);
        i++;
        if (i >= word.length) {
          clearInterval(timeoutId);
          setShouldCursorBlink(true);
          setTimeout(() => {
            setIsTypingComplete(true);
          }, 400);
        }
      }, 100);
    } else {
      setShouldCursorBlink(false);
      let i = title.length - 1;
      timeoutId = setInterval(() => {
        setTitle((title) => title.substring(0, i));
        i--;
        if (i < 0) {
          clearInterval(timeoutId);
        }
      }, 60);
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
      <section className="banner" id="home" style={{ position: 'relative' }}>
        <Container>
          <Row className="aligh-items-center">
            <Col xs={12} md={6} xl={7}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div className="animate__animated animate__fadeInDown">
                    <div className={`banner-content ${!showBannerText ? 'hide-on-mobile' : ''}`}>
                      <span className="tagline">
                        Welcome to my Portfolio!
                      </span>
                      <h1>
                        {isMobile ? (
                          "Hi! I'm Nick"
                        ) : (
                          <>
                            {"Hi! I'm Nick,"} <br />
                            <span className="txt-rotate">
                              <span className={`wrap gradient ${shouldCursorBlink ? 'cursor-blink' : ''}`}>
                                {title || '\u00A0'}
                              </span>
                            </span>
                          </>
                        )}
                      </h1>

                      {/* Polished location and company section */}
                      <div className="banner-meta" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.2rem',
                        margin: '0.8rem 0 1.2rem 0',
                        fontSize: '0.9rem',
                        opacity: '0.75',
                        fontWeight: '400',
                        letterSpacing: '0.3px'
                      }}>
                        <div className="meta-item" style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}>
                          <FaMapMarkerAlt style={{
                            fontSize: '0.85rem',
                            opacity: '0.8'
                          }} />
                          <span>Raleigh • Philadelphia</span>
                        </div>
                        
                        <div className="meta-divider" style={{
                          width: '1px',
                          height: '0.9rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.25)'
                        }}></div>
                        
                        <div className="meta-item" style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.45rem'
                        }}>
                          <img 
                            src={IBMLogo} 
                            alt="IBM"
                            style={{
                              height: '16px',
                              width: 'auto',
                              filter: 'brightness(0) invert(1)',
                              opacity: '0.85'
                            }}
                          />
                          <span>Software Engineer</span>
                        </div>
                      </div>

                      <p style={{
                        marginTop: '0',
                        marginBottom: '1.8rem',
                        lineHeight: '1.5',
                        fontSize: '1.05rem',
                        opacity: '0.9'
                      }}>
                        I love building intuitive interfaces and software that make users' lives easier
                      </p>

                      <div className="skill-pills" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.6rem',
                        marginTop: '0'
                      }}>
                        {[
                          { emoji: "☁️", text: "cloud infra" },
                          { emoji: "📊", text: "observability" },
                          { emoji: "🌐", text: "distributed systems" },
                          { emoji: "🔧", text: "full-stack" }
                        ].map((skill) => (
                          <span 
                            key={skill.text}
                            className="skill-pill"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              padding: '0.35rem 0.8rem',
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              borderRadius: '1.25rem',
                              fontSize: '0.75rem',
                              fontWeight: '500',
                              transition: 'all 0.2s ease',
                              backdropFilter: 'blur(10px)'
                            }}
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
                  <div className="mobileflag animate__animated animate__fadeInRight">
                  </div>
                )}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>

      <style jsx>{`
        .banner-meta .meta-item:hover {
          opacity: 1;
          transform: translateY(-1px);
        }
        
        .skill-pill:hover {
          background-color: rgba(255, 255, 255, 0.12) !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
          transform: translateY(-1px);
        }

        @media (max-width: 767px) {
          .banner-meta {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.6rem !important;
            margin: 0.6rem 0 1rem 0 !important;
          }
          
          .meta-divider {
            display: none !important;
          }
          
          .skill-pills {
            justify-content: flex-start !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default Banner;