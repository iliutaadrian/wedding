/**
 * @file InfoSection.js
 * @description This component renders the information section of the homepage,
 * including wedding details, accommodations, and travel information. Multilingual!
 *
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import Link from "next/link";
import React from "react";
import images from "@/utils/imagesImport";
import Image from "next/image";
import { motion } from "framer-motion";
import translations from "@/utils/translations";
import WhatsappIcon from "../ui/whatsapp-icon"; // Import the new WhatsappIcon component

const InfoSection = ({ language }) => {
  // Variants for framer motion animation
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  // Destructure translation strings
  const { title, details, accommodations, travel_transport, contact } =
    translations[language].info_section;

  //Extract couple contacts from env
  const coupleEmail = process.env.NEXT_PUBLIC_EMAIL;
  const herNumber = process.env.NEXT_PUBLIC_K_NUM;
  const hisNumberUk = process.env.NEXT_PUBLIC_E_NUM_UK;
  const hisNumberIt = process.env.NEXT_PUBLIC_E_NUM_IT;

  const infoBlocks = [
    {
      image: "/images/parents.png",
      title: "Parents",
      names: ["Anisoara & Neculai Balcan", "Mirela & Cristian Podoleanu"],
    },
    {
      image: "/images/godparents.png",
      title: "Nasi",
      names: ["Alice & Andrei Iacob", "Diana & Ionuț Despina"],
    },
    {
      image: "/images/church_info.png",
      title: "Church",
      location: "Biserica \"Sfântul Nicolae Domnesc\"",
      hour: "16:00",
      mapLink: "https://www.google.com/maps/search/?api=1&query=Biserica+Sfantul+Nicolae+Domnesc+Iasi",
    },
    {
      image: "/images/venue_info.png",
      title: "Venue",
      location: "Restaurant Kalipso Sala \"Alma\"",
      hour: "19:00",
      mapLink: "https://www.google.com/maps/search/?api=1&query=Restaurant+Kalipso+Sala+Alma+Iasi",
    },
  ];

  return (
    <section
      id="info-section"
      className="bg-cream px-4 sm:px-12 py-20 flex flex-col relative overflow-hidden"
    >
      {/* Gradient Overlay for smooth transition */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-t from-transparent to-[#fffdfc] z-10 pointer-events-none" />
      {/* Gradient Overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#fffdfc] z-10 pointer-events-none" />

      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none">
        <Image
          src="/images/background.png"
          alt="background"
          fill
          className="object-cover object-top"
        />
      </div>

      {/* Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={primaryVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center px-4 z-20 mb-8 md:mb-12"
      >
        <Image
          src={images.bell}
          alt="glass"
          width={95}
          height={95}
          quality={100}
          className="mb-4 w-[95px] h-auto brightness-95"
        />
        <div className="flex justify-center items-start">
          <h3 translate="no" className=" font-bold z-20  -mr-8">
            {title.main}
          </h3>
          <h3
            translate="no"
            className="text-pink text-6xl sm:text-8xl alex-brush z-10 transform font-light"
          >
            {title.sub}
          </h3>
        </div>
      </motion.div>

      <div
        translate="no"
        className=" w-full text-center flex flex-col items-center gap-8 md:gap-12 z-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {infoBlocks.map((block, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={block.image}
                alt={block.title}
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <h5 className="mb-2">{block.title}</h5>
              {block.names &&
                block.names.map((name, i) => <p key={i}>{name}</p>)}
              {block.location && <p>{block.location}</p>}
              {block.hour && <p>{block.hour}</p>} {/* Display the hour */}
              {block.mapLink && (
                <Link
                  href={block.mapLink}
                  target="_blank"
                  className="flex justify-center items-center gap-1 border border-gold rounded-lg px-2 py-1 mt-2 font-light text-sm"
                >
                  <Image
                    src={images.location}
                    alt="Location"
                    className="w-auto h-[25px]"
                  />
                  Exact Location
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="static md:hidden h-px w-[50px] bg-black opacity-50" />
        {/* bottom Detail*/}
        <div className=" max-w-[700px] flex flex-col justify-center items-center">
          <h5 translate="no" className="mb-4">
            {contact.title}
          </h5>
          <p translate="no" className="max-sm:flex max-sm:flex-col">
            <span className="font-bold flex items-center">
              Iliuta:{" "}
              <WhatsappIcon className="w-5 h-5 ml-2" />
            </span>{" "}
            <a href="https://wa.me/40751929003" target="_blank">
              0751929003
            </a>
          </p>
          <p translate="no" className="max-sm:flex max-sm:flex-col">
            <span className="font-bold flex items-center">
              Smaranda:{" "}
              <WhatsappIcon className="w-5 h-5 ml-2" />
            </span>{" "}
            <a href="https://wa.me/40758080874" target="_blank">
              0758080874
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
