
Appleheels.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

Appleheels.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);

		this.load.bitmapFont('rollingThunder', 'images/rolling-thunder.png', 'images/rolling-thunder.xml');

	},

	create: function () {

		this.preloadBar.cropEnabled = false;

		this.state.start('MainMenu');

	},

	update: function () {

		// if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		// {
			// this.ready = true;
			// this.state.start('MainMenu');
		// }

	}

};
