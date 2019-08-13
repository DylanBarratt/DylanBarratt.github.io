var canvas;

var amount;
var generated;
var locations;

var shootingStar;
var xS, yS, rS;
var direction;

var turn, PLANET, mX, mY, mR, mXi, mXe;

var textLocations, textCounter, titleFont;

var w, h;

var mePic;

var pArrowLocations, aLength;

var nav, f;

var fontT, fontB, fontL;
function preload() {
	fontT = loadFont("FONTS/fontT.ttf");
	fontB = loadFont("FONTS/fontB.ttf");
	fontL = loadFont("FONTS/fontL.ttf");
}

function setup() {
	generated = false;
	locations = [];
	frameRate(20);
	shootingStar = false;
	turn = false;
	generated = false;
	PLANET = [];
	document.getElementById("defaultCanvas0").style = "z-index, 1";
	amount = random(
		document.documentElement.clientWidth * 0.2,
		document.documentElement.clientWidth * 0.25
	);
	shipX1 = -100;
	shipX2 = document.documentElement.clientWidth + 100;
	explosion = false;
	f = 0;
	es = 0;
	nav = 0;
	textInit();
	projectsInit();
	pArrowInit();
}

function draw() {
	if (f < frameCount - 2) {
		if (nav == -1) {
			previousText();
			nav = 0;
		} else if (nav == 1) {
			nextText();
			nav = 0;
		}
	}

	noSmooth();
	strokeCap(PROJECT);
	w = document.documentElement.clientWidth;
	h = document.documentElement.clientHeight;
	canvas = createCanvas(w, h);
	canvas.position(0, 0);

	chooseColour();

	drawSpace();
	drawTexts();
	drawProjects();
	pArrowDraw();
}

//#region space
function generateStars() {
	locations = [];
	for (i = 0; i < amount; i++) {
		locations.push([
			random(w), // X
			random(h * 2) / 2, // Y
			2 + random(-0.3, +1.5), // R
			255 // C
		]);

		var rand = random(25);
		if (int(rand) == 1) {
			locations[i][2] += 3;
		}
	}
	generated = true;
}

function GP() {
	PLANET = [];
	w = random(w);
	h = random(h - 10);
	r = random(10, 25);
	PLANET.push([w, h, r]);
	mX = w - r;
	mY = h;
	mR = r / 5;
	mXi = w - r;
	mXe = w + r;
}

function drawSpace() {
	if (generated == false) {
		generateStars();
		GP();
	} else {
		//MAKES CIRCLES HAHAHAH
		for (i = 0; i < locations.length; i++) {
			var randomNum = random(1, 1000);
			if (int(randomNum) != 4) {
				noStroke();
				fill(locations[i][3]);
				circle(locations[i][0], locations[i][1], locations[i][2]);
			}
		}

		//MAKES PLANETS HAHAHAAH
		if (mX < mXe && turn == false) {
			noStroke();
			fill(200);
			circle(PLANET[0][0], PLANET[0][1], PLANET[0][2]);
			fill(123);
			circle(mX, mY, mR);
			mX += 0.5;
			mY += 0.1;
		} else {
			turn = true;
			noStroke();
			fill(200);
			circle(PLANET[0][0], PLANET[0][1], PLANET[0][2]);
			fill(123);
			circle(mX, mY, mR);
		}

		if (mX > mXi && turn == true) {
			noStroke();
			fill(123);
			circle(mX, mY, mR);
			fill(200);
			circle(PLANET[0][0], PLANET[0][1], PLANET[0][2]);
			mX -= 0.5;
			mY -= 0.1;
		} else {
			turn = false;
		}
	}

	let rand = int(random(5));
	if (rand == 1 && shootingStar == false) {
		xS = random(w);
		yS = random(h);
		rS = random(3, 7.5);
		direction = random(-1, 1);
		shootingStar = true;
	}

	if (shootingStar == true) {
		noStroke();

		fill(255);
		circle(xS - direction, yS - 1, rS - 1.75);
		circle(xS - direction, yS - 1, rS - 0.75);
		circle(xS - direction, yS - 1, rS - 0.25);
		circle(xS, yS, rS);

		xS += direction;
		yS += 1;
		rS -= 0.1;
	}

	if (xS >= w || yS >= h || rS <= 0.3) {
		shootingStar = false;
	}
}
//#endregion

//#region page data
function textInit() {
	var textV;
	textLocations = [];
	textCounter = 0;
	//TITLE
	textV = "DYLAN BARRATT.com";
	textLocations.push([textV, 50, document.documentElement.clientHeight / 2.75]);
	textV = "My really super cool website and other awesome stuff.";
	textLocations.push([textV, 75, document.documentElement.clientHeight / 2.25]);
	//PROJECTS
	textV = "PROJECTS";
	textLocations.push([
		textV,
		document.documentElement.clientWidth / 3.8,
		(document.documentElement.clientHeight / 2) * 2.25
	]);
}

function drawTexts() {
	var fSize;
	//TITLE
	fSize = (document.documentElement.clientWidth / 100) * 8 + 6;
	fill(255);
	textSize(fSize);
	textFont(fontT);
	text(
		textLocations[0][0],
		textLocations[0][1],
		textLocations[0][2],
		textLocations[0][3],
		textLocations[0][4]
	);
	fSize = (document.documentElement.clientWidth / 100) * 2 + 8;
	fill(123);
	textSize(fSize);
	textFont(fontL);
	text(
		textLocations[1][0],
		textLocations[1][1],
		textLocations[1][2],
		textLocations[1][3],
		textLocations[1][4]
	);

	//PROJECTS
	fSize = (document.documentElement.clientWidth / 100) * 3 + 4;
	fill(255);
	textSize(fSize);
	textFont(fontB);
	text(
		textLocations[2][0],
		textLocations[2][1],
		textLocations[2][2],
		textLocations[2][3],
		textLocations[2][4]
	);
}
//#endregion

