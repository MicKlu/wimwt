"use strict";

$(function () {
    fetchNavTop();
    updateDateTime();
    setInterval(updateDateTime, 1000);

});

function updateDateTime() {
    var date = new Date();
    var dateString = "";
    
    var dateArr = [];
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    dateArr.push((day < 10) ? "0" + day : day);
    dateArr.push((month < 10) ? "0" + month : month);
    dateArr.push(year);

    var timeArr = [];
    var hour = date.getHours();
    var minute = date.getMinutes();

    timeArr.push((hour < 10) ? "0" + hour : hour);
    timeArr.push((minute < 10) ? "0" + minute : minute);

    dateString = dateArr.join(".") + " " + timeArr.join(":");

    $("#datetime").text(dateString);
}

function fetchNavTop()
{
    $("main").before(`
    <nav id="nav-top">
        <div id="datetime"></div>
        <div id="i18n">
            <div class="flag flag-pl">
                <img src="img/flag-pl.png" />
            </div>
            <div class="flag flag-en">
                <img src="img/flag-en.png" />
            </div>
            <div class="flag flag-de">
                <img src="img/flag-de.png" />
            </div>
            <div class="flag flag-ru">
                <img src="img/flag-ru.png" />
            </div>
        </div>
    </nav>
    `)
}

function fetchNavBottom()
{
    $("main").after(`
    <nav id="nav-bottom">
        <button id="button-back">Powrót</button>
        <button id="button-cancel">Zrezygnuj</button>
    </nav>
    `)


    $("#button-cancel").click(() => {
       location.href = "index.html"; 
    });
}

function formatPrice(priceValue) {
    
    var zl = Math.floor(priceValue);
    var gr = Math.round((priceValue - zl) * 100);
    var priceStr = "" + zl + "," + ((gr > 0) ? gr : "00");
    return priceStr;    
}