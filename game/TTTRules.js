var TTTRules = function() {
	this.board = undefined;

	this.winningPatterns = [
		[{x: 0, y: 2}, {x: 0, y: 1}, {x: 0, y: 0}], // Left.
		[{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}], // Top.
		[{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}], // Right.
		[{x: 2, y: 2}, {x: 1, y: 2}, {x: 0, y: 2}], // Bottom.
		[{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}], // Horizontal middle.
		[{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}], // Vertical middle.
		[{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}], // Top-left to bottom-right.
		[{x: 0, y: 2}, {x: 1, y: 1}, {x: 2, y: 0}]  // Bottom-left to top-right.
	];

	this.setBoard = function(board) {
		this.board = board;
	};

	this.setPlayerMarks = function(playerMarks) {
		this.playerMarks = playerMarks;
	};

	this.boardHasWinningPlayer = function() {
		for (var i = 0; i < this.winningPatterns.length; i++) {
			var pattern = this.winningPatterns[i];
			var winner = this.board.matchPattern(pattern, this.playerMarks);
			if (winner)
				return true;
		}

		return false;
	};

	this.getWinningPlayer = function() {
		for (var i = 0; i < this.winningPatterns.length; i++) {
			var pattern = this.winningPatterns[i];
			var winner = this.board.matchPattern(pattern, this.playerMarks);
			if (winner)
				return winner;
		}

		return undefined;
	};

	this.calculateScore = function(activePlayer) {
		var hasWinningPlayer = this.boardHasWinningPlayer();
		if (hasWinningPlayer) {
			var winner = this.getWinningPlayer();

			if (winner === activePlayer.getMark()) {
				return 10;
			} else {
				return -10;
			}
		} else {
			return 0;
		}
	};
}