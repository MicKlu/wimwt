"use strict";

$(function () {
    fetchNavBottom();
    fetchTotalPrice();

    $("#button-card").click(() => { pay(); });
});

function fetchTotalPrice() {
    var tickets = JSON.parse(window.sessionStorage.getItem("tickets"));
    var totalPrice = 0;
    for(var i = 0; i < tickets.length; i++)
        totalPrice += tickets[i].totalPrice;

    $("#total-price span").text(formatPrice(totalPrice));
}

function pay() {
    setTimeout(() => {
        location.href = "finish.html";
    }, 1000);
}