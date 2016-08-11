
Appleheels.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

Appleheels.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('player', '/assets/player.png');
		this.load.image('enemy', '/assets/enemy.png');
		this.load.image('coin', '/assets/coin.png');
		this.load.image('wall', '/assets/wall.png');

		this.load.bitmapFont('rollingThunder', '/assets/rolling-thunder.png', '/assets/rolling-thunder.xml');

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
