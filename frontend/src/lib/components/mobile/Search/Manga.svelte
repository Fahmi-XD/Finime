<script lang="ts">
	import { truncate } from '$lib';
	import { onMount, onDestroy } from 'svelte';
	import { runtimeData } from '$lib/stores/runtime';
  import { MAX_SEGMENT } from '$lib/config/app';
  import { MangaMobileClient } from '$lib/api/clients/mobile/mangaClient';

	import SkeletonLoading from '$lib/components/ui/SkeletonLoading.svelte';

	import type { All } from '$lib/api/types/mobile/manga/searchType';

	export let first: boolean;
	export let isLoading: boolean;
  export let query: string = "";
  export let oldQueryManga: string = "";
  export let searchQueryManga: string = "";
  export let htmlInputElement: HTMLInputElement;

	let mangaList: All[] = [];
	let segmentList: All[] = [];
  let lastObserved: Element | undefined;
	let obs: IntersectionObserver;
  let isLoadingInter = false;

	let searchQueryMangaListElement: HTMLUListElement;

  $: {
		if (searchQueryMangaListElement || isLoadingInter) {
      const children = searchQueryMangaListElement.children;
      const last = children[children.length - 1];
      if (last && last !== lastObserved) {
        // if (lastObserved) obs.unobserve(lastObserved);
				if (obs) obs.observe(last);
        lastObserved = last;
      }
    };
	}

  $: {
    if (searchQueryManga != oldQueryManga) {
      searchMangaQuery();
    }
  }
  
  async function searchMangaQuery() {
		if (query || query.trim() != '') {
			lastObserved = undefined;
			htmlInputElement.blur();
			first = false;
			isLoading = true;
			const response = await MangaMobileClient.getSearch(query);
			mangaList = response;
			segmentList = response.slice(0, MAX_SEGMENT);
			$runtimeData['search.manga.segment'] = segmentList;
			$runtimeData['search.manga.cache'] = response;
			isLoading = false;
			oldQueryManga = query;
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
			segmentList = mangaList.slice(
				0,
				Math.min(segmentList.length + MAX_SEGMENT, mangaList.length)
			);
			$runtimeData['search.manga.segment'] = segmentList;
			setTimeout(() => {
				isLoadingInter = false;
			}, 100);
		}
	}

	onMount(() => {
    obs = new IntersectionObserver(handleIntersect, { threshold: 1 });

		if ($runtimeData['search.manga.cache'] && $runtimeData['search.manga.cache']?.length) {
			first = false;
			mangaList = $runtimeData['search.manga.cache'];
			if ($runtimeData['search.manga.segment'] && $runtimeData['search.manga.segment']?.length) {
				segmentList = $runtimeData['search.manga.segment'];
			}
		}
	});

  onDestroy(() => {
		if (obs) obs.disconnect();
	});
</script>

<div>
	{#if isLoading}
		<ul class="mt-1">
			{#if isLoading}
				<SkeletonLoading type="card-2" count={5} className="mt-5" />
			{/if}
		</ul>
	{:else if mangaList.length == 0 && !isLoading}
		<div class="flex h-full w-full flex-col items-center justify-center">
			<h1 class="mt-5 w-auto text-start text-sm opacity-70">Tidak menemukan apa apa :(</h1>
		</div>
	{:else}
		<h1 class="mb-5 text-lg font-semibold opacity-70">Relevant result</h1>
		<ul class="mt-7" bind:this={searchQueryMangaListElement}>
			{#each segmentList as manga, i (i)}
				<li class="mt-5">
					<a href="/mobile/manga/{manga.post_link}">
						<div class="grid w-full grid-cols-[120px_1fr] justify-start gap-3">
							<img
								class="h-full w-full shrink-0 rounded-2xl object-cover"
								src={manga.post_image}
								alt={manga.post_title}
							/>
							<div class="flex w-full min-w-0 flex-col justify-between">
								<h1 class="text-sm font-semibold">{truncate(manga.post_title || '', 150)}</h1>
								<div>
									<h1 class="text-tiny opacity-80">Type: {manga.post_type}</h1>
									<div class="my-2 flex items-center gap-2">
										<span class="block h-[10px] w-[10px] rounded-full {manga.post_status == "Ongoing" ? "bg-yellow-500" : "bg-green-500"}"></span>
										<h1 class="text-tiny opacity-80">{manga.post_status}</h1>
									</div>
									<div
										class="text-tiny no-scroll mt-1 flex flex-nowrap items-center gap-3 overflow-x-auto"
									>
										{#each manga?.post_genres?.split(", ") || [] as genre}
											<span class="whitespace-nowrap rounded-md bg-red-500 px-2 py-1 text-white"
												>{genre}</span
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
