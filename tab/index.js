"use strict";
$(document).ready(function() {
    $("#side-bar>div.side-bar-content>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.tabe-box>div.tabe").removeClass("active");
        $("div.tabe-box>div.tabe").eq(index).addClass("active");
    });
});