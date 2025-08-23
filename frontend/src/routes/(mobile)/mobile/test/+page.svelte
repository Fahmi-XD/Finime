<script lang="ts">
    import videojs from 'video.js';
    import 'video.js/dist/video-js.min.css';
    import { onDestroy, onMount } from 'svelte';
    import type Player from 'video.js/dist/types/player';

    let player: Player;
    let playerElement: HTMLVideoElement;

    onMount(() => {
        player = videojs(playerElement, { fluid: true });
    });

    onDestroy(() => {
        if (player) player.dispose();
    });
</script>

<video class="video-js" controls bind:this={playerElement} preload="auto">
    <track kind="captions">
    <source src="https://megumin.my.id/kdrive/zpVhLmktute/Kuramanime-RSDERE-01-360p-BGlobal.mp4?gid=1mY0NoQuMij6CfuPO4PayWVqI_rxOdme6&id=947965607926-5i6scvg78ur1d9vejp82vj5sname7mka.apps.googleusercontent.com&sc=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&rt=1//09-tPV2OwA0UaCgYIARAAGAkSNwF-L9Irk11oL189KwB4Q4ahtiCdPzwPul3xff1A-WFwfwjYzghrJadP57_jnBNtTsHoNHs79bE&cce=1" type="video/mp4">
</video>