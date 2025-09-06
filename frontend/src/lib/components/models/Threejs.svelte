<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three-stdlib';
	import { runtimeData } from '$lib/stores/runtime';

	let container: HTMLDivElement;
	let renderer: THREE.WebGLRenderer;
	let scene: THREE.Scene;
	let mixer: THREE.AnimationMixer | null;
	let model: THREE.Group<THREE.Object3DEventMap>;
	let anim: number;
	let camera: THREE.PerspectiveCamera;

	let targetRotationZ = -0.3;
	let speed = 0.1;

	$: if ($runtimeData['donation'] == 'false') {
		console.log("Anjay")
		targetRotationZ = 0;
		setTimeout(() => {
			clearModel();
		}, 1_000)
	}

	onMount(() => {
		if (typeof window == 'undefined') return;

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(
			45,
			container.clientWidth / container.clientHeight,
			0.1,
			1000
		);
		camera.position.set(0, 0, 12);

		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setClearColor(0x000000, 0);
		container.appendChild(renderer.domElement);

		const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
		scene.add(hemiLight);

		const dirLight = new THREE.DirectionalLight(0xffffff, 0.2);
		dirLight.position.set(1, 3, 0);
		scene.add(dirLight);

		const loader = new GLTFLoader();

		loader.load(
			'/models/scene.gltf',
			(gltf) => {
				model = gltf.scene;
				model.scale.set(0.5, 0.5, 0.5);
				model.position.set(-3, -5, 0);

				scene.add(model);

				// Animasi kalau ada
				if (gltf.animations.length) {
					mixer = new THREE.AnimationMixer(model);
					gltf.animations.forEach((clip) => {
						const action = mixer?.clipAction(clip) as THREE.AnimationAction;
						action.timeScale = 0.4;
						action.clampWhenFinished = true;
						action.setLoop(THREE.LoopOnce, 0).play();
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
			console.log("Anim")
			anim = requestAnimationFrame(animate);
			const delta = clock.getDelta();
			if (mixer) mixer.update(delta);

			if (model) {
				model.rotation.z += (targetRotationZ - model.rotation.z) * speed;
	
				if (Math.abs(targetRotationZ - model.rotation.z) < 0.001) {
					model.rotation.z = targetRotationZ;
				}
			}

			renderer.render(scene, camera);
		}

		animate();
	});

	function clearModel() {
		console.log('Model dihapus');
		if (renderer) {
			cancelAnimationFrame(anim);
			renderer.forceContextLoss();
			renderer.dispose();
			scene.clear();
			mixer = null;
		}
	}

	onDestroy(() => {
		clearModel()
	});
</script>

<div bind:this={container} class="h-[400px] w-[200px]"></div>

<style>
	div {
		background: transparent;
		pointer-events: none;
	}
</style>
