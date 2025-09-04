<script lang="ts">
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { MangaMobileClient } from '$lib/api/clients/mobile/mangaClient';
	import { runtimeData } from '$lib/stores/runtime';
	import { goto } from '$app/navigation';

	import type { IMangaSlug } from './+page';
	import type { MangaDetail } from '$lib/api/types/mobile/manga/detailType';

	export let data: IMangaSlug;

	let images: HTMLImageElement[] = [];
	let chapterImages: string[];
	let chapterTitle: string = "Loading ...";
	let mangaDetail: MangaDetail = {};
	let currentChapter: string = "";
	let currentChapterIndex: number = 0;

	async function setUpChapter() {
		chapterTitle = "Loading ..."

		if (
			$runtimeData['manga.chapters.cache.' + data.mangaSlug] &&
			typeof $runtimeData['manga.chapters.cache.' + data.mangaSlug] == 'object'
		) {
			chapterImages = $runtimeData['manga.chapters.cache.' + data.mangaSlug];
			chapterTitle = $runtimeData['manga.chapters.title.cache.' + data.mangaSlug];
			currentChapter = $runtimeData['manga.chapters.currentChapter.cache.' + data.mangaSlug];
			// isLoading = false;
		} else {
			// isLoading = true;
			const mangas = await MangaMobileClient.getChapterImage(data.mangaSlug);
			chapterTitle = mangas.title;
			chapterImages = mangas.images;
			currentChapter = mangas.current_chapter;

			$runtimeData['manga.chapters.cache.' + data.mangaSlug] = mangas.images;
			$runtimeData['manga.chapters.title.cache.' + data.mangaSlug] = mangas.title;
			$runtimeData['manga.chapters.currentChapter.cache.' + data.mangaSlug] = mangas.current_chapter;
			// isLoading = false;
		}

		if (
			$runtimeData['manga.detail.cache.' + data.mangaSlug.replace(/-chapter.*/gi, "")] &&
			typeof $runtimeData['manga.detail.cache.' + data.mangaSlug.replace(/-chapter.*/gi, "")] == 'object'
		) {
			mangaDetail = $runtimeData['manga.detail.cache.' + data.mangaSlug.replace(/-chapter.*/gi, "")];
			// isLoading = false;
		} else {
			// isLoading = true;
			const mangas = await MangaMobileClient.getDetail(data.mangaSlug.replace(/-chapter.*/gi, ""));
			mangaDetail = mangas;
			$runtimeData['manga.detail.cache.' + data.mangaSlug.replace(/-chapter.*/gi, "")] = mangas;
			// isLoading = false;
		}

		// console.log(!!currentChapterIndex);
		// console.log(currentChapterIndex)

		currentChapterIndex = ((mangaDetail.chapters?.length || 1) - 1) - (mangaDetail.chapters?.findIndex((chapter) => chapter.number == currentChapter) || 0);

    images = new Array<HTMLImageElement>((chapterImages?.length) || 0);
			
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
      }, 5_00)
		}
	}

	onMount(() => {
		setUpChapter();
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
		{chapterTitle}
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
		<button on:click={() => {
			goto("/mobile/manga/read/" + (mangaDetail.chapters?.[(mangaDetail?.chapters?.length - 1) - (currentChapterIndex - 1)].url || ""), { replaceState: true });
			data.mangaSlug = mangaDetail.chapters?.[(mangaDetail?.chapters?.length - 1) - (currentChapterIndex - 1)].url || "";
			images = [];
			setUpChapter();
		}} disabled={!!!mangaDetail.chapters?.[(mangaDetail?.chapters?.length - 1) - (currentChapterIndex - 1)]?.url} class="flex disabled:opacity-30 disabled:cursor-not-allowed items-center text-sm text-white"
			><ArrowLeft color="white" size={25} class="mr-1" /> Sebelumnya</button
		>
		<button on:click={() => {
			goto("/mobile/manga/read/" + (mangaDetail.chapters?.[(mangaDetail?.chapters?.length - 1) - (currentChapterIndex + 1)].url || ""), { replaceState: true });
			data.mangaSlug = mangaDetail.chapters?.[(mangaDetail?.chapters?.length - 1) - (currentChapterIndex + 1)].url || "";
			images = [];
			setUpChapter();
		}} disabled={!!!mangaDetail.chapters?.[(mangaDetail?.chapters?.length - 1) - (currentChapterIndex + 1)]?.url} class="flex disabled:opacity-30 disabled:cursor-not-allowed items-center text-sm text-white"
			>Selanjutnya <ArrowRight color="white" size={25} class="ml-1" /></button
		>
	</div>
</div>
