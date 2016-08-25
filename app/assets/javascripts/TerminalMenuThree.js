
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

  getObjective: function (_currentVal) {
    if (_currentVal == true) {
      return Appleheels.objectives[1];
    } else {
      return Appleheels.objectives[0];
    }
  },

  initialObjective: function () {
    if (this.game.objectives != "") {
      return this.game.objectives
    } else {
      return this.getObjective(0)
    };
  },

  init: function () {
    this.titleText = this.add.bitmapText(0, 64, 'rollingThunder', 'Appleheels', 32);
    this.titleText.x = 256 - (this.titleText.textWidth / 2);
    this.titleText.tint = this.terminalText.color;

    // INIT Objective attribute
    this.objectiveAssignmentText = this.add.bitmapText (0, 164, 'rollingThunder', 'Objective', 16);
    this.objectiveAssignmentText.x = this.margin.left;
    this.objectiveAssignmentText.tint = this.terminalText.color;
    this.objectiveAssignmentDisplay = this.add.bitmapText (0, 164, 'rollingThunder', this.initialObjective(), 16);
    this.objectiveAssignmentDisplay.x = 500 - (this.objectiveAssignmentDisplay.textWidth + this.margin.right);
    this.objectiveAssignmentDisplay.tint = this.terminalText.color;

    this.decObjectiveAssignment = this.add.bitmapText (0, 164, 'rollingThunder', '-', 16);
    this.decObjectiveAssignment.x = this.objectiveAssignmentDisplay.x - this.margin.left;
    this.decObjectiveAssignment.tint = this.terminalText.color;
    this.incObjectiveAssignment = this.add.bitmapText (492, 164, 'rollingThunder', '+', 16);
    this.incObjectiveAssignment.tint = this.terminalText.color;

  },

  create: function () {
    this.stage.backgroundColor = '#2D2D2D';

    this.cursor = this.input.keyboard.createCursorKeys();
    this.backButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    this.game.add.existing(this.titleText);
  },

  update: function () {
    // Press RIGHT or LEFT to toggle death objective
    if (this.cursor.right.isDown || this.cursor.left.isDown) {
      this.game.isDie = !this.game.isDie;
      this.objectiveAssignmentDisplay.text = this.getObjective(this.game.isDie);
      this.objectiveAssignmentDisplay.x = 500 - (this.objectiveAssignmentDisplay.textWidth + this.margin.right);
      this.decObjectiveAssignment.x = this.objectiveAssignmentDisplay.x - this.margin.left;
    };
    // Press ESC to exit
    if (this.backButton.isDown) {
      console.log("EXIT");
      this.game.objective = this.getObjective(this.game.isDie);

      $.ajax({
        url: "/game/" + this.game.gameId,
        type: "PUT",
        data: {game_instance: { objectives: this.game.objective } },
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