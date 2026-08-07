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

  function renderScheduleHighlight(camp) {
    return (
      '<div class="camp_schedule_highlight">' +
      '<span class="camp_highlight_day">' + escapeHtml(camp.day) + "</span>" +
      '<span class="camp_highlight_date">' + escapeHtml(camp.date) + "</span>" +
      '<span class="camp_highlight_time">' + escapeHtml(camp.time) + "</span>" +
      "</div>"
    );
  }

  function renderPopupColumn(camp) {
    return (
      '<div class="camp_popup_column">' +
      '<img class="camp_popup_image" src="' + escapeHtml(camp.image) + '" alt="' + escapeHtml(camp.title) + '">' +
      renderScheduleHighlight(camp) +
      '<div class="camp_popup_column_body">' +
      '<h3 class="camp_popup_col_title">' + escapeHtml(camp.title) + "</h3>" +
      '<p class="camp_popup_col_text">' + escapeHtml(camp.shortDescription) + "</p>" +
      "</div>" +
      "</div>"
    );
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

    inner.innerHTML =
      '<button type="button" class="camp_popup_close" data-bs-dismiss="modal" aria-label="Close">' +
      '<i class="fa-solid fa-xmark"></i>' +
      "</button>" +
      '<div class="camp_popup_header">' +
      '<span class="camp_popup_badge" id="todayCampModalLabel">Today\'s Camp</span>' +
      "</div>" +
      '<div class="camp_popup_grid camp-cols-' + colCount + '">' +
      columnsHtml +
      "</div>" +
      '<div class="camp_popup_footer">' +
      '<div class="camp_popup_buttons">' +
      '<a class="btn btn-primary" href="' + waLink("Hi, I would like to book for today's camp at Aathithya Welfare Centre.") + '" target="_blank" rel="noopener noreferrer">' +
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
          '<span class="info_text">' + escapeHtml(item) + "</span>" +
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
          '<span class="info_icon"><i class="fa-light ' + escapeHtml(item.icon) + '"></i></span>' +
          '<span class="info_text"><strong>' + escapeHtml(item.label) + ":</strong> " + escapeHtml(item.value) + "</span>" +
          "</li>"
        );
      })
      .join("");
  }

  function renderDetailCard(camp) {
    return (
      '<div class="camp_detail_card">' +
      '<div class="camp_detail_card_media">' +
      '<img src="' + escapeHtml(camp.image) + '" alt="' + escapeHtml(camp.title) + '">' +
      "</div>" +
      '<div class="camp_detail_card_body">' +
      renderScheduleHighlight(camp) +
      '<span class="camp_card_tag">' + escapeHtml(camp.tag) + "</span>" +
      "<h2>" + escapeHtml(camp.title) + "</h2>" +
      '<p class="camp_detail_card_summary">' + escapeHtml(camp.shortDescription) + "</p>" +
      '<div class="d-flex flex-wrap gap-2 camp_detail_card_actions">' +
      '<a class="btn btn-primary camp_page_btn" href="' + waLink(camp.whatsappMessage) + '" target="_blank" rel="noopener noreferrer">' +
      '<span class="btn_text" data-text="Book Now">Book Now</span>' +
      '<span class="btn_icon"><i class="fa-brands fa-whatsapp"></i></span>' +
      "</a>" +
      '<a class="btn btn-outline-primary camp_page_btn" href="' + escapeHtml(camp.detailLink) + '">' +
      '<span class="btn_text" data-text="Full Details">Full Details</span>' +
      '<span class="btn_icon"><i class="fa-solid fa-arrow-up-right"></i></span>' +
      "</a>" +
      "</div>" +
      "</div>" +
      "</div>"
    );
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
