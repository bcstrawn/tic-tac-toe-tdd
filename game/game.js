var TTT = function() {
	this.players = [];
	this.playerThatGoesFirst = undefined;
	this.activePlayer = undefined;
	this.board = undefined;
	this.availableMarks = ["X", "O"];

	this.addPlayer = function(player) {
		this.players.push(player);
		this.playerThatGoesFirst = player;
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

	this.promptActivePlayerForMove = function() {
		this.activePlayer.promptForMove();
	};

	this.setBoard = function(board) {
		this.board = board;
	};

	this.makeMove = function(move) {
		this.board.setMarkAt(this.activePlayer.getMark(), move.x, move.y);

		if (!this.isGameOver()) {
			this.activePlayer = this.activePlayer == this.players[0] ? this.players[1] : this.players[0];
			this.promptActivePlayerForMove();
		}
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

	this.startGame = function() {
		if (this.players.length == 2 && this.board) {
			this.activePlayer = this.playerThatGoesFirst;
			this.promptActivePlayerForMove();
			return true;
		} else {
			return false;
		}
	};

	this.getFirstAvailableMove = function() {
		for (var y = 0; y < 3; y++) {
			for (var x = 0; x < 3; x++) {
				if (this.board.markAt(x, y) == '') {
					return {x: x, y: y};
				}
			}
		}
	};

	this.isGameOver = function() {
		for (var y = 0; y < 3; y++) {
			for (var x = 0; x < 3; x++) {
				if (this.board.markAt(x, y) == '') {
					return false;
				}
			}
		}

		return true;
	};
};

var UI = function(game) {
	this.game = game;

	this.promptForMove = function() {
		var move = game.getFirstAvailableMove();
		//console.log('human playing at', move.x, ",", move.y);
		if (move) {
			game.makeMove(move);
		}
	};
};

var AI = function(game) {
	this.game = game;

	this.getBestMove = function() {
		var move = game.getFirstAvailableMove();
		//console.log('computer playing at', move.x, ",", move.y);
		return move;
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
			if (move) {
				this.makeMove(move);
			}
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

	this.createPlayer = function(playerType, mark) {
		var player = new Player(playerType, mark, this.TTT);

		if (playerType == "human") {
			player.setUI(new UI(this.TTT));
		} else if (playerType == "computer") {
			player.setAI(new AI(this.TTT));
		}

		return player;
	};

	this.createAndAddPlayer = function(playerType) {
		var mark = this.TTT.getNextMark();
		var player = this.createPlayer(playerType, mark);
		this.TTT.addPlayer(player);
		return player;
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

	this.createAndSetBoard = function() {
		var board = new Board();
		this.TTT.setBoard(board);
	};

	this.startGame = function() {
		return this.TTT.startGame();
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

	this.setUpGame = function() {
		this.createAndAddPlayer('human');
		this.createAndAddPlayer('computer');
		this.createAndSetBoard();
	};
};