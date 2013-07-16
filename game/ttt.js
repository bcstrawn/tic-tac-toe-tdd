var TTT = function() {
	this.players = [];
	this.playerThatGoesFirst = undefined;
	this.activePlayer = undefined;
	this.board = undefined;
	this.winningPlayer = undefined;
	this.availableMarks = ["X", "O"];
	this.playerMarks = ["X", "O"];
	this.currentStatus = "Start a Game!";
	this.expectingMove = false;
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

	/* statuses
		The game has ended in a draw.
		It's player X's turn.
		It's player O's turn.
		Player 'O' has won!
		Player 'X' has won!
	*/

	/* actions
		Start Game
		Quit Game
		Restart Game
	*/

	this.copyGame = function() {
		var game = new TTT();
		game.setPlayers(this.players);
		game.activePlayer = this.activePlayer;
		game.setBoard(this.board.copyBoard());

		return game;
	};

	this.setPlayers = function(players) {
		this.players = players;
		this.playerThatGoesFirst = players[1];
	};

	this.setPlayer = function(index, player) {
		this.players[index - 1] = player;
		this.playerThatGoesFirst = this.players[0];
	};

	this.getPlayers = function() {
		return this.players;
	};

	this.getMarkOfPlayer = function(index) {
		return this.playerMarks[index - 1];
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

	this.isReady = function() {
		return (this.players.length === 2 && this.board !== undefined);
	};

	this.startGame = function() {
		this.clearBoard();
		this.activePlayer = this.playerThatGoesFirst;
		this.promptActivePlayerForMove();
	};

	this.makeMoveForActivePlayer = function(moveCoords) {
		if (!this.expectingMove) {
			return;
		}

		this.board.setMarkAt(this.activePlayer.getMark(), moveCoords.x, moveCoords.y);
		this.expectingMove = false;

		if (!this.isGameOver()) {
			this.switchActivePlayer();
			this.promptActivePlayerForMove();
		} else {
			var winnerMark = this.getWinningPlayer();
			if (winnerMark) {
				this.currentStatus = "Player '" + winnerMark + "' has won!";
			} else {
				this.currentStatus = "The game has ended in a draw.";
			}
		}
	};

	this.isGameOver = function() {
		if (this.boardHasWinningPlayer() || this.boardIsFull())
			return true;
		else
			return false;
	};

	this.switchActivePlayer = function() {
		this.activePlayer = this.activePlayer == this.players[0] ? this.players[1] : this.players[0];
	};

	this.promptActivePlayerForMove = function() {
		this.expectingMove = true;
		var mark = this.activePlayer.getMark();
		this.currentStatus = "It's player " + mark + "'s turn";
		this.activePlayer.promptForMove();
	};

	this.markAt = function(x, y) {
		return this.board.markAt(x, y);
	};

	this.makeOneMove = function(move) {
		if (this.players.length == 2 && this.board) {
			if (!this.activePlayer) {
				this.activePlayer = this.playerThatGoesFirst;
			}
			if (!move) {
				var move = this.activePlayer.moveProvider.getBestMove(this, 1);
			}
			
			this.board.setMarkAt(this.activePlayer.getMark(), move.x, move.y);
			this.switchActivePlayer();
		}
	};

	this.getAvailableMoves = function() {
		return this.board.getAvailableMoves();
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

	this.gameIsStarted = function() {
		return (this.activePlayer !== undefined);
	};

	this.getStatus = function() {
		return this.currentStatus;
	};

	this.quitGame = function() {
		this.expectingMove = false;
	};

	this.clearBoard = function() {
		this.board.clear();
	};
};