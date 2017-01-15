"use strict";
$(document).ready(function () {
    $("#box .side-bar-item").click(function (e) {
        e.preventDefault();
        $('#box .side-bar-item').removeClass("active");
        $('#box .tabe').removeClass('active');
        var data = $(this).attr('data');
        $('.' + data).addClass("active");
    });
});