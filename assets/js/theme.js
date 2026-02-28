/*
 * -------------------------------------------------------------------------------------------------
 * theme.js
 * A script to handle light/dark theme toggling with local storage persistence.
 * -------------------------------------------------------------------------------------------------
 */

const toggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const logoVideo = document.getElementById("logo-video");
const root = document.documentElement;

const moonIcon = "/assets/icons/Moon.svg";
const sunIcon = "/assets/icons/Sun.svg";

const LIGHT_FOG = 0xdadadb;
const DARK_FOG = 0x1a1a1a;

const CSS_TRANSITION_DURATION = 400;

let fogAnimation;

function updateFavicon(isDark) {
	const favicon = document.querySelector('link[rel="icon"]:not([media])');
	if (favicon) {
		favicon.href = isDark
			? "/assets/icons/favicon_black.svg"
			: "/assets/icons/favicon_white.svg";
	}
}

function updateVideo(isDark) {
	if (!logoVideo) return;

	const newSrc = isDark
		? "/assets/videos/black_BG.mp4"
		: "/assets/videos/white_BG.mp4";

	if (logoVideo.getAttribute("src") !== newSrc) {
		logoVideo.src = newSrc;
		logoVideo.load();
		logoVideo.play();
	}
}

if (localStorage.getItem("theme") === "dark") {
	root.classList.add("dark-mode");
	themeIcon.src = sunIcon;
	setFogHex(DARK_FOG);
	updateFavicon(true);
	updateVideo(true);
}

toggleButton.addEventListener("click", () => {
	root.classList.toggle("dark-mode");

	const isDarkMode = root.classList.contains("dark-mode");
	themeIcon.src = isDarkMode ? sunIcon : moonIcon;
	localStorage.setItem("theme", isDarkMode ? "dark" : "light");

	const targetColor = isDarkMode ? DARK_FOG : LIGHT_FOG;
	animateFogColor(targetColor, CSS_TRANSITION_DURATION);

	updateFavicon(isDarkMode);
	updateVideo(isDarkMode);
});

function setFogHex(colorHex) {
	if (typeof SphereBg !== "undefined" && SphereBg.scene.fog) {
		SphereBg.scene.fog.color.setHex(colorHex);
	}
}

function animateFogColor(targetHex, duration) {
	if (
		typeof SphereBg === "undefined" ||
		!SphereBg.scene.fog ||
		!SphereBg.scene.fog
	)
		return;

	const startColor = SphereBg.scene.fog.color.clone();
	const endColor = new THREE.Color(targetHex);
	const startTime = performance.now();

	function loop(now) {
		const elapsed = now - startTime;
		const progress = Math.min(elapsed / duration, 1);

		const ease =
			progress < 0.5
				? 2 * progress * progress
				: -1 + (4 - 2 * progress) * progress;

		SphereBg.scene.fog.color.copy(startColor).lerp(endColor, ease);

		if (progress < 1) {
			fogAnimation = requestAnimationFrame(loop);
		} else {
			SphereBg.scene.fog.color.setHex(targetHex);
		}
	}

	if (fogAnimation) cancelAnimationFrame(fogAnimation);

	fogAnimation = requestAnimationFrame(loop);
}
