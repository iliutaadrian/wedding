"use client";

import React, { useState, useEffect } from "react";
import translations from "@/utils/translations";
import Image from "next/image";
import { getCountdown } from "@/utils/countdownHelper";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import images from "@/utils/imagesImport";


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

  const {
    title,
    title_cursive,
    date,
    place,
  } = translations[language].saveTheDate_section;

  const dashedLine = Array(5)
    .fill()
    .map((_, index) => (
      <div key={index} className="w-[2px] h-[5px] my-[3px] bg-pink" />
    ));


  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const secondaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
  };
  const tertiaryVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };
  const quartaryVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.6, delay: 0.1 } },
  };
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
          backgroundImage: `url('/images/collage.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.3, x: "-50%", y: "20%", rotate: -10 }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%", rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 12,
          delay: 0.4
        }}
        className="absolute top-[40%] left-1/2 z-1 w-[90%] max-w-[500px]"
      >
        <Image
          src="/images/envelope_open.png"
          alt="Open Envelope"
          width={500}
          height={350}
          quality={100}
          className="object-contain w-full h-auto drop-shadow-xl"
        />
      </motion.div>


      <div className="w-full flex flex-col items-center px-4 z-10 pt-1">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col justify-center items-center"
        >
          <h3 translate="no" className=" font-bold z-20 ">
            {title}
          </h3>
          <h3
            translate="no"
            className="text-pink text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-8 md:-mt-10"
          >
            {title_cursive}
          </h3>
        </motion.div>

        {dashedLine}
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={primaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
          className="sloop-script tracking-wider text-black mt-1"
        >
          {date}
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
        >
          {place}
        </motion.p>
      </div>
    </section>
  );
};

export default WelcomeSection;
