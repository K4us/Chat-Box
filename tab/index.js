"use strict";

function userClick(e) {
    console.log($(e).attr('data'));
}
$(document).ready(function () {
    $("#box .side-bar-item").click(function (e) {
        e.preventDefault();
        $('#box .side-bar-item').removeClass("active");
        $('#box .tab').removeClass('active');
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

    var tabContent = $('#tab-content');
    for (var i = 0; i < 70; i++) {
        var element = '<a href="#" class="user" data="00' + i + '" onclick="userClick(this);">' +
            '<figure class="avatar">' +
            '<img src="../image/avatar.png" />' +
            '</figure>' +
            '<span class="name">User 00 asd fa sdf asd f asd f asf as f as fas s fas dfasdf asdf as df asd' + i + '</span>' +
            '</a>';
        tabContent.append(element);
    }
});