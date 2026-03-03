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

function updateVideo(isDark) {
    if (!logoVideo) return;

	const source = logoVideo.querySelector("source");
    if (!source) return;

	const newSrc = isDark
        ? "/assets/videos/black_BG.mp4"
        : "/assets/videos/white_BG.mp4";

    if (source.getAttribute("src") !== newSrc) {
        source.setAttribute("src", newSrc);
        logoVideo.load();
        logoVideo.play().catch(e => console.log("Playback error:", e));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const isDarkMode = savedTheme === "dark";

    if (isDarkMode) {
        root.classList.add("dark-mode");
        if (themeIcon) themeIcon.src = sunIcon;
        setFogHex(DARK_FOG);
    } else {
        root.classList.remove("dark-mode");
        if (themeIcon) themeIcon.src = moonIcon;
        setFogHex(LIGHT_FOG);
    }

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

toggleButton.addEventListener("click", () => {
	root.classList.toggle("dark-mode");

	const isDarkMode = root.classList.contains("dark-mode");
	themeIcon.src = isDarkMode ? sunIcon : moonIcon;
	localStorage.setItem("theme", isDarkMode ? "dark" : "light");

	const targetColor = isDarkMode ? DARK_FOG : LIGHT_FOG;
	animateFogColor(targetColor, CSS_TRANSITION_DURATION);

	updateVideo(isDarkMode);
});