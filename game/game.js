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

var AI = function(game, player) {
	this.game = game;
	this.player = player;

	this.getBestMove = function(game, depth) {
		if (game.isGameOver()) {
			return game.calculateScore();
		}

		var moves = game.getAvailableMoves();
		var bestMove;
		var bestScore = -1;

		for (var i = 0; i < moves.length; i++) {
			var move = moves[i];
			var copiedGame = game.copyGame();
			var mark = copiedGame.getActivePlayer().getMark();
			copiedGame.makeOneMove(move);

			var score = -this.getBestMove(copiedGame, depth + 1);
			if (score > bestScore) {
				bestScore = score;
				bestMove = move;
			}
		}

		return (depth > 1) ? bestScore : bestMove;
	};
};




/*
$scope.promptForMove = function(player) {
		$scope.currentPlayer = player;

		if (player.option == "computer") {
			//get square reference using a move from minimax
			var move = $scope.findBestMove($scope.getBoard(), 0, $scope.currentPlayer, -$scope.infinity, +$scope.infinity);
			var square = $scope.getSquareFromMove(move);
			$scope.takeTurn(square);
		} else if (player.option == "human") {
			// wait for the person to click on a cell
		}
	}


	$scope.findBestMove = function(board, depth, player, alpha, beta) {
		var result = $scope.checkGameOver(board);
		if (result) {
			if (result.draw) {
				return 0;
			} else {
				if (result.winner == player.mark) {
					return $scope.infinity - depth;
				} else {
					return -$scope.infinity + depth;
				}
			}
		}

		var moves = $scope.getMoves(board);
		var bestMove;

		for (var i = 0; i < moves.length; i++) {
			var move = moves[i];
			var newBoard = $scope.copyBoard(board);
			newBoard[move[1]][move[0]] = player.mark;
            var alphaCandidate = -$scope.findBestMove(newBoard, depth + 1, $scope.getOtherPlayer(player), -beta, -alpha);

			if (beta <= alpha)
				break;

			if (alphaCandidate > alpha) {
				alpha = alphaCandidate;

				if (depth === 0)
					bestMove = move;
			}
		}

		return depth !== 0 ? alpha : bestMove;
*/