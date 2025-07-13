<script lang="ts">
	import { onMount } from 'svelte';
  import { Play, Pause } from "@lucide/svelte";

  export let videoUrl: string;

  let isPlaying: boolean = false;

	onMount(() => {
    console.log({videoUrl});
		const playPauseBtn = document.querySelectorAll('.play-pause-btn') as unknown as HTMLButtonElement[];
		const fullScreenBtn = document.querySelector('.full-screen-btn') as HTMLButtonElement;
		const miniPlayerBtn = document.querySelector('.mini-player-btn') as HTMLButtonElement;
		const muteBtn = document.querySelector('.mute-btn') as HTMLButtonElement;
		const captionsBtn = document.querySelector('.captions-btn') as HTMLButtonElement;
		const speedBtn = document.querySelector('.speed-btn') as HTMLButtonElement;
		const currentTimeElem = document.querySelector('.current-time') as HTMLElement;
		const totalTimeElem = document.querySelector('.total-time') as HTMLElement;
		const previewImg = document.querySelector('.preview-img') as HTMLImageElement;
		const thumbnailImg = document.querySelector('.thumbnail-img') as HTMLImageElement;
		const volumeSlider = document.querySelector('.volume-slider') as HTMLInputElement;
		const videoContainer = document.querySelector('.video-container') as HTMLElement;
		const timelineContainer = document.querySelector('.timeline-container') as HTMLElement;
		const video = document.querySelector('video') as HTMLVideoElement;

		document.addEventListener('keydown', (e) => {
			const tagName = document.activeElement?.tagName.toLowerCase();

			if (tagName === 'input') return;

			switch (e.key.toLowerCase()) {
				case ' ':
					if (tagName === 'button') return;
				case 'k':
					togglePlay();
					break;
				case 'f':
					toggleFullScreenMode();
					break;
				case 'i':
					toggleMiniPlayerMode();
					break;
				case 'm':
					toggleMute();
					break;
				case 'arrowleft':
				case 'j':
					skip(-5);
					break;
				case 'arrowright':
				case 'l':
					skip(5);
					break;
				case 'c':
					toggleCaptions();
					break;
			}
		});

		timelineContainer?.addEventListener('mousemove', handleTimelineUpdate);
		timelineContainer?.addEventListener('mousedown', toggleScrubbing);
		document.addEventListener('mouseup', (e) => {
			if (isScrubbing) toggleScrubbing(e);
		});
		document.addEventListener('mousemove', (e) => {
			if (isScrubbing) handleTimelineUpdate(e);
		});

		let isScrubbing = false;
		let wasPaused: boolean;
		function toggleScrubbing(e: MouseEvent) {
			const rect = timelineContainer?.getBoundingClientRect();
			if (!rect) return;
			const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
			isScrubbing = (e.buttons & 1) === 1;
			videoContainer?.classList.toggle('scrubbing', isScrubbing);
			if (isScrubbing) {
				wasPaused = video?.paused as boolean;
				video?.pause();
			} else {
				if (video && video.duration) {
					video.currentTime = percent * video.duration;
				}
				if (!wasPaused) video?.play();
			}

			handleTimelineUpdate(e);
		}

		function handleTimelineUpdate(e: MouseEvent) {
			const rect = timelineContainer?.getBoundingClientRect();
			if (!rect) return;
			const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
			const previewImgNumber = Math.max(1, Math.floor((percent * (video?.duration || 0)) / 10));
			const previewImgSrc = `assets/previewImgs/preview${previewImgNumber}.jpg`;
			if (previewImg) {
				previewImg.src = previewImgSrc;
			}
			timelineContainer?.style.setProperty('--preview-position', percent.toString());

			if (isScrubbing) {
				e.preventDefault();
				if (thumbnailImg) {
					thumbnailImg.src = previewImgSrc;
				}
				timelineContainer?.style.setProperty('--progress-position', percent.toString());
			}
		}

		// Playback Speed
		speedBtn?.addEventListener('click', changePlaybackSpeed);

		function changePlaybackSpeed() {
			if (!video) return;
			let newPlaybackRate = (video.playbackRate || 1) + 0.25;
			if (newPlaybackRate > 2) newPlaybackRate = 0.25;
			video.playbackRate = newPlaybackRate;
			if (speedBtn) {
				speedBtn.textContent = `${newPlaybackRate}x`;
			}
		}

		// Captions
		const captions = video?.textTracks[0];
		if (captions) {
			captions.mode = 'hidden';
		}

		captionsBtn?.addEventListener('click', toggleCaptions);

		function toggleCaptions() {
			if (!captions) return;
			const isHidden = captions.mode === 'hidden';
			captions.mode = isHidden ? 'showing' : 'hidden';
			videoContainer?.classList.toggle('captions', isHidden);
		}

		// Duration
		video?.addEventListener('loadeddata', () => {
			if (totalTimeElem && video?.duration) {
				totalTimeElem.textContent = formatDuration(video.duration);
			}
		});

		video?.addEventListener('timeupdate', () => {
			if (currentTimeElem && video?.currentTime !== undefined) {
				currentTimeElem.textContent = formatDuration(video.currentTime);
			}
			if (video?.currentTime !== undefined && video?.duration) {
				const percent = video.currentTime / video.duration;
				timelineContainer?.style.setProperty('--progress-position', percent.toString());
			}
		});

		const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
			minimumIntegerDigits: 2
		});
		function formatDuration(time: number) {
			const seconds = Math.floor(time % 60);
			const minutes = Math.floor(time / 60) % 60;
			const hours = Math.floor(time / 3600);
			if (hours === 0) {
				return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
			} else {
				return `${hours}:${leadingZeroFormatter.format(
					minutes
				)}:${leadingZeroFormatter.format(seconds)}`;
			}
		}

		function skip(duration: number) {
			if (video) {
				video.currentTime += duration;
			}
		}

		// Volume
		muteBtn?.addEventListener('click', toggleMute);
		volumeSlider?.addEventListener('input', (e) => {
			if (!video) return;
			const target = e.target as HTMLInputElement;
			video.volume = parseFloat(target.value);
			video.muted = target.value === '0';
		});

		function toggleMute() {
			if (video) {
				video.muted = !video.muted;
			}
		}

		video?.addEventListener('volumechange', () => {
			if (!video || !volumeSlider) return;
			volumeSlider.value = video.volume.toString();
			let volumeLevel;
			if (video.muted || video.volume === 0) {
				volumeSlider.value = '0';
				volumeLevel = 'muted';
			} else if (video.volume >= 0.5) {
				volumeLevel = 'high';
			} else {
				volumeLevel = 'low';
			}

			if (videoContainer) {
				videoContainer.dataset.volumeLevel = volumeLevel;
			}
		});

		// View Modes
		fullScreenBtn?.addEventListener('click', toggleFullScreenMode);
		miniPlayerBtn?.addEventListener('click', toggleMiniPlayerMode);

		function toggleFullScreenMode() {
			if (document.fullscreenElement == null) {
				videoContainer?.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		}

		function toggleMiniPlayerMode() {
			if (videoContainer?.classList.contains('mini-player')) {
				document.exitPictureInPicture();
			} else {
				video?.requestPictureInPicture();
			}
		}

		document.addEventListener('fullscreenchange', () => {
			videoContainer?.classList.toggle('full-screen', !!document.fullscreenElement);
		});

		video?.addEventListener('enterpictureinpicture', () => {
			videoContainer?.classList.add('mini-player');
		});

		video?.addEventListener('leavepictureinpicture', () => {
			videoContainer?.classList.remove('mini-player');
		});

		// Play/Pause
    playPauseBtn?.forEach(btn => btn.addEventListener('click', togglePlay));
		video?.addEventListener('click', togglePlay);

		function togglePlay() {
			if (video) {
				isPlaying = !isPlaying;
				isPlaying ? video.play() : video.pause();
			}
		}

		video?.addEventListener('play', () => {
			videoContainer?.classList.remove('paused');
		});

		video?.addEventListener('pause', () => {
			videoContainer?.classList.add('paused');
		});
	});
