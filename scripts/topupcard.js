"use strict";

var data = {};

$(function () {
    fetchNavBottom();

    $(".button-row.ticket-owner button").click(onTicketOwnerClick);
    $(".button-row.ticket-type button").click(onTicketTypeClick);
    $(".button-row.ticket-period button").click(onTicketPeriodClick);
    $(".button-row.ticket-zone button").click(onTicketZoneClick);
    $(".pop-up #popup-cancel").click(onTicketZoneCancelClick);
    $(".pop-up #zone-buttons button:not(:last-child)").click(onTicketZoneSelectClick)
    

    $("#confirm").click(onConfirmTicketClick);

    var selectedTickets = JSON.parse(window.sessionStorage.getItem("tickets"));
    var ticketIndex = window.sessionStorage.getItem("ticketIndex");

    if(selectedTickets === null || ticketIndex == selectedTickets.length)
        $(".button-row.ticket-owner button").eq(0).click();
    else {
        
    }
});

function onTicketOwnerClick(e) {
    var self = $(e.target);
    var nextRowClass = self.data("owner");
    self.parents(".button-row").find("button").removeClass("selected");
    self.addClass("selected");
    
    if(nextRowClass == "bearer") {
        showButtonRow([".ticket-type", ".ticket-period", ".ticket-zone"], ".ticket-zone");
        var selectedButton = $("#zone-buttons.button-row button.selected");
        if(selectedButton.length)
            selectedButton.click();
        else
            $("#zone-buttons.button-row button").eq(0).click();
    }
    else {
        showButtonRow([".ticket-type", ".ticket-period", ".ticket-zone"], "." + nextRowClass);
        var selectedButton = $(".button-row.ticket-type." + nextRowClass + " button.selected");
        if(selectedButton.length)
            selectedButton.click();
        else
            $(".button-row.ticket-type." + nextRowClass + " button").eq(0).click();
    }    
}

function onTicketTypeClick(e) {
    var self = $(e.target);
    var nextRowClass = self.data("type");
    var buttons = $(".button-row.ticket-type button");
    
    buttons.removeClass("selected");
    buttons.filter('[data-type="' + nextRowClass + '"]').addClass("selected");

    showButtonRow([".ticket-period", ".ticket-zone"], "." + nextRowClass);
    var selectedButton = $(".button-row.ticket-period." + nextRowClass + " button.selected");
    if(selectedButton.length)
        selectedButton.click();
    else
        $(".button-row.ticket-period." + nextRowClass + " button").eq(0).click();
}

function onTicketPeriodClick(e) {
    var self = $(e.target);
    var nextRowClass = self.data("period");
    var buttons = $(".button-row.ticket-period button");
    
    buttons.removeClass("selected");
    buttons.filter('[data-period="' + nextRowClass + '"]').addClass("selected");

    showButtonRow([".ticket-zone"], ".ticket-zone");

    var selectedButton = $("#zone-buttons.button-row button.selected");
    if(selectedButton.length)
        selectedButton.click();
    else
        $("#zone-buttons.button-row button").eq(0).click();
}

function onTicketZoneClick(e) {
    $(".pop-up").css("display", "flex");
}

function onTicketZoneCancelClick(e) {
    $(".pop-up").hide();
}

function onTicketZoneSelectClick(e) {
    var buttons = $("#zone-buttons.button-row button");
    var button = $(this);
    $(".button-row.ticket-zone p:last-child").text(button.text());
    buttons.removeClass("selected");
    button.addClass("selected");
    $(".pop-up").hide();

    updateDescription();
}

function updateDescription() {
    data = {}
    $(".button-row:visible button.selected, #zone-buttons.button-row button.selected").each((i, self) => {
        data = {...data, ...$(self).data()};
    });

    var price;
    var desc;

    var cardType = window.sessionStorage.getItem("cardType");

    console.log(data);

    var desc = [];
    desc.push(TICKETS["seasonal"].zones[data.zone].owner[data.owner].name);

    if(data.owner == "personal") {
        price = TICKETS["seasonal"].zones[data.zone].owner[data.owner].type[data.type].period[data.period].price[cardType];
        desc.push(TICKETS["seasonal"].zones[data.zone].owner[data.owner].type[data.type].name);
        desc.push(TICKETS["seasonal"].zones[data.zone].owner[data.owner].type[data.type].period[data.period].name);
    }
    else
        price = TICKETS["seasonal"].zones[data.zone].owner[data.owner].price.full;
    

    if(cardType == "full")
        desc.push("Normalny");
    else
        desc.push("Ulgowy");

    $("#ticket-desc p:first").html(desc.join(", ") + "<br />" + TICKETS["seasonal"].zones[data.zone].name);
    $("#ticket-price span").text(formatPrice(price));
    $("#ticket-price span").data("value", price);
}

function onConfirmTicketClick(e) {
    var selectedTickets = [data];
    window.sessionStorage.setItem("tickets", JSON.stringify(selectedTickets));

    location.href = "summary.html";
}