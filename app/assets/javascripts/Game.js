
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
  // this.jumpButton;
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
    this.game.world.setBounds (0, -384, 512, 1152);
    this.game.camera.position.y = 0;
    this.player.body.collideWorldBounds = true;
    this.player.body.gravity.y = 500;

    this.game.jumpPower = parseInt(this.game.jumpPower);

    // Place floor
    for (var i = 0; i < 26; i++) {
      for (var j = 0; j < 20; j++) {
        var wall = this.add.sprite(20*i, 364 + j*20, 'wall');
        this.walls.add(wall);
        wall.body.immovable = true;
      }
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

  getJumpPower: function () {
    return (this.game.jumpPower * -1);
  },

  setJumpPower: function (num) {
    this.game.jumpPower = num;
  },

  update: function () {
    // Player COLLIDE with walls
    this.game.physics.arcade.collide(this.player, this.walls);

    // Player OVERLAP with terminalOne
    this.game.physics.arcade.overlap(this.player, this.terminalOne, this.useTerminalOne, null, this);

    // Player OVERLAP with terminalTwo
    this.game.physics.arcade.overlap(this.player, this.terminalTwo, this.useTerminalTwo, null, this);

    // Player OVERLAP with terminalThree
    this.game.physics.arcade.overlap(this.player, this.terminalThree, this.useTerminalThree, null, this);

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
    var processHandler = function () {
      return true;
    }
    var destroyWall = function (_player, _wall) {
      _wall.kill();
      _wall.destroy();
    }

    // DIG by pressing the down key
    if (this.cursor.down.isDown && this.player.body.touching.down || this.player.body.onFloor()) {
      this.game.physics.arcade.collide(this.player, this.walls, destroyWall(this.player, this.walls.children[0]), processHandler);
      console.log(this.walls.children[0]);
    }

    // JUMP by pressing the jumpButton key
    if (this.jumpButton.isDown && this.player.body.touching.down || this.player.body.onFloor()) {
      this.player.body.velocity.y = this.getJumpPower();
    }

    // PAN camera according to player's y position
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

  },

  render: function() {

    // this.game.debug.cameraInfo(this.game.camera, 32, 32);

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
