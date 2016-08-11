
Appleheels.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

Appleheels.MainMenu.prototype = {

	create: function () {

		// this.music = this.add.audio('titleMusic');
		// this.music.play();

        // this.add.image(0, 0, 'sky');
        // this.land = this.add.sprite(0, 336, 'land');
        // this.add.image(390, 360, 'photonstorm');

	    var t = this.add.bitmapText(0, 64, 'rollingThunder', 'Appleheels', 32);
	    t.x = 256 - (t.textWidth / 2);

        this.input.onDown.addOnce(this.startGame, this);

	},

	update: function () {

	},

	startGame: function (pointer) {

		// this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