</script>

<section class="bg-red-500">
	<div class="video-container paused" data-volume-level="high">
		<img class="thumbnail-img" src={videoUrl} alt="Video Thumbnail" />
		<div class="video-controls-container">
			<div class="timeline-container">
				<div class="timeline">
					<div class="thumb-indicator"></div>
				</div>
			</div>
			<div class="controls">
				<button aria-label="Play/Pause" class="play-pause-btn">
					<svg class="play-icon" viewBox="0 0 24 24">
						<path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
					</svg>
					<svg class="pause-icon" viewBox="0 0 24 24">
						<path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
					</svg>
				</button>
				<div class="volume-container">
					<button class="mute-btn" aria-label="Mute/Unmute">
						<svg class="volume-high-icon" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
							/>
						</svg>
						<svg class="volume-low-icon" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
							/>
						</svg>
						<svg class="volume-muted-icon" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
							/>
						</svg>
					</button>
					<input class="volume-slider" type="range" min="0" max="1" step="any" value="1" />
				</div>
				<div class="duration-container">
					<div class="current-time">0:00</div>
					/
					<div class="total-time"></div>
				</div>
				<button class="speed-btn wide-btn"> 1x </button>
				<button class="mini-player-btn" aria-label="Mini Player">
					<svg viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
						/>
					</svg>
				</button>
				<button class="full-screen-btn" aria-label="Full Screen">
					<svg class="open" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
						/>
					</svg>
					<svg class="close" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
						/>
					</svg>
				</button>
			</div>
		</div>
		<video>
			<!-- <track kind="captions" srclang="en" src="assets/subtitles.vtt" /> -->
			<track kind="captions" />
      <source src={videoUrl} type="video/mp4" />
		</video>
    <div class="absolute top-1/2 left-1/2 rounded-full play-pause-btn -translate-x-1/2 {isPlaying ? 'opacity-0 group-hover:opacity-100 transition-opacity duration-300' : ''} -translate-y-1/2">
      {#if isPlaying}
        <Pause size="130" class="text-white p-5 bg-red-500 rounded-full" fill="white" />
      {:else}
        <Play size="130" class="text-white p-5 bg-red-500 rounded-full" fill="white" />
      {/if}
    </div>
	</div>
</section>

<style scoped>
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	.video-container {
		position: relative;
		width: 100%;
		max-width: 100%;
		display: flex;
		justify-content: center;
		margin-inline: auto;
		background-color: black;
	}

	.video-container.full-screen {
		max-width: initial;
		width: 100%;
	}

	.video-container.full-screen {
		max-height: 100vh;
	}

	video {
		width: 100%;
	}

	.video-controls-container {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		color: white;
		z-index: 100;
		opacity: 0;
		transition: opacity 150ms ease-in-out;
	}

	.video-controls-container::before {
		content: '';
		position: absolute;
		bottom: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
		width: 100%;
		aspect-ratio: 6 / 1;
		z-index: -1;
		pointer-events: none;
	}

	.video-container:hover .video-controls-container,
	.video-container:focus-within .video-controls-container,
	.video-container.paused .video-controls-container {
		opacity: 1;
	}

	.video-controls-container .controls {
		display: flex;
		gap: 0.5rem;
		padding: 0.25rem;
		align-items: center;
	}

	.video-controls-container .controls button {
		background: none;
		border: none;
		color: inherit;
		padding: 0;
		height: 30px;
		width: 30px;
		font-size: 1.1rem;
		cursor: pointer;
		opacity: 0.85;
		transition: opacity 150ms ease-in-out;
	}

	.video-controls-container .controls button:hover {
		opacity: 1;
	}

	.video-container.paused .pause-icon {
		display: none;
	}

	.video-container:not(.paused) .play-icon {
		display: none;
	}

	.video-container.full-screen .open {
		display: none;
	}

	.video-container:not(.full-screen) .close {
		display: none;
	}

	.volume-high-icon,
	.volume-low-icon,
	.volume-muted-icon {
		display: none;
	}

	.video-container[data-volume-level='high'] .volume-high-icon {
		display: block;
	}

	.video-container[data-volume-level='low'] .volume-low-icon {
		display: block;
	}

	.video-container[data-volume-level='muted'] .volume-muted-icon {
		display: block;
	}

	.volume-container {
		display: flex;
		align-items: center;
	}

	.volume-slider {
		width: 0;
		transform-origin: left;
		transform: scaleX(0);
		transition:
			width 150ms ease-in-out,
			transform 150ms ease-in-out;
	}

	.volume-container:hover .volume-slider,
	.volume-slider:focus-within {
		width: 100px;
		transform: scaleX(1);
	}

	.duration-container {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		flex-grow: 1;
	}

	.video-container.captions .captions-btn {
		border-bottom: 3px solid red;
	}

	.video-controls-container .controls button.wide-btn {
		width: 50px;
	}

	.timeline-container {
		height: 7px;
		margin-inline: 0.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	.timeline {
		background-color: rgba(100, 100, 100, 0.5);
		height: 3px;
		width: 100%;
		position: relative;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: calc(100% - var(--preview-position) * 100%);
		background-color: rgb(150, 150, 150);
		display: none;
	}

	.timeline::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: calc(100% - var(--progress-position) * 100%);
		background-color: red;
	}

	.timeline .thumb-indicator {
		--scale: 0;
		position: absolute;
		transform: translateX(-50%) scale(var(--scale));
		height: 200%;
		top: -50%;
		left: calc(var(--progress-position) * 100%);
		background-color: red;
		border-radius: 50%;
		transition: transform 150ms ease-in-out;
		aspect-ratio: 1 / 1;
	}

	.timeline .preview-img {
		position: absolute;
		height: 80px;
		aspect-ratio: 16 / 9;
		top: -1rem;
		transform: translate(-50%, -100%);
		left: calc(var(--preview-position) * 100%);
		border-radius: 0.25rem;
		border: 2px solid white;
		display: none;
	}

	.thumbnail-img {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		display: none;
	}

	.video-container.scrubbing .thumbnail-img {
		display: block;
	}

	.video-container.scrubbing .preview-img,
	.timeline-container:hover .preview-img {
		display: block;
	}

	.video-container.scrubbing .timeline::before,
	.timeline-container:hover .timeline::before {
		display: block;
	}

	.video-container.scrubbing .thumb-indicator,
	.timeline-container:hover .thumb-indicator {
		--scale: 1;
	}

	.video-container.scrubbing .timeline,
	.timeline-container:hover .timeline {
		height: 100%;
	}
</style>
