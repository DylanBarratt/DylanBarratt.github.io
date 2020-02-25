var employeeNum = 0;
var img = document.getElementById("img");
var employeeInfo = [];

employeeInfo.push([
	"Tyler",
	"Front End Developer",
	'"A hardworking employee that excels in his position. His Advice: Go through the online courses at codecademy they really pay off!"'
]);

employeeInfo.push([
	"Richard",
	"Back End Developer",
	'"An employee that has a great positive attitude and perseveres through all problems, he achieved his degree with us!"'
]);

employeeInfo.push([
	"Dimitri",
	"Team Manager",
	'"An overall great employee who does a great job at getting people to do what they are meant to. His Advice: Just keep at it."'
]);

employeeInfo.push([
	"Steve",
	"Intern",
	'"Our newest employee who has made a great impression on the team and his superiors. His advice: don\'t trust anyone but yourself."'
]);

setInterval(next, 10000);

function next() {
	if (employeeNum < 3) {
		employeeNum++;
	} else {
		employeeNum = 0;
	}

	updateInfo();
}

function previous() {
	if (employeeNum > 0) {
		employeeNum--;
	} else {
		employeeNum = 3;
	}

	updateInfo();
}

function updateInfo() {
	imgNum = employeeNum + 1;
	img.src = "../images/employees/" + imgNum + ".jpg";
	document.getElementById("name").textContent = employeeInfo[employeeNum][0];
	document.getElementById("ttl").textContent = employeeInfo[employeeNum][1];
	document.getElementById("para").textContent = employeeInfo[employeeNum][2];
}
