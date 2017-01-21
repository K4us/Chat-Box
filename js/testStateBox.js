var user = {
    id: '123',
    name: 'user',
    avatar: 'avatar.png'
}
stateBox = new StateBox({
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
stateBox.resize({
    width: 400,
    height: 600,
	x: 0,
	y: 650
});