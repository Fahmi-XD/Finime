<script lang="ts">
	import { truncate } from '$lib';
	import { Star } from '@lucide/svelte';
	import { onMount, onDestroy } from 'svelte';
	import { runtimeData } from '$lib/stores/runtime';
  import { MAX_SEGMENT } from '$lib/config/app';
  import { AnimeMobileClient } from '$lib/api/clients/mobile/animeClient';

	import SkeletonLoading from '$lib/components/ui/SkeletonLoading.svelte';

	import type { Datum } from '$lib/api/types/mobile/searchType';

	export let first: boolean;
	export let isLoading: boolean;
  export let query: string = "";
  export let oldQueryAnime: string = "";
  export let searchQueryAnime: string = "";
  export let htmlInputElement: HTMLInputElement;

	let animeList: Datum[] = [];
	let segmentList: Datum[] = [];
  let lastObserved: Element | undefined;
	let obs: IntersectionObserver;
  let isLoadingInter = false;

	let animeListElement: HTMLUListElement;

  $: {
		if (animeListElement || isLoadingInter) {
      const children = animeListElement.children;
      const last = children[children.length - 1];
      if (last && last !== lastObserved) {
        // if (lastObserved) obs.unobserve(lastObserved);
				if (obs) obs.observe(last);
        lastObserved = last;
      }
    };
	}

  $: {
    if (searchQueryAnime != oldQueryAnime) {
      searchAnimeQuery();
    }
  }
  
  async function searchAnimeQuery() {
		if (query || query.trim() != '') {
			lastObserved = undefined;
			htmlInputElement.blur();
			first = false;
			isLoading = true;
			const response = await AnimeMobileClient.getSearch(query);
			animeList = response;
			segmentList = response.slice(0, MAX_SEGMENT);
			$runtimeData['search.anime.segment'] = segmentList;
			$runtimeData['search.anime.cache'] = response;
			isLoading = false;
			oldQueryAnime = query;
		}
	}

  function handleIntersect(entries: IntersectionObserverEntry[]) {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				// stop observing the old target
				obs.unobserve(entry.target);
				loadMoreSegment();
			}
		}
	}

	function loadMoreSegment() {
		if (!isLoadingInter) {
			isLoadingInter = true;
			segmentList = animeList.slice(
				0,
				Math.min(segmentList.length + MAX_SEGMENT, animeList.length)
			);
			$runtimeData['search.anime.segment'] = segmentList;
			setTimeout(() => {
				isLoadingInter = false;
			}, 100);
		}
	}

	onMount(() => {
    obs = new IntersectionObserver(handleIntersect, { threshold: 1 });

		if ($runtimeData['search.anime.cache'] && $runtimeData['search.anime.cache']?.length) {
			first = false;
			animeList = $runtimeData['search.anime.cache'];
			if ($runtimeData['search.anime.segment'] && $runtimeData['search.anime.segment']?.length) {
				segmentList = $runtimeData['search.anime.segment'];
			}
		}
	});

  onDestroy(() => {
		if (obs) obs.disconnect();
	});
</script>

<div>
	{#if isLoading}
		<SkeletonLoading type="card" count={1} className="h-[160px] w-full" />
		<ul class="mt-7">
			{#if isLoading}
				<SkeletonLoading type="card-2" count={5} className="mt-5" />
			{/if}
		</ul>
	{:else if animeList.length == 0 && !isLoading}
		<div class="flex h-full w-full flex-col items-center justify-center">
			<h1 class="mt-5 w-auto text-start text-sm opacity-70">Tidak menemukan apa apa :(</h1>
		</div>
	{:else}
		<h1 class="mb-5 text-lg font-semibold opacity-70">Relevant result</h1>
		<a href="/mobile/anime/{animeList[0]?.id}/{animeList[0]?.slug}">
			<div class="w-full">
				<img
					class="h-[180px] w-full rounded-2xl object-cover"
					src={animeList[0].image_portrait_url}
					alt={animeList[0].title}
				/>
				<div class="mt-3 flex flex-col justify-between">
					<h1 class="text-sm font-semibold">
						{animeList[0].title}
					</h1>
					<div class="my-2 flex items-center gap-2">
						<span class="block h-[10px] w-[10px] rounded-full bg-yellow-500"></span>
						<h1 class="text-tiny opacity-80">{animeList[0].status}</h1>
						<div class="text-tiny ml-auto flex items-center gap-5">
							<h1 class="opacity-80">{animeList[0].aired_from}</h1>
							<div class="flex items-center gap-2">
								<Star size="15" fill="green" color="green" />
								<h1 class="text-green-500 opacity-80">{animeList[0].score}</h1>
							</div>
						</div>
					</div>
					<div class="text-tiny flex flex-nowrap items-center gap-3 overflow-x-auto">
						<span class="whitespace-nowrap text-red-500"
							>{animeList[0].posts?.length} Current Eps</span
						>
						<span class="whitespace-nowrap text-red-500"
							>{animeList[0].total_episodes} Total Eps</span
						>
						<span class="whitespace-nowrap text-red-500">{animeList[0].rating}</span>
					</div>
					<div class="text-tiny mt-1 flex flex-nowrap items-center gap-3 overflow-x-auto">
						{#each animeList[0]?.genres || [] as genre}
							<span class="whitespace-nowrap rounded-md bg-red-500 px-2 py-1 text-white"
								>{genre.label}</span
							>
						{/each}
					</div>
				</div>
			</div>
		</a>

		<ul class="mt-7" bind:this={animeListElement}>
			{#each segmentList as anime, i (i)}
				<li class="mt-5">
					<a href="/mobile/anime/{anime.id}/{anime.slug}">
						<div class="grid w-full grid-cols-[120px_1fr] justify-start gap-3">
							<img
								class="h-full w-full shrink-0 rounded-2xl object-cover"
								src={anime.image_portrait_url}
								alt={anime.title}
							/>
							<div class="flex w-full min-w-0 flex-col justify-between">
								<h1 class="text-sm font-semibold">{truncate(anime.title || '', 50)}</h1>
								<div>
									<h1 class="text-tiny opacity-80">Source: {anime.source}</h1>
									<h1 class="text-tiny opacity-80">Votes: {anime.votes}</h1>
									<div class="my-2 flex items-center gap-2">
										<span class="block h-[10px] w-[10px] rounded-full bg-green-500"></span>
										<h1 class="text-tiny opacity-80">{anime.status}</h1>
									</div>
									<div class="text-tiny flex items-center gap-5">
										<h1 class="opacity-80">{anime.aired_from}</h1>
										<div class="flex items-center gap-2">
											<Star size="15" fill="green" color="green" />
											<h1 class="text-tiny text-green-500 opacity-80">{anime.score}</h1>
										</div>
									</div>
									<div
										class="text-tiny no-scroll flex flex-nowrap items-center gap-3 overflow-x-auto text-nowrap"
									>
										<span class="whitespace-nowrap text-red-500"
											>{anime.posts?.length} Current Eps</span
										>
										<span class="whitespace-nowrap text-red-500"
											>{anime.total_episodes} Total Eps</span
										>
										<span class="whitespace-nowrap text-red-500">{anime.rating}</span>
									</div>
									<div
										class="text-tiny no-scroll mt-1 flex flex-nowrap items-center gap-3 overflow-x-auto"
									>
										{#each anime?.genres || [] as genre}
											<span class="whitespace-nowrap rounded-md bg-red-500 px-2 py-1 text-white"
												>{genre.label}</span
											>
										{/each}
									</div>
								</div>
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
