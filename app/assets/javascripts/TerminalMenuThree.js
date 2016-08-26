
Appleheels.TerminalMenuThree = function(game) {

  this.cursor;
  this.backButton;

};

Appleheels.TerminalMenuThree.prototype = {

  margin: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  },

  terminalText: {
    color: 0xE81717
  },

  cycleObjective: function (_direction) {
    var previousObjective;
    if (_direction == "up") {
      previousObjective = Appleheels.objectives.shift();
      Appleheels.objectives.push(previousObjective);
    } else if (_direction == "down") {
      previousObjective = Appleheels.objectives.pop();
      Appleheels.objectives.unshift(previousObjective);
    }
  },

  getObjective: function () {
    return Appleheels.objectives[0];
  },

  putObjective: function () {
    console.log(this.getObjective());
    this.game.objective = this.getObjective();

    $.ajax({
      url: "/game/" + this.game.gameId,
      type: "PUT",
      data: {game_instance: { objectives: this.game.objective } },
    });

    this.state.start('Game');
  },

  initialObjective: function () {
    if (this.game.objectives != "") {
      return this.game.objectives
    } else {
      return this.getObjective()
    };
  },

  drawObjectiveText: function () {
    this.titleText                   = this.add.bitmapText (0,   64,  'rollingThunder', 'Appleheels', 32);
    this.objectiveMenuOption         = this.add.bitmapText (0,   164, 'rollingThunder', 'Objective', 16);
    this.objectiveSelection          = this.add.bitmapText (0,   164, 'rollingThunder', this.initialObjective(), 16);
    this.downcycleObjectiveSelection = this.add.bitmapText (0,   164, 'rollingThunder', '<', 16);
    this.upcycleObjectiveSelection   = this.add.bitmapText (492, 164, 'rollingThunder', '>', 16);

    // Position/format titleText
    this.titleText.x = 256 - (this.titleText.textWidth / 2);
    this.titleText.tint = this.terminalText.color;

    // Postion/format objectiveMenuOption
    this.objectiveMenuOption.x = this.margin.left;
    this.objectiveMenuOption.tint = this.terminalText.color;

    // Position/format objectiveSelection
    this.objectiveSelection.x = 500 - (this.objectiveSelection.textWidth + this.margin.right);
    this.objectiveSelection.tint = this.terminalText.color;

    // Position/format <
    this.downcycleObjectiveSelection.x = this.objectiveSelection.x - this.margin.left;
    this.downcycleObjectiveSelection.tint = this.terminalText.color;

    // format >
    this.upcycleObjectiveSelection.tint = this.terminalText.color;
  },

  redrawObjectiveText: function () {
    this.objectiveSelection.text = this.getObjective();
    this.objectiveSelection.x = 500 - (this.objectiveSelection.textWidth + this.margin.right);
    this.downcycleObjectiveSelection.x = this.objectiveSelection.x - this.margin.left;
  },

  init: function () {
    this.drawObjectiveText();
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
    this.cursor.right.onDown.add(function () {this.cycleObjective("up"); this.redrawObjectiveText();}, this);
    // Press LEFT to cycle objective (will need to be more generalized) down
    this.cursor.left.onDown.add(function () {this.cycleObjective("down"); this.redrawObjectiveText();}, this);
    // Press ESC to put objective (will need to be more generalized) to db, and return to the game
    this.backButton.onDown.add(function () {this.putObjective();}, this);

    this.game.add.existing(this.titleText);
  },

  update: function () {
  }
};