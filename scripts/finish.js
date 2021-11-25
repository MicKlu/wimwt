"use strict";

var cardEjected = false;

$(function () {

    $("#card-eject").click(onEjectCardClick);

    $(".latency").progressbar({
        value: false
    });

    if(window.sessionStorage.getItem("cardType") === null)
        setTimeout(onPrintingTicketsEnd, 4000);
    else {
        showToppingUpMessage();
        setTimeout(onToppingUpEnd, 4000);
    }
});

function onPrintingTicketsEnd() {
    if(window.sessionStorage.getItem("change") < 0) {
        showChangeMessage();
        setTimeout(onChangeEnd, 3000);
    }
    else {
        showCollectMessage();
        setTimeout(onCollectEnd, 5000);
    }
}

function onToppingUpEnd() {
    showEjectMessage();
    awaitCardEjection();
}

function onChangeEnd() {
    showCollectMessage();
    setTimeout(onCollectEnd, 5000);
}

function awaitCardEjection() {
    if(cardEjected) {
        if(window.sessionStorage.getItem("change") < 0) {
            showChangeMessage();
            setTimeout(onChangeEnd, 3000);
        }
        else {
            showGoodbyeMessage();
            setTimeout(onGoodbyeEnd, 5000);
        }
    }
    else {
        setTimeout(awaitCardEjection, 1000);
    }
}

function onCollectEnd() {
    showGoodbyeMessage();
    setTimeout(onGoodbyeEnd, 5000);
}

function onGoodbyeEnd() {
    location.href = "index.html";
}

function showChangeMessage() {
    $("h1").text("Proszę czekać");
    $("p").text("Wypłacanie reszty...");
    $(".latency").show();
}

function showCollectMessage() {
    $("h1").text("Operacja zakończona");

    var items = [];

    if(window.sessionStorage.getItem("cardType") === null)
        items.push("bilety");
    
    if(window.sessionStorage.getItem("change") < 0)
        items.push("resztę");

    $("p").text("Proszę odebrać " + items.join(" i "));
    $(".latency").hide();
}

function showGoodbyeMessage() {
    $("h1").text("Dziękujemy");
    $("p").text("Życzymy miłego dnia");
    $(".latency").hide();
}

function showToppingUpMessage() {
    $("p").text("Doładowywanie karty...");
}

function showEjectMessage() {
    $("h1").text("Operacja zakończona");
    $("p").text("Proszę wyjąć kartę miejską z czytnika");
    $(".latency").hide();

    $("#card-eject").prop("disabled", false);
}

function onEjectCardClick() {
    cardEjected = true;
    $("#card-eject").prop("disabled", true);
}