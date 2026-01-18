import React, { useRef } from "react";
import images from "@/utils/imagesImport";
import { motion, useScroll, useTransform } from "framer-motion";
import translations from "@/utils/translations";
import Image from "next/image";
import WhatsappIcon from "@/components/ui/whatsapp-icon";

const RSVPSection = ({ language }) => {
  // Destructure translation strings
  const {
    top_title,
    title,
    description,
    confirmation_text,
    confirmation_date,
    contact_message,
    phone_him,
    phone_her,
  } = translations[language].rsvp_section;
  const { him, her } = translations[language].couple;

  // Variants for framer motion animation
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.2,
      },
    },
  };
  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const ref = useRef(null); // reference for framer motion animation

  // Use useScroll with a ref to the image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effects for collage image for mobile
  const scale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);

  return (
    <section
      id="rsvp-section"
      className="relative flex flex-col w-full bg-cream"
    >
      {/* Top section */}
      <div
        className="max-md:hidden relative w-full h-[500px] bg-cover bg-center bg-no-repeat md:bg-fixed flex justify-center items-center overflow-hidden"
        style={{
          backgroundImage: `url(${images.collage.src})`,
        }}
      >
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.4 }}
          translate="no"
          className="absolute left-1/2 transform -translate-x-1/2 z-20 transition-transform text-5xl text-pink"
        >
          {top_title}
        </motion.h1>
        <div className="overlay z-0 "></div>
      </div>

      {/* Top section - Mobile */}
      <div className="md:hidden relative w-full h-[350px] overflow-hidden">
        <motion.div
          ref={ref}
          className="absolute w-full h-full"
          style={{ scale }}
        >
          <Image
            src={images.collage}
            alt="Collage"
            width={500}
            height={700}
            quality={100}
            className="absolute top-0 left-0 w-full h-full object-cover transform "
          />
        </motion.div>

        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.4 }}
          translate="no"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-transform text-4xl text-pink w-3/4"
        >
          {top_title}
        </motion.h1>
        <div className="overlay z-0"></div>
      </div>

      {/* main section */}
      <div className="w-full py-12 px-4 sm:px-6 xl:px-12 bg-cream flex flex-col lg:flex-row justify-center gap-4 lg:gap-12 xl:gap-44 relative overflow-hidden">
        {/* Decorative Flowers */}
        <div className="absolute top-0 left-0 z-0 pointer-events-none opacity-40">
          <Image
            src={images.flower3}
            alt="flower decoration"
            width={200}
            height={200}
            className="w-32 md:w-56 -translate-x-10 -translate-y-10 rotate-180"
          />
        </div>
        <div className="absolute bottom-0 right-0 z-0 pointer-events-none opacity-40">
          <Image
            src={images.flower2}
            alt="flower decoration"
            width={200}
            height={200}
            className="w-32 md:w-56 translate-x-10 translate-y-10 rotate-12"
          />
        </div>

        {/* Background Image */}
        <div className="absolute top-0 left-0 w-full h-full z-0 opacity-10 pointer-events-none">
          <Image
            src={images.background}
            alt="background"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* left part*/}
        <div className="w-full lg:w-1/2 flex justify-start lg:justify-end z-10">
          <div className="flex flex-col items-start relative w-full max-w-full sm:max-w-2xl text-left gap-0 lg:gap-6">
            <div className="flex flex-col items-start max-sm:w-full max-sm:items-center">
              <Image
                src={images.waxseal}
                alt="wax seal"
                width={80}
                height={80}
                quality={100}
                className="w-[70px] h-auto brightness-95 filter-pink mb-4 opacity-80"
              />
              <h3 translate="no" className=" font-bold z-20 ml-6 sm:ml-16">
                {title.main}
              </h3>
              <h3
                translate="no"
                className="text-pink text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-10"
              >
                {title.sub}
              </h3>
            </div>
            <p translate="no" className="text-left">
              {confirmation_text} <span className="font-bold">{confirmation_date}</span>.
            </p>
            <p translate="no" className="text-left">
              {description}
            </p>
          </div>
        </div>
        {/* right part*/}
        <div className="w-full lg:w-1/2 flex flex-col justify-center  pt-8 lg:pt-0 z-10">
          <div className="w-full lg:max-w-[600px] flex flex-col justify-center items-center text-center">
            <p className="mb-4 md:mb-6 italic font-bold">
              {contact_message}
            </p>

            <Image
              src={images.divider}
              alt="divider"
              width={200}
              height={20}
              className="w-48 h-auto mb-8 opacity-60"
            />

            {/* Contact Detail */}
            <div className="w-full flex flex-col justify-center items-center p-2 md:p-5 bg-white/40 backdrop-blur-sm shadow-sm rounded-xl border border-pink/30">
              <div className="flex flex-col sm:flex-row gap-10 sm:gap-20">
                <div translate="no" className="flex flex-col items-center gap-2">

                  <p className="italic font-bold text-blue flex items-center text-2xl">
                    {him}
                    <WhatsappIcon className="w-6 h-6 ml-3 text-green-500" />


                  </p>
                  <a href={`https://wa.me/${phone_him.replace(/\D/g, "").replace(/^0/, "40")}`} target="_blank" className="hover:text-pink transition-colors font-serif font-medium text-lg">
                    {phone_him}
                  </a>
                </div>
                <div translate="no" className="flex flex-col items-center gap-2">
                  <p className="italic font-bold text-blue flex items-center text-2xl">
                    {her}
                    <WhatsappIcon className="w-6 h-6 ml-3 text-green-500" />
                  </p>
                  <a href={`https://wa.me/${phone_her.replace(/\D/g, "").replace(/^0/, "40")}`} target="_blank" className="hover:text-pink transition-colors font-serif font-medium text-lg">
                    {phone_her}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
