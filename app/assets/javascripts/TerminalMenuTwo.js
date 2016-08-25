
Appleheels.TerminalMenuTwo = function(game) {

  this.cursor;
  this.backButton;
  this.attributes;
  this.attrFavNumber;
  this.attrDownAssignment;

};

Appleheels.TerminalMenuTwo.prototype = {

  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  },

  terminalText: {
    color: 0xE6E817
  },

  getDownAssignment: function (num) {
    if (num == Appleheels.downAssigment.length) {
      num = 0
    } else if (num == -1) {
      num = (Appleheels.downAssigment.length - 1)
    };
    this.game.downCount = num;
    console.log(num);
    return Appleheels.downAssigment[num];
  },

  initialDown: function () {
    if (this.game.downMethod != "") {
      return this.game.downMethod
    } else {
      return this.getDownAssignment(0)
    };
  },

  init: function () {
    this.titleText = this.add.bitmapText(0, 64, 'rollingThunder', 'Appleheels', 32);
    this.titleText.x = 256 - (this.titleText.textWidth / 2);
    this.titleText.tint = this.terminalText.color;

    this.attributes = [];
    this.attrDownAssignment = [];

    // INIT Down Button attribute
    this.downAssignmentText = this.add.bitmapText (0, 164, 'rollingThunder', 'Down Assignment', 16);
    this.downAssignmentText.x = this.margin.left;
    this.downAssignmentText.tint = this.terminalText.color;
    this.attrDownAssignment.push(this.downAssignmentText);
    this.downAssignmentDisplay = this.add.bitmapText (0, 164, 'rollingThunder', this.initialDown(), 16);
    this.downAssignmentDisplay.x = 500 - (this.downAssignmentDisplay.textWidth + this.margin.right);
    this.downAssignmentDisplay.tint = this.terminalText.color;
    this.attrDownAssignment.push(this.downAssignmentDisplay);

    this.decDownAssignment = this.add.bitmapText (0, 164, 'rollingThunder', '-', 16);
    this.decDownAssignment.x = this.downAssignmentDisplay.x - this.margin.left;
    this.decDownAssignment.tint = this.terminalText.color;
    this.attrDownAssignment.push(this.decDownAssignment);
    this.incDownAssignment = this.add.bitmapText (492, 164, 'rollingThunder', '+', 16);
    this.incDownAssignment.tint = this.terminalText.color;
    this.attrDownAssignment.push(this.incDownAssignment);

    this.attributes.push(this.attrDownAssignment);
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
      this.getDownAssignment(this.game.downCount + 1);
      this.downAssignmentDisplay.text = this.getDownAssignment(this.game.downCount);
      this.downAssignmentDisplay.x = 500 - (this.downAssignmentDisplay.textWidth + this.margin.right);
      this.decDownAssignment.x = this.downAssignmentDisplay.x - this.margin.left;
    };
    // Press LEFT to decrement value
    if (this.cursor.left.isDown) {
      this.getDownAssignment(this.game.downCount - 1);

      this.downAssignmentDisplay.x = 500 - (this.downAssignmentDisplay.textWidth + this.margin.right);
      this.decDownAssignment.x = this.downAssignmentText.x - this.margin.left;
    };
    // Press ESC to exit
    if (this.backButton.isDown) {
      console.log("EXIT");
      this.game.downMethod = this.getDownAssignment(this.game.downCount);
      console.log("DownAssignment", this.getDownAssignment(this.game.downMethod));

      $.ajax({
        url: "/game/" + this.game.gameId,
        type: "PUT",
        data: {game_instance: { down_method: this.game.downMethod } },
      });
      
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