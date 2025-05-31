import React, { useState, useEffect } from 'react';
import 'animate.css';

const BackgroundChanger = () => {
  // Define our background collection
  const originalBackgrounds = [3, 7, 8, 15, 17, 19, 21];
  
  // Create shuffled backgrounds array but start with default banner-2
  const [backgrounds, setBackgrounds] = useState(() => {
    const shuffled = [...originalBackgrounds].sort(() => Math.random() - 0.5);
    
    // Don't set initial background since it's already set in HTML
    console.log('Background already preloaded via HTML, skipping initial setup');
    
    return shuffled;
  });
  
  // Track current index - start at -1 to indicate we're using default background
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [hasSeenOriginal, setHasSeenOriginal] = useState(true); // Start with true since we begin with default bg
  
  // Apply initial styling for the default background
  useEffect(() => {
    // Since we start with default banner-2.jpg, no special styling needed
    console.log('Started with default background banner-2.jpg, no special styling applied');
  }, []); // Only run once on mount
  
  // Effect to reapply styling when navigating sections
  useEffect(() => {
    const checkAndApplyStyling = () => {
      if (currentIndex >= 0 && currentIndex < backgrounds.length) {
        const currentBg = backgrounds[currentIndex];
        applyBackgroundStyling(currentBg);
        console.log(`Reapplied styling for background ${currentBg} on component update`);
      } else if (currentIndex === -1) {
        // We're using default background, no special styling needed
        applyBackgroundStyling(null);
        console.log('Reapplied styling for default background on component update');
      }
    };
    
    // Apply styling immediately
    checkAndApplyStyling();
    
    // Also set up an interval to check for DOM changes (like navigation)
    const interval = setInterval(checkAndApplyStyling, 500);
    
    return () => clearInterval(interval);
  }, [currentIndex]);
  
  // Helper function to apply styling for light background (17.jpg)
  const applyBackgroundStyling = (backgroundId) => {
    const body = document.body;
    
    if (backgroundId === 17) {
      body.classList.add('light-background-17');
      console.log('Added light-background-17 class to body for background 17');
      console.log('Body classes:', body.classList.toString());
      
      // Apply subtle styling for light background 17
      const arrowBtns = document.querySelectorAll('.arrow-btn');
      const secondaryBtns = document.querySelectorAll('.secondary-btn');
      
      arrowBtns.forEach(btn => {
        btn.style.border = '1px solid rgba(255, 255, 255, 0.8)';
        btn.style.color = 'white';
        btn.style.background = 'rgba(0, 0, 0, 0.2)';
        btn.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.8)';
        console.log('Applied subtle styling for background 17 to arrow button');
      });
      
      secondaryBtns.forEach(btn => {
        btn.style.border = '1px solid rgba(255, 255, 255, 0.8)';
        btn.style.color = 'white';
        btn.style.background = 'rgba(0, 0, 0, 0.2)';
        btn.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.8)';
        console.log('Applied subtle styling for background 17 to secondary button');
      });
    } else {
      body.classList.remove('light-background-17');
      console.log('Removed light-background-17 class from body');
      console.log('Body classes:', body.classList.toString());
      
      // Reset to default styling for all other backgrounds (including default)
      const arrowBtns = document.querySelectorAll('.arrow-btn');
      const secondaryBtns = document.querySelectorAll('.secondary-btn');
      
      arrowBtns.forEach(btn => {
        btn.style.background = '';
        btn.style.border = '';
        btn.style.color = '';
        btn.style.textShadow = '';
      });
      
      secondaryBtns.forEach(btn => {
        btn.style.background = '';
        btn.style.border = '';
        btn.style.color = '';
        btn.style.textShadow = '';
      });
    }
  };
  
  const changeBackground = () => {
    let selectedBg;
    let nextIndex;
    
    if (currentIndex === -1) {
      // First click from default background - start with first shuffled background
      nextIndex = 0;
    } else {
      nextIndex = currentIndex + 1;
    }
    
    // If we've gone through all backgrounds, return to default
    if (nextIndex >= backgrounds.length) {
      // Return to default background
      try {
        const defaultPath = require('../assets/img/banner-2.jpg');
        performSmoothTransition(defaultPath);
        console.log('Background returned to default: banner-2.jpg');
        setCurrentIndex(-1); // Reset to default background
        setHasSeenOriginal(true);
        // Remove any background-specific styling
        applyBackgroundStyling(null);
        return;
      } catch (error) {
        console.error('Failed to load default banner-2.jpg:', error);
        // If default fails, reshuffle and continue
        const newShuffled = [...originalBackgrounds].sort(() => Math.random() - 0.5);
        setBackgrounds(newShuffled);
        nextIndex = 0;
      }
    }
    
    selectedBg = backgrounds[nextIndex];
    setCurrentIndex(nextIndex);
    setHasSeenOriginal(false);
    
    try {
      // Use require to get the correct webpack path for the image
      const imagePath = require(`../assets/img/${selectedBg}.jpg`);
      
      // Perform smooth transition
      performSmoothTransition(imagePath);
      console.log(`Background changed to: ${selectedBg}.jpg`);
      
      // Apply styling for light background 17
      applyBackgroundStyling(selectedBg);
    } catch (error) {
      console.error(`Failed to load image ${selectedBg}.jpg:`, error);
    }
  };

  // Helper function for smooth background transitions
  const performSmoothTransition = (newImagePath) => {
    const banner = document.querySelector('.banner');
    if (!banner) return;
    
    // Create a temporary overlay for the new background
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url("${newImagePath}");
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: scroll;
      opacity: 0;
      z-index: -1;
      transition: opacity 0.8s ease-in-out;
    `;
    
    banner.appendChild(overlay);
    
    // Trigger the fade-in
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });
    
    // After transition completes, update the main background and remove overlay
    setTimeout(() => {
      document.documentElement.style.setProperty('--banner-bg', `url("${newImagePath}")`);
      banner.removeChild(overlay);
    }, 800);
  };
  
  return (
    <div className="background-changer animate__animated animate__backInDown animate__slower animate__delay-5s">
      <button 
        className="bg-change-btn"
        onClick={changeBackground}
        data-tooltip-main="Want a new scenery?"
        aria-label="Change background scenery"
      >
        🎨
      </button>
    </div>
  );
};

export default BackgroundChanger;
