import React, { useEffect, useRef } from "react";
import "../style/animation.css"; 

export const Animation = () => {
  const splashScreenRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const splashScreen = splashScreenRef.current;
    const logo = logoRef.current;

    if (!splashScreen || !logo) {
      console.error("Elements not found");
      return;
    }

    
    setTimeout(() => {
      logo.classList.add("active");
    }, 400);

  
    setTimeout(() => {
      logo.classList.remove("active");
      logo.classList.add("fade");
    }, 1000);

 
    setTimeout(() => {
      splashScreen.classList.add("fade");
    }, 1300);

    
    setTimeout(() => {
      splashScreen.style.top = "-110vh";
    }, 2300);
  }, []);

  return (
    <div
      id="splashScreen"
      ref={splashScreenRef}
      className="intro h-full w-full"
    >
      <h1 className="logo-header flex items-center justify-center h-screen">
        <img
          ref={logoRef}
          className="logo w-1/4"
          src="src/assets/png college logo.png"
          alt="College Logo"
        />
      </h1>
    </div>
  );
};
