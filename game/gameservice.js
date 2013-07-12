var GameService = function() {
	this.TTT = new TTT();

	this.setUpGame = function() {
		this.setPlayer(1, 'computer');
		this.setPlayer(2, 'computer');
		this.createAndSetBoard();
	};

	this.createAndAddPlayer = function(playerType) {
		var mark = this.TTT.getNextMark();
		var player = this.createPlayer(playerType, mark);
		this.TTT.addPlayer(player);
		return player;
	};

	this.createPlayer = function(playerType, mark) {
		var player = new Player(playerType, mark, this.TTT);

		if (playerType == "human") {
			player.setUI(new UI(this.TTT));
		} else if (playerType == "computer") {
			player.setAI(new AI(this.TTT, player));
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
		return this.TTT.startGame();
	};

	this.makeOneMove = function() {
		this.TTT.makeOneMove();
	};

	this.numberOfMarksOnBoardBy = function(player) {
		return this.TTT.numberOfMarksOnBoardBy(player);
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

	this.setPlayer = function(index, playerType) {
		var mark;
		if (index == 1) {
			mark = "X";
		} else {
			mark = "O";
		}
		var player = this.createPlayer(playerType, mark);
		this.TTT.setPlayer(index, player);
	};
};