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
    benefits: true,
    scheduleDetails: true,
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
        "Kalikkam is a traditional Siddha external therapy used to support and protect eye health. Though it is applied around the eyes, it is a safe, non-invasive procedure performed by trained Siddha practitioners using time-tested herbal preparations. In Siddha medicine, the eyes are closely connected to the nervous system and brain, making eye care an important part of overall health.",
        "At Aathithya Welfare Centre, Kalikkam is administered following classical Siddha guidelines. The therapy is designed to reduce eye strain, balance body heat, and support natural eye function — especially helpful in today's lifestyle where prolonged screen exposure is common. Our eye protection camps make this classical Siddha practice accessible to families across Coimbatore."
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
        "Foot Reflexology is a structured therapeutic practice based on the understanding that specific reflex zones in the feet are neurologically and energetically connected to organs, glands, and systems of the body. Gentle, rhythmic pressure applied to these points helps stimulate nerve pathways, improve circulation, and support the body's natural regulatory mechanisms.",
        "At Aathithya Welfare Centre, Foot Reflexology is offered as a holistic healing therapy that integrates clinical precision with spiritual awareness. This camp promotes deep relaxation, restores energy balance, and activates the body's innate healing intelligence — supporting overall physical, mental, and emotional well-being."
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
        "Nasyam is a classical Siddha and Ayurvedic nasal therapy that administers medicated oils or herbal preparations through the nostrils to support head, neck, and respiratory wellness. It is one of the Panchakarma procedures widely used in traditional Indian medicine to cleanse and rejuvenate the upper respiratory tract and sinuses.",
        "At Aathithya Welfare Centre, this camp offers authentic Siddha Nasyam treatment following traditional guidelines under expert supervision. The therapy helps balance the body's doshas, supports mental clarity, and promotes holistic healing for conditions related to the head, neck, and respiratory system."
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
