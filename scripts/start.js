"use strict";

$(function () {
    $("#buy-ticket").click(() => {
        location.href = "buyticket.html";
    });
    $("#top-up-card").click(() => {
        $("#insert-card").css("display", "flex");
        
        // location.href = "topupcard.html";
    });
    $(".popup-cancel").click((e) => {
        $(e.currentTarget).parents(".pop-up").hide();
    });
    $("#start-upper-row button").click(onQuickBuyClick);

    $(".number-of-tickets .input button:first-of-type").click(onTicketDecreaseClick);
    $(".number-of-tickets .input input").change(onNumberOfTicketsChange);
    $(".number-of-tickets .input button:last-of-type").click(onTicketIncreaseClick);
    
    $(".pop-up.quickbuy .popup-confirm").click(onConfirmTicketClick);

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

function onQuickBuyClick()
{
    var buttonId = $(this).attr("id");
    $("#popup-" + buttonId).css("display", "flex");
    $(".number-of-tickets .input input").val(1);
    increaseNumberOfTickets(0);
}

function onNumberOfTicketsChange(e) {
    var input = $(e.target);
    var numberOfTickets = parseInt(input.val());

    var popup = input.parents(".pop-up.quickbuy");

    var parts = popup.attr("id").split("-");
    var type = parts.slice(1, 3).join("-");
    var priceType = parts[3];

    var price = TICKETS.single.zkm[type].price[priceType];
    var totalPrice = price * numberOfTickets;
    popup.find(".total-price span").text(formatPrice(totalPrice));
}

function onTicketIncreaseClick() {
    increaseNumberOfTickets(1);
}

function onTicketDecreaseClick() {
    increaseNumberOfTickets(-1);
}

function increaseNumberOfTickets(relativeNumber) {
    var input = $(".number-of-tickets .input input");
    var currentValue = parseInt(input.val());
    var buttons = $(".number-of-tickets .input button").prop("disabled", false);
    
    if(currentValue + relativeNumber <= 1)
        buttons.filter(":first-of-type").prop("disabled", true);
    
    if(currentValue + relativeNumber >= 99)
        buttons.filter(":last-of-type").prop("disabled", true);
    
    input.val(currentValue + relativeNumber);
    input.change();
}

function onConfirmTicketClick() {
    var popup = $(this).parents(".pop-up.quickbuy");
    
    var data = {};

    data.seller = "zkm";

    var parts = popup.attr("id").split("-");
    data.type = parts.slice(1, 3).join("-");
    data.price = parts[3];

    var price = TICKETS.single.zkm[data.type].price[data.price];
    data.tickets = parseInt(popup.find("input").val());
    data.totalPrice = price * data.tickets;

    var selectedTickets = [data];
    var ticketIndex = 0;

    window.sessionStorage.setItem("tickets", JSON.stringify(selectedTickets));
    window.sessionStorage.setItem("ticketIndex", ticketIndex);

    location.href = "summary.html";
}