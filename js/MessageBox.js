"use strict";
var appendFakeMessage;
var MessageBox = function (option) {
  this.box = $('#chat');
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
};

MessageBox.prototype = collectProps(MessageBox.prototype, box);
MessageBox.prototype.getNewMessageWidth = function () {
  return this.width - 80;
};
MessageBox.prototype.resize = function (option) {
  this._resize(option);
  $('#message-input').width(this.width - 85);
  $('#messages .message.new').width(this.getNewMessageWidth());
  this.position(option);
}

MessageBox.prototype.appendMessage = function (message) {
  if (message.sender.id == this.user.id) {
    $('<div class="message message-personal">' + message.text + '</div>').appendTo($('.mCSB_container')).addClass('new');
    this.setInfo(this.textAlign.RIGHT, (new Date()).toISOString());
  } else {
    $('.message.loading').remove();
    var element = '<div class="message new" style="width: ' + this.getNewMessageWidth() + 'px"><figure class="avatar"><img src="' +
      message.sender.avatar + '" /></figure>' + message.text + '</div>'
    $(element).appendTo($('.mCSB_container')).addClass('new');
    this.setInfo(this.textAlign.LEFT, (new Date()).toISOString(), message.sender.name);
  }

  this.updateScrollbar();
};
MessageBox.prototype.loading = function () {
  if (this.inputMessage.val() != '') return false;
  var element = '<div class="message loading"><figure class="avatar"><img src="image/avatar-unknown.png" /></figure><span></span></div>';
  $(element).appendTo($('.mCSB_container'));
  this.updateScrollbar();
};
MessageBox.prototype.insertMessage = function () {
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
    appendFakeMessage(this);
  }.bind(this), 1000 + (Math.random() * 20) * 100);
};
MessageBox.prototype.setInfo = function (align, time, sender) {
  var timeId = 'timestamp' + this.timeI++;
  var element = '<div class="timestamp ' + align + '">';
  element += align == this.textAlign.LEFT ? 'by <span class="sender">' + sender + '</span> on  ' : '';
  element += '<time id="' + timeId + '" datetime="' + time + '"></time></span>';
  element += '</div>';
  $(element).appendTo($('.message:last'));
  $("#" + timeId).timeago();
};
MessageBox.prototype.updateScrollbar = function () {
  this.messageContent.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
};