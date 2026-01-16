"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import translations from "@/utils/translations";

export default function NotFoundComponent() {
  const [language, setLanguage] = useState("en"); // Default language

  // Destructure translation strings
  const { message, button } = translations[language].not_found;

  return (
    <>
      <div className="w-full h-svh bg-blue p-6 flex flex-col justify-center items-center">
        {/* Error 404 message */}
        <h1 className="uppercase text-center text-gold mb-4">
          Oops!{" "}
          <span className="font-serif font-bold text-5xl sm:text-9xl">404</span>
        </h1>
        <h3 className="uppercase text-center text-white mb-6">{message}</h3>
        {/* Link to return to the homepage */}
        <Link href="/" className="btn btn-gold">
          {button}
        </Link>
      </div>
    </>
  );
}
