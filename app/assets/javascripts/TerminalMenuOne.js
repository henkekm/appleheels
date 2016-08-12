
Appleheels.TerminalMenuOne = function(game) {

  this.cursor;
  this.backButton;
  this.attributes;
  this.attrFavNumber;
  this.attrJumpPower;

};

Appleheels.TerminalMenuOne.prototype = {

  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  },

  terminalText: {
    color: 0x15B93C
  },

  getFavoriteNum: function () {
    return Appleheels.favoriteNum;
  },

  setFavoriteNum: function (num) {
    Appleheels.favoriteNum = num;
  },

  getJumpPower: function () {
    return Appleheels.jumpPower;
  },

  setJumpPower: function (num) {
    Appleheels.jumpPower = num;
  },

  init: function () {
    this.titleText = this.add.bitmapText(0, 64, 'rollingThunder', 'Appleheels', 32);
    this.titleText.x = 256 - (this.titleText.textWidth / 2);
    this.titleText.tint = this.terminalText.color;

    this.attributes = [];
    this.attrFavNumber = [];
    this.attrJumpPower = [];

    // INIT Favorite Number attribute
    this.favNumText = this.add.bitmapText (0, 128, 'rollingThunder', 'Favorite Number', 16);
    this.favNumText.x = this.margin.left;
    this.favNumText.tint = this.terminalText.color;
    this.attrFavNumber.push(this.favNumText);
    this.favNumDisplay = this.add.bitmapText (0, 128, 'rollingThunder', String(this.getFavoriteNum()), 16);
    this.favNumDisplay.x = 512 - (this.favNumDisplay.textWidth + this.margin.right);
    this.favNumDisplay.tint = this.terminalText.color;
    this.attrFavNumber.push(this.favNumDisplay);

    this.decFavNum = this.add.bitmapText (0, 128, 'rollingThunder', '-', 16);
    this.decFavNum.x = this.favNumDisplay.x - this.margin.left;
    this.decFavNum.tint = this.terminalText.color;
    this.attrFavNumber.push(this.decFavNum);
    this.incFavNum = this.add.bitmapText (492, 128, 'rollingThunder', '+', 16);
    this.incFavNum.tint = this.terminalText.color;
    this.attrFavNumber.push(this.incFavNum);

    // INIT Jump Power attribute
    this.jumpPowerText = this.add.bitmapText (0, 164, 'rollingThunder', 'Jump Power', 16);
    this.jumpPowerText.x = this.margin.left;
    this.jumpPowerText.tint = this.terminalText.color;
    this.attrJumpPower.push(this.jumpPowerText);
    this.jumpPowerDisplay = this.add.bitmapText (0, 164, 'rollingThunder', String(this.getJumpPower()), 16);
    this.jumpPowerDisplay.x = 512 - (this.jumpPowerDisplay.textWidth + this.margin.right);
    this.jumpPowerDisplay.tint = this.terminalText.color;
    this.attrJumpPower.push(this.jumpPowerDisplay);

    this.decJumpPower = this.add.bitmapText (0, 164, 'rollingThunder', '-', 16);
    this.decJumpPower.x = this.jumpPowerDisplay.x - this.margin.left;
    this.decJumpPower.tint = this.terminalText.color;
    this.attrJumpPower.push(this.decJumpPower);
    this.incJumpPower = this.add.bitmapText (492, 164, 'rollingThunder', '+', 16);
    this.incJumpPower.tint = this.terminalText.color;
    this.attrJumpPower.push(this.incJumpPower);


    this.attributes.push(this.attrFavNumber);
    this.attributes.push(this.attrJumpPower);
    // console.log(this.attributes[0]);
  },

  create: function () {
    this.stage.backgroundColor = '#2D2D2D';

    this.cursor = this.input.keyboard.createCursorKeys();
    this.backButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    this.game.add.existing (this.titleText);
  },

  update: function () {
    // Press RIGHT to increment value
    if (this.cursor.right.isDown) {
      this.setJumpPower (this.getJumpPower() + 1);

      this.jumpPowerDisplay.text = String(this.getJumpPower());

      this.jumpPowerDisplay.x = 512 - (this.jumpPowerDisplay.textWidth + this.margin.right);
      this.decJumpPower.x = this.jumpPowerDisplay.x - this.margin.left;
    };
    // Press LEFT to decrement value
    if (this.cursor.left.isDown) {
      this.setJumpPower (this.getJumpPower() - 1);
      this.jumpPowerDisplay.text = String(this.getJumpPower());

      this.jumpPowerDisplay.x = 512 - (this.jumpPowerDisplay.textWidth + this.margin.right);
      this.decJumpPower.x = this.jumpPowerText.x - this.margin.left;
    };
    // Press ESC to exit
    if (this.backButton.isDown) {
      console.log("EXIT");
      console.log("JumpPower", this.getJumpPower());

      this.state.start('Game');
    };

    // Not working yet
    // Press UP to select next attribute
    if (this.cursor.up.isDown) {
      console.log("UP");
    }
    // Press DOWN to select next attribute
    if (this.cursor.down.isDown) {
      console.log("DOWN");
    }
  }
};