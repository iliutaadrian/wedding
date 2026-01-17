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
      <div className="absolute top-0 right-0 z-10 pointer-events-none opacity-80">
        <Image src={images.flower4} alt="flower decoration" width={200} height={200} className="w-32 md:w-56 translate-x-10 -translate-y-10 -rotate-90" />
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
        className="w-full flex flex-col items-center px-4 z-20 mb-6 md:mb-12"
      >
        <Image
          src={images.bell}
          alt="bell"
          width={95}
          height={95}
          quality={100}
          className="w-[60px] md:w-[95px] h-auto brightness-95 filter-pink"
        />
        <div className="flex flex-col md:flex-row justify-center items-center text-center">
          <h3 translate="no" className="font-bold uppercase tracking-widest text-base md:text-xl mb-1 md:mb-0 md:mr-4">
            {title.main}
          </h3>
          <h3
             translate="no"
            className="text-pink text-5xl sm:text-7xl md:text-8xl alex-brush z-10 transform font-light"
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
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="relative mb-3 md:mb-6">
                 <div className="absolute inset-0 bg-pink/10 rounded-full transform scale-95 group-hover:scale-105 transition-transform duration-500" />
                <Image
                  src={block.image}
                  alt={block.title}
                  width={140}
                  height={140}
                  className="rounded-full shadow-md relative z-10 w-[100px] md:w-[140px] lg:w-[160px]"
                />
              </div>
              <h5 className="mb-1 md:mb-3 text-xl md:text-2xl text-gold italic">{block.title}</h5>
              {block.names &&
                block.names.map((name, i) => <p key={i} className="text-base md:text-lg font-light tracking-wide mb-0">{name}</p>)}
            </div>
          ))}
        </div>


        {/* Events Section */}
        <div className="w-full flex flex-col md:flex-row justify-center gap-8 md:gap-24">
          {eventBlocks.map((block, index) => (
            <div key={index} className="flex flex-col items-center text-center">
               <div className="relative mb-3 md:mb-6">
                <Image
                  src={block.image}
                  alt={block.title}
                  width={140}
                  height={140}
                  className="rounded-full shadow-md object-cover w-[100px] md:w-[140px] lg:w-[160px]"
                />
              </div>
              <h5 className="mb-1 md:mb-3 text-xl md:text-2xl text-gold italic">{block.title}</h5>
              {block.location && <p className="font-medium text-base md:text-lg max-w-[250px] mb-0 md:mb-1">{block.location}</p>}
              {block.hour && <p className="text-gray-600 text-sm md:text-base mb-2 md:mb-3">{block.hour}</p>}
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

        {/* Contact Detail */}
        <div className="max-w-[700px] flex flex-col justify-center items-center mt-4 md:mt-8 p-4 md:p-8 bg-white/40 backdrop-blur-sm shadow-sm">
          <h5 translate="no" className="mb-4 md:mb-6 font-serif text-xl md:text-2xl">
            {contact.title}
          </h5>
          <div className="flex flex-row gap-8 sm:gap-16">
            <p translate="no" className="flex flex-col items-center gap-1">
              <span className="font-bold flex items-center text-lg">
                Iliuta
                <WhatsappIcon className="w-5 h-5 ml-2 text-green-500" />
              </span>
              <a href="https://wa.me/40751929003" target="_blank" className="hover:text-gold transition-colors">
                0751929003
              </a>
            </p>
            <p translate="no" className="flex flex-col items-center gap-1">
              <span className="font-bold flex items-center text-lg">
                Smaranda
                <WhatsappIcon className="w-5 h-5 ml-2 text-green-500" />
              </span>
              <a href="https://wa.me/40758080874" target="_blank" className="hover:text-gold transition-colors">
                0758080874
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
