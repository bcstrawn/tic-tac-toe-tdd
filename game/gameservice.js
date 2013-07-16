var GameService = function() {
	this.TTT = new TTT();

	this.setUpGame = function() {
		this.setPlayer(1, 'computer');
		this.setPlayer(2, 'computer');
		this.createAndSetBoard();
	};

	this.setPlayer = function(index, playerType) {
		var mark = this.TTT.getMarkOfPlayer(index);
		var player = this.createPlayer(playerType, mark);

		this.TTT.setPlayer(index, player);
		return player;
	};

	this.createPlayer = function(playerType, mark) {
		var player = new Player(playerType, mark, this.TTT);

		if (playerType == "human") {
			player.setMoveProvider(new UI(this.TTT));
		} else if (playerType == "computer") {
			player.setMoveProvider(new AI(this.TTT, player));
		}

		return player;
	};

	this.createAndSetBoard = function() {
		var board = new Board();
		this.TTT.setBoard(board);
	};

	this.getPlayers = function() {
		return this.TTT.getPlayers();
	};

	this.getActivePlayer = function() {
		return this.TTT.activePlayer;
	};

	this.getFirstPlayer = function() {
		return this.TTT.getFirstPlayer();
	};

	this.getBoard = function() {
		return this.TTT.board;
	};

	this.getBoardTiles = function() {
		return this.TTT.board.getTiles();
	};

	this.startGame = function() {
		if (this.TTT.isReady()) {
			this.TTT.startGame();
		}
	};

	this.gameIsReady = function() {
		return this.TTT.isReady();
	};

	this.makeOneMove = function() {
		this.TTT.makeOneMove();
	};

	this.markAt = function(x, y) {
		return this.TTT.markAt(x, y);
	};

	this.isGameOver = function() {
		return this.TTT.isGameOver();
	};

	this.setBoard = function(board) {
		this.TTT.setBoard(board);
	};

	this.evaluateBoard = function() {
		return this.TTT.evaluateBoard();
	};

	this.boardHasWinningPlayer = function() {
		return this.TTT.boardHasWinningPlayer();
	};

	this.getWinningPlayer = function() {
		return this.TTT.getWinningPlayer();
	};

	this.setFirstPlayerToActivePlayer = function() {
		this.TTT.setFirstPlayerToActivePlayer();
	};

	this.makeMoveAt = function(x, y) {
		this.TTT.makeMoveForActivePlayer({x: x, y: y});
	};

	this.makeMoveForActivePlayer = function(moveCoords) {
		if (this.TTT.gameIsStarted()) {
			this.TTT.makeMoveForActivePlayer(moveCoords);
		}
	};

	this.getStatus = function() {
		return this.TTT.getStatus();
	};

	this.quitGame = function() {
		this.TTT.quitGame();
	};
};