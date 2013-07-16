var UI = function(game) {
	this.game = game;

	this.promptForMove = function() {
		// wait for angular
	};
};

var AI = function(game, player) {
	this.game = game;
	this.player = player;

	this.promptForMove = function() {
		var move = this.getBestMove(this.game, 1);
		this.game.makeMoveForActivePlayer(move);
	};

	this.getBestMove = function(game, depth) {
		if (game.isGameOver()) {
			return game.calculateScore();
		}

		var moves = game.getAvailableMoves();
		var bestMove;
		var bestScore = -1;

		for (var i = 0; i < moves.length; i++) {
			var move = moves[i];
			var copiedGame = game.copyGame();
			var mark = copiedGame.getActivePlayer().getMark();
			copiedGame.makeOneMove(move);

			var score = -this.getBestMove(copiedGame, depth + 1);
			if (score > bestScore) {
				bestScore = score;
				bestMove = move;
			}
		}

		return (depth > 1) ? bestScore * 0.9 : bestMove;
	};
};