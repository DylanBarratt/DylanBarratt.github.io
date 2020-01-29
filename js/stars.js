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

var projectTexts, projectImages;

var textLoaded, projectsLoaded;

function preload() {
	fontT = loadFont("FONTS/fontT.ttf");
	fontB = loadFont("FONTS/fontB.ttf");
	fontL = loadFont("FONTS/fontL.ttf");
	projectTexts = loadStrings("projects/projectInfo.txt");
	projectImages = [];
	projectImages.push(loadImage("projects/project images/0.jpg"));
	projectImages.push(loadImage("projects/project images/1.jpg"));
	projectImages.push(loadImage("projects/project images/2.jpg"));
}

function setup() {
	locations = [];
	frameRate(20);

	PLANET = [];
	document.getElementById("defaultCanvas0").style = "z-index, 1";
	amount = random(document.documentElement.clientWidth * 0.2, document.documentElement.clientWidth * 0.25);
	shipX1 = -100;
	shipX2 = document.documentElement.clientWidth + 100;

	explosion = false;
	shootingStar = false;
	turn = false;
	generated = false;

	f = 0;
	es = 0;
	nav = 0;

	arrowsLoaded = false;
	textLoaded = false;
	projectsLoaded = false;
	textInit();
	projectsInit();
	ArrowInit();

	mobileCheck();
}

function draw() {
	if (isMobile) {
		mobile();
	} else {
		computer();
	}
}

function mobile() {
	noSmooth();
	strokeCap(PROJECT);
	w = document.documentElement.clientWidth;
	h = document.documentElement.clientHeight;
	canvas = createCanvas(w, h);
	canvas.position(0, 0);

	chooseColour();

	drawSpace();

	mobileText();
}

function computer() {
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
	ArrowDraw();

	if (textLoaded) {
		drawTexts();
	}

	if (projectsLoaded) {
		drawProjects();
	}
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
	textLocations.push([textV, 10, document.documentElement.clientHeight / 2.75]);
	textV = "My really super cool website and other awesome stuff.";
	textLocations.push([textV, 10, document.documentElement.clientHeight / 2.25]);
	//PROJECTS
	textV = "PROJECTS:";
	textLocations.push([textV, document.documentElement.clientWidth / 3.8, (document.documentElement.clientHeight / 2) * 2.25]);
	textV = "use the arrow keys or a&d to navigate through!";
	textLocations.push([textV, document.documentElement.clientWidth / 3.8 + 5, (document.documentElement.clientHeight / 2) * 2.3]);

	textLoaded = true;
}

function drawTexts() {
	noStroke();
	if (document.documentElement.clientWidth >= 500) {
		var fSize;
		//TITLE
		fSize = (document.documentElement.clientWidth / 100) * 8 + 6;
		fill(255);
		textSize(fSize);
		textFont(fontT);
		text(textLocations[0][0], textLocations[0][1], textLocations[0][2], textLocations[0][3], textLocations[0][4]);
		fSize = (document.documentElement.clientWidth / 100) * 2 + 8;
		fill(123);
		textSize(fSize);
		textFont(fontL);
		text(textLocations[1][0], textLocations[1][1], textLocations[1][2], textLocations[1][3], textLocations[1][4]);

		//PROJECTS
		fSize = (document.documentElement.clientWidth / 100) * 3 + 4;
		fill(255);
		textSize(fSize);
		textFont(fontB);
		text(textLocations[2][0], textLocations[2][1], textLocations[2][2], textLocations[2][3], textLocations[2][4]);
		fSize = (document.documentElement.clientWidth / 100) * 1 + 4;
		fill(255);
		textSize(fSize);
		textFont(fontB);
		text(textLocations[3][0], textLocations[3][1], textLocations[3][2], textLocations[3][3], textLocations[3][4]);
	} else {
		var fSize;
		//TITLE
		fSize = (document.documentElement.clientWidth / 100) * 8 + 6;
		fill(255);
		textSize(fSize);
		textFont(fontT);
		text(textLocations[0][0], textLocations[0][1], textLocations[0][2], textLocations[0][3], textLocations[0][4]);

		//PROJECTS
		fSize = (document.documentElement.clientWidth / 100) * 3 + 4;
		fill(255);
		textSize(fSize);
		textFont(fontB);
		text(textLocations[2][0], textLocations[2][1], textLocations[2][2], textLocations[2][3], textLocations[2][4]);
		fSize = (document.documentElement.clientWidth / 100) * 1 + 4;
		fill(255);
		textSize(fSize);
		textFont(fontB);
		text(textLocations[3][0], textLocations[3][1], textLocations[3][2], textLocations[3][3], textLocations[3][4]);
	}
}

