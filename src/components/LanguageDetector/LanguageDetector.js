/**
 * @file LanguageDetector.js
 * @description A component that detects the user's browser language and sets it to one of the supported languages (English, Italian, Polish).
 *              Defaults to English if the detected language is not supported.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

"use client";

import { useState, useEffect } from "react";

const LanguageDetector = () => {
  const [language, setLanguage] = useState("en"); // Default language is English

  useEffect(() => {
    // Detect browser language
    const browserLanguage = navigator.language || navigator.userLanguage;

    // We're only supporting a few languages, so let's normalize it
    const supportedLanguages = ["en", "it", "pl"];
    const detectedLanguage = supportedLanguages.includes(
      browserLanguage.slice(0, 2)
    )
      ? browserLanguage.slice(0, 2)
      : "en"; // Default to English if unsupported

    setLanguage(detectedLanguage);
  }, []);

  return null;
};

export default LanguageDetector;
