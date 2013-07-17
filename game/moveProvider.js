var UI = function(game) {
	this.game = game;

	this.promptForMove = function() {
		// wait for angular
	};
};

var AI = function(game, player) {
	this.game = game;
	this.player = player;

	this.promptForMove = function() {
		var move = this.getBestMove(this.game, 1, -10, 10);
		this.game.makeMoveForActivePlayer(move);
	};

	/* ORIGINAL
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

		return (depth > 1) ? bestScore * 0.9 : bestMove;
	};*/

	// ALPHA/BETA
	/*this.getBestMove = function(game, depth, alpha, beta) {
		if (game.isGameOver()) {
			var score = game.calculateScore();
			if (score > 0)
				score -= depth;
			else if (score < 0)
				score += depth;
			return score;
		}

		var moves = game.getAvailableMoves();
		var bestMove;

		for (var i = 0; i < moves.length; i++) {
			var move = moves[i];
			var copiedGame = game.copyGame();
			copiedGame.makeOneMove(move);

            var alphaCandidate = -this.getBestMove(copiedGame, depth + 1, -beta, -alpha);
			if (beta <= alpha)
				break;

			if (alphaCandidate > alpha) {
				alpha = alphaCandidate;

				if (depth === 1)
					bestMove = move;
			}
		}

		return (depth > 1) ? alpha : bestMove;
	};*/
	
	this.getBestMove = function(game, depth, alpha, beta) {
		if (game.isGameOver()) {
			var score = game.calculateScore();
			if (score > 0)
				score -= depth;
			else if (score < 0)
				score += depth;
			return score;
		}

		var moves = game.getAvailableMoves();
		var bestMove;

		for (var i = 0; i < moves.length; i++) {
			var move = moves[i];
			game.makeOneMove(move);

            var alphaCandidate = -this.getBestMove(game, depth + 1, -beta, -alpha);
            game.undoMove(move);

			if (beta <= alpha)
				break;

			if (alphaCandidate > alpha) {
				alpha = alphaCandidate;

				if (depth === 1)
					bestMove = move;
			}
		}

		return (depth > 1) ? alpha : bestMove;
	};
};


/*
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
	}
*/