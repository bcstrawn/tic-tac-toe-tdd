var Board = function(tiles) {
	//this.watchers = [];
	this.tiles = tiles ? tiles :
	[
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

	this.getTiles = function() {
		return this.tiles;
	};

	this.clear = function() {
		for (var y = 0; y < this.tiles.length; y++) {
			for (var x = 0; x < this.tiles[y].length; x++) {
				this.tiles[y][x] = "";
			}
		}
	};

	this.copyBoard = function() {
		var tiles = [];
		for (var y = 0; y < this.tiles.length; y++) {
			tiles[y] = [];
			for (var x = 0; x < this.tiles[y].length; x++) {
				tiles[y][x] = this.markAt(x, y);
			}
		}
		return new Board(tiles);
	};

	this.getAvailableMoves = function() {
		var moves = [];

		for (var y = 0; y < this.tiles.length; y++) {
			for (var x = 0; x < this.tiles[y].length; x++) {
				if (this.markAt(x, y) === '') {
					moves.push({x: x, y: y});
				}
			}
		}

		return moves;
	};

	this.matchPattern = function(pattern, playerMarks) {
		var firstSpot = pattern[0];
		var markAtFirstSpot = this.markAt(firstSpot.x, firstSpot.y);

		if (playerMarks.indexOf(markAtFirstSpot) === -1)
			return undefined;

		for (var j = 1; j < pattern.length; j++) {
			var nextSpot = pattern[j];
			if (markAtFirstSpot !== this.markAt(nextSpot.x, nextSpot.y))
				return undefined;
		}

		return markAtFirstSpot;
	};
};