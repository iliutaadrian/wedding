/**
 * @file send-email.js
 * @description Handles sending emails using the EmailJS service, initialized with environment variables for public key, service ID, and template ID.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import emailjs from "emailjs-com";

// Initialize EmailJS
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

const sendEmail = async (data) => {
  try {
    // Send the email using EmailJS service
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // EmailJS Service ID
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, // EmailJS Template ID
      data // Data to be included in the email
    );

    return result; // Return the result on success
  } catch (error) {
    // catch errors
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;
