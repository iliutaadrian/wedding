/**
 * @file ScheduleSection.js
 * @description This component renders the Welcome section. Multilingual!
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

"use client";

import React, { useState, useEffect } from "react";
import translations from "@/utils/translations";
import Image from "next/image";
import { getCountdown } from "@/utils/countdownHelper";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

const WelcomeSection = ({ language }) => {
  const [countdown, setCountdown] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCountdown(getCountdown());

    const intervalId = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Destructure translation strings
  const { her, him } = translations[language].couple;
  const {
    small_text,
    days,
    day,
    hours,
    hour,
    minutes,
    minute,
    seconds,
    second,
    button,
  } = translations[language].welcome_section;

  // If it's still rendering on the server, don't show the countdown
  if (!isClient || countdown === null) {
    return null;
  }

  return (
    <section
      id="welcome-section"
      className="h-svh min-h-svh w-full relative overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Background Image from SplashScreen */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('/images/background.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.8,
          zIndex: 0,
        }}
      />

      {/* Open Envelope Image in the middle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, x: "-50%", y: "20%", rotate: -10 }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%", rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 120,
          damping: 12,
          delay: 0.4 
        }}
        className="absolute top-1/2 left-1/2 z-1 w-[90%] max-w-[500px]"
      >
        <Image
          src="/images/envelope_open.png"
          alt="Open Envelope"
          width={500}
          height={350}
          quality={100}
          className="object-contain w-full h-auto"
        />
      </motion.div>

      {/* Text Section */}
      <div className="absolute w-full h-full min-h-svh flex flex-col justify-center items-center z-10 gap-0">
        {!countdown.message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            translate="no"
            className="font-semibold text-black tracking-widest mt-20"
          >
            {small_text.toUpperCase()}
          </motion.p>
        )}
        <div className="flex flex-col md:flex-row w-[240px] md:w-full h-[240px] md:h-auto justify-center md:gap-4 max-md:border max-md:border-[#eec87e] rounded-full max-md:p-4 cursor-default">
          <h1 translate="no" className="sloop-script welcome-names text-black">
            {her}
          </h1>

          <h1 translate="no" className="alex-brush welcome-names text-gold">
            <span className="max-md:hidden">&nbsp;</span>&
          </h1>
          <h1 className="sloop-script welcome-names text-black">{him}</h1>
        </div>

        {countdown.message ? (
          <div className="absolute bottom-16">
            {/* This div is now empty as requested */}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center gap-4 md:gap-8 mt-4 text-black"
          >
            <div className="flex flex-col justify-center items-center">
              <h6 translate="no">{countdown.days}</h6>
              <p translate="no" className="text-sm">
                {countdown.days === 1 ? day.toUpperCase() : days.toUpperCase()}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h6 translate="no">{countdown.hours}</h6>
              <p translate="no" className="text-sm">
                {countdown.hours === 1
                  ? hour.toUpperCase()
                  : hours.toUpperCase()}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h6 translate="no">{countdown.minutes}</h6>
              <p translate="no" className="text-sm">
                {countdown.minutes === 1
                  ? minute.toUpperCase()
                  : minutes.toUpperCase()}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h6 translate="no">{countdown.seconds}</h6>
              <p translate="no" className="text-sm">
                {countdown.seconds === 1
                  ? second.toUpperCase()
                  : seconds.toUpperCase()}
              </p>
            </div>
          </motion.div>
        )}

        {!countdown.message && (
          <ScrollLink
            to="savethedate-section"
            smooth={true}
            duration={1000}
            offset={-70}
            className="mt-20 btn btn-gold"
            translate="no"
          >
            {button}
          </ScrollLink>
        )}
      </div>
    </section>
  );
};

export default WelcomeSection;
