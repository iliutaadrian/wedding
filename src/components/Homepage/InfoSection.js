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
  const { title, contact, people, events } =
    translations[language].info_section;

  const peopleBlocks = [
    {
      image: images.parents,
      title: people.parents.title,
      names: people.parents.names,
    },
    {
      image: images.godparents,
      title: people.godparents.title,
      names: people.godparents.names,
    },
  ];

  const eventBlocks = [
    {
      image: images.church_info,
      title: events.church.title,
      location: events.church.location,
      hour: events.church.time,
      mapLink: "https://www.google.com/maps/search/?api=1&query=Biserica+Sfantul+Nicolae+Domnesc+Iasi",
      buttonText: events.church.button,
    },
    {
      image: images.venue_info,
      title: events.venue.title,
      location: events.venue.location,
      hour: events.venue.time,
      mapLink: "https://www.google.com/maps/search/?api=1&query=Restaurant+Kalipso+Sala+Alma+Iasi",
      buttonText: events.venue.button,
    },
  ];

  return (
    <section
      id="info-section"
      className="bg-cream px-4 sm:px-12 py-20 flex flex-col relative overflow-hidden"
    >
      {/* Decorative Flowers */}
      <div className="absolute top-0 left-0 z-10 pointer-events-none opacity-80">
        <Image src={images.flower3} alt="flower decoration" width={200} height={200} className="w-32 md:w-56 -translate-x-10 -translate-y-10 rotate-180" />
      </div>
       <div className="absolute bottom-0 left-0 z-10 pointer-events-none opacity-80">
        <Image src={images.flower1} alt="flower decoration" width={200} height={200} className="w-32 md:w-56 -translate-x-10 translate-y-10 -rotate-12" />
      </div>
      <div className="absolute bottom-0 right-0 z-10 pointer-events-none opacity-80">
        <Image src={images.flower2} alt="flower decoration" width={200} height={200} className="w-32 md:w-56 translate-x-10 translate-y-10 rotate-12" />
      </div>

      {/* Gradient Overlay for smooth transition */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-t from-transparent to-[#fffdfc] z-10 pointer-events-none" />
      {/* Gradient Overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#fffdfc] z-10 pointer-events-none" />

      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none">
        <Image
          src={images.background}
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
        className="w-full flex flex-col items-center px-4 z-10"
      >
        <Image
          src={images.bell}
          alt="bell"
          width={95}
          height={95}
          quality={100}
          className="w-[95px] h-auto brightness-95 filter-pink"
        />
        <div className="flex flex-col justify-center items-center">
          <h3 translate="no" className="text-blue font-bold z-20 ">
            {title.main}
          </h3>
          <h3
            translate="no"
            className="text-pink text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-8 md:-mt-10"
          >
            {title.sub}
          </h3>
        </div>
      </motion.div>

      <div
        translate="no"
        className="w-full max-w-6xl mx-auto flex flex-col items-center gap-16 z-20"
      >
        {/* People Section */}
        <div className="w-full flex flex-col md:flex-row justify-center gap-8 md:gap-24">
          {peopleBlocks.map((block, index) => (
            <div key={index} className="flex flex-col items-center text-center group md:w-1/3 w-full">
              <div className="relative mb-3 md:mb-6">
                <Image
                  src={block.image}
                  alt={block.title}
                  className="rounded-full shadow-md object-cover w-[200px] md:w-[200px] lg:w-[250px]"
                />
              </div>
              <h5 className="mb-1 md:mb-3 text-2xl md:text-3xl text-gold italic">{block.title}</h5>
              {block.names &&
                block.names.map((name, i) => <p key={i} className="font-light tracking-wide mb-0">{name}</p>)}
            </div>
          ))}
        </div>


        {/* Events Section */}
        <div className="w-full flex flex-col md:flex-row justify-center gap-8 md:gap-24">
          {eventBlocks.map((block, index) => (
            <div key={index} className="flex flex-col items-center text-center md:w-1/3 w-full">
               <div className="relative mb-3 md:mb-6">
                <Image
                  src={block.image}
                  alt={block.title}
                  width={140}
                  height={140}
                  className="rounded-full shadow-md object-cover w-[200px] md:w-[200px] lg:w-[250px]"
                />
              </div>
              <h5 className="mb-1 md:mb-3 text-2xl md:text-3xl text-gold italic">{block.title}</h5>
              {block.location && <p className="max-w-[250px] mb-0 md:mb-1">{block.location}</p>}
              {block.hour && <p className="text-gray-600 mb-2 md:mb-3">{block.hour}</p>}
              {block.mapLink && (
                <Link
                  href={block.mapLink}
                  target="_blank"
                  className="flex justify-center items-center gap-2 text-gold hover:text-pink transition-colors duration-300 font-light text-xs md:text-sm uppercase tracking-wider border-b border-transparent hover:border-pink pb-0.5"
                >
                  <Image
                    src={images.location}
                    alt="Location"
                    className="w-3 md:w-4 h-auto"
                  />
                  {block.buttonText}
                </Link>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InfoSection;
