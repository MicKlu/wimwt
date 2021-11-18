"use strict";

var data = {};

$(function () {
    fetchNavBottom();

    $(".button-row.ticket-seller button").click(onTicketSellerClick);
    $(".button-row.ticket-type button").click(onTicketTypeClick);
    $(".button-row.ticket-zone button").click(onTicketZoneClick);
    $(".button-row.ticket-price button").click(onTicketPriceClick);
    
    $("#number-of-tickets #input button:first").click(onTicketDecreaseClick);
    $("#number-of-tickets #input input").change(onNumberOfTicketsChange);
    $("#number-of-tickets #input button:last").click(onTicketIncreaseClick);

    $("#confirm").click(onConfirmTicketClick);

    var selectedTickets = JSON.parse(window.sessionStorage.getItem("tickets"));
    var ticketIndex = window.sessionStorage.getItem("ticketIndex");

    if(ticketIndex == selectedTickets.length)
        $(".button-row.ticket-seller button").eq(0).click();
    else {
        var seller = selectedTickets[ticketIndex].seller;
        var type = selectedTickets[ticketIndex].type;
        var zone = selectedTickets[ticketIndex].zone;
        var price = selectedTickets[ticketIndex].price;
        var numberOfTickets = selectedTickets[ticketIndex].tickets;
        
        $(".button-row.ticket-seller:visible " + '[data-seller="' + seller + '"]').click();
        $(".button-row.ticket-type:visible " + '[data-type="' + type + '"]').click();
        $(".button-row.ticket-zone:visible " + '[data-zone="' + zone + '"]').click();
        $(".button-row.ticket-price:visible " + '[data-price="' + price + '"]').click();

        $("#number-of-tickets #input input").val(numberOfTickets);
        $("#number-of-tickets #input input").change();
    }
});

function onTicketSellerClick(e) {
    var self = $(e.target);
    var nextRowClass = self.data("seller");
    self.parents(".button-row").find("button").removeClass("selected");
    self.addClass("selected");
    
    showButtonRow([".ticket-type", ".ticket-zone", ".ticket-price"], "." + nextRowClass);
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

    if(self.parents(".ticket-type").hasClass("zkm")) {
        showButtonRow([".ticket-zone", ".ticket-price"], ".ticket-price");
        var selectedButton = $(".button-row.ticket-price button.selected");
        if(selectedButton.length)
            selectedButton.click();
        else
            $(".button-row.ticket-price button").eq(0).click();
    }
    else {
        showButtonRow([".ticket-zone", ".ticket-price"], "." + nextRowClass);
        var selectedButton = $(".button-row.ticket-zone." + nextRowClass + " button.selected");
        if(selectedButton.length)
            selectedButton.click();
        else
            $(".button-row.ticket-zone." + nextRowClass + " button").eq(0).click();
    }
}

function onTicketZoneClick(e) {
    var self = $(e.target);
    var nextRowClass = self.data("zone");
    var buttons = $(".button-row.ticket-zone button");
    
    buttons.removeClass("selected");
    buttons.filter('[data-zone="' + nextRowClass + '"]').addClass("selected");
    
    showButtonRow([], ".ticket-price");
    $(".button-row.ticket-price button.selected").click();
}

function onTicketPriceClick(e) {
    var self = $(e.target);
    var nextRowClass = self.data("price");
    var buttons = $(".button-row.ticket-price button");
    
    buttons.removeClass("selected");
    self.addClass("selected");

    updateDescription();
}

function showButtonRow(rowHideClasses, rowShowClass) {
    for(var i = 0; i < rowHideClasses.length; i++)
        $(".button-row" + rowHideClasses[i]).hide();
    $(".button-row" + rowShowClass).css("display", "flex");
}

function updateDescription() {
    data = {}
    $(".button-row:visible button.selected").each((i, self) => {
        data = {...data, ...$(self).data()};
    })
    
    var price;
    var desc;

    if(data.seller == "zkm") {
        price = TICKETS[data.seller][data.type].price[data.price];
        desc = TICKETS[data.seller][data.type].desc;
    }
    else {
        price = TICKETS[data.seller][data.type].zones[data.zone].price[data.price];
        desc = TICKETS[data.seller][data.type].zones[data.zone].desc;
    }
    
    $("#ticket-desc p:first").html(desc);
    $("#ticket-price span").text(formatPrice(price));
    $("#ticket-price span").data("value", price);
    $("#number-of-tickets #input input").change();
}

function onNumberOfTicketsChange(e) {
    var input = $(e.target);
    var numberOfTickets = parseInt(input.val());
    var price = $("#ticket-price span").data("value");
    var totalPrice = price * numberOfTickets;
    $("#total-price span").text(formatPrice(totalPrice));
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
    var input = $("#number-of-tickets #input input");
    var currentValue = parseInt(input.val());
    
    if(currentValue + relativeNumber < 1)
        return;
    
    if(currentValue + relativeNumber > 99)
        return;
    
    input.val(currentValue + relativeNumber);
    input.change();
}

function onConfirmTicketClick() {
    var selectedTickets = JSON.parse(window.sessionStorage.getItem("tickets"));
    var ticketIndex = window.sessionStorage.getItem("ticketIndex");

    if(selectedTickets === null)
        selectedTickets = [];

    if(ticketIndex === null)
        ticketIndex = 0;

    selectedTickets[ticketIndex] = data;
    window.sessionStorage.setItem("tickets", JSON.stringify(selectedTickets));
    window.sessionStorage.setItem("ticketIndex", ticketIndex);

    location.href = "summary.html";
}