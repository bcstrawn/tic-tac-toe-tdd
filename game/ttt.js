var TTT = function() {
	this.players = [];
	this.playerThatGoesFirst = undefined;
	this.activePlayer = undefined;
	this.board = undefined;
	this.winningPlayer = undefined;
	this.availableMarks = ["X", "O"];
	this.playerMarks = ["X", "O"];
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

	this.copyGame = function() {
		var game = new TTT();
		game.setPlayers(this.players);
		game.activePlayer = this.activePlayer;
		game.setBoard(this.board.copyBoard());

		return game;
	};

	this.addPlayer = function(player) {
		this.players.push(player);
		this.playerThatGoesFirst = player;
	};

	this.setPlayers = function(players) {
		this.players = players;
		this.playerThatGoesFirst = players[1];
	};

	this.getPlayers = function() {
		return this.players;
	};

	this.getFirstPlayer = function() {
		return this.playerThatGoesFirst;
	};

	this.getActivePlayer = function() {
		return this.activePlayer;
	};

	this.setBoard = function(board) {
		this.board = board;
	};

	this.getBoard = function() {
		return this.board;
	};

	this.startGame = function() {
		if (this.players.length == 2 && this.board) {
			this.activePlayer = this.playerThatGoesFirst;
			this.promptActivePlayerForMove();
			return true;
		} else {
			return false;
		}
	};

	this.makeMove = function(move) {
		this.board.setMarkAt(this.activePlayer.getMark(), move.x, move.y);
		//this.winningPlayer = this.findWinningPlayer();

		if (!this.isGameOver()) {
			//this.switchActivePlayer();
			this.activePlayer = this.activePlayer == this.players[0] ? this.players[1] : this.players[0];
			this.promptActivePlayerForMove();
		}
	};

	this.promptActivePlayerForMove = function() {
		this.activePlayer.promptForMove();
	};

	this.getNextMark = function() {
		return this.availableMarks.splice(0, 1)[0];
	};

	this.markAt = function(x, y) {
		return this.board.markAt(x, y);
	};

	this.numberOfMarksOnBoardBy = function(player) {
		var numberOfMarks = 0;
		var playerMark = player.getMark();

		for (var y = 0; y < 3; y++) {
			for (var x = 0; x < 3; x++) {
				if (this.board.markAt(x, y) == playerMark) {
					numberOfMarks++;
				}
			}
		}

		return numberOfMarks;
	};

	this.makeOneMove = function(move) {
		if (this.players.length == 2 && this.board) {
			if (!this.activePlayer) {
				this.activePlayer = this.playerThatGoesFirst;
			}
			if (!move) {
				var move = this.activePlayer.AI.getBestMove(this, 1);
			}
			
			this.board.setMarkAt(this.activePlayer.getMark(), move.x, move.y);
			this.switchActivePlayer();
		}
	};

	this.switchActivePlayer = function() {
		this.activePlayer = this.activePlayer == this.players[0] ? this.players[1] : this.players[0];
	}

	this.getFirstAvailableMove = function() {
		for (var y = 0; y < 3; y++) {
			for (var x = 0; x < 3; x++) {
				if (this.board.markAt(x, y) == '') {
					return {x: x, y: y};
				}
			}
		}
	};

	this.getAvailableMoves = function() {
		return this.board.getAvailableMoves();
	};

	this.isGameOver = function() {
		if (this.boardHasWinningPlayer() || this.boardIsFull())
			return true;
		else
			return false;
	};

	this.boardIsFull = function() {
		for (var y = 0; y < 3; y++) {
			for (var x = 0; x < 3; x++) {
				if (this.board.markAt(x, y) == '') {
					return false;
				}
			}
		}

		return true;
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

	this.setFirstPlayerToActivePlayer = function() {
		this.activePlayer = this.playerThatGoesFirst;
	};

	this.calculateScore = function() {
		var hasWinningPlayer = this.boardHasWinningPlayer();
		if (hasWinningPlayer) {
			var winner = this.getWinningPlayer();

			if (winner == this.activePlayer.getMark()) {
				return 1;
			} else {
				return -1;
			}
		} else {
			return 0;
		}
	};

	this.setPlayer = function(index, player) {
		this.players[index-1] = player;
		this.playerThatGoesFirst = player;
	};
};