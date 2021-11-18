"use strict";

var paid;
var remaining;

$(function () {
    fetchNavBottom();
    fetchTotalPrice();

    $("#button-10gr").click(() => { addFunds(0.1); });
    $("#button-20gr").click(() => { addFunds(0.2); });
    $("#button-50gr").click(() => { addFunds(0.5); });
    $("#button-1zl").click(() => { addFunds(1); });
    $("#button-2zl").click(() => { addFunds(2); });
    $("#button-5zl").click(() => { addFunds(5); });
    $("#button-10zl").click(() => { addFunds(10); });
    $("#button-20zl").click(() => { addFunds(20); });
    $("#button-50zl").click(() => { addFunds(50); });
});

function fetchTotalPrice() {
    var tickets = JSON.parse(window.sessionStorage.getItem("tickets"));
    var totalPrice = 0;
    for(var i = 0; i < tickets.length; i++)
        totalPrice += tickets[i].totalPrice;
    
    paid = 0;
    remaining = totalPrice;
    $("#total-price span").text(formatPrice(totalPrice));
    updatePaidRemaining();
}

function updatePaidRemaining() {
    $("#paid span").text(formatPrice(paid));
    
    if(remaining > 0)
        $("#remaining span").text(formatPrice(remaining));
    else
        $("#remaining span").text(formatPrice(0));
}

function addFunds(value) {
    paid += value;
    remaining -= value;
    updatePaidRemaining();

    if(remaining < 1 && Math.round(remaining) <= 0) {
        window.sessionStorage.setItem("change", remaining);
        setTimeout(() => {
            location.href = "finish.html";
        }, 1000);
    }
}