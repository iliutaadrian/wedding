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
    },
    saveTheDate_section: {
      title: "SAVE",
      title_cursive: "The Date",
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
        title: "Day 1",
        events: {
          ceremony: {
            time: "4:00 PM",
            title: "Ceremony Begins",
          },
          dinner: {
            time: "6:00 PM",
            title: "Dinner Served",
          },
          dance: {
            time: "6:00 PM",
            title: "First Dance",
          },
          photo: {
            time: "8:00 - 11:00 PM",
            title: "Photo Booth",
          },
          pig: {
            time: "12:00 AM",
            title: "Special Dish",
          },
          cake_cutting: {
            time: "22:30 PM",
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
        },
      },
      day_2: {
        title: "Day 2",
        events: {
          after: {
            time: "3:00 PM",
            title: "After Party Starts",
          },
          vespa: {
            time: "3:00 - 8:00 PM",
            title: "Vespa Bar",
          },
          party_continues: {
            time: "All Day",
            title: "Eat, Drink, Dance, Repeat!",
          },
          end: {
            time: "9:00 PM",
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
      details: {
        when_where: "When & Where",
        dates: [
          {
            bold: true,
            text: "Dates: ",
          },
          "Saturday, 26th of July & Sunday, 27th of July 2025.",
        ],
        location: [
          {
            bold: true,
            text: "Location: ",
          },
          'Venue "Przy Patykach", Kolonia Łobudzice 18c, 97-425, Poland.',
        ],
        button_loc: "SEE THE VENUE",
      },
      accommodations: {
        title: "Accommodations",
        description_1: [
          "For our international guests, we are pleased to offer accommodation at the venue's hotel on the ",
          {
            bold: true,
            text: "Friday 25th of July, Saturday 26th of July, and Sunday 27th of July.",
          },
        ],
        breakfast: [
          { bold: true, text: "Breakfast" },
          " is included with your stay and will be served from ",
          { bold: true, text: "9 AM to 12 PM" },
          " each morning.",
        ],
        checkout: [
          { bold: true, text: "Hotel/Apartment Checkout:" },
          " The checkout is on Monday at 11:00 AM, please have your breakfast before then.",
        ],
      },
      travel_transport: {
        title: "Travel & Transportation",
        description_1: [
          "For our international guests, we will provide transportation from the airport to the venue on Friday, 25th of July, and from the venue to the airport on Monday, 28th of July.",
        ],
        description_2: [
          {
            bold: true,
            text: "Before booking your travel, please contact us to let us know the time and the airport that works best for you. We will then organize a group transport that fits the majority. Please do it before the 26th of May 2025.",
          },
        ],
        description_3: [
          "The closest airports are Katowice Airport (KTW), Warsaw Modlin Airport (WMI), and Warsaw Chopin Airport (WAW).",
        ],
        description_4: [
          "We will try our best to accommodate everyone. If you cannot land/depart at the same day/time as everyone else, we will help you organize another way of getting to and from the venue.",
        ],
        transport_details: {
          arrival: {
            title: "Friday 25th of July",
            desc1: [
              { bold: true, text: "Warsaw Airport (WAW):" },
              " Bus leaves around 7:30PM - Karolina will be waiting at the arrivals.",
            ],
            desc2: [
              { bold: true, text: "Katowice Airport:" },
              " Bus leaves around 5:00PM - Emanuele will be waiting at the arrivals.",
            ],
          },
          departure: {
            title: "Monday 28th of July",
            desc1: [
              { bold: true, text: "" },
              " Buses for both airports leave at 12:00 PM",
            ],
          },
        },
      },
      contact: {
        title: "Contact Us",
        // Email added on the front end
        // numbers added on the front end
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
    footer: {
      text_1: "Website created with ",
      text_2: "by ",
      text_3: "Photos by",
    },
    not_found: {
      message: "The page you are looking for does not exist.",
      button: "Go Back",
    },
  }
};

export default translations;
