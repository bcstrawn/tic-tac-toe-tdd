var Game = function() {
	this.players = [];
	this.playerThatGoesFirst = undefined;
	this.activePlayer = undefined;
	this.board = undefined;
	this.running = false;
	this.availableMarks = ["X", "O"];
	this.playerMarks = ["X", "O"];
	this.expectingMove = false;

	this.copyGame = function() {
		var game = new Game();
		game.setRules(new TTTRules());
		game.setPlayers(this.players);
		game.activePlayer = this.activePlayer;
		game.setBoard(this.board.copyBoard());

		return game;
	};

	this.setRules = function(rules) {
		this.rules = rules;
		this.rules.setPlayerMarks(this.playerMarks);
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
		this.rules.setBoard(board);
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
		this.running = true;
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
		}
	};

	this.undoMove = function(move) {
		this.board.setMarkAt("", move.x, move.y);
		this.switchActivePlayer();
	};

	this.switchActivePlayer = function() {
		this.activePlayer = this.activePlayer == this.players[0] ? this.players[1] : this.players[0];
	};

	this.promptActivePlayerForMove = function() {
		this.expectingMove = true;
		this.activePlayer.promptForMove();
	};

	this.markAt = function(x, y) {
		return this.board.markAt(x, y);
	};

	this.makeOneMove = function(move) {
		if (this.players.length !== 2 || !this.board) {
			return;
		}
		this.running = true;

		if (!this.activePlayer) {
			this.activePlayer = this.playerThatGoesFirst;
		}
		if (!move) {
			var move = this.activePlayer.moveProvider.getBestMove(this, 1, -10, 10);
		}
		
		this.board.setMarkAt(this.activePlayer.getMark(), move.x, move.y);
		this.switchActivePlayer();
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

	this.setFirstPlayerToActivePlayer = function() {
		this.activePlayer = this.playerThatGoesFirst;
	};

	this.gameIsStarted = function() {
		return (this.activePlayer !== undefined);
	};

	this.quitGame = function() {
		this.expectingMove = false;
		this.running = false;
	};

	this.clearBoard = function() {
		this.board.clear();
	};

	this.isGameOver = function() {
		return (this.boardHasWinningPlayer() || this.boardIsFull() || !this.running);
	};

	this.boardHasWinningPlayer = function() {
		return this.rules.boardHasWinningPlayer();
	};

	this.getWinningPlayer = function() {
		return this.rules.getWinningPlayer();
	};

	this.calculateScore = function() {
		return this.rules.calculateScore(this.activePlayer);
	};
};