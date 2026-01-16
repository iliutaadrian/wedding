"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/Homepage.module.scss";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import translations from "@/utils/translations";
import { getCountdown } from "@/utils/countdownHelper";

const SplashScreen = ({ language }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Destructure translation strings
  const { her, him } = translations[language].couple;
  const { open } = translations[language].splash_screen;
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
  } = translations[language].welcome_section;

  // Mouse move animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const springMouseX = useSpring(mouseX, springConfig);
  const springMouseY = useSpring(mouseY, springConfig);

  // Derive subtle movement and rotation
  const x = useTransform(springMouseX, [-1, 1], [-10, 10]); // Max 10px movement
  const y = useTransform(springMouseY, [-1, 1], [-10, 10]);
  const rotateX = useTransform(springMouseY, [-1, 1], [5, -5]); // Max 5deg tilt
  const rotateY = useTransform(springMouseX, [-1, 1], [-5, 5]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    if (typeof window !== "undefined") {
      const { innerWidth, innerHeight } = window;
      // Normalize mouse position from -1 to 1
      const xPos = (clientX - innerWidth / 2) / (innerWidth / 2);
      const yPos = (clientY - innerHeight / 2) / (innerHeight / 2);
      mouseX.set(xPos);
      mouseY.set(yPos);
    }
  };

  useEffect(() => {
    setIsClient(true);
    setCountdown(getCountdown());

    const intervalId = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Disable scrolling when splash screen is mounted
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={styles.splashScreen}
          onMouseMove={handleMouseMove}
        >
          {/* Background Image */}
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

          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4" style={{ perspective: "1000px" }}>

            {isClient && countdown && !countdown.message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                translate="no"
                className="font-semibold text-black tracking-widest text-sm"
              >
                {small_text.toUpperCase()}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-row items-center justify-center gap-4"
            >
              <h1 translate="no" className="sloop-script welcome-names text-black text-5xl md:text-6xl">
                {her}
              </h1>

              <h1 translate="no" className="alex-brush welcome-names text-pink text-5xl md:text-6xl">
                <span className="max-md:hidden">&nbsp;</span>&
              </h1>
              <h1 className="sloop-script welcome-names text-black text-5xl md:text-6xl">{him}</h1>
            </motion.div>

            <motion.div
              style={{ x, y, rotateX, rotateY }}
              className="relative w-full max-w-[400px] md:max-w-[500px] aspect-[1240/876] drop-shadow-2xl my-4 cursor-pointer"
              onClick={() => setIsVisible(false)}

            >
              <Image
                src="/images/envelelope_closed.png"
                alt="Envelope"
                fill
                priority
                className="object-contain"
              />
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[22%] aspect-square">
                <Image
                  src="/images/waxseal.png"
                  alt="Wax Seal"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </motion.div>

            {isClient && countdown && !countdown.message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex justify-center gap-4 md:gap-8 text-black"
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

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-4 text-lg tracking-widest uppercase font-bold"
            >
              {open}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
