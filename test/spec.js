/*
TTT is contained within a GameService.
The GameService can instantiate players.
The GameService has a TTT to handle game logic.
TTT needs to allow players to be added to it.
It needs to be able to return the players.
It doesn't need to keep track of which player is human vs ai.
It needs to have an active player.
It needs to tell the right player when it expects a move.
Its players should have the info required to make a move.Its human players should tell the UI when they expect a move.
Its human players should accept a move from the UI (when it's expecting one) and send it to the Game.
Its ai players should be able to accept any ai.
It needs to have a default ai for non-human players to use to make moves.
Its ai players should use their ai to generate a move and send it to the Game.

*/

describe('GameService', function() {
	var gameService;

	beforeEach(function() {
		gameService = new GameService();
	});

	it("can create players", function() {
		expect(gameService.createPlayer()).toBeDefined();
	});

	it("has no players in TTT before any have been added", function() {
		var players = gameService.getPlayers();
		expect(players).toEqual([]);
	});

	it("doesn't have a first player until a player is added", function() {
		expect(gameService.getFirstPlayer()).not.toBeDefined();
	});

	it("can create 1 player and add it to the TTT", function() {
		var player = gameService.createAndAddPlayer();
		var players = gameService.getPlayers();
		expect(players.indexOf(player)).not.toBe(-1);
	});

	it("has a first player after a player is added", function() {
		gameService.createAndAddPlayer();
		expect(gameService.getFirstPlayer()).toBeDefined();
	});

	it("can create 2 players and add them to the TTT", function() {
		gameService.setUpGame();
		expect(gameService.getPlayers().length).toEqual(2);
	});

	it("doesn't have an active player before the game starts", function() {
		gameService.setUpGame();
		expect(gameService.getActivePlayer()).not.toBeDefined();
	});

	it("only starts a game when there are 2 players and a board", function() {
		gameService.createAndAddPlayer();
		expect(gameService.startGame()).toBe(false);
		gameService.createAndAddPlayer();
		expect(gameService.startGame()).toBe(false);
		/*gameService.createAndSetBoard();
		expect(gameService.startGame()).toBe(true);*/
	});

	it("expects both players to have a unique mark", function() {
		var player1 = gameService.createAndAddPlayer();
		var player2 = gameService.createAndAddPlayer();

		expect(player1.getMark()).toBeDefined();
		expect(player2.getMark()).toBeDefined();
		expect(player1.getMark()).not.toEqual(player2.getMark());
	});

	it("identifies a full drawn board as over and with no winner", function() {
		var tiles = [
			['X', 'O', 'X'],
			['X', 'O', 'O'],
			['O', 'X', 'X']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);
		expect(gameService.isGameOver()).toBe(true);
		expect(gameService.boardHasWinningPlayer()).toBe(false);
	});

	it("identifies a top horizontal win as over and with the correct winner", function() {
		var tiles = [
			['X', 'X', 'X'],
			['', 'O', 'O'],
			['O', '', '']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);
		expect(gameService.isGameOver()).toBe(true);
		expect(gameService.boardHasWinningPlayer()).toBe(true);
		expect(gameService.getWinningPlayer()).toBe("X");
	});

	it("identifies a mid horizontal win as over and with the correct winner", function() {
		var tiles = [
			['', 'O', 'O'],
			['X', 'X', 'X'],
			['O', '', '']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);
		expect(gameService.isGameOver()).toBe(true);
		expect(gameService.boardHasWinningPlayer()).toBe(true);
		expect(gameService.getWinningPlayer()).toBe("X");
	});

	it("identifies a bot horizontal win as over and with the correct winner", function() {
		var tiles = [
			['', 'O', 'O'],
			['O', '', ''],
			['X', 'X', 'X']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);
		expect(gameService.isGameOver()).toBe(true);
		expect(gameService.boardHasWinningPlayer()).toBe(true);
		expect(gameService.getWinningPlayer()).toBe("X");
	});

	it("identifies a left vertical win as over and with the correct winner", function() {
		var tiles = [
			['O', 'X', 'X'],
			['O', 'O', ''],
			['O', '', 'X']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);
		expect(gameService.isGameOver()).toBe(true);
		expect(gameService.boardHasWinningPlayer()).toBe(true);
		expect(gameService.getWinningPlayer()).toBe("O");
	});

	it("identifies a mid vertical win as over and with the correct winner", function() {
		var tiles = [
			['', 'O', 'X'],
			['X', 'O', ''],
			['', 'O', 'X']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);
		expect(gameService.isGameOver()).toBe(true);
		expect(gameService.boardHasWinningPlayer()).toBe(true);
		expect(gameService.getWinningPlayer()).toBe("O");
	});

	it("identifies a right vertical win as over and with the correct winner", function() {
		var tiles = [
			['O', '', 'X'],
			['', 'O', 'X'],
			['O', '', 'X']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);
		expect(gameService.isGameOver()).toBe(true);
		expect(gameService.boardHasWinningPlayer()).toBe(true);
		expect(gameService.getWinningPlayer()).toBe("X");
	});

	it("identifies first diagonal win as over and with the correct winner", function() {
		var tiles = [
			['O', 'X', 'X'],
			['X', 'O', ''],
			['', '', 'O']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);
		expect(gameService.isGameOver()).toBe(true);
		expect(gameService.boardHasWinningPlayer()).toBe(true);
		expect(gameService.getWinningPlayer()).toBe("O");
	});

	it("identifies second diagonal win as over and with the correct winner", function() {
		var tiles = [
			['O', '', 'X'],
			['O', 'X', ''],
			['X', '', 'O']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);
		expect(gameService.isGameOver()).toBe(true);
		expect(gameService.boardHasWinningPlayer()).toBe(true);
		expect(gameService.getWinningPlayer()).toBe("X");
	});

	/*it("plays the game to completion once it starts", function() {
		gameService.setUpGame();
		gameService.startGame();
		expect(gameService.isGameOver()).toBe(true);
	});*/

	/*it("expects an AI to pick 0,0 when it's available", function() {
		gameService.setUpGame();
		var mark = gameService.getFirstPlayer().getMark();
		gameService.makeOneMove();
		expect(gameService.markAt(0, 0)).toEqual(mark);
	});*/

	it('expects an AI to pick the middle if it is the last spot', function() {
		gameService.setUpGame();
		var tiles = [
			['O', 'X', 'X'],
			['O', '', 'X'],
			['X', 'O', 'O']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);
		//gameService.setFirstPlayerToActivePlayer();

		var mark = gameService.getFirstPlayer().getMark();
		gameService.makeOneMove();
		expect(gameService.markAt(1, 1)).toEqual(mark);
	});

	it('expects an AI to pick the winning move with 2 available', function() {
		gameService.setUpGame();
		var tiles = [
			['X', 'O', 'O'],
			['', '', 'X'],
			['O', 'O', 'X']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);

		var mark = gameService.getFirstPlayer().getMark();
		gameService.makeOneMove();
		expect(gameService.markAt(0, 1)).toEqual("");
		expect(gameService.markAt(1, 1)).toEqual(mark);
	});

	it('expects an AI to pick the winning move with 3 available', function() {
		gameService.setUpGame();
		var tiles = [
			['X', 'O', ''],
			['', '', 'X'],
			['O', 'O', 'X']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);

		var mark = gameService.getFirstPlayer().getMark();
		gameService.makeOneMove();
		expect(gameService.markAt(0, 1)).toEqual("");
		expect(gameService.markAt(2, 0)).toEqual("");
		expect(gameService.markAt(1, 1)).toEqual(mark);
	});

	it('expects an AI to pick the move that delays losing with 2 available (1st)', function() {
		gameService.setUpGame();
		var tiles = [
			['O', 'X', ''],
			['', 'O', 'X'],
			['X', 'O', 'X']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);

		var mark = gameService.getFirstPlayer().getMark();
		gameService.makeOneMove();
		expect(gameService.markAt(2, 0)).toEqual(mark);
		expect(gameService.markAt(0, 1)).toEqual("");
	});

	it('expects an AI to pick the move that delays losing with 2 available (2nd)', function() {
		gameService.setUpGame();
		var tiles = [
			['X', 'O', 'X'],
			['', 'O', ''],
			['O', 'X', 'X']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);

		var mark = gameService.getFirstPlayer().getMark();
		gameService.makeOneMove();
		expect(gameService.markAt(0, 1)).toEqual("");
		expect(gameService.markAt(2, 1)).toEqual(mark);
	});

	/*it('expects an AI to draw against another AI', function() {
		gameService.setUpGame();
		var tiles = [
			['', '', ''],
			['', '', ''],
			['', '', '']
		];
		var board = new Board(tiles);
		gameService.setBoard(board);

		var mark = gameService.getFirstPlayer().getMark();
		gameService.startGame();
		expect(gameService.isGameOver()).toBe(true);
		expect(gameService.getWinningPlayer()).toEqual("O");
		console.log(gameService.getBoard());
	});*/
});