//#region textNavigation + pageColours

function chooseColour() {
	if (textCounter == 0) {
		//p1
		background("#131224");
	}
	if (textCounter == 1) {
		//p2
		background("#30313b");
	}
}
function nextText() {
	if (textCounter < 1) {
		textCounter += 1;

		for (i = 0; i < textLocations.length; i++) {
			textLocations[i][2] -= document.documentElement.clientHeight;
		}

		for (i = 0; i < projectLocations.length; i++) {
			projectLocations[i][1] -= document.documentElement.clientHeight;
		}
	}
}
function previousText() {
	if (textCounter > 0) {
		textCounter -= 1;
		for (i = 0; i < textLocations.length; i++) {
			textLocations[i][2] += document.documentElement.clientHeight;
		}

		for (i = 0; i < projectLocations.length; i++) {
			projectLocations[i][1] += document.documentElement.clientHeight;
		}
	}
}
//#endregion

//#region ARROWS
function pArrowInit() {
	var midX;
	var midY;

	aLength = document.documentElement.clientHeight / 50 + 2;

	pArrowLocations = [];

	//left
	midX = 2 * aLength;
	midY = document.documentElement.clientHeight / 2;
	pArrowLocations.push([
		midX - aLength,
		midY,
		midX,
		midY + aLength,
		midX - aLength,
		midY,
		midX,
		midY - aLength,
		createVector(midX - aLength / 2, midY)
	]);

	//right
	midX = document.documentElement.clientWidth - aLength;
	midY = document.documentElement.clientHeight / 2;
	pArrowLocations.push([
		midX,
		midY,
		midX - aLength,
		midY + aLength,
		midX,
		midY,
		midX - aLength,
		midY - aLength,
		createVector(midX - aLength / 2, midY)
	]);
}

function pArrowDraw() {
	stroke(255);
	strokeWeight(5);

	//LEFT
	if (textCounter == 0) {
		line(
			pArrowLocations[1][0],
			pArrowLocations[1][1],
			pArrowLocations[1][2],
			pArrowLocations[1][3]
		);
		line(
			pArrowLocations[1][4],
			pArrowLocations[1][5],
			pArrowLocations[1][6],
			pArrowLocations[1][7]
		);
	}

	//RIGHT
	if (textCounter == 1) {
		line(
			pArrowLocations[0][0],
			pArrowLocations[0][1],
			pArrowLocations[0][2],
			pArrowLocations[0][3]
		);
		line(
			pArrowLocations[0][4],
			pArrowLocations[0][5],
			pArrowLocations[0][6],
			pArrowLocations[0][7]
		);
	}

	if (mouseX >= width / 2 && textCounter == 0) {
		//RIGHT ARROW
		if (
			mouseX > pArrowLocations[1][8].x - aLength - 5 &&
			mouseX < pArrowLocations[1][8].x + aLength + 5
		) {
			if (
				mouseY < pArrowLocations[1][8].y + aLength + 5 &&
				mouseY > pArrowLocations[1][8].y - aLength - 5
			) {
				cursor("pointer");
				if (mouseIsPressed) {
					nav = 1;
					f = frameCount;
				}
			}
		}
	} else if (mouseX <= width / 2 && textCounter == 1) {
		//LEFT ARROW
		if (
			mouseX > pArrowLocations[0][8].x - aLength - 5 &&
			mouseX < pArrowLocations[0][8].x + aLength + 5
		) {
			if (
				mouseY < pArrowLocations[0][8].y + aLength + 5 &&
				mouseY > pArrowLocations[0][8].y - aLength - 5
			) {
				cursor("pointer");
				if (mouseIsPressed) {
					nav = -1;
					f = frameCount;
				}
			}
		}
	} else {
		cursor("auto");
	}
}
//#endregion

//#region EVENTS
function windowResized() {
	amount = random(
		document.documentElement.clientWidth * 0.25,
		document.documentElement.clientWidth * 0.5
	);
	resizeCanvas(
		document.documentElement.clientWidth,
		document.documentElement.clientHeight
	);
	generateStars();
	GP();
	textInit();
	projectsInit();
	pArrowInit();
}

function keyPressed() {
	if (keyCode === RIGHT_ARROW) {
		nextText();
	} else if (keyCode === LEFT_ARROW) {
		previousText();
	}
}
//#endregion

//#region PROJECTPAGEBOX!
var projectLocations;

function projectsInit() {
	projectLocations = [];

	var pWidth = (document.documentElement.clientWidth / 100) * 50;
	var pHeight = (document.documentElement.clientHeight / 100) * 75;

	//image container
	projectLocations.push([
		document.documentElement.clientWidth / 2 - pWidth / 2,
		pHeight / 4 + document.documentElement.clientHeight,
		pWidth,
		pHeight - pHeight / 4
	]);
	//text container
	projectLocations.push([
		document.documentElement.clientWidth / 2 - pWidth / 2,
		pHeight / 4 + document.documentElement.clientHeight + pHeight - pHeight / 4,
		pWidth,
		pHeight / 4
	]);
}

function drawProjects() {
	for (i = 0; i < projectLocations.length; i++) {
		stroke(0);
		strokeWeight(2);
		noFill();
		rect(
			projectLocations[i][0],
			projectLocations[i][1],
			projectLocations[i][2],
			projectLocations[i][3]
		);
	}
}
//#endregion
