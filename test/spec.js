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

	it('can be instantiated', function() {
		expect(gameService).toBeDefined();
	});

	it('can instantiate players', function() {
		expect(gameService.createPlayer()).toBeDefined();
	});

	it('can instantiate players and add them to the TTT', function() {
		expect(gameService.createAndAddPlayer()).toBeDefined();
	});

	it('can get the players from the TTT when there are no players', function() {
		expect(gameService.getPlayers()).toEqual([]);
	});

	it('can get the players from the TTT when there is 1 player', function() {
		var player = gameService.createAndAddPlayer();
		expect(gameService.getPlayers()).toEqual([player]);
	});

	it('can get the players from the TTT when there are 2 players', function() {
		var player1 = gameService.createAndAddPlayer();
		var player2 = gameService.createAndAddPlayer();
		expect(gameService.getPlayers()).toEqual([player1, player2]);
	});

	it('can get the players from the TTT when there are 2 players', function() {
		var player1 = gameService.createAndAddPlayer();
		var player2 = gameService.createAndAddPlayer();
		expect(gameService.getPlayers()).toEqual([player1, player2]);
	});

	it('doesn\'t have an active player before any players are added', function() {
		expect(gameService.getActivePlayer()).not.toBeDefined();
	});

	it('has an active player who is one of the players', function() {
		gameService.createAndAddPlayer();
		var activePlayer = gameService.getActivePlayer();
		var players = gameService.getPlayers();
		expect(players.indexOf(activePlayer)).not.toEqual(-1);
	});

	it('won\'t start the game with only one player', function() {
		gameService.createAndAddPlayer();
		var started = gameService.startGame();
		expect(started).toBe(false);
	});

	it('prompts the active player to make a move when the game starts', function() {
		gameService.createAndAddPlayer();
		gameService.createAndAddPlayer();
		var activePlayer = gameService.getActivePlayer();
		spyOn(activePlayer, 'promptForMove');
		gameService.startGame();
		expect(activePlayer.promptForMove).toHaveBeenCalled();
	});

	it('expects both players to have a unique mark', function() {
		var player1 = gameService.createAndAddPlayer();
		var player2 = gameService.createAndAddPlayer();
		expect(player1.getMark()).not.toEqual(player2.getMark());
	});

	it('expects the a player to be able to make a move', function() {
		var player = gameService.createAndAddPlayer();
		gameService.createAndSetBoard();
		var playerMark = player.getMark();
		player.makeMove({x: 0, y: 0});
		expect(gameService.markAt(0, 0)).toEqual(playerMark);
	});

	it('expects a computer player to pick and make a move on the board when prompted', function() {
		var playerHuman = gameService.createAndAddPlayer('human');
		var playerComputer = gameService.createAndAddPlayer('computer');
		var mark = gameService.getActivePlayer().getMark();
		gameService.createAndSetBoard();

		expect(gameService.numberOfMarksOnBoardBy(playerComputer)).toEqual(0);
		gameService.startGame();
		expect(gameService.numberOfMarksOnBoardBy(playerComputer)).toEqual(1);
	});

	it('expects a human player to contact UI and make a move on the board when prompted', function() {
		var playerComputer = gameService.createAndAddPlayer('computer');
		var playerHuman = gameService.createAndAddPlayer('human');
		var mark = gameService.getActivePlayer().getMark();
		gameService.createAndSetBoard();

		expect(gameService.numberOfMarksOnBoardBy(playerHuman)).toEqual(0);
		gameService.startGame();
		expect(gameService.numberOfMarksOnBoardBy(playerHuman)).toEqual(1);
	});
});