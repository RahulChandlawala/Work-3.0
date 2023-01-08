function login() {
	localStorage.clear();

	let check = "";

	let chara = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	const fonts = [0, 3, 12, 8, 13];

	// admin
	fonts.map((chr, i) => {
		check += chara.charAt(chr);
	});

	console.log(check);
	var user = document.getElementById("username").value;
	var pass = document.getElementById("password").value;
	event.preventDefault();
	if (user == check && pass == check) {
		// localStorage.clear();
		// setTimeout(() => {}, [1000]);
		localStorage.setItem("VERSION", "pro");
		alert("Logged In");
		window.location.href = "pages/index.html";
		return false;
	} else {
		alert("wrong user/pass");
		return false;
	}
}
// localStorage.clear();

const demo = document.querySelector(".btn-demo");

demo.addEventListener("click", () => {
	console.log("demo");
	localStorage.clear();
	localStorage.setItem("VERSION", "demo");
	window.location.href = "pages/index.html";
});
