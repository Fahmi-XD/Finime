<script context="module" lang="ts">
  let currentVideo: HTMLVideoElement;

  function onPlay(e: Event) {
    if (currentVideo && currentVideo !== e.target) currentVideo.pause(); // Pause other videos
    currentVideo = e.target as HTMLVideoElement;
  }
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { uid, preloadImage, prepareVideoSources } from './utils';

  import Poster from './Poster.svelte';
  import Controls from './Controls.svelte';
  import CenterIcons from './CenterIcons.svelte';
  import BottomControls from './BottomControls.svelte';
  import Playbar from './Playbar.svelte';
  import PlayPauseButton from './PlayPauseButton.svelte';
  import VolumeButton from './VolumeButton.svelte';
  import VolumeControl from './VolumeControl.svelte';
  import FullscreenButton from './FullscreenButton.svelte';
  import FullscreenManager from './FullscreenManager.svelte';
  import IdleDetector from './IdleDetector.svelte';
  import ScrollDetector from './ScrollDetector.svelte';
  import Spinner from './Spinner.svelte';
  import Time from './Time.svelte';

  //-------------------------------------------------------------------------------------------------------------------
  // PROPS
  //-------------------------------------------------------------------------------------------------------------------

  export let width: number | string;
  export let height: number | string;
  export let poster: string;
  export let source: string | string[];
  export let controlsHeight: string;
  export let trackHeight: string;
  export let thumbSize: string;
  export let centerIconSize: string;
  export let playerBgColor: string;
  export let color: string;
  export let focusColor: string;
  export let barsBgColor: string;
  export let iconColor: string;
  export let bufferedColor: string;
  export let chunkBars: boolean;
  export let borderRadius: string;
  export let loop: boolean;
  export let skipSeconds: number | string;
  export let aspectRatio: number;
  export let controlsOnPause: boolean;
  export let timeDisplay: boolean;

  $: _sources = prepareVideoSources(source);
  $: _skipSeconds = parseFloat(String(skipSeconds));

  //-------------------------------------------------------------------------------------------------------------------
  // REACTIVE CONFIG CONTEXT
  //-------------------------------------------------------------------------------------------------------------------

  const config = writable<{
    controlsHeight: number;
    thumbSize: number;
    trackHeight: number;
    centerIconSize: number;
    color: string;
    playerBgColor: string;
    focusColor: string;
    barsBgColor: string;
    iconColor: string;
    bufferedColor: string;
    chunkBars: boolean;
    loop: boolean;
    borderRadius: number;
    controlsOnPause: boolean;
    timeDisplay: boolean;
  }>({
    controlsHeight: parseInt(controlsHeight),
    thumbSize: parseInt(thumbSize),
    trackHeight: parseInt(trackHeight),
    centerIconSize: parseInt(centerIconSize),
    color,
    playerBgColor,
    focusColor,
    barsBgColor,
    iconColor,
    bufferedColor,
    chunkBars,
    loop,
    borderRadius: parseInt(borderRadius),
    controlsOnPause,
    timeDisplay,
  });
  setContext('config', config);



  //-------------------------------------------------------------------------------------------------------------------
  // VIDEO ELEMENT BINDINGS
  //-------------------------------------------------------------------------------------------------------------------

  let videoPlayerElement: HTMLDivElement;
  let videoElement: HTMLVideoElement;
  let currentTime = 0;
  let duration: number = 0;
  let buffered: any[] = []; // [{start, end}]
  let played: any[] = []; // [{start, end}]
  let seeking: boolean = false;
  let ended: boolean = false;
  let paused = true;
  let volume = 1;
  let muteVolume = 1;

  $: muted = volume == 0;

  $: {
    if (ended) {
      currentTime = 0;
      if (loop) videoElement.play();
    }
  }

  //-------------------------------------------------------------------------------------------------------------------
  // APP STATE FLAGS
  //-------------------------------------------------------------------------------------------------------------------

  let isVideoData: boolean = false;
  let isPointerOverVideo: boolean = false;
  let isPointerOverControls: boolean = false;
  let isBuffering: boolean = false;
  let isFullscreenEnabled: boolean = true;
  let isFullscreen: boolean = false;
  let isIdle: boolean = false;
  let isScrolling: boolean = false;
  let isScrubbing: boolean = false;
  let isKeyDown: boolean = false;

  $: isPosterVisible = !isVideoData || (paused && currentTime == 0);

  $: isBottomControlsVisible = (isVideoData && ((paused && controlsOnPause) || (isPointerOverVideo && !isIdle))) || (paused && controlsOnPause);

  $: isSpinnerVisible = seeking || isBuffering;

  $: isCenterIconVisible = !isVideoData || (paused && !isScrubbing);

  //-------------------------------------------------------------------------------------------------------------------
  // EVENT HANDLERS
  //-------------------------------------------------------------------------------------------------------------------

  function onVideoLoadedData(e: Event): void {
    isVideoData = true;
  }

  function onVideoPlaying(e: Event): void {
    isBuffering = false;
  }

  function onVideoWaiting(e: Event): void {
    isBuffering = true;
  }

  //-------------------------------------------------------------------------------------------------------------------

  function onPlayerPointerOver(e: Event): void {
    isPointerOverVideo = true;
  }

  function onPlayerPointerOut(e: Event): void {
    isPointerOverVideo = false;
  }

  function onPlayerPointerUp(e: Event): void {
    if (!isPointerOverControls && !isScrolling) {
      paused = !paused;
    }
  }

  //-------------------------------------------------------------------------------------------------------------------

  function onWindowKeyDown(e: KeyboardEvent): void {
    if (currentVideo !== videoElement) return;
    switch (e.code) {
      case 'Tab':
        if (isKeyDown) break; // Prevent long press
        if (!isBottomControlsVisible) {
          e.stopPropagation();
          e.preventDefault();
          isBottomControlsVisible = true;
        }
        break;
      case 'Space':
        if (isKeyDown) break; // Prevent long press
        e.preventDefault(); // Prevent page scroll
        currentVideo.paused ? currentVideo.play() : currentVideo.pause();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        timeJump(true);
        break;
      case 'ArrowRight':
        e.preventDefault();
        timeJump(false);
        break;
    }
    isKeyDown = true;
  }

  function onWindowKeyUp(e: KeyboardEvent): void {
    if (currentVideo !== videoElement) return;
    isKeyDown = false;
  }

  function timeJump(back: boolean): void {
    const t = videoElement.currentTime;
    const d = videoElement.duration;
    if (back) videoElement.currentTime = t > _skipSeconds ? t - _skipSeconds : 0;
    else videoElement.currentTime = t + _skipSeconds < d ? t + _skipSeconds : d - 0.2;
  }

  //-------------------------------------------------------------------------------------------------------------------

  function onFullscreenButtonPointerUp(e: Event): void {
    isFullscreen = !isFullscreen;
  }

  function onPlaybarPointerUp(e: Event): void {
    if (videoElement && !paused) paused = false;
  }

  function onPlayPauseButtonPointerUp(e: Event): void {
    paused = !paused;
  }

  function onVolumeButtonPointerUp(e: Event): void {
    if (!muted) {
      muteVolume = volume;
      volume = 0;
    } else {
      volume = muteVolume;
      muteVolume = 1;
    }
  }

  function togglePause(): void {
    paused = !paused;
  }


