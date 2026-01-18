"use client";

import React from "react";
import translations from "@/utils/translations";
import images from "@/utils/imagesImport";
import Image from "next/image";
import ScrollingImages from "../ScrollingImages/ScrollingImages";
import { motion } from "framer-motion";
import { getCountdown } from "@/utils/countdownHelper";

const OurStorySection = ({ language }) => {
  // Variants for framer motion animations
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const secondaryVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 } },
  };
  const tertiaryVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 } },
  };

  // Get the countdown from the helper function
  const countdown = getCountdown();

  // Destructure translation strings
  const {
    title,
    title_cursive,
    story_1,
    story_2,
    story_3,
    story_4_future,
    story_4_past,
  } = translations[language].our_story_section;

  // Group story elements for convenience
  const story = [
    { year: 2012, text: story_1, img: images.story_1 },
    { year: 2014, text: story_2, img: images.story_2 },
    { year: 2025, text: story_3, img: images.story_3 },
    {
      year: 2026,
      text: countdown.message ? story_4_past : story_4_future,
      img: images.story_4,
    },
  ];

  return (
    <section
      id="our-story-section"
      className="px-4 sm:px-6 relative flex justify-center items-center flex-col overflow-hidden"
    >
      {/* Gradient Overlay for smooth transition */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-t from-transparent to-[#fffdfc] z-10 pointer-events-none" />


      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none">
        <Image
          src={images.background3}
          alt="background"
          fill
          className="object-cover object-top"
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={primaryVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center px-4 z-10"
      >
        <Image
          src={images.dove}
          alt="rings"
          width={95}
          height={95}
          quality={100}
          className="w-[95px] h-auto brightness-95"
        />
        <div className="flex flex-col justify-center items-center">
          <h3 translate="no" className="text-blue font-bold z-20 ">
            {title}
          </h3>
          <h3
            translate="no"
            className="text-pink text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-8 md:-mt-10"
          >
            {title_cursive}
          </h3>
        </div>
      </motion.div>

      <div className="relative w-full flex flex-col items-center gap-8 mt-12 mb-12">
        <div className="absolute top-0 w-px h-[100%] border border-gold border-dashed z-0"></div>
        <div className="w-full flex flex-col items-center gap-8 z-10">
          {story.map((item, index) => (
            <div
              key={`${item.year}-${index}`}
              className="w-full flex flex-col max-md:bg-transparent max-md:pt-4"
            >
              <div
                className={`flex justify-center items-center max-md:flex-col-reverse ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`w-full md:w-[50%] xl:w-[600px] flex ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  } items-center`}
                >
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={
                      index % 2 === 0 ? tertiaryVariants : secondaryVariants
                    }
                    viewport={{ once: true, amount: 0.2 }}
                    className={`flex flex-1 flex-col ${
                      index % 2 === 0
                        ? "md:items-end md:mr-6"
                        : "md:items-start md:ml-6"
                    } max-md:items-center justify-start max-md:pt-4 max-md:bg-white/60 max-md:backdrop-blur-sm max-md:rounded-2xl max-md:px-4 max-md:pb-2`}
                  >
                    <p
                      translate="no"
                      className="md:hidden text-center bg-blue text-white rounded-xl px-2 flex justify-center items-center mb-2"
                    >
                      {item.year}
                    </p>

                    <p
                      translate="no"
                      className={`leading-5 text-blue max-md:mb-4 ${
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      {item.text}
                    </p>
                  </motion.div>
                  <div
                    className={`max-lg:hidden h-px w-[50px] xl:w-[120px] bg-pink flex items-center ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div className="h-[7px] w-[7px] rounded-full bg-pink"></div>
                  </div>
                </div>
                <div className="relative w-[140px] h-[140px] md:w-[90px] md:h-[90px] lg:w-[130px] lg:h-[120px]  xl:w-[190px] xl:h-[190px] flex justify-center items-center overflow-hidden rounded-full">
                  <div className="w-full h-full  absolute  z-[1] bg-white border-4 border-pink rounded-full" />
                  <Image
                    src={item.img}
                    alt={item.text}
                    className="w-full h-full z-10 object-cover rounded-full scale-125"
                  />
                </div>

                <div
                  className={`max-md:hidden w-[50%] xl:w-[600px] ${
                    index % 2 === 0 ? "items-start" : "items-end"
                  }`}
                >
                  <p
                    translate="no"
                    className={`font-semibold text-blue text-2xl ${
                      index % 2 !== 0 ? "text-right mr-4" : "text-left ml-4"
                    } m-0`}
                  >
                    {item.year}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parallax images are rendered here because are part of this section */}
      <ScrollingImages />
    </section>
  );
};

export default OurStorySection;
