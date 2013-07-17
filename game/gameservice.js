var GameService = function() {
	this.game = new Game();
	this.game.setRules(new TTTRules());

	this.setUpGame = function() {
		this.setPlayer(1, 'computer');
		this.setPlayer(2, 'computer');
		this.createAndSetBoard();
	};

	this.setPlayer = function(index, playerType) {
		var mark = this.game.getMarkOfPlayer(index);
		var player = this.createPlayer(playerType, mark);

		this.game.setPlayer(index, player);
		return player;
	};

	this.createPlayer = function(playerType, mark) {
		var player = new Player(playerType, mark, this.game);

		if (playerType == "human") {
			player.setMoveProvider(new UI(this.game));
		} else if (playerType == "computer") {
			player.setMoveProvider(new AI(this.game, player));
		}

		return player;
	};

	this.createAndSetBoard = function() {
		var board = new Board();
		this.game.setBoard(board);
	};

	this.getPlayers = function() {
		return this.game.getPlayers();
	};

	this.getActivePlayer = function() {
		return this.game.activePlayer;
	};

	this.getFirstPlayer = function() {
		return this.game.getFirstPlayer();
	};

	this.getBoard = function() {
		return this.game.board;
	};

	this.getBoardTiles = function() {
		return this.game.board.getTiles();
	};

	this.startGame = function() {
		if (this.game.isReady()) {
			this.game.startGame();
		}
	};

	this.gameIsReady = function() {
		return this.game.isReady();
	};

	this.makeOneMove = function() {
		this.game.makeOneMove();
	};

	this.markAt = function(x, y) {
		return this.game.markAt(x, y);
	};

	this.isGameOver = function() {
		return this.game.isGameOver();
	};

	this.setBoard = function(board) {
		this.game.setBoard(board);
	};

	this.evaluateBoard = function() {
		return this.game.evaluateBoard();
	};

	this.boardHasWinningPlayer = function() {
		return this.game.boardHasWinningPlayer();
	};

	this.getWinningPlayer = function() {
		return this.game.getWinningPlayer();
	};

	this.setFirstPlayerToActivePlayer = function() {
		this.game.setFirstPlayerToActivePlayer();
	};

	this.makeMoveAt = function(x, y) {
		this.game.makeMoveForActivePlayer({x: x, y: y});
	};

	this.makeMoveForActivePlayer = function(moveCoords) {
		if (this.game.gameIsStarted()) {
			this.game.makeMoveForActivePlayer(moveCoords);
		}
	};

	this.getStatus = function() {
		return this.game.getStatus();
	};

	this.quitGame = function() {
		this.game.quitGame();
	};
};


/*var forEach = function(array, action) {
	for (var i = 0; i < array.length; i++) {
		action(array[i]);
	}
};*/