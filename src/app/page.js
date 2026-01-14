/**
 * @file page.js
 * @description Homepage structure including various sections like welcome, save the date, RSVP, and more for the wedding website.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

"use client";

import React, { useState, useEffect } from "react";
import {
  SplashScreen,
  WelcomeSection,
  SaveTheDate,
  ScheduleSection,
  InfoSection,
  RSVPSection,
  MusicSection,
} from "@/components";

export default function Home() {
  const [language, setLanguage] = useState("en"); // Set default Language

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 return (
    <main className={`relative w-full h-full`}>
      <SplashScreen language={language} />

      {/* Welcome Section */}
      <WelcomeSection language={language} />

      <div className="relative z-10">
        {/* Save the Date Section */}
        <SaveTheDate language={language} />

        {/* Wedding Agenda / Schedule Section */}
        <ScheduleSection language={language} />

        {/* Information Section */}
        <InfoSection language={language} />

        {/* RSVP Section */}
        <RSVPSection language={language} />

        {/* Song Requests Section */}
        <MusicSection language={language} />
      </div>
    </main>
  );
}
