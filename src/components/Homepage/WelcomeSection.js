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
    click_details,
  } = translations[language].welcome_section;

  // If it's still rendering on the server, don't show the countdown
  if (!isClient || countdown === null) {
    return null;
  }

  return (
    <section
      id="welcome-section"
      className="min-h-svh w-full relative overflow-hidden flex flex-col justify-center items-center py-20"
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

      <div className="w-full flex flex-col items-center px-4 z-10 pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: 50, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 12,
            delay: 0.4
          }}
          className="w-[90%] max-w-[400px] md:max-w-[500px] my-8"
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col justify-center items-center -mt-40"
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

        <div className="flex flex-col md:flex-row gap-6 mt-10">
          <ScrollLink
            to="schedule-section"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={tertiaryVariants}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="relative w-64 h-80 drop-shadow-lg rotate-[-10deg]"
            >
              <Image
                src={images.frame}
                alt="Frame"
                fill
                className="object-contain z-10 w-70"
              />
              <div className="absolute top-[26px] left-[40px] right-[40px] bottom-[60px] z-20 overflow-hidden">
                <Image
                  src={images.church}
                  alt="Church"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-[-10px] left-0 right-0 z-30 text-center px-2">
                <p className="alex-brush text-xl text-black leading-none">Biserica Sfantul Nicolae Domnesc</p>
                <p className="text-[10px] uppercase tracking-tighter text-gray-500 mt-1">
                  {click_details}
                </p>
              </div>
            </motion.div>
          </ScrollLink>

          <ScrollLink
            to="info-section"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={tertiaryVariants}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ delay: 0.1 }}
              className="relative w-64 h-80 drop-shadow-lg r tate-3"
            >
              <Image
                src={images.frame}
                alt="Frame"
                fill
                className="object-contain z-10"
              />
              <div className="absolute top-[8%] left-[8%] right-[8%] bottom-[22%] z-20 overflow-hidden">
                <Image
                  src={images.venue}
                  alt="Venue"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-[6%] left-0 right-0 z-30 text-center px-2">
                <p className="alex-brush text-xl text-black leading-none">Restaurant Kalipso</p>
                <p className="text-[10px] uppercase tracking-tighter text-gray-500 mt-1">
                  {click_details}
                </p>
              </div>
            </motion.div>
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
