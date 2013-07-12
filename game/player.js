var Player = function(playerType, mark, game) {
	this.playerType = playerType;
	this.mark = mark;
	this.game = game;
	this.UI = undefined;
	this.AI = undefined;

	this.promptForMove = function() {
		if (this.playerType == "computer") {
			var move = this.AI.getBestMove(this.game, 1);
			if (move) {
				this.makeMove(move);
			}
		} else if (this.playerType == "human"){
			this.UI.promptForMove();
		}
	};

	this.setUI = function(ui) {
		if (this.playerType == "human") {
			this.UI = ui;
		}
	};

	this.setAI = function(ai) {
		if (this.playerType == "computer") {
			this.AI = ai;
		}
	};

	this.makeMove = function(move) {
		game.makeMove(move);
	};

	this.getMark = function() {
		return this.mark;
	};
};