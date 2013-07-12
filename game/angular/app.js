angular.module("tic-tac-toe", [])
.controller("gameCtrl", ["$scope", function($scope) {
	$scope.init = function() {
		$scope.game = new GameService();
		$scope.game.setUpGame();
		$scope.game.createAndSetBoard();
		$scope.game.setPlayer(1, "computer");
		$scope.game.setPlayer(2, "computer");

		//$scope.board = $scope.game.getBoardTiles();
		$scope.tiles = $scope.game.TTT.board.getTiles();

		$scope.playerOptions = ['human', 'computer'];
		$scope.player1 = {option: "computer"};
		$scope.player2 = {option: "computer"};

		$scope.button = "Start Game";

		//console.log($scope.game.getBoardTiles());
	};

	$scope.buttonClick = function() {
		$scope.game.startGame();
		console.log($scope.game.getBoardTiles());
	};

	$scope.selectSquare = function(x, y) {
		console.log(x, y);
		$scope.game.makeMoveAt(x, y);
	};

	/*$scope.$watch("game.TTT.board.tiles", function() {
		$scope.board = $scope.game.getBoardTiles();
	});*/

	$scope.init();
}]);