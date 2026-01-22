/*
 * --------------------------------------------------------------------------------------------------
 * sphere.js
 * A Three.js script to create and animate a 3D sphere with wireframe and points,
 * designed to be used as a background element in a web portfolio.
 * --------------------------------------------------------------------------------------------------
 */

const SphereBg = (() => {
	const BG_COLOR = 0xdadadb;
	const FOV = 75;
	const ASPECT = window.innerWidth / window.innerHeight;
	const NEAR = 0.1;
	const FAR = 1000;

	const O_ICOSAEDRON_RADIUS = 10;
	const O_ICOSAEDRON_DETAIL = 2;
	const O_ICOSAEDRON_LINE_COLOR = 0x444444;
	const O_ICOSAEDRON_POINT_COLOR = 0x2d3748;

	const I_ICOSAEDRON_RADIUS = 5;
	const I_ICOSAEDRON_DETAIL = 1;
	const I_ICOSAEDRON_LINE_COLOR = 0x2d3748;
	const I_ICOSAEDRON_POINT_COLOR = 0x1a202c;

	const CAMERA_START_Z = 20;

	// --- SETUP SCENE, CAMERA, RENDERER ---
	const canvas = document.querySelector("#bg-sphere");
	const scene = new THREE.Scene();

	scene.fog = new THREE.FogExp2(BG_COLOR, 0.04);

	const camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);

	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		alpha: true,
		antialias: true,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	// --- SPHERE ---
	const geometry = new THREE.IcosahedronGeometry(
		O_ICOSAEDRON_RADIUS,
		O_ICOSAEDRON_DETAIL,
	);
	const lineMaterial = new THREE.LineBasicMaterial({
		color: O_ICOSAEDRON_LINE_COLOR,
		transparent: true,
		opacity: 0.4,
	});
	const wireframe = new THREE.WireframeGeometry(geometry);
	const lineMesh = new THREE.LineSegments(wireframe, lineMaterial);

	const pointsMaterial = new THREE.PointsMaterial({
		color: O_ICOSAEDRON_POINT_COLOR,
		size: 0.15,
		transparent: true,
		opacity: 0.8,
	});

	const pointsMesh = new THREE.Points(geometry, pointsMaterial);

	const sphereGroup = new THREE.Group();
	sphereGroup.add(lineMesh);
	sphereGroup.add(pointsMesh);

	const innerGeo = new THREE.IcosahedronGeometry(
		I_ICOSAEDRON_RADIUS,
		I_ICOSAEDRON_DETAIL,
	);
	const innerWireframe = new THREE.WireframeGeometry(innerGeo);
	const innerLines = new THREE.LineSegments(
		innerWireframe,
		new THREE.LineBasicMaterial({
			color: I_ICOSAEDRON_LINE_COLOR,
			opacity: 0.1,
			transparent: true,
		}),
	);
	sphereGroup.add(innerLines);

	scene.add(sphereGroup);

	camera.position.z = CAMERA_START_Z;

	// --- ANIMATION LOOP ---
	function animate() {
		requestAnimationFrame(animate);

		sphereGroup.rotation.y += 0.002;
		sphereGroup.rotation.x += 0.0005;

		renderer.render(scene, camera);
	}

	animate();

	// --- RESIZE ---
	window.addEventListener("resize", () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	});

	return {
		scene: scene,
	};
})();
