"use strict";

$(function () {
    fetchNavBottom();
    fetchSummaryTable();

    $("#add-ticket").click(onAddTicketClick);
});

function fetchSummaryTable() {
    var tickets = JSON.parse(window.sessionStorage.getItem("tickets"));

    $("#summary tr:not(.header):not(.totalPrice)").remove();

    var tableFooter = $("#summary .totalPrice");

    var totalPrice = 0;

    for(var i = 0; i < tickets.length; i++) {
        var row = $("<tr></tr>");
        
        var name = [];
        name.push(TICKETS[tickets[i].seller].name);
        name.push(TICKETS[tickets[i].seller][tickets[i].type].name);
        if(tickets[i].price == "full")
            name.push("Normalny");
        else
            name.push("Ulgowy");
        
        name = name.join(", ");
        
        if(tickets[i].seller == "mzkzg")
            name += "<br />" + TICKETS[tickets[i].seller][tickets[i].type].zones[tickets[i].zone].name;
    
        row.append($("<td></td>").html(name));
        row.append($("<td></td>").text(tickets[i].tickets));
        row.append($("<td></td>").text(formatPrice(tickets[i].totalPrice) + " zł"));
        row.append(getChangeButton());
        row.append(getRemoveButton());
        
        tableFooter.before(row);

        totalPrice += tickets[i].totalPrice;
    }

    $(".totalPrice td:first").text(formatPrice(totalPrice) + " zł");

    $("#summary button.button-edit").click(onEditTicketClick);
    $("#summary button.button-remove").click(onRemoveTicketClick);
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
    var ticketIndex = $("#summary .button-edit").index($(this));
    window.sessionStorage.setItem("ticketIndex", ticketIndex);
    location.href = "buyticket.html";
}

function onRemoveTicketClick(e) {
    var ticketIndex = $("#summary .button-remove").index($(this));
    var tickets = JSON.parse(window.sessionStorage.getItem("tickets"));
    tickets.splice(ticketIndex, 1);
    window.sessionStorage.setItem("tickets", JSON.stringify(tickets));
    
    if(tickets.length < 1) {
        window.sessionStorage.setItem("ticketIndex", 0);
        location.href = "buyticket.html";
        return;
    }

    fetchSummaryTable();
}