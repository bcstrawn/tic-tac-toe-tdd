var TTT = function() {
	this.players = [];
	this.activePlayer = undefined;
	this.board = undefined;

	this.addPlayer = function(player) {
		this.players.push(player);
	};

	this.getPlayers = function() {
		return this.players;
	};

	this.getActivePlayer = function() {
		return this.activePlayer;
	};

	this.promptActivePlayerForMove = function() {
		this.activePlayer.promptForMove();
	};

	this.setBoard = function(board) {
		this.board = board;
	};

	this.makeMove = function(move) {
		this.board.setMarkAt(this.activePlayer.getMark(), move.x, move.y);
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

	this.startGame = function() {
		var players = this.getPlayers();

		if (players.length == 2) {
			this.promptActivePlayerForMove();
			return true;
		} else {
			return false;
		}
	};
};

var UI = function(game) {
	this.game = game;

	this.promptForMove = function() {
		game.makeMove({x: 0, y: 0});
	};
};

var AI = function() {
	this.getBestMove = function() {
		return {x: 0, y: 0};
	};
};

var Player = function(playerType, mark, game) {
	this.playerType = playerType;
	this.mark = mark;
	this.game = game;
	this.UI = undefined;
	this.AI = undefined;

	this.promptForMove = function() {
		if (this.playerType == "computer") {
			var move = this.AI.getBestMove();
			this.makeMove(move);
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

var Board = function() {
	this.tiles = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	];

	this.markAt = function(x, y) {
		return this.tiles[y][x];
	};

	this.setMarkAt = function(mark, x, y) {
		this.tiles[y][x] = mark;
	};
};

var GameService = function() {
	this.TTT = new TTT();
	this.availableMarks = ["X", "O"];

	this.createPlayer = function(playerType, mark) {
		var player = new Player(playerType, mark, this.TTT);

		if (playerType == "human") {
			player.setUI(new UI(this.TTT));
		} else if (playerType == "computer") {
			player.setAI(new AI());
		}

		return player;
	};

	this.createAndAddPlayer = function(playerType) {
		var mark = this.getNextMark();
		var player = this.createPlayer(playerType, mark);
		this.TTT.addPlayer(player);
		this.TTT.activePlayer = player;
		return player;
	};

	this.getPlayers = function() {
		return this.TTT.getPlayers();
	};

	this.getActivePlayer = function() {
		return this.TTT.activePlayer;
	};

	this.createAndSetBoard = function() {
		var board = new Board();
		this.TTT.setBoard(board);
	};

	this.startGame = function() {
		return this.TTT.startGame();
	};

	this.getNextMark = function() {
		return this.availableMarks.splice(0, 1);
	};

	this.numberOfMarksOnBoardBy = function(player) {
		return this.TTT.numberOfMarksOnBoardBy(player);
	};

	this.markAt = function(x, y) {
		return this.TTT.markAt(x, y);
	};
};