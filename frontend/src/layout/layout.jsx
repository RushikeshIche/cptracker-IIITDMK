import { useState, useEffect } from "react";
import { Footer } from "../pages/footer"
import { Header } from "../pages/header"
import {Outlet} from 'react-router-dom'
// import { Navbar } from "../pages/Navbar"
import { Animation } from "../pages/animation"
 
export const Layout = () => {
    const [showAnimation, setShowAnimation] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 1800);
  
      return () => clearTimeout(timer); 
    }, []);
  
    return (
        <>
          {showAnimation ? (
            <Animation />
          ) : (
            <>
              {/* Main layout content */}
              <Header />
              <Outlet />
              <Footer />
            </>
          )}
        </>
      );
}