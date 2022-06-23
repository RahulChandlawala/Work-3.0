"use strict";

var $slides = undefined,
	interval = undefined,
	$selectors = undefined,
	$btns = undefined,
	currentIndex = undefined,
	nextIndex = undefined;

var cycle = function cycle(index) {
	var $currentSlide = undefined,
		$nextSlide = undefined,
		$currentSelector = undefined,
		$nextSelector = undefined;

	nextIndex = index !== undefined ? index : nextIndex;

	$currentSlide = $($slides.get(currentIndex));
	$currentSelector = $($selectors.get(currentIndex));

	$nextSlide = $($slides.get(nextIndex));
	$nextSelector = $($selectors.get(nextIndex));

	$currentSlide.removeClass("active").css("z-index", "0");

	$nextSlide.addClass("active").css("z-index", "1");

	$currentSelector.removeClass("current");
	$nextSelector.addClass("current");

	currentIndex =
		index !== undefined
			? nextIndex
			: currentIndex < $slides.length - 1
			? currentIndex + 1
			: 0;

	nextIndex = currentIndex + 1 < $slides.length ? currentIndex + 1 : 0;
};

$(function () {
	currentIndex = 0;
	nextIndex = 1;

	$slides = $(".slide");
	$selectors = $(".selector");
	$btns = $(".btn");

	$slides.first().addClass("active");
	$selectors.first().addClass("current");

	// interval = window.setInterval(cycle, 6000);

	$selectors.on("click", function (e) {
		var target = $selectors.index(e.target);
		// if (target !== currentIndex) {
		// 	window.clearInterval(interval);
		cycle(target);
		// 	interval = window.setInterval(cycle, 6000);
		// }
	});

	$btns.on("click", function (e) {
		// window.clearInterval(interval);
		if ($(e.target).hasClass("prev")) {
			var target = currentIndex > 0 ? currentIndex - 1 : $slides.length - 1;
			cycle(target);
		} else if ($(e.target).hasClass("next")) {
			cycle();
		}
		// interval = window.setInterval(cycle, 6000);
	});
});

/////FUll scrreen loggic
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
