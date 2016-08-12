
Appleheels.Game = function (game) {

  this.player;
  this.wall;
  this.walls;
  this.coin;
  this.coins;
  this.enemy;
  this.enemies;
  this.cursor;
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

    this.score_key = this.input.keyboard.addKey(Phaser.Keyboard.P);

    this.player = this.add.sprite(70, 100, 'player');

    this.player.body.gravity.y = 100;

    // Create floor
    for (var i = 0; i < 26; i++) {
      var wall = this.add.sprite(20*i, 364, 'wall')
      this.walls.add(wall);
      wall.body.immovable = true;
    }

	},

	update: function () {
    // Player COLLIDE with walls
    this.physics.arcade.collide(this.player, this.walls);

    // MOVE left and right by pressing left and right keys
    if (this.cursor.left.isDown) {
      this.player.body.velocity.x = -200;
    } else if (this.cursor.right.isDown) {
      this.player.body.velocity.x = 200;
    } else {
      this.player.body.velocity.x = 0;
    }

    // JUMP by pressing the up key
    if (this.cursor.up.isDown && this.player.body.touching.down) {
      console.log(this.player.body.touching);
      console.log(this.player.body.velocity);
      this.player.body.velocity.y = -250;
      console.log(this.player.body.velocity);
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
