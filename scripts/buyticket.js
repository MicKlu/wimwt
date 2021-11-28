"use strict";

var data = {};

$(function () {
    fetchNavBottom();

    $(".button-row.ticket-seller button").click(onTicketSellerClick);
    $(".button-row.ticket-type button").click(onTicketTypeClick);
    $(".button-row.ticket-zone button").click(onTicketZoneClick);
    $(".button-row.ticket-price button").click(onTicketPriceClick);

    $(".pop-up .popup-cancel").click(onTicketZoneCancelClick);
    $(".pop-up .button-up").click(onUpButtonClick);
    $(".pop-up .button-down").click(onDownButtonClick);
    
    $(".number-of-tickets .input button:first").click(onTicketDecreaseClick);
    $(".number-of-tickets .input input").change(onNumberOfTicketsChange);
    $(".number-of-tickets .input button:last").click(onTicketIncreaseClick);

    $("#confirm").click(onConfirmTicketClick);

    var selectedTickets = JSON.parse(window.sessionStorage.getItem("tickets"));
    var ticketIndex = getTicketIndex();

    if(selectedTickets === null || ticketIndex == selectedTickets.length)
        $(".button-row.ticket-seller button").eq(0).click();
    else {
        var seller = selectedTickets[ticketIndex].seller;
        var type = selectedTickets[ticketIndex].type;
        var zone = selectedTickets[ticketIndex].zone;
        var price = selectedTickets[ticketIndex].price;
        var numberOfTickets = selectedTickets[ticketIndex].tickets;
        
        $(".button-row.ticket-seller:visible " + '[data-seller="' + seller + '"]').click();
        $(".button-row.ticket-type:visible " + '[data-type="' + type + '"]').click();
        $(".button-row.ticket-price:visible " + '[data-price="' + price + '"]').click();
        if(seller == "mzkzg" && type == "one-day")
            $("#zone-buttons.button-row.ticket-zone " + '[data-zone="' + zone + '"]').click();
        else
            $(".button-row.ticket-zone:visible " + '[data-zone="' + zone + '"]').click();
        $(".number-of-tickets .input input").val(numberOfTickets);
    }
    increaseNumberOfTickets(0);

    $(".pop-up #zone-buttons button").each((i, e) => {
        if(i < 3)
            return;
        $(e).hide();
    });
});

function onTicketSellerClick(e) {
    var self = $(e.target);
    var nextRowClass = self.data("seller");
    self.parents(".button-row").find("button").removeClass("selected");
    self.addClass("selected");
    
    showButtonRow([".ticket-type", ".ticket-price", ".ticket-zone"], "." + nextRowClass);
    var selectedButton = $(".button-row.ticket-type." + nextRowClass + " button.selected");
    if(selectedButton.length)
        selectedButton.click();
    else
        $(".button-row.ticket-type." + nextRowClass + " button").eq(0).click();
}

function onTicketTypeClick(e) {
    var self = $(e.target);
    var nextRowClass = self.data("type");
    var buttons = $(".button-row.ticket-type button");
    
    buttons.removeClass("selected");
    buttons.filter('[data-type="' + nextRowClass + '"]').addClass("selected");

    showButtonRow([".ticket-price", ".ticket-zone"], ".ticket-price");
    var selectedButton = $(".button-row.ticket-price button.selected");
    if(selectedButton.length)
        selectedButton.click();
    else
        $(".button-row.ticket-price button").eq(0).click();
}

function onTicketPriceClick(e) {
    var self = $(e.target);
    var seller = $(".ticket-seller button.selected").data("seller");
    var type = $('.ticket-type.' + seller + ' button.selected').data("type");
    var nextRowClass = type;
    var buttons = $(".button-row.ticket-price button");
    
    buttons.removeClass("selected");
    self.addClass("selected");

    if(seller == "zkm") {
        updateDescription();
    }
    else {
        showButtonRow([".ticket-zone"], "." + nextRowClass);
        var selectedButton = $(".button-row.ticket-zone." + nextRowClass + " button.selected");

        if(selectedButton.length)
            selectedButton.click();
        else
            $(".button-row.ticket-zone." + nextRowClass + ":not(.zone-selector) button").eq(0).click();
    }
}

