/**
 * @file importGuests.js
 * @description This script is used to push the guest list into Firestore from a local file.
 * To run the import process, execute the command: `node src/firebase/importGuests.js`.
 *
 * Example of how the guests list from utils should look like:
 *
 * const guestsList = [
 *   {
 *     id: 1,
 *     name: "John Doe",
 *     guestSide: "Emanuele",
 *     relationshipIds: [2, 3],
 *     attending: "Unknown",
 *     note: "",
 *   },
 *   {
 *     id: 2,
 *     name: "Jane Doe",
 *     guestSide: "Emanuele",
 *     relationshipIds: [1, 3],
 *     attending: "Yes",
 *     note: "",
 *   },
 *   // and so on...
 * ];
 *
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

const { db } = require("./adminPush");
const guestsList = require("../utils/guestsList");

// Function to add guests to Firestore
const importGuests = async () => {
  const batch = db.batch(); // Using batch for bulk writes

  guestsList.forEach((guest) => {
    const docRef = db.collection("guests").doc(`${guest.id}`); // Use guest id as document ID
    batch.set(docRef, guest); // Add each guest to Firestore
  });

  try {
    await batch.commit(); // Commit the batch write
    console.log("Guests successfully added!");
  } catch (error) {
    console.error("Error adding guests: ", error);
  }
};

importGuests();
