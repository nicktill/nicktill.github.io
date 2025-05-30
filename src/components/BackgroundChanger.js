import React, { useState, useEffect } from 'react';

const BackgroundChanger = () => {
  // Define our background collection
  const backgrounds = [3, 7, 8, 15, 17, 19, 21];
  
  // Track current index and whether we need to return to original
  const [currentIndex, setCurrentIndex] = useState(-1); // Start at -1 so first click goes to index 0
  const [hasSeenOriginal, setHasSeenOriginal] = useState(true); // Track if we've shown original
  
  // Effect to reapply styling when navigating sections
  useEffect(() => {
    const checkAndApplyStyling = () => {
      if (currentIndex >= 0 && currentIndex < backgrounds.length) {
        const currentBg = backgrounds[currentIndex];
        applyBackgroundStyling(currentBg);
        console.log(`Reapplied styling for background ${currentBg} on component update`);
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
      
      // Reset to default styling for all other backgrounds
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
    let nextIndex = currentIndex + 1;
    
    // If we've gone through all backgrounds, return to original (banner-2.jpg)
    if (nextIndex >= backgrounds.length) {
      if (!hasSeenOriginal) {
        // Return to original background
        try {
          const originalPath = require('../assets/img/banner-2.jpg');
          performSmoothTransition(originalPath);
          console.log('Background returned to original: banner-2.jpg');
          setHasSeenOriginal(true);
          setCurrentIndex(-1); // Reset for next cycle
          // Remove any background-specific styling
          document.body.classList.remove('light-background-17');
          return;
        } catch (error) {
          console.error('Failed to load original banner-2.jpg:', error);
          nextIndex = 0; // Fallback to first background
        }
      } else {
        nextIndex = 0; // Start new cycle
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
    <div className="background-changer">
      <button 
        className="bg-change-btn"
        onClick={changeBackground}
        data-tooltip="Want a new scenery?"
        aria-label="new scenery"
      >
        🎨
      </button>
    </div>
  );
};

export default BackgroundChanger;