</script>

<!--------------------------------------------------------------------------------------------------------------------
 STYLE
 --------------------------------------------------------------------------------------------------------------------->
<style>
  :global(video::-webkit-media-controls) {
    display: none !important; /* Hide fullscreen native controls */
  }

  .aspect {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%; /* default 1:1 */
    overflow: hidden;
    border-radius: 8px;
    /* Safari overflow:hidden fix */
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    mask-image: -webkit-radial-gradient(white, black);
  }

  .aspect > :first-child {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    outline: none;
  }

  video {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>

<!--------------------------------------------------------------------------------------------------------------------
 MARKUP
 --------------------------------------------------------------------------------------------------------------------->

<svelte:window on:keydown={onWindowKeyDown} on:keyup={onWindowKeyUp} />

<div
  class="aspect"
  style="padding-top:{aspectRatio * 100}%; background-color:{playerBgColor}; border-radius:{borderRadius}">
  {#await preloadImage(poster)}
    <div>
      <Spinner color={iconColor} size="60px" />
    </div>
  {:then}
    <div
      id="video-player-{uid()}"
      bind:this={videoPlayerElement}
      on:pointerover={onPlayerPointerOver}
      on:pointerout={onPlayerPointerOut}
      on:pointerup={onPlayerPointerUp}>
      <video
        {width}
        {height}
        bind:this={videoElement}
        bind:currentTime
        bind:duration
        bind:buffered
        bind:seeking
        bind:played
        bind:ended
        bind:paused
        bind:volume
        on:loadeddata|once={onVideoLoadedData}
        on:play={onPlay}
        on:playing={onVideoPlaying}
        on:waiting={onVideoWaiting}
        on:pointerover={onPlayerPointerOver}
        on:pointerout={onPlayerPointerOut}
        on:pointerup={onPlayerPointerUp}
        preload="metadata">
        <track kind="captions" />
        {#each _sources as { src, type }}
          <source {src} {type} />
        {/each}
        <p>Sorry, your browser doesn't support HTML5 videos.</p>
      </video>

      {#if poster && isPosterVisible}
        <Poster src={poster} />
      {/if}

      <Controls>
        <BottomControls hidden={!isBottomControlsVisible} bind:isPointerOver={isPointerOverControls}>
          <PlayPauseButton on:pointerup={onPlayPauseButtonPointerUp} {paused} />
          <Playbar
            {duration}
            {buffered}
            {played}
            {isBottomControlsVisible}
            bind:currentTime
            bind:paused
            bind:isScrubbing
            on:pointerup={onPlaybarPointerUp} />
          {#if timeDisplay}
            <Time {duration} {currentTime} />
          {/if}
          <VolumeButton on:pointerup={onVolumeButtonPointerUp} {muted} />
          <VolumeControl bind:volume />
          <FullscreenButton on:pointerup={onFullscreenButtonPointerUp} {isFullscreen} />
        </BottomControls>
        <CenterIcons
          isIconVisible={isCenterIconVisible}
          {isSpinnerVisible}
          {isBuffering}
          on:togglePause={togglePause} />
      </Controls>
    </div>
  {:catch error}
    <p style="color:red;">{error}</p>
  {/await}

  <!-- <BufferingDetector {currentTime} {paused} bind:isBuffering /> -->

  <IdleDetector bind:isIdle />

  <ScrollDetector bind:isScrolling />

  <FullscreenManager element={videoPlayerElement} bind:isFullscreenEnabled bind:isFullscreen />
</div>
