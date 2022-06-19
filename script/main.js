/// left hamburger
const circle1 = document.querySelector(".material-btn1");
var link1 = document.querySelector(".material-content1").querySelectorAll("li");
var ham1 = document.querySelector(".material-hamburger1");
var main1 = document.querySelector("main1");
var win1 = window;
const dropdown = document.querySelector(".material-content1");
circle1.addEventListener("click", function openMenu(event) {
	// console.log("circle1");
	circle1.classList.toggle("active");
	dropdown.classList.toggle("dropdown");
	ham1.classList.toggle("material-close1");
	console.log("circle");
	for (let i = 0; i <= link.length; i++) {
		link1[i].classList.toggle("active");
		// link[i].style.visibility = "visible";
	}
	event.preventDefault();
	event.stopImmediatePropagation();

	if (circle.classList.contains("active")) {
		circle.classList.remove("active");
		dropDown.classList.remove("dropdown1");
		for (var i = 0; i < link.length; i++) {
			link[i].classList.toggle("active");
		}
		ham.classList.remove("material-close");
		// main.classList.remove("active");
	}
});

win1.addEventListener("click", function closeMenu() {
	if (circle1.classList.contains("active")) {
		circle1.classList.remove("active");
		dropdown.classList.remove("dropdown");
		for (let i = 0; i <= link.length; i++) {
			link1[i].classList.toggle("active");
			// link[i].style.visibility = "hidden";
		}
		ham1.classList.remove("material-close1");
		// main.classList.remove("active");
	}
});

/// right hamburger
var circle = document.querySelector(".material-btn");
var link = document.querySelector(".material-content").querySelectorAll("li");
var ham = document.querySelector(".material-hamburger");
var main = document.querySelector("main");
const dropDown = document.querySelector(".material-content");
var win = window;

circle.addEventListener("click", function openMenu(event) {
	// console.log("circle");
	circle.classList.toggle("active");
	ham.classList.toggle("material-close");

	dropDown.classList.toggle("dropdown1");

	// main.classList.toggle("active");
	console.log("circle");
	for (var i = 0; i < link.length; i++) {
		link[i].classList.toggle("active");
	}
	event.preventDefault();
	event.stopImmediatePropagation();

	if (circle1.classList.contains("active")) {
		circle1.classList.remove("active");
		dropdown.classList.remove("dropdown");
		for (let i = 0; i <= link.length; i++) {
			link1[i].classList.toggle("active");
			// link[i].style.visibility = "hidden";
		}
		ham1.classList.remove("material-close1");
		// main.classList.remove("active");
	}
});

win.addEventListener("click", function closeMenu() {
	if (circle.classList.contains("active")) {
		circle.classList.remove("active");
		dropDown.classList.remove("dropdown1");
		for (var i = 0; i < link.length; i++) {
			link[i].classList.toggle("active");
		}
		ham.classList.remove("material-close");
		// main.classList.remove("active");
	}
});

// play button logic  start

const backgroundMusic = new Audio("../Media/background-music.mp3");

const play = document.querySelector(".btn-play");

play.addEventListener("click", function () {
	if (play.classList.contains("play")) {
		backgroundMusic.play();
		play.classList.remove("play");
		play.classList.add("pause");
	} else {
		backgroundMusic.pause();
		play.classList.add("play");
		play.classList.remove("pause");
	}
});

//// volume control js

const slider = document.querySelector("#myRange");
const output = document.querySelector(".value");

output.innerHTML = slider.value;

slider.oninput = function () {
	let x = this.value;
	console.log(x);
	output.innerHTML = this.value;

	backgroundMusic.volume = (x * 1) / 10;
};

/// mute and unmute the buttons

const mute = document.querySelector(".btn-mute");

mute.addEventListener("click", () => {
	if (backgroundMusic.volume !== 0) {
		mute.classList.add("mute");
		mute.classList.remove("unmute");
		backgroundMusic.volume = 0;
	} else {
		mute.classList.remove("mute");
		mute.classList.add("unmute");
		backgroundMusic.volume = (slider.value * 1) / 10;
	}
});

// fullscreen button logic start

const fullscreen = document.querySelector(".btn-full");
const elem = document.documentElement;

const music = new Audio("../Media/ting.mp3");

fullscreen.addEventListener("click", function () {
	music.play();
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) {
		/* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		/* IE11 */
		elem.msRequestFullscreen();
	}

	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		/* Safari */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		/* IE11 */
		document.msExitFullscreen();
	}

	if (fullscreen.classList.contains("enter")) {
		fullscreen.classList.add("exit");
		fullscreen.classList.remove("enter");
	} else {
		fullscreen.classList.remove("exit");
		fullscreen.classList.add("enter");
	}
});
