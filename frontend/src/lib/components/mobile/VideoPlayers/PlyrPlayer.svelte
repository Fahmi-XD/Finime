<script lang="ts">
	import type { IAnimeEpisodeDetail } from "$lib/api/types/mobile/episodeType";

  import { onMount, onDestroy } from "svelte";
  import Plyr from "plyr";

  import 'plyr/dist/plyr.css';

  export let animeDetail: IAnimeEpisodeDetail;

  const QUALITY = {
		'360': 0,
		'480': 1,
		'720': 2
	};

  let playerElement: HTMLElement;
  let player: Plyr

  function lockLandscape() {
		if (screen.orientation && (screen.orientation as any).lock) {
			(screen.orientation as any).lock('landscape-primary').catch(() => {});
		}
	}

	function unlockOrientation() {
		if (screen.orientation && screen.orientation.unlock) {
			screen.orientation.unlock();
		}
	}

  onMount(() => {
    setTimeout(() => {
      player = new Plyr(playerElement, {
				controls: [
					'play-large', // The large play button in the center
					'rewind', // Rewind by the seek time (default 10 seconds)
					'play', // Play/pause playback
					'fast-forward', // Fast forward by the seek time (default 10 seconds)
					'progress', // The progress bar and scrubber for playback and buffering
					'current-time', // The current time of playback
					'duration', // The full duration of the media
					'mute', // Toggle mute
					'settings', // Settings menu
					'airplay', // Airplay (currently Safari only)
					'fullscreen' // Toggle fullscreen
				],
				autoplay: true,
				quality: {
					default: 360,
					options: [360, 480, 720],
					forced: true,
					onChange(quality) {
						// console.log('Quality changed to:', quality);
						// console.log(animeDetail?.videoUrls.length - ((QUALITY as any)[quality]))
						const currentTime = (playerElement as HTMLVideoElement).currentTime;
						const isPaused = (playerElement as HTMLVideoElement).paused;

						(playerElement as HTMLVideoElement).src =
							animeDetail?.videoUrls[animeDetail?.videoUrls.length - 1 - (QUALITY as any)[quality]];

						(playerElement as HTMLVideoElement).load();
						(playerElement as HTMLVideoElement).currentTime = currentTime;
						if (!isPaused) {
							(playerElement as HTMLVideoElement).play();
						}
					}
				}
			});

      player.on('enterfullscreen', lockLandscape);

			player.on('exitfullscreen', unlockOrientation);
    }, 10)
  })

  onDestroy(() => {
    if (player) {
			console.log("PLYR destroy	")
			player.off('enterfullscreen', lockLandscape);
			player.off('exitfullscreen', unlockOrientation);

			player.destroy();
		}
  })
</script>

<video
	bind:this={playerElement}
	src={animeDetail?.videoUrls[animeDetail?.videoUrls?.length - 1]}
	controls
	crossorigin="anonymous"
	playsinline
	class="plyr-player"
	poster="/images/finime-poster.png"
>
	{#each animeDetail?.videoUrls as videoUrl}
		<source src={videoUrl} type="video/mp4" />
	{/each}

	<track kind="captions" />

	<a href={animeDetail?.videoUrls[animeDetail?.videoUrls?.length - 1]} download>Download</a>
</video>
