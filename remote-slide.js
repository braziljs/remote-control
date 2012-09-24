if (!window.io) {
	throw 'Socket.io library is required. Make sure that node server is up';
}

(function (io) {
	var RemoteSlide = function () {},

	private = {

		socket : io.connect('http://192.168.0.100:81'),

		setAction : function(action, fn) {
			private.socket.on('message', function(data) {
		  		if (data === action && typeof fn === 'function') {
		  			fn();
		  		}
		  	});
		}
	};

	RemoteSlide.prototype.on = function (action, fn) {
		var act = action.match(/next|previous|fullscreen/);
		if (act !== null && act[0]) {
			private.setAction(action,fn);
		} else {
			throw 'Invalid action name';
		}
	};	

	window.RemoteSlide = RemoteSlide;
}(io));