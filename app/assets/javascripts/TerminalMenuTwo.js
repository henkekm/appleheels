
Appleheels.TerminalMenuTwo = function(game) {

  this.cursor;
  this.backButton;

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

  cycleDownVerb: function (_direction) {
    var previousDownVerbs;
    if (_direction == "up") {
      previousDownVerbs = Appleheels.downVerbs.shift();
      Appleheels.downVerbs.push(previousDownVerbs);
    } else if (_direction == "down") {
      previousDownVerbs = Appleheels.downVerbs.pop();
      Appleheels.downVerbs.unshift(previousDownVerbs);
    }
  },

  getDownVerb: function () {
    return Appleheels.downVerbs[0];
  },

  putDownVerb: function () {
    console.log(this.getDownVerb());
    this.game.downVerb = this.getDownVerb();

    $.ajax({
      url: "/game/" + this.game.gameId,
      type: "PUT",
      data: {game_instance: { down_method: this.game.downVerb } },
    });

    this.state.start('Game');
  },

  initialDown: function () {
    if (this.game.downVerb != "") {
      return this.game.downVerb;
    } else {
      return this.getDownVerb();
    };
  },

  drawDownVerbText: function () {
    this.titleText                  = this.add.bitmapText (0, 64,    'rollingThunder', 'Appleheels', 32);
    this.downVerbMenuOption         = this.add.bitmapText (0, 164,   'rollingThunder', 'Down Verb', 16);
    this.downVerbSelection          = this.add.bitmapText (0, 164,   'rollingThunder', this.initialDown(), 16);
    this.downcycleDownVerbSelection = this.add.bitmapText (0, 164,   'rollingThunder', '<', 16);
    this.upcycleDownVerbSelection   = this.add.bitmapText (492, 164, 'rollingThunder', '>', 16);

    // Position/format titleText
    this.titleText.x = 256 - (this.titleText.textWidth / 2);
    this.titleText.tint = this.terminalText.color;

    // Position/format downVerbMenuOption
    this.downVerbMenuOption.x = this.margin.left;
    this.downVerbMenuOption.tint = this.terminalText.color;

    // Position/format downVerbSelection
    this.downVerbSelection.x = 500 - (this.downVerbSelection.textWidth + this.margin.right);
    this.downVerbSelection.tint = this.terminalText.color;

    // Position/format <
    this.downcycleDownVerbSelection.x = this.downVerbSelection.x - this.margin.left;
    this.downcycleDownVerbSelection.tint = this.terminalText.color;

    // format >
    this.upcycleDownVerbSelection.tint = this.terminalText.color;
  },

  redrawDownVerbText: function () {
    this.downVerbSelection.text = this.getDownVerb();
    this.downVerbSelection.x = 500 - (this.downVerbSelection.textWidth + this.margin.right);
    this.downcycleDownVerbSelection.x = this.downVerbSelection.x - this.margin.left;
  },

  init: function () {
    this.drawDownVerbText();
  },

  create: function () {
    this.stage.backgroundColor = '#2D2D2D';

    this.cursor = this.input.keyboard.createCursorKeys();
    this.backButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    // Press UP to select previous attribute in list
    this.cursor.up.onDown.add(function () {console.log("UP has been pressed");}, this);
    // Press DOWN to select next attribute in list
    this.cursor.down.onDown.add(function () {console.log("DOWN has been pressed");}, this);
    // Press RIGHT to cycle objective (will need to be more generalized) up
    this.cursor.right.onDown.add(function () {this.cycleDownVerb("up"); this.redrawDownVerbText();}, this);
    // Press LEFT to cycle objective (will need to be more generalized) down
    this.cursor.left.onDown.add(function () {this.cycleDownVerb("down"); this.redrawDownVerbText();}, this);
    // Press ESC to put objective (will need to be more generalized) to db, and return to the game
    this.backButton.onDown.add(function () {this.putDownVerb();}, this);

    this.game.add.existing (this.titleText);
  },

  update: function () {
  }
};
