"use strict";

$(function () {
    setTimeout(onPrintingTicketsEnd, 4000);
});

function onPrintingTicketsEnd() {
    if(window.sessionStorage.getItem("change") < 0) {
        showChangeMessage();
        setTimeout(onChangeEnd, 3000);
    }
    else {
        showGoodbyeMessage();
        setTimeout(onGoodbyeEnd, 5000);
    }

}

function onChangeEnd() {
    showGoodbyeMessage();
    setTimeout(onGoodbyeEnd, 5000);
}

function onGoodbyeEnd() {
    location.href = "index.html";
}

function showChangeMessage() {
    $("p").text("Wypłacanie reszty...");
}

function showGoodbyeMessage() {
    $("h1").text("Dziękujemy");
    $("p").text("Życzymy miłego dnia");
}