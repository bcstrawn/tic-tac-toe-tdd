angular.module("tic-tac-toe", [])
.controller("gameCtrl", ["$scope", function($scope) {
	$scope.init = function() {
		$scope.game = new GameService();
		$scope.game.setUpGame();

		$scope.buttonStatuses = [
			"Start Game",
			"Quit Game",
			"Play Again"
		];
		$scope.currentButtonStatus = $scope.buttonStatuses[0];
		$scope.disableEditing = false;
		$scope.tiles = $scope.game.getBoardTiles();

		$scope.playerOptions = ['human', 'computer'];
		$scope.player1 = {option: "human"};
		$scope.player2 = {option: "computer"};

		$scope.status = "Start a Game!";
	};

	$scope.buttonClick = function() {
		if ($scope.currentButtonStatus === "Start Game" || 
				$scope.currentButtonStatus === "Play Again") {
			$scope.game.startGame();
		} else if ($scope.currentButtonStatus === "Quit Game") {
			$scope.game.quitGame();
		}

		$scope.updateEditing();
		$scope.updateButtonStatus();
		$scope.updateStatus();
	};

	$scope.selectSquare = function(x, y) {
		$scope.game.makeMoveForActivePlayer({x: x, y: y});
		$scope.updateStatus();

		if ($scope.game.isGameOver()) {
			$scope.currentButtonStatus = "Play Again";
			$scope.disableEditing = false;
		}
	};

	$scope.updateStatus = function() {
		$scope.status = "placeholder";

		if ($scope.game.isGameOver()) {
			var winnerMark = $scope.game.getWinningPlayer();
			if (winnerMark) {
				$scope.status = "Player '" + winnerMark + "' has won!";
			} else {
				$scope.status = "The game has ended in a draw.";
			}
		} else {
			var mark = $scope.game.getActivePlayer().getMark();
			$scope.status = "It's player " + mark + "'s turn";
		}
	};


	$scope.updateEditing = function() {
		this.disableEditing = !$scope.game.isGameOver();
	};

	$scope.updateButtonStatus = function() {
		if ($scope.game.isGameOver()) {
			$scope.currentButtonStatus = $scope.buttonStatuses[2];
		} else {
			$scope.currentButtonStatus = $scope.buttonStatuses[1];
		}
	};

	$scope.$watch("player1.option", function(newVal) {
		$scope.game.setPlayer(1, newVal);
	});

	$scope.$watch("player2.option", function(newVal) {
		$scope.game.setPlayer(2, newVal);
	});

	$scope.init();
}]);