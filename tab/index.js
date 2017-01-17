"use strict";

function ActiveBox(option) {
    var state = $('#state');
    state.css({
        'width': option.width + 'px',
        'height': option.height + 'px'
    });
    $('#tab-state').width(option.width - 60);
    $('#tab-state .tab .content').height(option.height - 35);

    this._userOnline = $("#side-bar .user-online .numb");
    this._waitingBoard = $("#side-bar .waiting-board .numb");
    this._playingBoard = $("#side-bar .playing-board .numb");
    this._userOnlineContainer = $('.tab.user-online .content');
    this._waitingBoardContainer = $('.tab.waiting-board .content');
    this._playingBoardContainer = $('.tab.playing-board .content');

    $("#side-bar .content .item").click(function (e) {
        e.preventDefault();
        $('#side-bar .content .item').removeClass("active");
        $('#state .tab').removeClass('active');
        var data = $(this).attr('data');
        $('.' + data).addClass("active");
    });
    this.userOnlineCount = function (n) {
        if (n == void 0) return Number(this._userOnline.text() || 0);
        this._userOnline.text(n);
    };
    this.waitingBoardCount = function (n) {
        if (n == void 0) return Number(this._waitingBoard.text() || 0);
        this._waitingBoard.text(n);
    };
    this.playingBoardCount = function (n) {
        if (n == void 0) return Number(this._playingBoard.text() || 0);
        this._playingBoard.text(n);
    };
    this.addUser = function (user) {
        var element = '<a href="#" class="user" data="' + user.id + '" onclick="ActiveBox.userOnlineClick(this);">' +
            '<figure class="avatar">' +
            '<img src="' + user.avatar + '" />' +
            '</figure>' +
            '<span class="name">' + user.name + '</span>' +
            '</a>';
        this._userOnlineContainer.append(element);
    };

    this.addUserOnlineClickListener = function (listener, context) {
        ActiveBox._userOnlineClickListeners = ActiveBox._userOnlineClickListeners || [];
        ActiveBox._userOnlineClickListeners.push([listener, context]);
    };
    this.addWaitingBoardClickListener = function (listener, context) {
        ActiveBox._waitingBoardClickListeners = ActiveBox._waitingBoardClickListeners || [];
        ActiveBox._waitingBoardClickListeners.push([listener, context]);
    };
    this.addPlayingBoardClickListener = function (listener, context) {
        ActiveBox._playingBoardClickListeners = ActiveBox._playingBoardClickListeners || [];
        ActiveBox._playingBoardClickListeners.push([listener, context]);
    };
}

function callListeners(listeners, e) {
    listeners.forEach(function (lc) {
        lc[0].call(lc[1], $(this).attr('data'));
    }, e);
}
ActiveBox.userOnlineClick = function (e) {
    callListeners(ActiveBox._userOnlineClickListeners || [], e)
}
ActiveBox.boardClick = function (e, isWaiting) {
    callListeners(isWaiting ? ActiveBox._waitingBoardClickListeners || [] : ActiveBox._playingBoardClickListeners || [], e)
}

$(document).ready(function () {
    var user = {
        id: '123',
        name: 'user',
        avatar: 'avatar.png'
    }
    var activeBox = new ActiveBox({
        width: 400,
        height: 600,
        user: user
    });
    activeBox.addUserOnlineClickListener(function (id) {
        console.log('User id:' + id + ' clicked');
    }, this)
    activeBox.addWaitingBoardClickListener(function (id) {
        console.log('Waiting board id:' + id + ' clicked');
    }, this)
    activeBox.addPlayingBoardClickListener(function (id) {
        console.log('Playing board id:' + id + ' clicked');
    }, this)
    setInterval(function () {
        this.userOnlineCount(Math.floor(Math.random() * 95) + 5);
        this.waitingBoardCount(Math.floor(Math.random() * 95) + 5);
        this.playingBoardCount(Math.floor(Math.random() * 95) + 5);
    }.bind(activeBox), 3000);

    for (var i = 0; i < 70; i++) {
        activeBox.addUser({
            id: '00' + i,
            name: 'User 00' + i,
            avatar: '../image/avatar.png'
        })
    }
});