$(document).ready(function () {
  document.getElementById('textEditor').contentWindow.document.designMode = "on";
  document.getElementById('textEditor').contentWindow.document.close();
  var edit = document.getElementById("textEditor").contentWindow;
  edit.focus();
  $("#bold").click(function () {
    if ($(this).hasClass("selected")) $(this).removeClass("selected");
    else $(this).addClass("selected");
    boldIt();
  });
  $("#italic").click(function () {
    if ($(this).hasClass("selected")) $(this).removeClass("selected");
    else $(this).addClass("selected");
    ItalicIt();
  });
  $("#link").click(function () {
    var text = prompt("What is the link:", "http://")
    if (text) url(text);
  });
  $("#mention").click(function () {
    var text = prompt("Give a name:")
    if (text) mention(text);
  });
  $("#stext").click(function () {
    $("#text").hide();
    $("#textEditor").show();
    $("#controls").show();
    $("#shtml").show();
    $("#stext").hide();
  });
  $("#shtml").on('click', function () {
    $("#text").show();
    $("#textEditor").hide();
    $("#controls").hide();
    $("#shtml").hide();
    $("#stext").show();
  });
  $("#text").hide();
  // $("#stext").hide();
});

function boldIt() {
  var edit = document.getElementById("textEditor").contentWindow;
  edit.focus();
  edit.document.execCommand("bold", false, "");
  edit.focus();
}

function ItalicIt() {
  var edit = document.getElementById("textEditor").contentWindow;
  edit.focus();
  edit.document.execCommand("italic", false, "");
  edit.focus();
}

function url(url) {
  var edit = document.getElementById("textEditor").contentWindow;
  edit.focus();
  edit.document.execCommand("createLink", false, url);
  edit.focus();
}

function mention(name) {
  var edit = document.getElementById("textEditor").contentWindow;
  edit.focus();
  edit.document.execCommand("insertHtml", false, '@<span style="color:red;">' + name + '</span>');
  edit.document.execCommand("insertHtml", false, '&nbsp;');
  edit.focus();
}

setInterval(function () {
  var gyt = $("#textEditor").contents().find("body").html().match(/ /g);
  if ($("#textEditor").contents().find("body").html().match(/@/g) >= 0) {} else {
    $("#text").val($("#textEditor").contents().find("body").html());
  }
  $("#text").val($("#textEditor").contents().find("body").html());
}, 1000);