"use strict";
var appendFakeMessage;
var MessageBox = function (option) {
  var chat = $('#chat');
  chat.css({
    'width': option.width + 'px',
    'height': option.height + 'px'
  });
  this.user = option.user;
  this.timeI = 0;
  this.messageContent = $('#messages-content');
  this.inputMessage = $('#message-input');
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
    var msg = this.inputMessage.val().substr(0, 150);
    if ($.trim(msg) == '') return;
    setTimeout(function () {
      this.inputMessage.val(null);
    }.bind(this), 0);
    var message = {
      text: msg,
      sender: this.user
    };
    // open on production
    // socket.emit('message', message);

    // remove on production
    this.appendMessage(message);
    setTimeout(function () {
      appendFakeMessage();
    }, 1000 + (Math.random() * 20) * 100);
  };

  $('#message-submit').click(this.insertMessage.bind(this));
  this.inputMessage.on('keydown', function (e) {
    if (e.which == 13) {
      if (e.ctrlKey) {
        this.inputMessage.val(this.inputMessage.val() + '\n')
        this.inputMessage.scrollTop(this.inputMessage.height());
      } else {
        this.insertMessage();
      }
    }
  }.bind(this));

  this.loading = function () {
    if (this.inputMessage.val() != '') return false;
    var element = '<div class="message loading new"><figure class="avatar"><img src="image/avatar-unknown.png" /></figure><span></span></div>';
    $(element).appendTo($('.mCSB_container'));
    this.updateScrollbar();
  };

  this.appendMessage = function (message) {
    if (message.sender.id == this.user.id) {
      $('<div class="message message-personal">' + message.text + '</div>').appendTo($('.mCSB_container')).addClass('new');
      this.setInfo(this.textAlign.RIGHT, (new Date()).toISOString());
    } else {
      $('.message.loading').remove();
      var element = '<div class="message new"><figure class="avatar"><img src="' + message.sender.avatar + '" /></figure>' + message.text + '</div>'
      $(element).appendTo($('.mCSB_container')).addClass('new');
      this.setInfo(this.textAlign.LEFT, (new Date()).toISOString(), message.sender.name);
    }

    this.updateScrollbar();
  }
};

$(document).ready(function () {
  var fakeMessages = ['Hi there, I\'m Fabio and you?', 'Nice to meet you', 'How are you?', 'Not too bad, thanks', 'What do you do?', 'That\'s awesome', 'Codepen is a nice place to stay', 'I think you\'re a nice person', 'Why do you think that?', 'Can you explain?', 'Anyway I\'ve gotta go now', 'It was a pleasure chat with you', 'Time to make a new codepen', 'Bye', ':)'];
  var i = 0;
  var user = {
    id: '123',
    name: 'sender'
  };
  var messageBox = new MessageBox({
    user: user,
    width: 400,
    height: 600
  });
  appendFakeMessage = function () {
    messageBox.loading();
    setTimeout(() => {
      messageBox.appendMessage({
        text: fakeMessages[i],
        sender: {
          id: '321',
          name: 'sender',
          avatar: 'image/avatar.png'
        }
      });
      i++;
      i = i >= fakeMessages.length ? 0 : i;
    }, 1000 + (Math.random() * 20) * 100, this);
  };
  appendFakeMessage();
});