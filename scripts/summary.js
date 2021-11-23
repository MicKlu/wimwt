"use strict";

$(function () {
    fetchNavBottom();
    fetchSummaryTable();

    $("#add-ticket").click(onAddTicketClick);

    $(".button-prev").click(onPrevButtonClick);
    $(".button-next").click(onNextButtonClick);

    $("#pay-cash").click(() => {
        location.href = "paymentcash.html";
    });

    $("#pay-card").click(() => {
        location.href = "paymentcard.html";
    });
});

function fetchSummaryTable() {
    var tickets = JSON.parse(window.sessionStorage.getItem("tickets"));

    $("#summary tr:not(.header):not(.total-price)").remove();

    var tableFooter = $("#summary .total-price");

    var totalPrice = 0;

    for(var i = 0; i < tickets.length; i++) {
        var row = $("<tr></tr>");

        if(i >= 3) {
            row.hide();
            $(".button-next").css("display", "inline-flex");
        }
        else {
            $(".button-prev").css("display", "none");
            $(".button-next").css("display", "none");
        }
        
        var cardType = window.sessionStorage.getItem("cardType");
        var priceType = "";
        var price = 0;

        var name = [];

        if(cardType === null) {
            price = tickets[i].totalPrice;
            name.push(TICKETS["single"][tickets[i].seller].name);
            name.push(TICKETS["single"][tickets[i].seller][tickets[i].type].name);
            priceType = tickets[i].price
        }
        else {
            name.push(TICKETS["seasonal"].zones[tickets[i].zone].owner[tickets[i].owner].name);
            if(tickets[i].owner == "personal") {
                price = TICKETS["seasonal"].zones[tickets[i].zone].owner[tickets[i].owner].type[tickets[i].type].period[tickets[i].period].price[cardType];
                name.push(TICKETS["seasonal"].zones[tickets[i].zone].owner[tickets[i].owner].type[tickets[i].type].name);
                name.push(TICKETS["seasonal"].zones[tickets[i].zone].owner[tickets[i].owner].type[tickets[i].type].period[tickets[i].period].name);
            }
            else
            price = TICKETS["seasonal"].zones[tickets[i].zone].owner[tickets[i].owner].price[cardType];
            priceType = cardType;
        }
        
        if(priceType == "full")
            name.push("Normalny");
        else
            name.push("Ulgowy");
        
        name = name.join(", ");
        
        if(cardType === null && tickets[i].seller == "mzkzg")
            name += "<br />" + TICKETS["single"][tickets[i].seller][tickets[i].type].zones[tickets[i].zone].name;
        else if(cardType !== null)
            name += "<br />" + TICKETS["seasonal"].zones[tickets[i].zone].name;
    
        row.append($("<td></td>").text(i+1));
        row.append($("<td></td>").html(name));
        row.append($("<td></td>").text(tickets[i].tickets));
        row.append($("<td></td>").text(formatPrice(price) + " zł"));
        row.append(getChangeButton());
        row.append(getRemoveButton());
        
        tableFooter.before(row);

        totalPrice += price;
    }

    $(".total-price td:first").text(formatPrice(totalPrice) + " zł");

    $("#summary button.button-edit").click(onEditTicketClick);
    $("#summary button.button-remove").click(onRemoveTicketClick);

    updateIfSeasonal();
}

function getChangeButton() {
    return $(`
    <td>
        <button class="button-edit"><i class="fas fa-pen"></i></button>
    </td>
    `);
}

function getRemoveButton() {
    return $(`
    <td>
        <button class="button-remove"><i class="fas fa-times"></i></button>
    </td>
    `);
}

function onAddTicketClick(e) {
    var tickets = JSON.parse(window.sessionStorage.getItem("tickets"));
    var ticketIndex = tickets.length;
    window.sessionStorage.setItem("ticketIndex", ticketIndex);
    location.href = "buyticket.html";
}

function onEditTicketClick(e) {
    var cardType = window.sessionStorage.getItem("cardType");
    if(cardType === null) {
        var ticketIndex = $("#summary .button-edit").index($(this));
        window.sessionStorage.setItem("ticketIndex", ticketIndex);
        location.href = "buyticket.html";
    }
    else
        location.href = "topupcard.html";
}

function onRemoveTicketClick(e) {
    var ticketIndex = $("#summary .button-remove").index($(this));
    var tickets = JSON.parse(window.sessionStorage.getItem("tickets"));
    tickets.splice(ticketIndex, 1);
    window.sessionStorage.setItem("tickets", JSON.stringify(tickets));
    
    if(tickets.length < 1) {
        window.sessionStorage.setItem("ticketIndex", 0);

        var cardType = window.sessionStorage.getItem("cardType");
        if(cardType === null)
            location.href = "buyticket.html";
        else
            location.href = "topupcard.html";
        
        return;
    }

    fetchSummaryTable();
}

function onPrevButtonClick(e) {
    var trs = $("#summary tr:not(.header):not(.total-price)");
    var visibleTrs = trs.filter(":visible");
    visibleTrs.eq(visibleTrs.length - 1).hide();

    var indexToShow = trs.index(visibleTrs) - 1;
    trs.eq(indexToShow).show();

    $(".button-next").css("display", "inline-flex");

    if(indexToShow == 0)
        $(this).hide();
}

function onNextButtonClick(e) {
    var trs = $("#summary tr:not(.header):not(.total-price)");
    var visibleTrs = trs.filter(":visible");
    visibleTrs.eq(0).hide();

    var indexToShow = trs.index(visibleTrs) + visibleTrs.length;
    trs.eq(indexToShow).show();

    $(".button-prev").css("display", "inline-flex");

    if(indexToShow == trs.length - 1)
        $(this).hide();
}

function updateIfSeasonal() {
    var cardType = window.sessionStorage.getItem("cardType");
    
    if(cardType === null)
        return;
    
    $("#add-ticket").remove();
    var summaryTable = $("#summary");
    var rows = summaryTable.find("tr:not(.total-price)");
    var cells = rows.find("th, td");
    cells.filter(":nth-child(1), :nth-child(3)").remove();
    cells.filter("").remove();

    var totalPriceRow = summaryTable.find(".total-price");
    totalPriceRow.find("th").attr("colspan", 1);

    summaryTable.addClass("seasonal");
}