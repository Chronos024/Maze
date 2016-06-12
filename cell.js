function Cell(i,j) {
	this.i = i;
	this.j = j;
	this.walls = [true,true,true,true];
	this.visited = false;
	this.csolved = false;
	this.blocked = false;
	this.endPoint = false;
	
	this.highlight = function(type){
		var x = this.i*w;
		var y = this.j*w;
		noStroke();
		if(type == 'make'){
			fill(0,0,255);
		}
		else if(type == 'solve'){
			fill(0,255,0,100);
		}
		else if(type == 'blocked'){
			fill(255,0,0,100);
		}
		rect(x,y,w,w);		
	}
	
	this.checkNeighbors = function(type){
		var neighbors = [];
		var top = grid[index(i, j-1)];
		var bottom = grid[index(i, j+1)];
		var right = grid[index(i+1, j)];
		var left = grid[index(i-1, j)];
		if(type == 'make'){
			if(top && !top.visited){
				neighbors.push(top);
			}
			if(bottom && !bottom.visited){
				neighbors.push(bottom);
			}
			if(right && !right.visited){
				neighbors.push(right);
			}
			if(left && !left.visited){
				neighbors.push(left);
			}
			
			if(neighbors.length > 0){
				var r = floor(random(0, neighbors.length));
				return neighbors[r];
			}
			else{
				return undefined;
			}
		}
		else if(type == 'solve'){
			if(left && !left.csolved && !left.walls[2]){
				return left;
			}
			else if(bottom && !bottom.csolved && !bottom.walls[0]){
				return bottom;
			}			
			else if(right && !right.csolved && !right.walls[3]){
				return right;
			}
			else if(top && !top.csolved && !top.walls[1]){
				return top;
			}
			else{
				return undefined;
			}
		}
	}
	
	this.show = function() {
		var x = this.i*w;
		var y = this.j*w;
		stroke(255);
		noFill();
		if(this.walls[0]){
			line(x    , y, x + w    , y); //top
		}
		if(this.walls[1]){
			line(x    , y + w, x + w, y + w); //bottom
		}
		if(this.walls[2]){
			line(x + w, y, x + w, y + w); // right
		}
		if(this.walls[3]){
			line(x    , y, x    , y + w); // left
		}
		if(this.visited){
			noStroke();
			fill(255,0,255,100);
			if(this.solved){
				fill(0,255,0,100);
			}
			if(this.blocked){
				fill(255,0,0,100);
			}
			
			rect(x,y,w,w);
		}
	}
}
