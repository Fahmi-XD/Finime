<script lang="ts">
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { MangaMobileClient } from '$lib/api/clients/mobile/mangaClient';
	import { runtimeData } from '$lib/stores/runtime';

	import type { IMangaSlug } from './+page';

	export let data: IMangaSlug;

	let images: HTMLImageElement[] = [];
	let chapterImages: string[];

	onMount(async () => {
		if (
			$runtimeData['manga.chapters.cache.' + data.mangaSlug] &&
			typeof $runtimeData['manga.chapters.cache.' + data.mangaSlug] == 'object'
		) {
			chapterImages = $runtimeData['manga.chapters.cache.' + data.mangaSlug];
			// isLoading = false;
		} else {
			// isLoading = true;
			const mangas = await MangaMobileClient.getChapterImage(data.mangaSlug);
			chapterImages = mangas;
			$runtimeData['manga.chapters.cache.' + data.mangaSlug] = mangas;
			// isLoading = false;
		}

    images = new Array<HTMLImageElement>(chapterImages.length);

		if (typeof window != 'undefined') {
      setTimeout(() => {
        for (const image of images) {
          const imageSrc = image.dataset['src'];
          const imageLoad = new Image();
          imageLoad.src = (imageSrc as string) || '';
  
          imageLoad.onload = () => {
            image.src = (imageSrc as string) || '';
          };
        }
      }, 1_000)
		}
	});
</script>

<div class="mt-5 pb-10" in:scale={{ duration: 200, start: 0.99 }}>
	<button
		aria-label="Back"
		on:click={() => window.history.back()}
		class="flex items-center gap-1 pl-5 pt-2 pb-4 text-lg text-white"
	>
		<ArrowLeft size={20} />
		<h1 class="text-lg font-semibold text-white opacity-70">Kembali</h1>
	</button>
	<h1 class="mb-5 mt-2 w-full text-center text-lg text-white">
		Kanan-sama wa Akumade Choroi Chapter 2
	</h1>
	<div class="mb-10">
    {#if images.length > 0}
      {#each chapterImages as image, i (i)}    
        <img
          bind:this={images[i]}
          src="/placeholder.png"
          data-src={image}
          alt="Manga"
        />
      {/each}
    {:else}
      {#each (new Array(5)).fill("") as image, i (i)}    
        <img
          src="/placeholder.png"
          alt="Manga"
        />
      {/each}
    {/if}
	</div>
	<div class="flex items-center justify-between px-5">
		<button class="flex items-center text-sm text-white"
			><ArrowLeft color="white" size={25} class="mr-1" /> Sebelumnya</button
		>
		<button class="flex items-center text-sm text-white"
			>Selanjutnya <ArrowRight color="white" size={25} class="ml-1" /></button
		>
	</div>
</div>
