var fakeMessages = ['Hi there, I\'m Fabio and you?', 'Nice to meet you', 'How are you?', 'Not too bad, thanks', 'What do you do?', 'That\'s awesome', 'Codepen is a nice place to stay', 'I think you\'re a nice person', 'Why do you think that?', 'Can you explain?', 'Anyway I\'ve gotta go now', 'It was a pleasure chat with you', 'Time to make a new codepen', 'Bye', ':)'];
var i = 0;
var user = {
	id: '123',
	name: 'sender'
};
messageBox = new MessageBox({
	user: user
});
appendFakeMessage = function (messageBox) {
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
appendFakeMessage(messageBox);
messageBox.resize({
    width: 400,
    height: 600,
	x: 0,
	y: 650
});