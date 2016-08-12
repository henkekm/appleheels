
Appleheels.TerminalMenu = function(game) {

  this.cursor;

};

Appleheels.TerminalMenu.prototype = {

  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  },

  getFavoriteNum: function () {
    return Appleheels.favoriteNum;
  },

  setFavoriteNum: function (num) {
    Appleheels.favoriteNum = num;
  },

  init: function () {
    this.titleText = this.add.bitmapText(0, 64, 'rollingThunder', 'Appleheels', 32);
    this.titleText.x = 256 - (this.titleText.textWidth / 2);

    this.favNumText = this.add.bitmapText (0, 128, 'rollingThunder', 'Favorite Number', 16);
    this.favNumText.x = this.margin.left;
    this.favNumDisplay = this.add.bitmapText (0, 128, 'rollingThunder', '-', 16);
    this.favNumDisplay.text = String(this.getFavoriteNum());
    this.favNumDisplay.x = 512 - (this.favNumDisplay.textWidth + this.margin.right);

    this.decFavNum = this.add.bitmapText (0, 128, 'rollingThunder', '-', 16);
    this.decFavNum.x = this.favNumDisplay.x - this.margin.left;
    this.incFavNum = this.add.bitmapText (492, 128, 'rollingThunder', '+', 16);

    this.optionCount = 1;
  },

  create: function () {
    this.stage.backgroundColor = '#2D2D2D';

    this.game.add.existing (this.titleText);

    this.cursor = this.input.keyboard.createCursorKeys();

    // this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
    //   playMusic = !playMusic;
    //   target.text = playMusic ? 'Mute Music' : 'Play Music';
    //   musicPlayer.volume = playMusic ? 1 : 0;
    // });
    // this.addMenuOption(playSound ? 'Mute Sound' : 'Play Sound', function (target) {
    //   playSound = !playSound;
    //   target.text = playSound ? 'Mute Sound' : 'Play Sound';
    // });
    // this.addMenuOption('<- Back', function () {
    //   game.state.start("GameMenu");
    // });
  },

  update: function () {
    if (this.cursor.right.isDown) {
      this.setFavoriteNum (this.getFavoriteNum() + 1);

      this.favNumDisplay.text = String(this.getFavoriteNum());

      this.favNumDisplay.x = 512 - (this.favNumDisplay.textWidth + this.margin.right);
      this.decFavNum.x = this.favNumDisplay.x - this.margin.left;
    };
    if (this.cursor.left.isDown) {
      this.setFavoriteNum (this.getFavoriteNum() - 1);
      this.favNumDisplay.text = String(this.getFavoriteNum());

      this.favNumDisplay.x = 512 - (this.favNumDisplay.textWidth + this.margin.right);
      this.decFavNum.x = this.favNumDisplay.x - this.margin.left;
    };
    if (this.cursor.down.isDown) {
      console.log("EXIT");
      console.log("favoriteNum", this.getFavoriteNum());

      this.state.start('Game');
    };
  }
};