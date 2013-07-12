	/*	doesn't actually test the first player since the game finishes once it starts
	it("prompts the first player for a move when the game starts", function() {
		gameService.setUpGame();
		var firstPlayer = gameService.getFirstPlayer();
		spyOn(firstPlayer, "promptForMove");
		gameService.startGame();
		expect(firstPlayer.promptForMove).toHaveBeenCalled();
	});*/

	/*it("expects a computer player to pick and make a move on the board when prompted", function() {
		gameService.setUpGame();
		var playerComputer = gameService.getFirstPlayer();

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
	});*/




	/*this.getBoardStatus = function(board) {

	};

	this.boardHasWinningPlayer = function() {
		for (var y = 0; y < this.board.length; y++) {
			for (var x = 0; x < this.board[y].length; x++) {
				if (this.board[y][x] === '') // Cell empty?
					return null; // No draw yet, a move can still be made.
			}
		}
 
		return {'draw': true};
	};

	this.findWinningPlayer = function() {
		for (var i = 0; i < this.winningPatterns.length; i++) {
			// var mark = board[][];
			var mark = board.markAt(this.winningPatterns[i][0][0], this.winningPatterns[i][0][1]);
			var flag = true;
 
			if (this.playerMarks.indexOf(mark) === -1)
				continue;
 
			for (var j = 1; j < this.winningPatterns[i].length; j++) {
				var point = this.winningPatterns[i][j];
				// if (mark !== board[][])
				if (mark !== board.markAt(point[0], point[1]))
					flag = false;
			}
 
			if (flag)
				return this.getPlayerFromMark(mark);
		}

		return undefined;
	};

	this.getPlayerFromMark = function(mark) {
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].getmark() == mark) {
				return this.players[i];
			}
		}

		return undefined;
	};


	this.winningPatterns = [
		[[0, 2], [0, 1], [0, 0]], // Left.
		[[0, 0], [1, 0], [2, 0]], // Top.
		[[2, 0], [2, 1], [2, 2]], // Right.
		[[2, 2], [1, 2], [0, 2]], // Bottom.
		[[0, 1], [1, 1], [2, 1]], // Horizontal middle.
		[[1, 0], [1, 1], [1, 2]], // Vertical middle.
		[[0, 0], [1, 1], [2, 2]], // Top-left to bottom-right.
		[[0, 2], [1, 1], [2, 0]]  // Bottom-left to top-right.
	];

	*/