<script lang="ts">
	import type { IAnimeEpisodeDetail } from "$lib/api/types/mobile/episodeType";

  import { onMount, onDestroy } from "svelte";
  import Videojs from "video.js";

  import 'video.js/dist/video-js.min.css';
  import 'videojs-landscape-fullscreen';

  import type Player from 'video.js/dist/types/player';

  export let animeDetail: IAnimeEpisodeDetail;

  let playerElement: HTMLElement;
  let player: Player;

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
    player = Videojs(playerElement, {
      controls: true,
      autoplay: true,
      preload: "auto",
      textTrackSettings: false,
      fluid: true,
    });
    
    (player as any).landscapeFullscreen({
      fullscreen: {
        enterOnRotate: true,           // masuk fullscreen saat perangkat diputar ke landscape
        exitOnRotate: true,            // keluar fullscreen saat kembali ke portrait
        alwaysInLandscapeMode: true,   // selalu fullscreen dalam mode landscape
        iOS: true                       // menggunakan fullscreen palsu di iOS agar kontrol tetap muncul
      }
    })

    player.disablePictureInPicture(true)
  })

  onDestroy(() => {
    if (player) {
			console.log("VideoJS destroy")

			player.dispose();
		}
    
  })
</script>

<video
	bind:this={playerElement}
	src={animeDetail?.videoUrls[animeDetail?.videoUrls?.length - 1]}
	playsinline
  controls
  preload="auto"
  class="video-js"
  poster="/images/finime-poster.png"
  disablePictureInPicture
  data-setup={'{"controlBar": {"pictureInPictureToggle": false, "captionsButton": false, "captionSettingsMenuItem": false, "skipButtons": { "backward": 10, "forward": 10 }}}'}
>
	{#each animeDetail?.videoUrls as videoUrl}
		<source src={videoUrl} type="video/mp4" />
	{/each}

	<track kind="captions" />
</video>