function onTicketZoneClick(e) {
    var self = $(e.target);
    var buttonRow = self.parents(".button-row");
    
    if(buttonRow.hasClass("zone-selector")) {
        $(".pop-up").css("display", "flex");
        return;
    }

    if(buttonRow.parents(".pop-up").length) {
        buttonRow.parents(".pop-up").hide();
        $(".zone-selector p:last-child").text(self.text());
    }

    var nextRowClass = self.data("zone");
    var buttons = $(".button-row.ticket-zone button");

    buttons.removeClass("selected");
    buttons.filter('[data-zone="' + nextRowClass + '"]').addClass("selected");

    updateDescription();
}

function onTicketZoneCancelClick(e) {
    $(".pop-up").hide();
}

function onUpButtonClick(e) {
    var buttons = $("#zone-buttons button");
    var visibleButtons = buttons.filter(":visible");
    visibleButtons.eq(visibleButtons.length - 1).hide();

    var indexToShow = buttons.index(visibleButtons) - 1;
    buttons.eq(indexToShow).show();

    $(".pop-up .button-down").css("display", "inline-flex");

    if(indexToShow == 0)
        $(this).hide();
}

function onDownButtonClick(e) {
    var buttons = $("#zone-buttons button");
    var visibleButtons = buttons.filter(":visible");
    visibleButtons.eq(0).hide();

    var indexToShow = buttons.index(visibleButtons) + visibleButtons.length;
    buttons.eq(indexToShow).show();

    $(".pop-up .button-up").css("display", "inline-flex");

    if(indexToShow == buttons.length - 1)
        $(this).hide();
}

function updateDescription() {
    data = {}
    $(".button-row:visible button.selected").each((i, self) => {
        data = {...data, ...$(self).data()};
    });

    if(data.seller == "mzkzg" && data.type == "one-day") {
        data = {...data, ...$('#zone-buttons.button-row.ticket-zone button.selected').data()};
    }
    
    var price;
    var desc;

    if(data.seller == "zkm") {
        price = TICKETS["single"][data.seller][data.type].price[data.price];
        desc = TICKETS["single"][data.seller][data.type].desc;
    }
    else {
        price = TICKETS["single"][data.seller][data.type].zones[data.zone].price[data.price];
        desc = TICKETS["single"][data.seller][data.type].zones[data.zone].desc;
    }
    
    $("#ticket-desc p:first").html(desc);
    $("#ticket-price span").text(formatPrice(price));
    $("#ticket-price span").data("value", price);
    $(".number-of-tickets .input input").change();
}

function onNumberOfTicketsChange(e) {
    var input = $(e.target);
    var numberOfTickets = parseInt(input.val());
    var price = $("#ticket-price span").data("value");
    var totalPrice = price * numberOfTickets;
    $(".total-price span").text(formatPrice(totalPrice));
    data.tickets = numberOfTickets;
    data.totalPrice = totalPrice;
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
        buttons.eq(0).prop("disabled", true);
    
    if(currentValue + relativeNumber >= 99)
        buttons.eq(1).prop("disabled", true);
    
    input.val(currentValue + relativeNumber);
    input.change();
}

function onConfirmTicketClick() {
    var selectedTickets = JSON.parse(window.sessionStorage.getItem("tickets"));
    var ticketIndex = getTicketIndex();

    if(selectedTickets === null)
        selectedTickets = [];

    if(ticketIndex === null)
        ticketIndex = 0;

    selectedTickets[ticketIndex] = data;
    window.sessionStorage.setItem("tickets", JSON.stringify(selectedTickets));

    location.href = "summary.html";
}

function getTicketIndex() {
    var query = location.href.split("?");
    if(query[1] === undefined)
        return 0;

    var tQuery = query[1].split("=");
    if(tQuery[0] == "t" && tQuery[1] !== undefined)
        return tQuery[1];

    return 0;
}

function onBackButtonClick() {
    var selectedTickets = JSON.parse(window.sessionStorage.getItem("tickets"));
    if(selectedTickets.length == 0)
        location.href = "index.html";
    else
        history.back();
}