/**
 * @file SplashScreen.js
 * @description This component renders the Splash Screen, visible when opening/reloading the website.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/Homepage.module.scss";

const SplashScreen = () => {
  // Disable scrolling when splash screen is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Re-enable scrolling after the splash animation is done (e.g., 4 seconds)
    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 500); // Match this to the total animation time of the splash screen

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto"; // Ensure scrolling is re-enabled in cleanup
    };
  }, []);

  return (
    <>
      <div className={styles.splashScreen}>
        {/* Italian, Polish and English */}
        {["Ciao", "Cześć", "Hello"].map((text, index) => (
          <div key={index} className={styles.textContainer}>
            <p translate="no" className={`${styles.word} alex-brush`}>
              {text}
            </p>
          </div>
        ))}
        {/* Italian, Polish and English */}
        {["Ciao", "Cześć", "Hello"].map((text, index) => (
          <p
            key={index}
            translate="no"
            className={`${styles.word_mobile} alex-brush`}
          >
            {text}
          </p>
        ))}
      </div>
    </>
  );
};

export default SplashScreen;
