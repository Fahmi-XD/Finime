<script lang="ts">
	import type { IAnimeSlug } from './+page';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { ArrowLeft, Star, Eye, SlidersHorizontal } from '@lucide/svelte';

	import { AnimeMobileClient } from '$lib/api/clients/mobile/animeClient';
	import type { IAnimeDetail } from '$lib/api/types/mobile/detailType';

	import LoadingElements from '$lib/components/ui/LoadingElements.svelte';

	export let data: IAnimeSlug;

	let imgEl: HTMLImageElement;
	let bgHeight = 0;

	let animeDetail: IAnimeDetail;
	let isLoading = true;

	onMount(async () => {
		isLoading = true;
		const response = await AnimeMobileClient.getDetail(data.animeSlug);
		animeDetail = response;
		isLoading = false;

		setTimeout(() => {
			if (imgEl.complete) {
				bgHeight = imgEl.clientHeight;
			} else {
				imgEl.addEventListener('load', () => {
					bgHeight = imgEl.clientHeight;
				});
			}

			window.addEventListener('resize', () => {
				bgHeight = imgEl.clientHeight;
			});
		}, 10);
	});
</script>

{#if isLoading}
	<LoadingElements />
{:else}
	<div class="relative block overflow-x-hidden" in:scale={{ duration: 200, start: 0.95 }}>
		<div class="fixed top-0 -z-[5] flex h-auto w-screen bg-green-500">
			<span
				style="height: {bgHeight + 20}px"
				class="absolute top-0 z-[5] transition-all duration-200 flex w-screen bg-gradient-to-b from-black/30 to-black/95"
			></span>
			<img
				bind:this={imgEl}
				class="h-full w-screen object-contain blur-[2px]"
				src={animeDetail?.image}
				alt={animeDetail?.title}
			/>
		</div>

		<div class="mx-auto max-w-md px-4 pb-20 pt-3">
			<!-- Top bar -->
			<div class="mb-4 flex items-center justify-between">
				<button
					aria-label="Back"
					class="text-2xl text-white"
					on:click={() => window.history.back()}
				>
					<ArrowLeft size={24} />
				</button>
				<button class="rounded-full bg-white px-5 py-1.5 text-sm font-medium text-black">
					My Kisah
				</button>
			</div>

			<!-- Poster -->
			<div class="mb-4 mt-10 flex justify-center">
				<img
					alt="Anime poster showing five characters around a table with various dishes, one standing behind, colorful anime style"
					class="h-[380px] w-[270px] rounded-xl object-cover shadow-lg"
					src={animeDetail?.image}
				/>
			</div>

			<!-- Title and info -->
			<h1 class="mb-1 text-center text-xl font-semibold text-white">
				{animeDetail?.title}
			</h1>
			{#each animeDetail?.altTitles as title}
        <p class="mb-1 text-center text-sm text-gray-300">{title}</p>
      {/each}
			<p class="mb-1 text-center text-sm text-gray-300">{animeDetail?.type} | {animeDetail?.status} | {animeDetail?.airing?.from}</p>
			<p
				class="mb-3 flex items-center justify-center space-x-1 text-center font-semibold text-yellow-400"
			>
				<Star size={18} fill="yellow" />
				<span> 7.19 </span>
			</p>
			<!-- Tags -->
			<div class="mb-4 flex flex-wrap justify-center gap-2">
        {#each animeDetail?.genres as genre}
          <span class="rounded-full border-2 border-red-500 px-3 py-1 text-xs font-medium text-white">
            {genre.replace(",", "")}
          </span>
        {/each}
			</div>
			<div class="mb-4 flex flex-wrap justify-center gap-2">
        {#each animeDetail?.relatedTags as tag}
          <span class="rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white">
            {tag}
          </span>
        {/each}
			</div>

			<!-- Description -->
			<p class="mb-3 text-center min-h-0 max-h-50 overflow-y-auto text-sm leading-relaxed text-gray-300">
				{animeDetail?.description}
			</p>

			<!-- Episode header -->
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-xl font-semibold text-white">Episode ({animeDetail?.episodeList.length})</h2>
				<button aria-label="Sort episodes" class="rounded-lg bg-[#2e2a3d] p-3 text-white">
					<SlidersHorizontal size={20} />
				</button>
			</div>

			<!-- Episodes list -->
			<div class="space-y-4 flex flex-col gap-2">
				{#each animeDetail?.episodeList as episode}
          <a href="/mobile/anime/watch/{data.animeSlug}/{episode.ep}">
            <div class="flex items-center justify-between rounded-xl bg-[#2e2a3d] p-4 text-gray-300">
              <div>
                <h3 class="mb-1 text-lg font-normal text-white">Episode {episode.ep}</h3>
                <!-- <p class="text-xs text-gray-400">27 Juli, 2025</p> -->
              </div>
              <div class="flex items-center space-x-1 text-sm text-gray-400">
                <Eye size={16} />
                <!-- <span> 4866 </span> -->
              </div>
            </div>
          </a>
        {/each}
			</div>
		</div>
	</div>
{/if}
