<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three-stdlib';

	let container: HTMLDivElement;
	let renderer: THREE.WebGLRenderer;
	let scene: THREE.Scene;
	let mixer: THREE.AnimationMixer | null;

	let targetRotationZ = -0.3; // radian
	let speed = 0.1; // kecepatan rotasi per frame

	onMount(() => {
		// Scene
		scene = new THREE.Scene();

		// Kamera (statis)
		const camera = new THREE.PerspectiveCamera(
			45,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		);
		camera.position.set(3.5, 5, 12);

		// Renderer
		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);

		// Lampu
		const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
		scene.add(hemiLight);

		const dirLight = new THREE.DirectionalLight(0xffffff, 0.2);
		dirLight.position.set(1, 3, 0);
		scene.add(dirLight);

		// Loader model GLB
		const loader = new GLTFLoader();

		loader.load(
			'/models/scene.gltf', // taruh file di static/models/
			(gltf) => {
				const model = gltf.scene;
				model.scale.set(0.2, 0.2, 0.2); // << kecilin 100x
				model.position.set(0, 0, 0);

				function animate() {
					requestAnimationFrame(animate);

					if (model) {
						model.rotation.z += (targetRotationZ - model.rotation.z) * speed;

						if (Math.abs(targetRotationZ - model.rotation.z) < 0.001) {
							model.rotation.z = targetRotationZ;
						}
					}

					renderer.render(scene, camera);
				}
        animate()

				scene.add(model);

				// Animasi kalau ada
				if (gltf.animations.length) {
					mixer = new THREE.AnimationMixer(model);
					gltf.animations.forEach((clip) => {
						mixer?.clipAction(clip).setLoop(THREE.LoopOnce, 0).play();
					});
				}
			},
			undefined,
			(error) => {
				console.error('Error loading model:', error);
			}
		);

		// Resize handler
		window.addEventListener('resize', () => {
			camera.aspect = container.clientWidth / container.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(container.clientWidth, container.clientHeight);
		});

		// Loop render
		const clock = new THREE.Clock();
		function animate() {
			requestAnimationFrame(animate);
			const delta = clock.getDelta();
			if (mixer) mixer.update(delta); // update animasi
			renderer.render(scene, camera);
		}
		animate();
	});

	onDestroy(() => {
    console.log("Model dihapus");
		renderer.dispose();
		scene.clear();
		mixer = null;
	});
</script>

<div bind:this={container} class="h-screen w-full"></div>

<style>
	div {
		background: transparent;
    pointer-events: none;
	}
</style>
