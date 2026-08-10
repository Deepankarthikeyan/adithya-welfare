(function () {
  "use strict";

  var config = window.AathithyaCamps;

  if (!config || !config.camps) {
    return;
  }

  function getActiveCamps() {
    return config.camps.filter(function (camp) {
      return camp.active;
    });
  }

  function getPopupCamps() {
    return config.camps.filter(function (camp) {
      return camp.active && camp.showInPopup !== false;
    });
  }

  function getEventSchedule(camp) {
    if (camp && camp.date) {
      return camp;
    }
    return config.eventSchedule || {};
  }

  function mergeDisplay(camp, type) {
    var defaults =
      type === "card"
        ? config.cardDisplayDefaults || {}
        : config.popupDisplayDefaults || {};
    var overrides =
      type === "card" ? camp.cardDisplay || {} : camp.popupDisplay || {};
    var merged = {};

    Object.keys(defaults).forEach(function (key) {
      merged[key] =
        overrides[key] !== undefined ? overrides[key] : defaults[key];
    });

    Object.keys(overrides).forEach(function (key) {
      if (merged[key] === undefined) {
        merged[key] = overrides[key];
      }
    });

    return merged;
  }

  function getScheduleDisplay(type) {
    if (type === "popup") {
      return config.popupScheduleDisplay || {
        date: true,
        day: true,
        time: true
      };
    }
    return {
      date: config.cardDisplayDefaults.date,
      day: config.cardDisplayDefaults.day,
      time: config.cardDisplayDefaults.time
    };
  }

  function waLink(message) {
    return (
      "https://wa.me/+" +
      config.whatsappNumber +
      "?text=" +
      encodeURIComponent(message)
    );
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function renderCampTitle(camp, tagName, className) {
    var html = "<" + tagName + " class=\"" + className + "\">";
    html += escapeHtml(camp.title);
    if (camp.titleTamil) {
      html +=
        '<span class="camp_title_tamil">' + escapeHtml(camp.titleTamil) + "</span>";
    }
    html += "</" + tagName + ">";
    return html;
  }

  function renderScheduleHighlight(schedule, display, extraClass) {
    if (!schedule) {
      return "";
    }

    var order = config.scheduleDisplayOrder || ["date", "day", "time"];
    var parts = [];

    order.forEach(function (key) {
      if (key === "date" && display.date && schedule.date) {
        parts.push(
          '<span class="camp_highlight_date">' +
            escapeHtml(schedule.date) +
            "</span>"
        );
      }
      if (key === "day" && display.day) {
        var dayText = schedule.dayTamil || schedule.day || "";
        if (dayText) {
          parts.push(
            '<span class="camp_highlight_day">' + escapeHtml(dayText) + "</span>"
          );
        }
      }
      if (key === "time" && display.time && schedule.time) {
        parts.push(
          '<span class="camp_highlight_time">' +
            escapeHtml(schedule.time) +
            "</span>"
        );
      }
    });

    if (parts.length === 0) {
      return "";
    }

    var classNames = "camp_schedule_highlight";
    if (extraClass) {
      classNames += " " + extraClass;
    }
    if (extraClass && extraClass.indexOf("yellow") !== -1) {
      classNames += " camp_schedule_flyer";
    }

    return '<div class="' + classNames + '">' + parts.join("") + "</div>";
  }

  function renderCampImage(camp, altClass, imageSrc) {
    var imgClass = "camp_uniform_image";
    if (altClass) {
      imgClass += " " + altClass;
    }
    return (
      '<div class="camp_image_frame">' +
      '<img class="' +
      imgClass +
      '" src="' +
      escapeHtml(imageSrc || camp.image) +
      '" alt="' +
      escapeHtml(camp.title) +
      '">' +
      "</div>"
    );
  }

  function renderFlyerPopupLayout(camp) {
    var imageSrc = camp.popupImage || camp.image;
    var imageOnly = !!camp.popupFlyerImageOnly;

    if (imageOnly) {
      return (
        '<div class="camp_popup_flyer_layout camp_popup_flyer_layout--image-only">' +
        '<img class="camp_popup_flyer_full_image" src="' +
        escapeHtml(imageSrc) +
        '" alt="' +
        escapeHtml(camp.title) +
        '">' +
        "</div>"
      );
    }

    var content = camp.popupFlyerContent || {};
    var schedule = getEventSchedule(camp);
    var dateNumber = content.dateNumber || schedule.date || "";
    var dateMonthTamil =
      content.dateMonthTamil || schedule.dayTamil || schedule.day || "";
    var time = content.time || schedule.time || "";

    return (
      '<div class="camp_popup_flyer_layout">' +
      '<div class="camp_popup_flyer_media">' +
      renderCampImage(camp, "camp_popup_flyer_photo", imageSrc) +
      "</div>" +
      '<div class="camp_popup_flyer_details">' +
      '<div class="camp_popup_flyer_date">' +
      (dateNumber
        ? '<span class="camp_popup_flyer_date_num">' +
          escapeHtml(dateNumber) +
          "</span>"
        : "") +
      (dateMonthTamil
        ? '<span class="camp_popup_flyer_date_month">' +
          escapeHtml(dateMonthTamil) +
          "</span>"
        : "") +
      (time
        ? '<span class="camp_popup_flyer_date_time">' +
          escapeHtml(time) +
          "</span>"
        : "") +
      "</div>" +
      '<div class="camp_popup_flyer_content">' +
      (content.titleTamil || camp.titleTamil
        ? "<h3>" +
          escapeHtml(content.titleTamil || camp.titleTamil) +
          "</h3>"
        : "") +
      (content.venueTamil
        ? '<p class="camp_popup_flyer_venue">' +
          escapeHtml(content.venueTamil) +
          "</p>"
        : "") +
      (content.venueTamil || content.line1Tamil || content.line2Tamil
        ? '<div class="camp_popup_flyer_divider" aria-hidden="true"></div>'
        : "") +
      (content.line1Tamil
        ? "<p>" + escapeHtml(content.line1Tamil) + "</p>"
        : "") +
      (content.line2Tamil
        ? "<p>" + escapeHtml(content.line2Tamil) + "</p>"
        : "") +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  function renderPopupColumn(camp) {
    var display = mergeDisplay(camp, "popup");
    var isFlyer = !!camp.popupFlyer;
    var html =
      '<div class="camp_popup_column' +
      (isFlyer ? " camp_popup_column--flyer" : "") +
      '">';

    if (display.image) {
      html += renderCampImage(
        camp,
        isFlyer ? "camp_popup_image camp_popup_image--flyer" : "camp_popup_image"
      );
    }

    if (!isFlyer) {
      html += '<div class="camp_popup_column_body">';

      if (display.title) {
        html += renderCampTitle(camp, "h3", "camp_popup_col_title");
      }
      if (display.summary) {
        html +=
          '<p class="camp_popup_col_text">' +
          escapeHtml(camp.shortDescription) +
          "</p>";
      }

      html += "</div>";
    }

    html += "</div>";
    return html;
  }

  function renderPopup() {
    var inner = document.getElementById("campPopupInner");
    var dialog = document.querySelector(".camp_popup_modal .modal-dialog");
    var camps = getPopupCamps();

    if (!inner || camps.length === 0) {
      return false;
    }

    var isFlyerPopup = camps.length === 1 && camps[0].popupFlyer;
    var colCount = Math.min(camps.length, 3);
    var columnsHtml = isFlyerPopup
      ? renderFlyerPopupLayout(camps[0])
      : camps
          .slice(0, 3)
          .map(renderPopupColumn)
          .join("");
    var learnMoreLink = isFlyerPopup
      ? camps[0].detailLink || "today-camp.html"
      : "today-camp.html";

    var scheduleHtml = isFlyerPopup
      ? ""
      : renderScheduleHighlight(
          config.eventSchedule,
          getScheduleDisplay("popup"),
          "camp_schedule_highlight--yellow"
        );

    inner.innerHTML =
      '<button type="button" class="camp_popup_close" data-bs-dismiss="modal" aria-label="Close">' +
      '<i class="fa-solid fa-xmark"></i>' +
      "</button>" +
      (isFlyerPopup
        ? columnsHtml
        : '<div class="camp_popup_grid camp-cols-' +
          colCount +
          '">' +
          columnsHtml +
          "</div>") +
      (scheduleHtml
        ? '<div class="camp_popup_shared_schedule">' + scheduleHtml + "</div>"
        : "") +
      '<div class="camp_popup_footer">' +
      '<div class="camp_popup_buttons">' +
      '<a class="btn btn-primary" href="' +
      waLink(
        camps[0].whatsappMessage ||
          "Hi, I would like to book for today's camp at Aathithya Welfare Centre."
      ) +
      '" target="_blank" rel="noopener noreferrer">' +
      '<span class="btn_text" data-text="Book Now">Book Now</span>' +
      '<span class="btn_icon"><i class="fa-brands fa-whatsapp"></i></span>' +
      "</a>" +
      '<a class="btn btn-outline-primary" href="' +
      escapeHtml(learnMoreLink) +
      '">' +
      '<span class="btn_text" data-text="Learn More">Learn More</span>' +
      '<span class="btn_icon"><i class="fa-solid fa-arrow-up-right"></i></span>' +
      "</a>" +
      "</div>" +
      "</div>";

    if (dialog) {
      dialog.classList.remove(
        "camp-cols-1",
        "camp-cols-2",
        "camp-cols-3",
        "camp_popup_dialog--flyer",
        "camp_popup_dialog--flyer-image-only"
      );
      dialog.classList.add("camp-cols-" + colCount);
      if (isFlyerPopup) {
        dialog.classList.add("camp_popup_dialog--flyer");
        if (camps[0].popupFlyerImageOnly) {
          dialog.classList.add("camp_popup_dialog--flyer-image-only");
        }
      }
    }

    return true;
  }

  function renderBenefitsList(benefits) {
    return benefits
      .map(function (item) {
        return (
          "<li>" +
          '<span class="info_icon"><i class="fa-light fa-circle-check"></i></span>' +
          '<span class="info_text">' +
          escapeHtml(item) +
          "</span>" +
          "</li>"
        );
      })
      .join("");
  }

  function renderScheduleItems(items) {
    return items
      .map(function (item) {
        return (
          "<li>" +
          '<span class="info_icon"><i class="fa-light ' +
          escapeHtml(item.icon) +
          '"></i></span>' +
          '<span class="info_text"><strong>' +
          escapeHtml(item.label) +
          ":</strong> " +
          escapeHtml(item.value) +
          "</span>" +
          "</li>"
        );
      })
      .join("");
  }

  function renderDetailCard(camp) {
    var display = mergeDisplay(camp, "card");

    var html =
      '<div class="camp_detail_card camp_detail_card--reveal' +
      (display.image ? "" : " camp_detail_card--no-image") +
      '">';

    if (display.image) {
      html +=
        '<div class="camp_detail_card_media">' +
        '<div class="camp_detail_card_media_inner">' +
        renderCampImage(camp, "") +
        "</div>" +
        '<div class="camp_detail_card_media_overlay" aria-hidden="true"></div>' +
        "</div>";
    }

    html += '<div class="camp_detail_card_body">';

    if (display.tag) {
      html +=
        '<span class="camp_card_tag">' + escapeHtml(camp.tag) + "</span>";
    }
    if (display.title) {
      html += renderCampTitle(camp, "h2", "camp_detail_card_title");
    }
    if (display.summary) {
      html +=
        '<p class="camp_detail_card_summary">' +
        escapeHtml(camp.shortDescription) +
        "</p>";
    }
    if (display.description && camp.description && camp.description.length) {
      html += '<div class="camp_detail_card_description">';
      camp.description.forEach(function (paragraph) {
        html += "<p>" + escapeHtml(paragraph) + "</p>";
      });
      html += "</div>";
    }

    if (display.benefits || display.scheduleDetails) {
      html += '<div class="row camp_detail_card_meta">';
      if (display.benefits && camp.benefits && camp.benefits.length) {
        html +=
          '<div class="col-lg-6">' +
          '<h4 class="fw-bold">Benefits</h4>' +
          '<ul class="info_list unordered_list_block">' +
          renderBenefitsList(camp.benefits) +
          "</ul>" +
          "</div>";
      }
      if (
        display.scheduleDetails &&
        camp.scheduleItems &&
        camp.scheduleItems.length
      ) {
        html +=
          '<div class="col-lg-6">' +
          '<div class="camp_schedule_box">' +
          "<h3>Camp Schedule</h3>" +
          '<ul class="info_list unordered_list_block mb-0">' +
          renderScheduleItems(camp.scheduleItems) +
          "</ul>" +
          "</div>" +
          "</div>";
      }
      html += "</div>";
    }

    if (display.bookNow || display.learnMore) {
      html += '<div class="d-flex flex-wrap gap-2 camp_detail_card_actions">';
      if (display.bookNow) {
        html +=
          '<a class="btn btn-primary camp_page_btn" href="' +
          waLink(camp.whatsappMessage) +
          '" target="_blank" rel="noopener noreferrer">' +
          '<span class="btn_text" data-text="Book Now">Book Now</span>' +
          '<span class="btn_icon"><i class="fa-brands fa-whatsapp"></i></span>' +
          "</a>";
      }
      if (display.learnMore) {
        html +=
          '<a class="btn btn-outline-primary camp_page_btn" href="' +
          escapeHtml(camp.detailLink) +
          '">' +
          '<span class="btn_text" data-text="Full Details">Full Details</span>' +
          '<span class="btn_icon"><i class="fa-solid fa-arrow-up-right"></i></span>' +
          "</a>";
      }
      html += "</div>";
    }

    html += "</div></div>";
    return html;
  }

  function renderCampPage() {
    var list = document.getElementById("campDetailsList");
    var camps = getActiveCamps();

    if (!list) {
      return;
    }

    if (camps.length === 0) {
      list.innerHTML =
        '<div class="text-center py-5">' +
        "<p>No camps are currently scheduled. Please contact us for upcoming camp dates.</p>" +
        '<a class="btn btn-primary mt-3" href="contact.html">Contact Us</a>' +
        "</div>";
      return;
    }

    list.innerHTML = camps.map(renderDetailCard).join("");
    initCampCardAnimations();
  }

  function initCampCardAnimations() {
    var cards = document.querySelectorAll("#campDetailsList .camp_detail_card--reveal");

    if (!cards.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (card) {
        card.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    cards.forEach(function (card, index) {
      card.style.setProperty("--camp-delay", index * 0.12 + "s");
      observer.observe(card);
    });
  }

  function initPopupModal() {
    var modalEl = document.getElementById("todayCampModal");
    if (!modalEl || !renderPopup()) {
      return;
    }

    var campModal = new bootstrap.Modal(modalEl);
    campModal.show();
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("campPopupInner")) {
      initPopupModal();
    }

    if (document.getElementById("campDetailsList")) {
      renderCampPage();
    }
  });
})();
