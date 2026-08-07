/**
 * Camp configuration — edit this file to manage camps.
 *
 * CAMP VISIBILITY
 *   active: true  → show camp in popup and learn-more page
 *   active: false → hide entire camp
 *
 * EVENT SCHEDULE (yellow date / day / time block)
 *   Edit eventSchedule for the shared camp date shown in popup and cards.
 *
 * CARD / POPUP CUSTOMIZATION
 *   cardDisplayDefaults / popupDisplayDefaults — global show/hide
 *   Per camp: cardDisplay / popupDisplay overrides
 */
window.AathithyaCamps = {
  whatsappNumber: "918925600489",

  eventSchedule: {
    date: "08th August 2026",
    day: "Saturday",
    dayTamil: "சனிக்கிழமை",
    time: "10 AM to 6 PM"
  },

  scheduleDisplayOrder: ["date", "day", "time"],

  cardDisplayDefaults: {
    image: true,
    day: false,
    date: false,
    time: false,
    tag: true,
    title: true,
    summary: true,
    description: true,
    benefits: false,
    scheduleDetails: false,
    bookNow: true,
    learnMore: true
  },

  popupDisplayDefaults: {
    image: true,
    title: true,
    summary: false
  },

  popupScheduleDisplay: {
    date: true,
    day: true,
    time: true
  },

  camps: [
    {
      id: "kalikkam-eye-camp",
      active: true,
      title: "Kalikkam – Eye Protection Camp",
      titleTamil: "கலிக்கம் - கண் பாதுகாப்பு முகாம்",
      tag: "Siddha Eye Care Camp",
      shortDescription:
        "Traditional Siddha Kalikkam therapy camp for natural eye health and protection.",
      description: [
        "Kalikkam is a traditional Siddha external therapy used to support and protect eye health. It is a safe, non-invasive procedure performed by trained Siddha practitioners using time-tested herbal preparations.",
        "Our eye protection camps make this classical Siddha practice accessible, helping reduce eye strain and support natural eye function."
      ],
      image: "assets/images/about/kalikkam.jpg",
      whatsappMessage: "Hi, I would like to book Kalikkam Eye Protection Camp.",
      detailLink: "kalikkam.html",
      benefits: [
        "Helps reduce eye strain and tiredness",
        "Supports natural visual clarity",
        "Aids in cooling excess body heat",
        "Promotes relaxation of eye-related nerves"
      ],
      scheduleItems: [
        { icon: "fa-eye", label: "Therapy", value: "Kalikkam – Siddha eye care" },
        { icon: "fa-location-dot", label: "Location", value: "Aathithya Welfare Centre, Coimbatore" }
      ]
    },
    {
      id: "foot-reflexology-camp",
      active: true,
      title: "Foot Reflexology Therapy",
      titleTamil: "பாத அழுத்த சிகிச்சை",
      tag: "Foot Pressure Therapy Camp",
      shortDescription:
        "Siddha foot reflexology camp supporting balance, relaxation, and holistic wellness.",
      description: [
        "Foot reflexology is a therapeutic practice that applies gentle pressure to specific points on the feet to support overall body wellness and relaxation.",
        "At Aathithya Welfare Centre, this camp offers traditional foot pressure therapy guided by experienced practitioners."
      ],
      image: "assets/images/about/foot-reflexology-therapy.jpg",
      whatsappMessage: "Hi, I would like to book Foot Reflexology Therapy camp.",
      detailLink: "foot-reflexology.html",
      benefits: [
        "Promotes relaxation and stress relief",
        "Supports natural energy balance",
        "Helps improve circulation",
        "Complements holistic Siddha wellness"
      ],
      scheduleItems: [
        { icon: "fa-shoe-prints", label: "Therapy", value: "Foot reflexology / pressure therapy" },
        { icon: "fa-location-dot", label: "Location", value: "Aathithya Welfare Centre, Coimbatore" }
      ]
    },
    {
      id: "nasyam-camp",
      active: true,
      title: "Nasyam – Siddha Medicine Camp",
      titleTamil: "நசியம் - சித்த மருத்துவ முகாம்",
      tag: "Siddha Nasal Therapy Camp",
      shortDescription:
        "Traditional Nasyam Siddha medicine camp for nasal therapy and holistic healing.",
      description: [
        "Nasyam is a classical Siddha and Ayurvedic nasal therapy that administers medicated oils or preparations through the nostrils to support head, neck, and respiratory wellness.",
        "This camp offers authentic Siddha Nasyam treatment following traditional guidelines under expert supervision."
      ],
      image: "assets/images/about/nasyam-camp.jpg",
      whatsappMessage: "Hi, I would like to book Nasyam Siddha Medicine Camp.",
      detailLink: "authentic-siddha-treatment-aathitya-wellness-centre.html",
      benefits: [
        "Supports head and neck wellness",
        "Traditional Siddha nasal therapy",
        "Helps balance doshas naturally",
        "Conducted by trained Siddha practitioners"
      ],
      scheduleItems: [
        { icon: "fa-leaf", label: "Therapy", value: "Nasyam – Siddha nasal treatment" },
        { icon: "fa-location-dot", label: "Location", value: "Aathithya Welfare Centre, Coimbatore" }
      ]
    }
  ]
};
