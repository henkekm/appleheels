
Appleheels.Game = function (game) {

  this.player;
  this.floor;
  this.floors;
  this.platforms;
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

  init: function () {
    // Test var floors = this.floors to see if we can unthis this app
  },

  isBetween: function (num, min, max) {
    return num >= min && num <= max;
  },

  create: function () {

    this.floors = this.add.group();
    this.platforms = this.add.group();
    // this.coins = this.add.group();
    // this.enemies = this.add.group();

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

    // Place terminal 3
    this.terminalThree = this.add.sprite(300, 584, 'terminalThree');

    // Adds temp score key
    this.score_key = this.input.keyboard.addKey(Phaser.Keyboard.P);

    // Place player
    this.player = this.add.sprite(70, 344, 'player');

    this.physics.arcade.enable (this.player);
    this.game.world.setBounds (0, -384, 512, 1152);
    this.game.camera.position.y = 0;
    this.player.body.collideWorldBounds = true;
    this.player.body.gravity.y = 500;

    // Converts initial value from string to int
    // Preventing 350 + 1 == 3501
    this.game.jumpPower = parseInt(this.game.jumpPower);

    // Place floor
    for (var _col = 0; _col < 26; _col++) {
      for (var _row = 0; _row < 20; _row++) {
        if (this.isBetween(_row, 10, 12) && this.isBetween(_col, 6, 16)) {
          // Do nothing, and carve out a cave for terminalThree
        } else {
          var floor = this.add.sprite(20*_col, 364+_row*20, 'wall');
          this.floors.add(floor);
          floor.body.immovable = true;
        }
      }
    }

    // Place platform
    for (var _col = 0; _col < 15; _col++) {
      var platform = this.add.sprite(100+20*_col, 256, 'wall');
      this.platforms.add(platform);
      platform.body.immovable = true;
    }
    // Place sky platform
    for (var _col = 0; _col < 5; _col++) {
      var platform = this.add.sprite(20+20*_col, -284, 'wall');
      this.platforms.add(platform);
      platform.body.immovable = true;
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

    var isDigging = function () {
      if (this.cursor.down.isDown) {
        return true;
      }
    }

    // is it best practice to use processHandler instead of the if statement found below?
    // var processHandler = function () {
    //   console.log("processHandler is being invoked");
    //   var canProcess = false;
    //   if (this.game.downMethod == "dig" && this.player.body.touching.down || this.player.body.onFloor()) {
    //     canProcess = true;
    //   }
    //   return canProcess;
    // }

    var destroyFloor = function (_player, _floor) {
      console.log("destroyFloor is being invoked", _floor);
        _floor.kill();
        _floor.destroy();
    }

    // Player COLLIDE with platforms and floors
    this.game.physics.arcade.collide(this.player, this.platforms);
    if (this.cursor.down.isDown && this.game.downVerb == "dig") {
      // Should we add the 'isTouching'-type logic to prevent
      // Calling .collide unecessarily?
      this.game.physics.arcade.collide(this.player, this.floors, destroyFloor);
    } else {
      this.game.physics.arcade.collide(this.player, this.floors);
    }

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

    // JUMP by pressing the jumpButton key
    if (this.jumpButton.isDown && this.player.body.touching.down || this.player.body.onFloor()) {
      this.player.body.velocity.y = this.getJumpPower();
    }

    // PAN camera according to player's y position
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

    // WIN CONDITION
    if (this.game.objective == "die") {
      this.gameWon = true;
      this.gameOver();
    }
  },

  render: function() {

    // this.game.debug.cameraInfo(this.game.camera, 32, 32);
    // this.game.debug.bodyInfo(this.player, 32, 32);
    // this.game.debug.body(this.player);

  },

  gameOver: function () {

    if (this.gameWon)
    {
      var t = this.add.bitmapText (0, 128, 'rollingThunder', 'GAME WON', 32);
      this.time.events.add(Phaser.Timer.SECOND * 2, this.setDeadStatus, this);
    }
    else
    {
        var t = this.add.bitmapText (0, 64, 'rollingThunder', 'GAME LOST', 32);
    }

    t.x = 256 - (t.textWidth / 2);

    this.input.onDown.add (this.quitGame, this);

  },

  setDeadStatus: function() {
    $.ajax({
      url: "/game/" + this.game.gameId,
      type: "PUT",
      data: {game_instance: { status: "won" } },
    });
  },

  quitGame: function () {

    this.state.start ('MainMenu');

  }

};
