"use strict";
$(document).ready(function () {
    $("#box .side-bar-item").click(function (e) {
        e.preventDefault();
        $('#box .side-bar-item').removeClass("active");
        $('#box .tabe').removeClass('active');
        var data = $(this).attr('data');
        $('.' + data).addClass("active");
    });
    var userOnline = $("#box .user-online .numb");
    var waitingBoard = $("#box .waiting-board .numb");
    var playingBoard = $("#box .playing-board .numb");
    setInterval(function () {
        userOnline.text(Math.floor(Math.random() * 95) + 5);
        waitingBoard.text(Math.floor(Math.random() * 95) + 5);
        playingBoard.text(Math.floor(Math.random() * 95) + 5);
    }, 3000);
});