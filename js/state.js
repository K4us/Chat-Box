"use strict";

function ActiveBox(option) {
    this.box = $('#state');
    this.resize = function (option) {
        option = option || {};
        this.width = option.width || $(document).width();
        this.height = option.height || $(document).height();
        this.box.width(this.width);
        this.box.height(this.height);
        $('#tab-state').width(this.width - 60);
        $('#tab-state .tab .content').height(this.height - 35);
        this.position(option);
    };
    this.position = function (option) {
        option = option || {};
        this.x = option.x || this.x || 0;
        this.y = option.y || this.y || 0;
        this.box.css({
            left: this.x,
            top: this.y - this.height,
        });
    };
    this.resize(option);

    this._userOnline = $("#side-bar-state .user-online .count");
    this._waitingBoard = $("#side-bar-state .waiting-board .count");
    this._playingBoard = $("#side-bar-state .playing-board .count");
    this._userOnlineContainer = $('.tab.user-online .content');
    this._waitingBoardContainer = $('.tab.waiting-board .content');
    this._playingBoardContainer = $('.tab.playing-board .content');

    $("#side-bar-state .content .item").click(function (e) {
        e.preventDefault();
        $('#side-bar-state .content .item').removeClass("active");
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
    this.addUserOnline = function (user) {
        var element = '<a href="#" class="user" data="' + user.id + '" onclick="ActiveBox.userOnlineClick(this);">' +
            '<figure class="avatar">' +
            '<img src="' + user.avatar + '" />' +
            '</figure>' +
            '<span class="name">' + user.name + '</span>' +
            '</a>';
        this._userOnlineContainer.append(element);
    };
    this.addWaitingBoard = function (board) {
        var element = '<a href="#" class="board" data="' + board.id + '" onclick="ActiveBox.boardClick(this, true);">' +
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
    this.addPlayingBoard = function (board) {
        var element = '<a href="#" class="board" data="' + board.id + '" onclick="ActiveBox.boardClick(this);">' +
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
    window.stateBox = new ActiveBox({
        width: 300,
        height: 300,
        x: 0,
        y: 400,
        user: user
    });
    stateBox.addUserOnlineClickListener(function (id) {
        console.log('User id:' + id + ' clicked');
    }, this)
    stateBox.addWaitingBoardClickListener(function (id) {
        console.log('Waiting board id:' + id + ' clicked');
    }, this)
    stateBox.addPlayingBoardClickListener(function (id) {
        console.log('Playing board id:' + id + ' clicked');
    }, this)
    setInterval(function () {
        this.userOnlineCount(Math.floor(Math.random() * 95) + 5);
        this.waitingBoardCount(Math.floor(Math.random() * 95) + 5);
        this.playingBoardCount(Math.floor(Math.random() * 95) + 5);
    }.bind(stateBox), 3000);

    for (var i = 0; i < 70; i++) {
        stateBox.addUserOnline({
            id: '00' + i,
            name: 'User 00' + i,
            avatar: 'image/avatar.png'
        });
        stateBox.addWaitingBoard({
            id: '00' + i,
            user: {
                id: '00' + i,
                name: 'user 00' + i,
                avatar: 'image/avatar.png'
            }
        });
        stateBox.addPlayingBoard({
            id: '00' + i,
            whiteUser: {
                id: '00' + i,
                name: 'white user 00' + i,
                avatar: 'image/avatar.png'
            },
            blackUser: {
                id: '00' + i,
                name: 'black user 00' + i,
                avatar: 'image/avatar.png'
            }
        });
    }
});