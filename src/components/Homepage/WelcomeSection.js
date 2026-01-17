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
  } = translations[language].our_story_section;

  const dashedLine = Array(5)
    .fill()
    .map((_, index) => (
      <div key={index} className="z-20 w-[2px] h-[5px] my-[3px] bg-pink" />
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

  const flowerDecorations = [
    { id: 1, src: images.flower2, top: '3%', left: '3%', rotate: -15, width: 250, delay: 0.5 },
    { id: 2, src: images.flower2, top: '70%', right: '5%', rotate: 10, width: 200, delay: 0.7 },
    { id: 4, src: images.flower1, top: '15%', right: '15%', rotate: 20, width: 150, opacity: 0.8, delay: 1.1 },
    { id: 5, src: images.flower4, top: '40%', left: '2%', rotate: -25, width: 160, delay: 0.8 },
  ];

  // If it's still rendering on the server, don't show the countdown
  if (!isClient || countdown === null) {
    return null;
  }

  return (
    <section
      id="welcome-section"
      className="min-h-svh w-full relative overflow-hidden flex flex-col justify-center items-center py-20"
    >
      {flowerDecorations.map(flower => (
        <motion.div
          key={flower.id}
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: flower.opacity || 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10, delay: flower.delay }}
          style={{
            position: 'absolute',
            top: flower.top,
            left: flower.left,
            right: flower.right,
            rotate: flower.rotate,
            width: flower.width,
            zIndex: 15, // Alternate z-index
          }}
        >
          <Image
            src={flower.src}
            alt={`Flower decoration ${flower.id}`}
            width={flower.width}
            height={flower.width} // Assuming square-ish aspect ratio
            className="object-contain"
          />
        </motion.div>
      ))}

      {/* Background Image from SplashScreen */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('${images.collage.src}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
          zIndex: 0,
        }}
      />

      {/* Gradient Overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#fffdfc] z-10 pointer-events-none" />
      
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
            src={images.envelope_open}
            alt="Open Envelope"
            quality={100}
            className="object-contain w-full h-auto drop-shadow-xl z-20"
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
            className="text-pink text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-8 md:-mt-10 md:-mb-3"
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
              style={{ rotate: -3 }}
              className="relative w-[400px] h-[500px] drop-shadow-lg"
            >
              <Image
                src={images.frame}
                alt="Frame"
                fill
                className="object-contain z-10 w-70"
              />
              <div className="absolute top-[35px] left-[60px] right-[60px] bottom-[95px] z-20 overflow-hidden">
                <Image
                  src={images.church}
                  alt="Church"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-30 text-center px-2">
                <p className="text-xl text-black leading-none">Biserica Sfantul Nicolae Domnesc</p>
                <p className="text-sm uppercase tracking-tighter text-gray-500 mt-1">
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
              style={{ rotate: 3 }}
              className="relative w-[400px] h-[500px] drop-shadow-lg"
            >
              <Image
                src={images.frame}
                alt="Frame"
                fill
                className="object-contain z-10"
              />
              <div className="absolute top-[35px] left-[60px] right-[60px] bottom-[95px] z-20 overflow-hidden">
                <Image
                  src={images.venue}
                  alt="Venue"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-30 text-center px-2">
                <p className="text-xl text-black leading-none">Restaurant Kalipso</p>
                <p className="text-sm uppercase tracking-tighter text-gray-500">
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