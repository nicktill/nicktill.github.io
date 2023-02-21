import React, { useState, useEffect } from "react";

const Info = () => {
  const titles = [
    "Software Engineer",
    "Front End Developer",
    "UX/UI Developer",
  ];
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
    <div className="info-container">
      <h1 className="welcome">Welcome to My Portfolio!</h1>
      <h1>
        Hey! I'm <span className="name">Nicholas Tillmann</span>
      </h1>
      <h2>
        [<span className="title">{title}</span>
        ]...
      </h2>
      <p className="description">
        Creating beautiful and intuitive interfaces that make users' lives
        easier and more enjoyable.
      </p>
    </div>
  );
};

export default Info;
