"use strict";

function StateBox(option) {
    this.box = $('#state');

    this._userOnline = $("#side-bar-state .user-online .count");
    this._waitingBoard = $("#side-bar-state .waiting-board .count");
    this._playingBoard = $("#side-bar-state .playing-board .count");
    this._userOnlineContainer = $('.tab.user-online .container');
    this._waitingBoardContainer = $('.tab.waiting-board .container');
    this._playingBoardContainer = $('.tab.playing-board .container');

    $("#side-bar-state .container .item").click(function (e) {
        e.preventDefault();
        $('#side-bar-state .container .item').removeClass("active");
        $('#state .tab').removeClass('active');
        var data = $(this).attr('data');
        $('.' + data).addClass("active");
    });
}

StateBox.prototype = collectProps(StateBox.prototype, box);
StateBox.prototype.resize = function (option) {
    this._resize(option);
    $('#tab-state').width(this.width - 60);
    $('#tab-state .tab .container').height(this.height - 35);
    this.position(option);
};
StateBox.prototype.userOnlineCount = function (n) {
    if (n == void 0) return Number(this._userOnline.text() || 0);
    this._userOnline.text(n);
};
StateBox.prototype.waitingBoardCount = function (n) {
    if (n == void 0) return Number(this._waitingBoard.text() || 0);
    this._waitingBoard.text(n);
};
StateBox.prototype.playingBoardCount = function (n) {
    if (n == void 0) return Number(this._playingBoard.text() || 0);
    this._playingBoard.text(n);
};
StateBox.prototype.addUserOnline = function (user) {
    var element = '<a href="#" class="user" data="' + user.id + '" onclick="StateBox.userOnlineClick(this);">' +
        '<figure class="avatar">' +
        '<img src="' + user.avatar + '" />' +
        '</figure>' +
        '<span class="name">' + user.name + '</span>' +
        '</a>';
    this._userOnlineContainer.append(element);
};
StateBox.prototype.addWaitingBoard = function (board) {
    var element = '<a href="#" class="board" data="' + board.id + '" onclick="StateBox.boardClick(this, true);">' +
        '<div class="user">' +
        '<figure class="avatar"><img src="' + board.user.avatar + '"></figure>' +
        '<span class="name">' + board.user.name + '</span>' +
        '</div>' +
        '<div class="vs">vs' +
        '<span></span><span></span><span></span>' +
        '</div>' +
        '</a>';
    this._waitingBoardContainer.append(element);
};
StateBox.prototype.addPlayingBoard = function (board) {
    var element = '<a href="#" class="board" data="' + board.id + '" onclick="StateBox.boardClick(this);">' +
        '<div class="left-user user">' +
        '<figure class="avatar"><img src="' + board.whiteUser.avatar + '"></figure>' +
        '<span class="name">' + board.whiteUser.name + '</span>' +
        '</div>' +
        '<div class="vs">vs</div>' +
        '<div class="right-user user">' +
        '<figure class="avatar"><img src="' + board.blackUser.avatar + '"></figure>' +
        '<span class="name">' + board.blackUser.name + '</span>' +
        '</div>' +
        '</a>';
    this._playingBoardContainer.append(element);
};

StateBox.prototype.addUserOnlineClickListener = function (listener, context) {
    StateBox._userOnlineClickListeners = StateBox._userOnlineClickListeners || [];
    StateBox._userOnlineClickListeners.push([listener, context]);
};
StateBox.prototype.addWaitingBoardClickListener = function (listener, context) {
    StateBox._waitingBoardClickListeners = StateBox._waitingBoardClickListeners || [];
    StateBox._waitingBoardClickListeners.push([listener, context]);
};
StateBox.prototype.addPlayingBoardClickListener = function (listener, context) {
    StateBox._playingBoardClickListeners = StateBox._playingBoardClickListeners || [];
    StateBox._playingBoardClickListeners.push([listener, context]);
};

function callListeners(listeners, e) {
    listeners.forEach(function (lc) {
        lc[0].call(lc[1], $(this).attr('data'));
    }, e);
}
StateBox.userOnlineClick = function (e) {
    callListeners(StateBox._userOnlineClickListeners || [], e)
};
StateBox.boardClick = function (e, isWaiting) {
    callListeners(isWaiting ? StateBox._waitingBoardClickListeners || [] :
        StateBox._playingBoardClickListeners || [], e);
}