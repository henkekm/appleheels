
Appleheels.Game = function (game) {

  this.player;
  this.wall;
  this.walls;
  this.coin;
  this.coins;
  this.enemy;
  this.enemies;
  this.terminalOne;
  this.terminalTwo;
  this.terminalThree;
  this.cursor;
  this.jumpButton;
  // this.score;
  // this.scoreText;

  // this.emitter;
  this.gameLost;
  this.gameWon;

};

Appleheels.Game.prototype = {

	create: function () {

    this.walls = this.add.group();
    this.coins = this.add.group();
    this.enemies = this.add.group();

    this.gameLost = false;
    this.gameWon = false;
    this.stage.backgroundColor = '#336699';

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.world.enableBody = true;

    this.cursor = this.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Place terminal 1
    this.terminalOne = this.add.sprite(340, 216, 'terminalOne');

    // Place terminal 2
    this.terminalTwo = this.add.sprite(40, -324, 'terminalTwo');

    // Place terminal 3 TEMPORARILY INACCESSIBLE
    this.terminalThree = this.add.sprite(600, 600, 'terminalThree');

    // Adds temp score key
    this.score_key = this.input.keyboard.addKey(Phaser.Keyboard.P);

    // Place player
    this.player = this.add.sprite(70, 344, 'player');

    this.physics.arcade.enable (this.player);
    this.game.world.setBounds (0, -384, 512, 768);
    this.game.camera.position.y = 0;
    this.player.body.collideWorldBounds = true;
    this.player.body.gravity.y = 500;

    // Place floor
    for (var i = 0; i < 26; i++) {
      var wall = this.add.sprite(20*i, 364, 'wall');
      this.walls.add(wall);
      wall.body.immovable = true;
    }

    // Place platform
    for (var i = 0; i < 15; i++) {
      var wall = this.add.sprite(100+20*i, 256, 'wall');
      this.walls.add(wall);
      wall.body.immovable = true;
    }
    // Place sky platform
    for (var i = 0; i < 5; i++) {
      var wall = this.add.sprite(20+20*i, -284, 'wall');
      this.walls.add(wall);
      wall.body.immovable = true;
    }


	},

  useTerminalOne: function () {
    if (this.cursor.up.isDown) {
      console.log("TERMINAL 1");

      this.state.start('TerminalMenuOne');
    }
  },

  useTerminalTwo: function () {
    if (this.cursor.up.isDown) {
      console.log("TERMINAL 2");

      this.state.start('TerminalMenuTwo');
    }
  },

  useTerminalThree: function () {
    if (this.cursor.up.isDown) {
      console.log("TERMINAL 3");

      this.state.start('TerminalMenuThree');
    }
  },

  getFavoriteNum: function () {
    return Appleheels.favoriteNum;
  },

  setFavoriteNum: function (num) {
    Appleheels.favoriteNum = num;
  },

  getJumpPower: function () {
    return (Appleheels.jumpPower * -1);
  },

  setJumpPower: function (num) {
    Appleheels.JumpPower = num;
  },

	update: function () {

    // MOVE left and right by pressing left and right keys
    if (this.cursor.left.isDown) {
      this.player.body.velocity.x = -200;
    } else if (this.cursor.right.isDown) {
      this.player.body.velocity.x = 200;
    } else {
      this.player.body.velocity.x = 0;
    }

    if (this.score_key.isDown){
      $.ajax({
        url: "/game/" + this.game.gameId,
        type: "PUT",
        data: "",
        success: function(response) {
        }
      });
    }
    // Player COLLIDE with walls
    this.game.physics.arcade.collide(this.player, this.walls);

    // Player OVERLAP with terminalOne
    this.game.physics.arcade.overlap(this.player, this.terminalOne, this.useTerminalOne, null, this);

    // Player OVERLAP with terminalTwo
    this.game.physics.arcade.overlap(this.player, this.terminalTwo, this.useTerminalTwo, null, this);

    // Player OVERLAP with terminalThree
    this.game.physics.arcade.overlap(this.player, this.terminalThree, this.useTerminalThree, null, this);

    // JUMP by pressing the jumpButton key
    if (this.jumpButton.isDown && this.player.body.touching.down || this.player.body.onFloor()) {
      this.player.body.velocity.y = this.getJumpPower();
    }

    // PAN camera according to player's y position

    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
    // this.game.camera.atLimit = true;
    // if (this.game.camera.position.y > 0) {
    //   this.game.camera.position.y = 0;
    // }


    // this.scoreText.text = 'score:' + this.score;

    // if (this.gameLost || this.gameWon)
    // {
    //   return;
    // }

    // for (var i = 0; i < this.cities.length; i++)
    // {
    //   if (this.cities[i].alive)
    //   {
    //     this.physics.arcade.overlap(this.plane, this.cities[i].top, this.planeSmash, null, this);
    //   }
    // }

    // if (this.bomb.visible)
    // {
    //   for (var i = 0; i < this.cities.length; i++)
    //   {
    //     if (this.cities[i].alive)
    //     {
    //       this.physics.arcade.overlap(this.bomb, this.cities[i].top, this.cities[i].hit, null, this.cities[i]);
    //     }
    //   }

    //   this.physics.arcade.overlap(this.bomb, this.land, this.removeBomb, null, this);
    // }

	},

  render: function() {

    this.game.debug.cameraInfo(this.game.camera, 32, 32);

  },

  gameOver: function () {

    if (this.gameWon)
    {
        var t = this.add.bitmapText (0, 128, 'rollingThunder', 'GAME WON', 32);
    }
    else
    {
        var t = this.add.bitmapText (0, 64, 'rollingThunder', 'GAME LOST', 32);
    }

    t.x = 256 - (t.textWidth / 2);

    this.input.onDown.add (this.quitGame, this);

  },

	quitGame: function () {

		this.state.start ('MainMenu');

	}

};
