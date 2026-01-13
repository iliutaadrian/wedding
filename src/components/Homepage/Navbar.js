/**
 * @file Navbar.js
 * @description This is the Navbar of the website. It includes also the menu visible from small screen. Multilingual!
 *
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

"use client";

import React, { useState, useEffect } from "react";
import translations from "@/utils/translations";
import { Link as ScrollLink } from "react-scroll";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiClose } from "react-icons/tfi";

const Navbar = ({ language, detectedLanguage, setLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false); // State for the navbar to change style after scrolling
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the menu visible from small screen
  const [isMobile, setIsMobile] = useState(false); // If false, we are in large screen

  // usEffect that defines if the website is opened from a large screen or small screen
  useEffect(() => {
    const handleResize = () => {
      // define the desired screen size
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect that handle the scolling behavior for changing the styles of the navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Destructure translation strings
  const { welcome, save_the_date, schedule, info, rsvp, music } =
    translations[language].navbar;

  // Group Navbar elements for convenience
  const navElements = [
    { name: welcome, link: "welcome-section" },
    { name: save_the_date, link: "savethedate-section" },
    { name: schedule, link: "schedule-section" },
    { name: info, link: "info-section" },
    { name: rsvp, link: "rsvp-section" },
    { name: music, link: "music-section" },
  ];

  return (
    <nav
      className={`w-full fixed top-0 z-20 flex justify-center items-center py-4 transition-colors duration-300 ${
        isScrolled
          ? "bg-cream text-black shadow-md"
          : "bg-transparent text-white"
      } max-lg:bg-cream max-lg:text-black`}
    >
      <ul className="w-full hidden lg:flex justify-center max-[1130px]:justify-start px-4 gap-5 xl:gap-8">
        {navElements.map((el) => (
          <li key={el.link}>
            <ScrollLink
              translate="no"
              to={el.link}
              smooth={true}
              duration={isMobile ? 2500 : 1900}
              offset={isMobile ? -50 : -62}
              className="cursor-pointer tracking-widest hover:text-gold max-xl:text-[18px]"
            >
              {el.name}
            </ScrollLink>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`lg:hidden text-black`}
      >
        <RxHamburgerMenu size={18} />
      </button>
      <LanguageDropdown
        detectedLanguage={detectedLanguage}
        setLanguage={setLanguage}
      />
      {/* mobile */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-cream transition-transform duration-700 ease-in-out z-50 lg:hidden ${
          !isMenuOpen ? "-translate-y-full" : "translate-y-0"
        } overflow-y-auto`}
      >
        <div className="relative w-full h-full flex flex-col items-center pt-6">
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4  text-black focus:outline-none"
            aria-label="Close Menu"
          >
            <TfiClose size={24} />
          </button>

          {/* Navigation Links */}
          <ul className="w-full h-full flex flex-col gap-8 justify-center items-center px-6  ">
            {navElements.map((el) => (
              <li key={el.link}>
                <ScrollLink
                  onClick={() => setIsMenuOpen(false)}
                  to={el.link}
                  smooth={true}
                  duration={isMobile ? 2500 : 1900}
                  offset={isMobile ? -51 : -63}
                  className="cursor-pointer tracking-widest hover:text-gold text-lg transition-colors duration-300"
                >
                  {el.name}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
