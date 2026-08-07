/**
 * Camp configuration — edit this file to manage camps.
 *
 * CAMP VISIBILITY
 *   active: true  → show camp in popup and learn-more page
 *   active: false → hide entire camp
 *
 * CARD CUSTOMIZATION (learn-more page) — per camp, set cardDisplay overrides.
 *   Each field: true = show, false = hide
 *   Defaults are in cardDisplayDefaults below.
 *
 * POPUP CUSTOMIZATION — per camp, set popupDisplay overrides.
 *   Defaults are in popupDisplayDefaults below.
 */
window.AathithyaCamps = {
  whatsappNumber: "918925600489",

  cardDisplayDefaults: {
    image: true,
    day: true,
    date: true,
    time: true,
    tag: true,
    title: true,
    summary: true,
    benefits: false,
    scheduleDetails: false,
    bookNow: true,
    learnMore: true
  },

  popupDisplayDefaults: {
    image: true,
    day: true,
    date: true,
    time: true,
    title: true,
    summary: true
  },

  camps: [
    {
      id: "swarnapashnam",
      active: true,
      title: "Swarnapashnam Camp for Children",
      tag: "Children's Wellness Camp",
      shortDescription:
        "Monthly Siddha wellness camp for children ages 1–16 on Poosa Nathchitram.",
      description: [
        "Swarnapashnam (Swarna Prashana) is an ancient Siddha and Ayurvedic wellness practice specially designed for children. It involves the careful administration of purified gold blended with select herbal formulations to support immunity, growth, memory, and overall development.",
        "At Aathithya Wellness Centre, this sacred tradition is offered as a monthly camp conducted on Poosa Nathchitram, a highly auspicious timing believed to enhance the medicine's effectiveness according to Siddha wisdom."
      ],
      image: "assets/images/about/swarnapashnam-camp.png",
      day: "Saturday",
      date: "7 August 2026",
      time: "10:00 AM – 4:00 PM",
      whatsappMessage: "Hi, I would like to book Swarnapashnam Camp for my child.",
      detailLink: "swarnapashnam.html",
      cardDisplay: {
        benefits: false,
        scheduleDetails: false
      },
      benefits: [
        "Enhances natural immunity in children",
        "Supports healthy growth and development",
        "Improves memory, concentration, and learning ability",
        "Helps reduce frequent infections and illnesses"
      ],
      scheduleItems: [
        { icon: "fa-calendar", label: "Frequency", value: "Monthly on Poosa Nathchitram" },
        { icon: "fa-child", label: "Age Group", value: "Children aged 1 to 16 years" },
        { icon: "fa-location-dot", label: "Location", value: "Aathithya Welfare Centre, Coimbatore" }
      ]
    },
    {
      id: "kalikkam",
      active: true,
      title: "Free Eye Camp – Kalikkam",
      tag: "Free Eye Care Camp",
      shortDescription:
        "Traditional Siddha Kalikkam eye-care camp supporting natural eye health.",
      description: [
        "Kalikkam is a traditional Siddha external therapy used to support and protect eye health. Though applied around the eyes, it is a safe, non-invasive procedure performed by trained Siddha practitioners using time-tested herbal preparations.",
        "Our free eye camps make this classical Siddha eye-care practice accessible to the community, helping reduce eye strain, balance body heat, and support natural eye function."
      ],
      image: "assets/images/about/kalikkam.jpg",
      day: "Friday",
      date: "7 August 2026",
      time: "9:00 AM – 1:00 PM",
      whatsappMessage: "Hi, I would like to book Kalikkam Eye Camp session.",
      detailLink: "kalikkam.html",
      cardDisplay: {
        benefits: false,
        scheduleDetails: false
      },
      benefits: [
        "Helps reduce eye strain and tiredness",
        "Supports natural visual clarity",
        "Aids in cooling excess body heat",
        "Promotes relaxation of eye-related nerves"
      ],
      scheduleItems: [
        { icon: "fa-eye", label: "Therapy", value: "Traditional Siddha Kalikkam eye care" },
        { icon: "fa-users", label: "For", value: "Adults with eye strain or screen fatigue" },
        { icon: "fa-location-dot", label: "Location", value: "Aathithya Welfare Centre, Coimbatore" }
      ]
    },
    {
      id: "wellness-camp",
      active: true,
      title: "Holistic Wellness Camp",
      tag: "Special Camp",
      shortDescription:
        "A combined Siddha wellness camp with consultations and therapies.",
      description: [
        "A special wellness camp offering Siddha consultations, herbal guidance, and holistic healing sessions for the whole family."
      ],
      image: "assets/images/about/foot-reflexology-therapy.jpg",
      day: "Sunday",
      date: "10 August 2026",
      time: "11:00 AM – 3:00 PM",
      whatsappMessage: "Hi, I would like to book the Holistic Wellness Camp.",
      detailLink: "contact.html",
      cardDisplay: {
        benefits: false,
        scheduleDetails: false
      },
      benefits: [
        "Holistic Siddha consultation",
        "Personalised wellness guidance",
        "Traditional therapy options"
      ],
      scheduleItems: [
        { icon: "fa-calendar", label: "Frequency", value: "Special seasonal camp" },
        { icon: "fa-location-dot", label: "Location", value: "Aathithya Welfare Centre, Coimbatore" }
      ]
    }
  ]
};
