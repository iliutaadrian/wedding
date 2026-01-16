/**
 * @file translation.js
 * @description Contains translations for the website in English, Italian, and Polish, covering various sections such as navbar, RSVP, registry, and more.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

const translations = {
  // ENGLISH <---------------------------------------------------------------------------------------
  en: {
    couple: {
      her: "Smaranda",
      him: "Iliuta",
      footer_her: "Smaranda",
      footer_him: "Iliuta",
    },
    navbar: {
      welcome: "Welcome",
      save_the_date: "Save the Date",
      schedule: "Wedding Timeline",
      info: "Details",
      rsvp: "RSVP",
      music: "Playlist",
    },
    splash_screen: {
      open: "CLICK TO OPEN",
    },
    welcome_section: {
      small_text: "The wedding of...",
      days: "Days",
      day: "Day",
      hours: "Hours",
      hour: "Hours",
      minutes: "Minutes",
      minute: "Minute",
      seconds: "Seconds",
      second: "second",
      button: "Save the Date",
      click_details: "Click for details",
    },
    our_story_section: {
      title: "Our",
      title_cursive: "Story",
      date: "2nd of May 2026",
      place: "Iasi, Romania",
      story_1: "We Met",
      story_2: "We Got Engaged",
      story_3_future: "We Will Marry",
      story_3_past: "We Got Married",
    },
    schedule_section: {
      title: {
        main: "WEDDING",
        sub: "Timeline",
      },
      description:
        "The wedding celebration will start on Saturday, 26th of July, and end on Sunday, 27th of July 2025.",
      day_1: {
        events: {
          ceremony: {
            time: "4:00 PM",
            title: "Ceremony Begins",
          },
          dinner: {
            time: "7:00 PM",
            title: "Wedding Starts",
          },
          dance: {
            time: "8:00 PM",
            title: "First Dance",
          },
          cake_cutting: {
            time: "23:30 PM",
            title: "Cake Cutting",
          },
          games: {
            time: "12:30 AM",
            title: "Party Games",
          },
          party: {
            time: "All Night",
            title: "Eat, Drink, Dance, Repeat!",
          },
                    party_continues: {
            time: "All Day",
            title: "Eat, Drink, Dance, Repeat!",
          },
          end: {
            time: "4:00 AM",
            title: "The End",
          },
        },
      },
    },
    info_section: {
      title: {
        main: "THE",
        sub: "Details",
      },
      contact: {
        title: "Contact Us",
      },
    },
    rsvp_section: {
      top_title: "RSVP",
      title: { main: "Confirm your", sub: "Attendance" },
      description_1: [
        { bold: true, text: "Please RSVP by the 26th of May 2025!" },
        " Simply search for your name on the form and confirm your attendance.",
      ],
      description_2:
        "Please leave us a note if you have any special requests, dietary restrictions, or if there’s anything else you’d like to discuss. We want to make sure everyone is comfortable and has an amazing time!",
      label: "Search your name in the guests list",
      placeholder: "Search for your name",
      no_found: "No guests found with this name",
      multiple_guests_1: {
        hi: "Hi ",
        you: " You, ",
        and: " and ",
        are_invited:
          ", are warmly invited to join us on our special day. Celebrating with all of you will make it unforgettable!",
      },
      multiple_guests_2:
        "Select who is attending the wedding. We hope all of you can make it.",
      single_guest_1: {
        hi: "Hi ",
        are_invited:
          " you are warmly invited to join us on our special day. Celebrating with you will make it unforgettable!",
      },
      single_guest_2: "Are you attending the wedding?",
      answers: { yes: "Yes", no: "No", unknown: "Don't know yet" },
      note_placeholder: "Would you like to leave a note?",
      rsvp_success: {
        thanks: "Thank you!",
        submitted: " Your RSVP has been submitted.",
        change_by: [
          "Remember that you can change the attendance any time before the ",
          { bold: true, text: "26th of May 2025" },
          ".",
        ],
      },
      error_enter_name: "Please enter your answer before submitting",
      error_submitting: "Error submitting RSVP. Please try again.",
      button: {
        submit: "Send RSVP",
        loading: "Loading...",
      },
    },
    music_section: {
      title: { main: "OUR", sub: "Playlist" },
      description:
        "Add your favorite party songs to our playlist and help us shape the perfect soundtrack for our wedding! ",
      placeholder: "Enter the song name",
      small_note:
        "* Some songs can't be played here, but you can still add them to the playlist.",
      toast_success: {
        title: "Song added to the playlist",
        description: "Would you like to add another song?",
      },
      toast_error: {
        title: "Unable to add the song",
        description:
          "We're sorry, but something went wrong on our end. Please try again later.",
      },
    },
    not_found: {
      message: "The page you are looking for does not exist.",
      button: "Go Back",
    },
  }
};

export default translations;
