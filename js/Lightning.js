var canvas;

var strike, lightningA;

var lX;

var startTime;

function setup() {
	frameRate(30);
	strike = false;
	lX = 0;
	lightningA = [];
}

function draw() {
	canvas = createCanvas(
		document.documentElement.clientWidth,
		document.documentElement.clientHeight
	);
	canvas.position(0, 0);
	background(0, 0, 0, 0);

	if (odds(25) == 16 && strike == false) {
		background(255);
		strike = true;
		lX = random(10, width - 10);
		startTime = frameCount;
		lightningA = Lightning(lX, random(50, 80), random(100, 120));
	}

	if (strike == true) {
		for (i = 0; i < lightningA.length; i++) {
			stroke(255);
			strokeWeight((document.documentElement.clientWidth / 100) * 0.1 + 2.5);
			line(
				lightningA[i][0],
				lightningA[i][1],
				lightningA[i][2],
				lightningA[i][3]
			);
		}

		if (frameCount >= startTime + 15) {
			clear();
			strike = false;
		}
	}
}

function Lightning(lightningX, x, y) {
	var lengthV = document.documentElement.clientHeight / y;
	var lineA = [];
	var randomAddition = random(-10, 10);

	for (i = 0; i < lengthV; ) {
		lineA.push([lightningX + randomAddition, i * y, lightningX + x, i * y + y]);
		lineA.push([
			lightningX + x,
			i * y + y,
			lightningX + randomAddition,
			i * y + y + y
		]);

		if (odds(2) == 1) {
			lineA.push([
				lightningX + x,
				i * y + y,
				lightningX + x * 2,
				i * y + y + y
			]);
		}
		i += 2;
	}
	return lineA;
}

function odds(UV) {
	var lChance = 0;
	lChance = int(random(0, UV));
	return lChance;
}
