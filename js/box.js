window.collectProps = function () {
	var ret = {};
	var len = arguments.length;
	for (var i = 0; i < len; i++) {
		for (var p in arguments[i]) {
			if (arguments[i].hasOwnProperty(p)) {
				ret[p] = arguments[i][p];
			}
		}
	}
	return ret;
}
var box = {
    hide: function () {
        this.box.addClass('hide');
    },
    show: function () {
        this.box.removeClass('hide');
    },
    position: function (option) {
        option = option || {};
        this.x = option.x || this.x || 0;
        this.y = option.y || this.y || 0;
        this.box.css({
            left: this.x + 'px',
            top: this.y + 'px',
            transform: 'translateY(-' + this.height + 'px)'
        });
    },
    _resize: function (option) {
        option = option || {};
        this.width = option.width || $(document).width();
        this.height = option.height || $(document).height();
        this.box.width(this.width);
        this.box.height(this.height);
    }
}