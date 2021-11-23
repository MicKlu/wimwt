"use strict";

$(function () {
    $("#buy-ticket").click(() => {
        location.href = "buyticket.html";
    });
    $("#top-up-card").click(() => {
        location.href = "topupcard.html";
    });
    $("#panel #button-card-full").click((e) => {
        $("#panel button").prop("disabled", false);
        $(e.currentTarget).prop("disabled", true);
        window.sessionStorage.setItem("cardType", "full");
    });
    $("#panel #button-card-reduced").click((e) => {
        $("#panel button").prop("disabled", false);
        $(e.currentTarget).prop("disabled", true);
        window.sessionStorage.setItem("cardType", "reduced");
    });
    $("#panel #button-card-eject").click((e) => {
        $("#panel button").prop("disabled", false);
        $(e.currentTarget).prop("disabled", true);
        window.sessionStorage.removeItem("cardType");
    });

    window.sessionStorage.removeItem("tickets");
    window.sessionStorage.removeItem("ticketIndex");
    window.sessionStorage.removeItem("change");
    window.sessionStorage.removeItem("cardType");
});