function mobileText() {
	smooth();
	fill(255);
	textSize(width / 10);
	textFont(fontT);
	textV = "DYLANBARRATT.COM";
	text(textV, width / 2 - textWidth(textV) / 2, height / 2 - 100, width - 5);

	textSize(width / 30);
	textV = "Welcome to the site of all my meaningless code!";
	text(textV, width / 2 - textWidth(textV) / 2, height / 2);

	fill(255);
	textSize(width / 25);
	textV = "Please view this site on a computer to see my projects!";
	text(textV, width / 2 - textWidth(textV) / 2, height - 100);

	textV = "or go to github.com/DylanBarratt";
	text(textV, width / 2 - textWidth(textV) / 2, height - 50);
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
function ArrowInit() {
	var midX;
	var midY;

	aLength = document.documentElement.clientHeight / 50 + 2;

	pArrowLocations = [];

	//left
	midX = 2 * aLength;
	midY = document.documentElement.clientHeight / 2;
	pArrowLocations.push([midX - aLength, midY, midX, midY + aLength, midX - aLength, midY, midX, midY - aLength, createVector(midX - aLength / 2, midY)]);

	//right
	midX = document.documentElement.clientWidth - aLength;
	midY = document.documentElement.clientHeight / 2;
	pArrowLocations.push([midX, midY, midX - aLength, midY + aLength, midX, midY, midX - aLength, midY - aLength, createVector(midX - aLength / 2, midY)]);
}

function ArrowDraw() {
	stroke(255);
	strokeWeight(5);

	//LEFT
	if (textCounter == 0) {
		line(pArrowLocations[1][0], pArrowLocations[1][1], pArrowLocations[1][2], pArrowLocations[1][3]);
		line(pArrowLocations[1][4], pArrowLocations[1][5], pArrowLocations[1][6], pArrowLocations[1][7]);
	}

	//RIGHT
	if (textCounter == 1) {
		line(pArrowLocations[0][0], pArrowLocations[0][1], pArrowLocations[0][2], pArrowLocations[0][3]);
		line(pArrowLocations[0][4], pArrowLocations[0][5], pArrowLocations[0][6], pArrowLocations[0][7]);
	}

	if (textCounter == 0) {
		//RIGHT ARROW
		if (mouseX > pArrowLocations[1][8].x - aLength - 5 && mouseX < pArrowLocations[1][8].x + aLength + 5) {
			if (mouseY < pArrowLocations[1][8].y + aLength + 5 && mouseY > pArrowLocations[1][8].y - aLength - 5) {
				cursor("pointer");
				if (mouseIsPressed) {
					nav = 1;
					f = frameCount;
				}
			}
		} else {
			cursor("auto");
		}
	} else if (textCounter == 1) {
		//LEFT ARROW
		if (mouseX > pArrowLocations[0][8].x - aLength - 5 && mouseX < pArrowLocations[0][8].x + aLength + 5) {
			if (mouseY < pArrowLocations[0][8].y + aLength + 5 && mouseY > pArrowLocations[0][8].y - aLength - 5) {
				cursor("pointer");
				if (mouseIsPressed) {
					nav = -1;
					f = frameCount;
				}
			}
		} else {
			cursor("auto");
		}
	}
}
//#endregion

//#region EVENTS
function windowResized() {
	amount = random(document.documentElement.clientWidth * 0.25, document.documentElement.clientWidth * 0.5);
	resizeCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
	generateStars();
	GP();

	arrowsLoaded = false;
	textLoaded = false;
	projectsLoaded = false;
	textInit();
	projectsInit();
	ArrowInit();
}

function keyPressed() {
	if (textCounter == 1) {
		if (keyCode == RIGHT_ARROW && projectIndex <= projectTexts.length - 2) {
			projectIndex += 1;
		} else if (keyCode == LEFT_ARROW && projectIndex > 0) {
			projectIndex -= 1;
		}

		if (keyCode == 68 && projectIndex <= projectTexts.length - 2) {
			projectIndex += 1;
		} else if (keyCode == 65 && projectIndex > 0) {
			projectIndex -= 1;
		}
	}
}
function mouseReleased() {
	if (clickedOnProject) {
		openProject();
	}
}
//#endregion

//#region PROJECTPAGEBOX!
var projectLocations, projectIndex, clickedOnProject;

function projectsInit() {
	projectIndex = 0;
	projectLocations = [];
	clickedOnProject = false;

	var pWidth = (document.documentElement.clientHeight / 100) * 50;

	//image container
	projectLocations.push([
		document.documentElement.clientWidth / 2 - pWidth / 2,
		document.documentElement.clientHeight / 2 - pWidth / 2 + document.documentElement.clientHeight,
		pWidth,
		pWidth
	]);
	//text container
	projectLocations.push([
		document.documentElement.clientWidth / 2 - pWidth / 2,
		document.documentElement.clientHeight / 2 - pWidth / 4 + document.documentElement.clientHeight + pWidth * 1,
		pWidth,
		pWidth / 2
	]);

	projectsLoaded = true;
}

function drawProjects() {
	fill(255);
	textSize((document.documentElement.clientWidth / 150) * 3 + 4);
	textFont(fontB);
	text(projectTexts[projectIndex], projectLocations[1][0] + 5, projectLocations[1][1] + 5, projectLocations[1][2]);

	fill(25);
	rect(projectLocations[0][0], projectLocations[0][1], projectLocations[0][2], projectLocations[0][3]);

	if (!clickedOnProject) {
		image(projectImages[projectIndex], projectLocations[0][0] - 10, projectLocations[0][1] - 10, projectLocations[0][2], projectLocations[0][3]);
	} else {
		image(projectImages[projectIndex], projectLocations[0][0], projectLocations[0][1], projectLocations[0][2], projectLocations[0][3]);
	}

	if (
		mouseX >= projectLocations[0][0] - 10 &&
		mouseX <= projectLocations[0][0] + projectLocations[0][2] &&
		mouseY >= projectLocations[0][1] - 10 &&
		mouseY <= projectLocations[0][1] + projectLocations[0][3] &&
		textCounter == 1
	) {
		cursor("pointer");
		clickedOnProject = true;
	} else if (clickedOnProject) {
		cursor("auto");
		clickedOnProject = false;
	}
}
function openProject() {
	if (projectIndex == 0) {
		window.open("/projects/Conway's Game of Life/index.html", "_blank");
	} else if (projectIndex == 1) {
		window.open("/projects/Noughts & crosses/index.html", "_blank");
	} else if (projectIndex == 2) {
		window.open("https://www.google.com", "_blank");
	}
}
//#endregion

var isMobile = false;
function mobileCheck() {
	// device detection
	if (
		/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
			navigator.userAgent
		) ||
		/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
			navigator.userAgent.substr(0, 4)
		)
	) {
		isMobile = true;
		console.log("MOBILE!");
	}
}
