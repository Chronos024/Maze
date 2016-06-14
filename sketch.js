var cols, rows;
var w = 25;
var done = false;
var grid = [];
var stack = [];
var solved = false;
var popping;

var solveStack = [];
var ePoint;

var current;

function setup() {
	//frameRate(2);
	createCanvas(1250, 1250);
	cols = floor(width / w);
	rows = floor(height / w);

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < cols; i++) {
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}
	var geLen = grid.length-1;
	ePoint = grid[geLen];
	ePoint.endPoint = true;
	current = grid[0];
}

function draw() {
	var next;
	background(51);
	for (var i = 0; i < grid.length; i++) {
		grid[i].show();
	}

	//STEP 1
	if (!done) {
		current.visited = true;
		current.highlight('make');
		next = current.checkNeighbors('make');
		if (next) {
			next.visited = true;

			//STEP2
			stack.push(current);

			//STEP 3
			removeWalls(current, next);
			// STEP 4
			current = next;
		} else if (stack.length > 0) {
			popping = true;
			while(popping){
					current = stack.pop();
						if(current === grid[0] || current.checkNeighbors('make')){
							popping = false;
						}
				}
		} else {
			done = true;

			current = grid[0];
		}
	} else {
		if (!solved) {
			current.csolved = true;
			current.highlight('solve');
			next = current.checkNeighbors('solve');
			if (next) {
				
				//STEP2
				solveStack.push(current);
				if (next.endPoint) {
					solved = true;
					console.log("THIS IS THE END");
					next.highlight('end');
				}else{
					current = next;
				}
			} else if (solveStack.length > 0) {
				current.blocked = true;
				current = solveStack.pop();
			}
		} else {
			for (var j = 0; j < grid.length; j++) {
				if (grid[j].csolved === true && grid[j].blocked === false) {
					grid[j].highlight('solve');
				}
				else if (grid[j].csolved === false) {
					grid[j].highlight('blocked');
				}
			}
			noLoop();
		}
	}
}

function index(i, j){
	if(i < 0 || j < 0 || i > cols-1 || j > rows-1) {
		return -1;
	}
	return i + j * cols;
}

function removeWalls(a, b) {
	var x = a.i - b.i;
	if (x === 1) {
		a.walls[3] = false;
		b.walls[2] = false;
	} else if (x === -1) {
		a.walls[2] = false;
		b.walls[3] = false;
	}
	var y = a.j - b.j;
	if (y === 1) {
		a.walls[0] = false;
		b.walls[1] = false;
	} else if (y === -1) {
		a.walls[1] = false;
		b.walls[0] = false;
	}
	if (a.walls == b.walls) {
		counter++;
	} else {
		counter = 0;
	}
}
