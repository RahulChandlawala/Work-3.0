///New bg effexts//////////////////////////////////////////////////////

(function () {
	var width,
		height,
		largeHeader,
		canvas,
		ctx,
		points,
		target,
		animateHeader = true;

	// Main
	initHeader();
	initAnimation();
	addListeners();

	function initHeader() {
		width = window.innerWidth;
		height = window.innerHeight;
		target = { x: width / 2, y: height / 2 };

		largeHeader = document.getElementById("large-header");
		largeHeader.style.height = height + "px";

		canvas = document.getElementById("demo-canvas");
		canvas.width = width;
		canvas.height = height;
		ctx = canvas.getContext("2d");

		// create points
		points = [];
		for (var x = 0; x < width; x = x + width / 20) {
			for (var y = 0; y < height; y = y + height / 20) {
				var px = x + (Math.random() * width) / 20;
				var py = y + (Math.random() * height) / 20;
				var p = { x: px, originX: px, y: py, originY: py };
				points.push(p);
			}
		}

		for (var i = 0; i < points.length; i++) {
			var closest = [];
			var p1 = points[i];
			for (var j = 0; j < points.length; j++) {
				var p2 = points[j];
				if (!(p1 == p2)) {
					var placed = false;
					for (var k = 0; k < 6; k++) {
						if (!placed) {
							if (closest[k] == undefined) {
								closest[k] = p2;
								placed = true;
							}
						}
					}

					for (var k = 0; k < 6; k++) {
						if (!placed) {
							if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
								closest[k] = p2;
								placed = true;
							}
						}
					}
				}
			}
			p1.closest = closest;
		}

		// assign a circle to each point
		for (var i in points) {
			var c = new Circle(
				points[i],
				2 + Math.random() * 3,
				"rgba(156,217,249,0.4)"
			);
			points[i].circle = c;
		}
	}

	// Event handling
	function addListeners() {
		if (!("ontouchstart" in window)) {
			window.addEventListener("mousemove", mouseMove);
		}
		window.addEventListener("scroll", scrollCheck);
		window.addEventListener("resize", resize);
	}

	function mouseMove(e) {
		var posx = (posy = 0);
		if (e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		} else if (e.clientX || e.clientY) {
			posx =
				e.clientX +
				document.body.scrollLeft +
				document.documentElement.scrollLeft;
			posy =
				e.clientY +
				document.body.scrollTop +
				document.documentElement.scrollTop;
		}
		target.x = posx;
		target.y = posy;
	}

	function scrollCheck() {
		if (document.body.scrollTop > height) animateHeader = false;
		else animateHeader = true;
	}

	function resize() {
		width = window.innerWidth;
		height = window.innerHeight;
		largeHeader.style.height = height + "px";
		canvas.width = width;
		canvas.height = height;
	}

	// animation
	function initAnimation() {
		animate();
		for (var i in points) {
			shiftPoint(points[i]);
		}
	}

	function animate() {
		if (animateHeader) {
			ctx.clearRect(0, 0, width, height);
			for (var i in points) {
				// detect points in range
				if (Math.abs(getDistance(target, points[i])) < 4000) {
					points[i].active = 0.3;
					points[i].circle.active = 0.6;
				} else if (Math.abs(getDistance(target, points[i])) < 20000) {
					points[i].active = 0.1;
					points[i].circle.active = 0.3;
				} else if (Math.abs(getDistance(target, points[i])) < 40000) {
					points[i].active = 0.02;
					points[i].circle.active = 0.1;
				} else {
					points[i].active = 0;
					points[i].circle.active = 0;
				}

				drawLines(points[i]);
				points[i].circle.draw();
			}
		}
		requestAnimationFrame(animate);
	}

	function shiftPoint(p) {
		TweenLite.to(p, 1 + 1 * Math.random(), {
			x: p.originX - 50 + Math.random() * 100,
			y: p.originY - 50 + Math.random() * 100,
			ease: Circ.easeInOut,
			onComplete: function () {
				shiftPoint(p);
			},
		});
	}

	// Canvas manipulation
	function drawLines(p) {
		if (!p.active) return;
		for (var i in p.closest) {
			ctx.beginPath();
			ctx.moveTo(p.x, p.y);
			ctx.lineTo(p.closest[i].x, p.closest[i].y);
			ctx.strokeStyle = "rgba(0,145,245," + p.active * 1.2 + ")";
			// console.log(p);
			ctx.stroke();
		}
	}

	function Circle(pos, rad, color) {
		var _this = this;

		// constructor
		(function () {
			_this.pos = pos || null;
			_this.radius = rad || null;
			_this.color = color || null;
		})();

		this.draw = function () {
			if (!_this.active) return;
			ctx.beginPath();
			ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
			ctx.fillStyle = "rgba(0,145,249," + _this.active * 1.2 + ")";
			ctx.fill();
		};
	}

	// Util
	function getDistance(p1, p2) {
		return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
	}
})();

// Entry animation //////////////////////////////////////////////

