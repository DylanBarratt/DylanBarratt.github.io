//The p5 element that is drawn on to
var canvas;

//the number of stars in the drawing
var amount;
//whether the drawing has been generated or not
var generated;
//the array that contains all of the info on the stars, things such as its x and y axis
var locations;

//boolean variable for whether a shooting star is generated or not
var shootingStar;
//the variables about the shooting star
var xS, yS, rS, direction;

//the variables about the generated planets
var turn, PLANET, mX, mY, mR, mXi, mXe;

//the width and height of the canvas
var w, h;

//this function is called a soon as the script is run and it is only called once
function setup() {
	//initializes the stars array
	locations = [];

	//slows down shooting stars and moons orbiting planets
	frameRate(20);

	//initializes the planets array
	PLANET = [];
	//puts the canvas in front of some elements
	document.getElementById("defaultCanvas0").style = "z-index, 1";
	//chooses the amount of stars to draw
	amount = random(document.documentElement.clientWidth * 0.2, document.documentElement.clientWidth * 0.25);

	//initalizes all state variables
	shootingStar = false;
	turn = false;
	generated = false;

	//initializes all number variables
	f = 0;
	es = 0;
	nav = 0;
}

//this function is called once per frame, so 20 times a second.
//the function draws over the previous canvas every time so everything that is to be seen needs to be re-drawn
function draw() {
	//makes the drawing sharp
	noSmooth();
	//allows shapes to be drawn correctly
	strokeCap(PROJECT);
	//fills the screen with the drawing
	w = document.documentElement.clientWidth;
	h = document.documentElement.clientHeight;
	canvas = createCanvas(w, h);
	canvas.position(0, 0);
	//draws the stars
	drawSpace();
}

//called to initialize the locations of stars and planets
function generateStars() {
	//makes sure the variable is empty
	locations = [];
	//chooses values for every individual star
	for (i = 0; i < amount; i++) {
		locations.push([
			random(w), // X (where the star is on the x axis)
			random(h * 2) / 2, // Y (where the star is on the y axis)
			2 + random(-0.3, +1.5), // R (the radius of the star)
			255 // C (the colour of the star in greyscale)
		]);

		//makes 1 in 25 stars much larger
		var rand = random(25);
		if (int(rand) == 1) {
			locations[i][2] += 3;
		}
	}
	generated = true;
}

//this function is called to generate a planet
function GP() {
	//makes sure the variable is empty
	PLANET = [];
	//defines the width height and radius of the planet
	w = random(w);
	h = random(h - 10);
	r = random(10, 25);
	//adds the planet to the array of planets. This allows for multiple planets
	PLANET.push([w, h, r]);
	//defines where the moon is in accordance to the planet
	mX = w - r; //the moons starting x value
	mY = h; //the moons starting y value
	mR = r / 5; //the moons starting radius
	mXi = w - r; //where the moon goes behind the planet on the left
	mXe = w + r; //where the moon goes behind the planet on the right
}

//this function is called ever single frame
function drawSpace() {
	//checks to make sure planets have actually been generated
	if (generated == false) {
		generateStars();
		GP();
	} else {
		//if the canvas has been pre-generated the stars will be drawn according to their array values
		//loops through the entire array of stars and draws them one by one.
		for (i = 0; i < locations.length; i++) {
			var randomNum = random(1, 1000);
			if (int(randomNum) != 4) {
				noStroke();
				fill(locations[i][3]);
				circle(locations[i][0], locations[i][1], locations[i][2]);
			}
		}

		//loops through the entire array of planets and draws them one by one.
		// it also updates the location of the moon to give it the eefect of orbiting the planet
		//moves the moon to the right
		if (mX < mXe && turn == false) {
			// this is run if the moon is infront of the planet
			noStroke();
			fill(200);
			circle(PLANET[0][0], PLANET[0][1], PLANET[0][2]);
			fill(123);
			circle(mX, mY, mR);
			mX += 0.5;
			mY += 0.1;
		} else {
			// this is run if the moon is behind the planet so that the moon cant be seen
			turn = true;
			noStroke();
			fill(200);
			circle(PLANET[0][0], PLANET[0][1], PLANET[0][2]);
			fill(123);
			circle(mX, mY, mR);
		}

		//this is run if the moon is behind the planet and it moves the moon so that it orbits the planet
		//moves the moon to the left
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

	//their is a 1 in 5 chance to spawn a shooting star if their aren't already any on the screen
	let rand = int(random(5));
	if (rand == 1 && shootingStar == false) {
		//chooses a random starting location for the shooting star
		xS = random(w);
		yS = random(h);
		rS = random(3, 7.5);
		direction = random(-1, 1);
		shootingStar = true;
	}

	//if their is a shooting star, this moves it across the screen
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

	//if the screen is too small, no shooting stars are generated
	if (xS >= w || yS >= h || rS <= 0.3) {
		shootingStar = false;
	}
}

//called when the window is resized.
//regenerates the entire canvas to make sure it fits in the screen
function windowResized() {
	amount = random(document.documentElement.clientWidth * 0.25, document.documentElement.clientWidth * 0.5);
	resizeCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
	generateStars();
	GP();
}
