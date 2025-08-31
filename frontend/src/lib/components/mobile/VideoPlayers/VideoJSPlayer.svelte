<script lang="ts">
	import type { IAnimeEpisodeDetail } from '$lib/api/types/mobile/episodeType';

	import { onMount, onDestroy } from 'svelte';
	import Videojs from 'video.js';

	import 'video.js/dist/video-js.min.css';

	import 'videojs-landscape-fullscreen';
  import 'videojs-resolution-switcher-vjs7'

	import type Player from 'video.js/dist/types/player';

	export let animeDetail: IAnimeEpisodeDetail;

	const QUALITY = {
		'360': 0,
		'480': 1,
		'720': 2
	};

	let playerElement: HTMLElement;
	let player: Player;
	let videojsResolution: HTMLButtonElement;

	const MenuItem = Videojs.getComponent("MenuItem");
	const MenuButton = Videojs.getComponent("MenuButton");

	class CustomMenuButton extends MenuButton {
		constructor(player: Player, options?: any) {
			super(player, options);
			const component = this.addChild("button", {}, 0);
			component.addClass("quality-btn")
			const el = component.el()
			videojsResolution = (el as HTMLButtonElement);
			el.innerHTML = `<h1 id="videojs-resolution">360p</h1>`;
		}

		createItems() {
			const items: any = [];
			const { myItems } = this.options_;

			if (!Array.isArray(myItems)) items;

			myItems.forEach(({ clickHandler, ...item }: any) => {
				const menuItem = new MenuItem(this.player(), item);

				if (clickHandler) {
					(menuItem as any).handleClick = clickHandler;
				}
				items.push(menuItem);
			});

			return items;
		}

		buildCSSClass() {
			return `${super.buildCSSClass()}`;
		}
	}

	Videojs.registerComponent("CustomMenuButton", CustomMenuButton)

	function changeResolution(quality: string) {
		const currentResolution = `${quality}p`
		videojsResolution.innerText = currentResolution;
		// console.log('Quality changed to:', quality);
		// console.log((animeDetail?.videoUrls.length - 1 - ((QUALITY as any)[quality])))
		// console.log(animeDetail?.videoUrls[(animeDetail?.videoUrls.length - 1 - ((QUALITY as any)[quality]))])

		const currentTime = (playerElement as HTMLVideoElement).currentTime;
		const isPaused = (playerElement as HTMLVideoElement).paused;

		(playerElement as HTMLVideoElement).src =
			animeDetail?.videoUrls[(animeDetail?.videoUrls.length - 1 - ((QUALITY as any)[quality]))];

		(playerElement as HTMLVideoElement).load();
		(playerElement as HTMLVideoElement).currentTime = currentTime;
		if (!isPaused) {
			(playerElement as HTMLVideoElement).play();
		}
	}

	onMount(() => {
		player = Videojs(playerElement, {
			controls: true,
			autoplay: true,
			preload: 'auto',
			textTrackSettings: false,
      experimentalSvgIcons: true,
			fluid: true
		});

		const controlBar = (player as any).controlBar;

		controlBar.addChild("CustomMenuButton", {
			title: "Quality",
			className: "",
			myItems: [
				{
					label: "360p",
					clickHandler() {
						changeResolution("360")
					},
				},
				{
					label: "480p",
					clickHandler() {
						changeResolution("480")
					},
				},
				{
					label: "720p",
					clickHandler() {
						changeResolution("720")
					},
				},
			]
		}, 17);

		(player as any).landscapeFullscreen({
			fullscreen: {
				enterOnRotate: true, // masuk fullscreen saat perangkat diputar ke landscape
				exitOnRotate: true, // keluar fullscreen saat kembali ke portrait
				alwaysInLandscapeMode: true, // selalu fullscreen dalam mode landscape
				iOS: true // menggunakan fullscreen palsu di iOS agar kontrol tetap muncul
			}
		});

		player.disablePictureInPicture(true);
	});

	onDestroy(() => {
		if (player) {
			console.log('VideoJS destroy');

			player.dispose();
		}
	});
</script>

<div>
  <video
    bind:this={playerElement}
    playsinline
    controls
    preload="auto"
    class="video-js vjs-default-skin videojs-player"
    id="video_1"
    poster="/images/finime-poster.png"
    src={animeDetail?.videoUrls[animeDetail?.videoUrls?.length - 1]}
    disablePictureInPicture
    data-setup={'{"controlBar": { "qualitySelector": true, "pictureInPictureToggle": false, "captionsButton": false, "captionSettingsMenuItem": false, "skipButtons": { "backward": 10, "forward": 10 }}}'}
  >
    {#each (animeDetail?.videoUrls as string[]).map(i => i).reverse() as videoUrl, i (i)}
      <source src={videoUrl} type="video/mp4" />
    {/each}
  </video>
</div>