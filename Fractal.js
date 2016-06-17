var maxiterations = 150;
var maxval = 1;
var minval = -1;
var frequency = .4;

//var ca = -.70176;
//var cb = -.3842;

//var ca = 0.285;
//var cb = .01;

//var ca = -.8;
//var cb = .156;

//var ca = -0.74543;
//var cb = 0.11301;

//var phi = 1.6180339887;
//var ca = (phi - 2);
//var cb = (phi -1);

//var ca = -0.8167029591938462;
//var cb = 0.13185243860295082;

var ca;
var cb;


function setup() {
	createCanvas(600, 600);
	pixelDensity(1);
	
	
	ca = random(-.999999, .999999);
	cb = random(-.999999, .999999);
	console.log(ca);
	console.log(cb)
}

function draw() {
	
	loadPixels();
	background(51);
	var i;

	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			var a = map(x, 0, width, minval, maxval);
			var b = map(y, 0, height, minval, maxval);

			var n = 0;
			var z = 0;

			var savea = a;
			var saveb = b;

			while (n < maxiterations) {



				var aa = a * a ;
				var bb = b * b;
				if (aa + bb > 4) {
					break;
				}

				var twoab = 2 * a * b;
				a = aa - bb + ca;
				b = twoab + cb;
				
				n++

				var red1 = map(n, 0, Math.sin(frequency * i + 0) * 127 + 128, 0, 1);
				red1 = map(sqrt(red1), 0, 1, 0, 255);
				var green1 = map(n, 0, Math.sin(frequency * i + 2) * 127 + 128, 0, 1);
				green1 = map(sqrt(green1), 0, 1, 0, 255);
				var blue1 = map(n, 0, Math.sin(frequency * i + 4) * 127 + 128, 0, 1);
				blue1 = map(sqrt(blue1), 0, 1, 0, 255);
				if (i < 64) {
					i++
				} else {
					i = 0;
				}
			}

			if (n == maxiterations) {

				red1 = 0;
				green1 = 0;
				blue1 = 0;
			}
			var pix = (x + y * width) * 4;
			pixels[pix + 0] = red1;
			pixels[pix + 1] = green1;
			pixels[pix + 2] = blue1;
			pixels[pix + 3] = 255;

		}
	}
	updatePixels();
	noLoop();
}
