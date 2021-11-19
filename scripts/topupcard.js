"use strict";

var data = {};

$(function () {
    fetchNavBottom();

    $(".button-row.ticket-owner button").click(onTicketOwnerClick);
    $(".button-row.ticket-type button").click(onTicketTypeClick);
    $(".button-row.ticket-period button").click(onTicketPeriodClick);
    $(".button-row.ticket-zone button").click(onTicketZoneClick);
    $("#pop-up #popup-cancel").click(onTicketZoneCancelClick);
    

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
}

function onTicketZoneClick(e) {
    $("#pop-up").css("display", "flex");
}

function onTicketZoneCancelClick(e) {
    $("#pop-up").hide();
}

function onConfirmTicketClick(e) {
    
}