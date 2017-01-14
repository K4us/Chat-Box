"use strict";
var $messages = $('#messages-content'),
  i = 0,
  timeI = 0;
var fakeMessages = ['Hi there, I\'m Fabio and you?', 'Nice to meet you', 'How are you?', 'Not too bad, thanks', 'What do you do?', 'That\'s awesome', 'Codepen is a nice place to stay', 'I think you\'re a nice person', 'Why do you think that?', 'Can you explain?', 'Anyway I\'ve gotta go now', 'It was a pleasure chat with you', 'Time to make a new codepen', 'Bye', ':)'];
var textAlign = {
  LEFT: 'text-align-left',
  CENTER: 'text-align-center',
  RIGHT: 'text-align-right'
};

$(document).ready(function () {
  $messages.mCustomScrollbar();
  setTimeout(function () {
    appendFakeMessage(fakeMessages[i]);
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setInfo(align, time, sender) {
  var timeId = 'timestamp' + timeI++;
  var element = '<div class="timestamp ' + align + '">';
  element += align == textAlign.LEFT ? 'by ' + sender + ' at  ' : '';
  element += '<time id="' + timeId + '" datetime="' + time + '"></time></span>';
  element += '</div>';
  $(element).appendTo($('.message:last'));
  $("#" + timeId).timeago();
}

function insertMessage() {
  var msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setInfo(textAlign.RIGHT, (new Date()).toISOString());
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function () {
    appendFakeMessage(fakeMessages[i]);
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function () {
  insertMessage();
});

$(window).on('keydown', function (e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

function appendFakeMessage(message) {
  if ($('#message-input').val() != '') return false;
  var element = '<div class="message loading new"><figure class="avatar"><img src="image/avatar.png" /></figure><span></span></div>';
  $(element).appendTo($('.mCSB_container'));
  updateScrollbar();

  // setTimeout(function () {
  //   $('.message.loading').remove();
  //   var element = '<div class="message new"><figure class="avatar"><img src="image/avatar.png" /></figure>' + fakeMessages[i] + '</div>'
  //   $(element).appendTo($('.mCSB_container')).addClass('new');
  //   setInfo(textAlign.LEFT, (new Date()).toISOString(), 'sender');
  //   updateScrollbar();
  //   i++;
  //   i = i >= fakeMessages.length ? 0 : i;
  // }, 1000 + (Math.random() * 20) * 100);

}