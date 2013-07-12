var Player = function(playerType, mark, game) {
	this.playerType = playerType;
	this.mark = mark;
	this.game = game;
	this.moveProvider = undefined;

	this.getMark = function() {
		return this.mark;
	};

	this.setPlayerType = function(playerType) {
		if (this.playerType !== playerType) {
			this.moveProvider = undefined;
			this.playerType = playerType;
		}
	};

	this.setMoveProvider = function(moveProvider) {
		this.moveProvider = moveProvider;
	};

	this.promptForMove = function() {
		this.moveProvider.promptForMove();
	};
};