window.addEventListener("load", function () {
	var welcome = document.querySelector(".greet"),
		subtext = document.querySelector(".subTexts"),
		delay = 1000;

	const greet = document.querySelector(".greet");
	const line = document.querySelector("hr");
	const title = document.querySelector(".title-text");

	const text = document.querySelector(".text");
	const logo = document.querySelector(".logo");

	// const btn = document.querySelectorAll(".btn");
	const next = document.querySelector(".btn-next");
	const mute = document.querySelector(".btn-mute");

	const slider = document.querySelector("#myRange");
	const btns = document.querySelector(".btn-container");

	setTimeout(function () {
		// welcome.style.top = "0";
		greet.style.animation = "moveIngreet ease-out 1000ms forwards";
		line.style.animation = "moveInLine ease-out 1000ms forwards";
		title.style.animation = "moveInTitle ease-out 1000ms forwards";

		text.style.animation = "moveInBottom ease-out 1000ms forwards";
		logo.style.animation = "moveInBottom ease-out 1000ms forwards";

		play.style.animation = "moveInBottom1 ease-out 1000ms forwards";
		fullscreen.style.animation = "moveInBottom1 ease-out 1000ms forwards";
		btnbg.style.animation = "moveInBottom1 ease-out 1000ms forwards";
		btnNormal.style.animation = "moveInBottom1 ease-out 1000ms forwards";
		next.style.animation = "moveInBottom1 ease-out 1000ms forwards";
		mute.style.animation = "moveInBottom1 ease-out 1000ms forwards";
		slider.style.animation = "moveInBottom1 ease-out 1000ms forwards";
	}, delay);
	setTimeout(function () {
		// subtext.style.bottom = "-00%";
	}, delay * 2);
});

/// PRo to trial changes

const version = document.querySelector(".version");
const data = localStorage.getItem("VERSION");

version.innerHTML = data;
///// end

// play button logic  start

const backgroundMusic = new Audio("../Media/background-music.mp3");

const play = document.querySelector(".btn-play");

play.addEventListener("click", function () {
	if (play.classList.contains("play")) {
		backgroundMusic.play();
		play.classList.remove("play");
		play.classList.add("pause");
	} else {
		backgroundMusic.currentTime = 0.0;
		// backgroundMusic.play();
		backgroundMusic.pause("");
		backgroundMusic.currentTime = 0.0;

		play.classList.add("play");
		play.classList.remove("pause");
	}
});

/// play button logic finished

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

///Full screen btn logic finished

/// for animated to normal and normal to animated start /////////////////
const body = document.querySelector(".body");
const btnbg = document.querySelector(".btn-normal");
const canvas = document.querySelector("#demo-canvas");

btnbg.addEventListener("click", function () {
	body.classList.toggle("bg-change");
	if (body.classList.contains("bg-change")) {
		btnbg.classList.add("normal");
		btnbg.classList.remove("animated");
		canvas.style.opacity = 0;
		greet.style.animation = "moveIngreet ease-out";
		line.style.animation = "moveInLine ease-out";
		title.style.animation = "moveInTitle ease-out";
		greet.style.visibility = "hidden";
		line.style.visibility = "hidden";
		title.style.visibility = "hidden";
		console.log("heelo");
	} else {
		// btnbg.classList.remove("normal");
		for (let i = 0; i < 5; i++) {
			body.classList.remove(`normal${i}`);
		}
		btnbg.classList.add("animated");
		canvas.style.opacity = 1;
		greet.style.visibility = "visible";
		line.style.visibility = "visible";
		title.style.visibility = "visible";
		greet.style.animation = "moveIngreet ease-out 1000ms forwards";
		line.style.animation = "moveInLine ease-out 1000ms forwards";
		title.style.animation = "moveInTitle ease-out 1000ms forwards";
	}
});

/// for animated to normal and normal to animated finsihed

//for the normal bg to have multiple options

const greet = document.querySelector(".greet");
const line = document.querySelector("hr");
const title = document.querySelector(".title-text");

const btnNormal = document.querySelector(".btn-bg-normal");
const count = document.querySelector(".count");

btnNormal.addEventListener("click", function () {
	if (body.classList.contains("bg-change")) {
		console.log(count.textContent, 1);

		if (count.innerHTML * 1 < 4) {
			count.innerHTML = count.innerHTML * 1 + 1;
		} else {
			count.innerHTML = 0;
		}

		for (let i = 0; i < 5; i++) {
			body.classList.remove(`normal${i}`);
		}
		body.classList.add(`normal${count.textContent}`);
	} else {
		alert("please change from animated bg to normal bg");
	}
});

//////Volume logic

const slider = document.querySelector("#myRange");
const output = document.querySelector(".value");

output.innerHTML = slider.value;

slider.oninput = function () {
	let x = this.value;
	console.log(x);
	output.innerHTML = this.value;

	backgroundMusic.volume = (x * 1) / 10;
};

// plus.addEventListener("click", () => {
// 	if (backgroundMusic.volume < 1) {
// 		backgroundMusic.volume = backgroundMusic.volume + 0.1;
// 		// console.log(backgroundMusic.volume);
// 	}
// });

// minus.addEventListener("click", () => {
// 	if (backgroundMusic.volume > 0.1) {
// 		backgroundMusic.volume = backgroundMusic.volume - 0.1;
// 		// console.log(backgroundMusic.volume);
// 	}
// });

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
