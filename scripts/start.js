"use strict";

$(function () {
    $("#buy-ticket").click(() => {
        location.href = "buyticket.html";
    })
    $("#top-up-card").click(() => {
        location.href = "topupcard.html";
    })

    window.sessionStorage.removeItem("tickets");
    window.sessionStorage.removeItem("ticketIndex");
    window.sessionStorage.removeItem("change");
});