"use strict";
var appendFakeMessage;
var MessageBox = function () {
  this.messageContent = $('#messages-content');
  this.i = 0;
  this.timeI = 0;
  this.messageContent.mCustomScrollbar();
  this.textAlign = {
    LEFT: 'text-align-left',
    CENTER: 'text-align-center',
    RIGHT: 'text-align-right'
  };

  this.updateScrollbar = function () {
    this.messageContent.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
      scrollInertia: 10,
      timeout: 0
    });
  };

  this.setInfo = function (align, time, sender) {
    var timeId = 'timestamp' + this.timeI++;
    var element = '<div class="timestamp ' + align + '">';
    element += align == this.textAlign.LEFT ? 'by <span class="sender">' + sender + '</span> on  ' : '';
    element += '<time id="' + timeId + '" datetime="' + time + '"></time></span>';
    element += '</div>';
    $(element).appendTo($('.message:last'));
    $("#" + timeId).timeago();
  };

  this.insertMessage = function () {
    var msg = $('.message-input').val();
    if ($.trim(msg) == '') {
      return false;
    }
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    this.setInfo(this.textAlign.RIGHT, (new Date()).toISOString());
    $('.message-input').val(null);
    this.updateScrollbar();
    setTimeout(function () {
      appendFakeMessage();
    }, 1000 + (Math.random() * 20) * 100);
  };

  $('.message-submit').click(function () {
    this.insertMessage();
  });
  var self = this;
  $('#message-input').on('keydown', function (e) {
    if (e.which == 13) {
      self.insertMessage();
      return false;
    }
  });

  this.loading = function () {
    if ($('#message-input').val() != '') return false;
    var element = '<div class="message loading new"><figure class="avatar"><img src="image/avatar-unknown.png" /></figure><span></span></div>';
    $(element).appendTo($('.mCSB_container'));
    this.updateScrollbar();
  };

  this.appendMessage = function (message) {
    $('.message.loading').remove();
    var element = '<div class="message new"><figure class="avatar"><img src="image/avatar.png" /></figure>' + message + '</div>'
    $(element).appendTo($('.mCSB_container')).addClass('new');
    this.setInfo(this.textAlign.LEFT, (new Date()).toISOString(), 'sender');
    this.updateScrollbar();
  }
};

$(document).ready(function () {
  var fakeMessages = ['Hi there, I\'m Fabio and you?', 'Nice to meet you', 'How are you?', 'Not too bad, thanks', 'What do you do?', 'That\'s awesome', 'Codepen is a nice place to stay', 'I think you\'re a nice person', 'Why do you think that?', 'Can you explain?', 'Anyway I\'ve gotta go now', 'It was a pleasure chat with you', 'Time to make a new codepen', 'Bye', ':)'];
  var i = 0;
  var messageBox = new MessageBox();
  appendFakeMessage = function () {
    messageBox.loading();
    setTimeout(() => {
      messageBox.appendMessage(fakeMessages[i]);
      i++;
      i = i >= fakeMessages.length ? 0 : i;
    }, 1000 + (Math.random() * 20) * 100, this);
  };
  appendFakeMessage();
});