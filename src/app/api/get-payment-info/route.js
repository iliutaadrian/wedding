/**
 * @file route.js
 * @description API endpoint to securely retrieve payment information from Firebase Firestore. This ensures that sensitive payment data is fetched and handled server-side for better security.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import { NextResponse } from "next/server";
import { db } from "@/firebase/admin"; // Admin SDK instance

export async function POST() {
  try {
    // Fetch payment information from Firestore, using the "payment_data" collection
    const paymentDoc = await db
      .collection("payment_data") // Document containing currency-related payment info
      .doc("currencies")
      .get();

    // check if document exists
    if (!paymentDoc.exists) {
      return NextResponse.json({
        success: false,
        message: "Payment data not found",
      });
    }

    // Get all currency information (EUR, GBP, PLN, etc.)
    const paymentData = paymentDoc.data();

    return NextResponse.json({
      success: true,
      paymentInfo: paymentData, // Return all payment data
    });
  } catch (error) {
    // handle unexpected error
    return NextResponse.json({
      success: false,
      message: "Error fetching payment info",
      error: error.message,
    });
  }
}
