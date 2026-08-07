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

    return '<div class="' + classNames + '">' + parts.join("") + "</div>";
  }

  function renderPopupColumn(camp) {
    var display = mergeDisplay(camp, "popup");
    var html = '<div class="camp_popup_column">';

    if (display.image) {
      html +=
        '<img class="camp_popup_image camp_uniform_image" src="' +
        escapeHtml(camp.image) +
        '" alt="' +
        escapeHtml(camp.title) +
        '">';
    }

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

    html += "</div></div>";
    return html;
  }

  function renderPopup() {
    var inner = document.getElementById("campPopupInner");
    var dialog = document.querySelector(".camp_popup_modal .modal-dialog");
    var camps = getActiveCamps();

    if (!inner || camps.length === 0) {
      return false;
    }

    var colCount = Math.min(camps.length, 3);
    var columnsHtml = camps
      .slice(0, 3)
      .map(renderPopupColumn)
      .join("");

    var scheduleHtml = renderScheduleHighlight(
      config.eventSchedule,
      getScheduleDisplay("popup"),
      "camp_schedule_highlight--yellow"
    );

    inner.innerHTML =
      '<button type="button" class="camp_popup_close" data-bs-dismiss="modal" aria-label="Close">' +
      '<i class="fa-solid fa-xmark"></i>' +
      "</button>" +
      '<div class="camp_popup_header">' +
      '<span class="camp_popup_badge" id="todayCampModalLabel">Today\'s Camp</span>' +
      "</div>" +
      '<div class="camp_popup_grid camp-cols-' +
      colCount +
      '">' +
      columnsHtml +
      "</div>" +
      (scheduleHtml
        ? '<div class="camp_popup_shared_schedule">' + scheduleHtml + "</div>"
        : "") +
      '<div class="camp_popup_footer">' +
      '<div class="camp_popup_buttons">' +
      '<a class="btn btn-primary" href="' +
      waLink(
        "Hi, I would like to book for today's camp at Aathithya Welfare Centre."
      ) +
      '" target="_blank" rel="noopener noreferrer">' +
      '<span class="btn_text" data-text="Book Now">Book Now</span>' +
      '<span class="btn_icon"><i class="fa-brands fa-whatsapp"></i></span>' +
      "</a>" +
      '<a class="btn btn-outline-primary" href="today-camp.html">' +
      '<span class="btn_text" data-text="Learn More">Learn More</span>' +
      '<span class="btn_icon"><i class="fa-solid fa-arrow-up-right"></i></span>' +
      "</a>" +
      "</div>" +
      "</div>";

    if (dialog) {
      dialog.classList.remove("camp-cols-1", "camp-cols-2", "camp-cols-3");
      dialog.classList.add("camp-cols-" + colCount);
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
    var schedule = getEventSchedule(camp);
    var scheduleDisplay = {
      date: display.date,
      day: display.day,
      time: display.time
    };

    var html =
      '<div class="camp_detail_card' +
      (display.image ? "" : " camp_detail_card--no-image") +
      '">';

    if (display.image) {
      html +=
        '<div class="camp_detail_card_media">' +
        '<img class="camp_uniform_image" src="' +
        escapeHtml(camp.image) +
        '" alt="' +
        escapeHtml(camp.title) +
        '">' +
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

    html += renderScheduleHighlight(
      schedule,
      scheduleDisplay,
      "camp_schedule_highlight--yellow"
    );

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
