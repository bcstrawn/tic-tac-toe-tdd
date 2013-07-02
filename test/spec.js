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

	it("can be instantiated", function() {
		expect(gameService).toBeDefined();
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
		gameService.createAndSetBoard();
		expect(gameService.startGame()).toBe(true);
	});

	it("expects both players to have a unique mark", function() {
		var player1 = gameService.createAndAddPlayer();
		var player2 = gameService.createAndAddPlayer();

		expect(player1.getMark()).toBeDefined();
		expect(player2.getMark()).toBeDefined();
		expect(player1.getMark()).not.toEqual(player2.getMark());
	});

	it("prompts the first player for a move when the game starts", function() {
		gameService.setUpGame();
		var firstPlayer = gameService.getFirstPlayer();
		spyOn(firstPlayer, "promptForMove");
		gameService.startGame();
		expect(firstPlayer.promptForMove).toHaveBeenCalled();
	});

	it("expects a computer player to pick and make a move on the board when prompted", function() {
		gameService.setUpGame();
		var playerComputer = gameService.getActivePlayer();

		expect(gameService.numberOfMarksOnBoardBy(playerComputer)).toEqual(0);
		gameService.startGame();
		expect(gameService.numberOfMarksOnBoardBy(playerComputer)).toBeGreaterThan(0);
	});

	it("expects a human player to contact UI and make a move on the board when prompted", function() {
		var playerComputer = gameService.createAndAddPlayer('computer');
		var playerHuman = gameService.createAndAddPlayer('human');
		gameService.createAndSetBoard();

		expect(gameService.numberOfMarksOnBoardBy(playerHuman)).toEqual(0);
		gameService.startGame();
		expect(gameService.numberOfMarksOnBoardBy(playerHuman)).toBeGreaterThan(0);
	});

	it("expects a player to pick the first available move when it's 0,0", function() {
		gameService.setUpGame();
		var mark = gameService.getActivePlayer().getMark();
		gameService.startGame();
		expect(gameService.markAt(0, 0)).toEqual(mark);
	});

	it("changes the activeplayer and prompts them for a move when a move is made, to game completion", function() {
		gameService.setUpGame();
		gameService.startGame();
		expect(gameService.isGameOver()).toBe(true);
	});

	it("changes the status of the game to 'draw' when neither player has won", function() {
		gameService.setUpGame();
		gameService.startGame();
		expect(gameService.getStatus()).toBe("draw");
	});
});