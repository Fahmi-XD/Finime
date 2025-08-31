<script lang="ts">
	import { ArrowLeft, SlidersHorizontal, Search } from '@lucide/svelte';
	import { scale } from 'svelte/transition';
	import { AnimeMobileClient } from '$lib/api/clients/mobile/animeClient';
	import { UserMobileClient } from '$lib/api/clients/mobile/userClient';
	import type { Datum } from '$lib/api/types/mobile/searchType';
	import { runtimeData } from '$lib/stores/runtime';
	import { onMount, onDestroy } from 'svelte';
	import type { User as UserType } from '$lib/api/types/mobile/usersType';

	import Anime from "$lib/components/mobile/Search/Anime.svelte"
	import User from "$lib/components/mobile/Search/User.svelte"

	const MAX_SEGMENT = 5;

	let query: string = '';
	let oldQueryAnime: string = '';
	let oldQueryUsers: string = '';

	let isLoading = false;
	let animeList: Datum[] = [];
	let first: boolean =  $runtimeData["first"] ?? true;
	let segmentList: Datum[] = [];
	let currentTab: string =  $runtimeData["currentTab"] ?? "0";

	let users: UserType[] = [];
	let segmentListUsers: UserType[] = [];

	let isLoadingInter = false;

	let animeListElement: HTMLUListElement;
	let lastObserved: Element | undefined;
	let obs: IntersectionObserver;
	let htmlInputElement: HTMLInputElement;

	function searchQuery() {
		if (currentTab == "0") {
			if ($runtimeData['search.cache'] && $runtimeData['search.cache']?.length && query == oldQueryAnime) {
				first = false;
				animeList = $runtimeData['search.cache'];
				if ($runtimeData['search.segment'] && $runtimeData['search.segment']?.length) {
					segmentList = $runtimeData["search.segment"];
				}
			} else {
				searchAnimeQuery();
			}
		} else if (currentTab == "1") {
			if ($runtimeData['search.user.cache'] && $runtimeData['search.user.cache']?.length && query == oldQueryUsers) {
				first = false;
				users = $runtimeData['search.user.cache'];
				if ($runtimeData['search.user.segment'] && $runtimeData['search.user.segment']?.length) {
					segmentListUsers = $runtimeData["search.user.segment"];
				}
			} else {
				searchUsersByQuery();
			}
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
			$runtimeData['search.segment'] = segmentList;
			$runtimeData['search.cache'] = response;
			isLoading = false;
			oldQueryAnime = query;
		}
	}

	async function searchUsersByQuery() {
		if (query || query.trim() != '') {
			lastObserved = undefined;
			htmlInputElement.blur();
			first = false;
			isLoading = true;
			const response = await UserMobileClient.getUsersByQuery(query);
			users = (response.users || []) as UserType[];
			segmentListUsers = (response.users || []).slice(0, MAX_SEGMENT);
			$runtimeData['search.user.segment'] = segmentListUsers;
			$runtimeData['search.user.cache'] = (response.users || []);
			isLoading = false;
			oldQueryUsers = query;
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
			$runtimeData['search.segment'] = segmentList;
			setTimeout(() => {
				isLoadingInter = false;
			}, 100);
		}
	}

	function handleBind(el: HTMLUListElement) {
    animeListElement = el;
  }

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
		if (currentTab == "1") {
			searchQuery();
		} else if (currentTab == "0") {
			searchQuery();
		}
		$runtimeData["currentTab"] = currentTab;
	}

	$: if (!first || first) {
		$runtimeData["first"] = first;
	}

	onMount(() => {
		obs = new IntersectionObserver(handleIntersect, { threshold: 1 });
	
		if (currentTab == "0") {
			if ($runtimeData['search.cache'] && $runtimeData['search.cache']?.length) {
				first = false;
				animeList = $runtimeData['search.cache'];
				if ($runtimeData['search.segment'] && $runtimeData['search.segment']?.length) {
					segmentList = $runtimeData["search.segment"];
				}
			}
		} else if (currentTab == "1") {
			if ($runtimeData['search.user.cache'] && $runtimeData['search.user.cache']?.length) {
				first = false;
				users = $runtimeData['search.user.cache'];
				if ($runtimeData['search.user.segment'] && $runtimeData['search.user.segment']?.length) {
					segmentListUsers = $runtimeData["search.user.segment"];
				}
			}
		}

	});

	onDestroy(() => {
		if (obs) obs.disconnect();
	});
</script>

<div class="pt-5 px-5 pb-[70px] text-white will-change-transform" in:scale={{ duration: 200, start: 0.95 }}>
	<div class="block h-auto w-full bg-black">
		<div class="flex h-auto w-full items-center justify-between">
			<button on:click={() => window.history.back()}>
				<ArrowLeft size={20} />
			</button>
			<h1 class="text-lg font-bold">Search</h1>
			<SlidersHorizontal size={20} />
		</div>
		<div class="relative mt-5">
			<button
				class="absolute bottom-0 left-3 top-0 my-auto"
				on:click={() => {
					if (!isLoading) searchQuery();
				}}
			>
				<Search size={20} />
			</button>
			<input
				class="bg-dark h-auto text-sm w-full rounded-2xl border border-white/10 p-2 pl-12 outline-none"
				type="text"
				bind:value={query}
				bind:this={htmlInputElement}
				required
				on:keydown={(e) => {
					if (e.key == 'Enter' && !isLoading) searchQuery();
				}}
				placeholder="Attack On Titan"
			/>
		</div>
	</div>

	<div class="mt-1">
		{#if first}
			<div class="flex h-full w-full flex-col items-center justify-center">
				<video class="h-40 w-40 object-cover object-top" autoplay muted loop>
					<source src="/images/when.mp4" />
				</video>
				<h1 class="text-sm mt-5 w-auto text-start opacity-70">
					Kapan yah kaya orang orang ...
				</h1>
			</div>
		{:else}
			<div class="flex w-full justify-around items-center pb-10">
				<button on:click={() => currentTab = "0"} class="text-sm w-full h-11 before:transition-transform before:duration-100 relative before:block before:bg-red-500 before:w-full before:h-[2px] before:rounded-xl before:bottom-0 before:absolute {currentTab == "0" ? "before:scale-x-100" : "before:scale-x-0"}">Anime</button>
				<p class="opacity-50">|</p>
				<button on:click={() => currentTab = "1"} class="text-sm w-full h-11 before:transition-transform before:duration-100 relative before:block before:bg-red-500 before:w-full before:h-[2px] before:rounded-xl before:bottom-0 before:absolute {currentTab == "1" ? "before:scale-x-100" : "before:scale-x-0"}">User</button>
			</div>
			{#key currentTab}
				{#if currentTab == "0"}
					<Anime bindElement={handleBind} {animeList} {segmentList} {isLoading} />
				{:else if currentTab == "1"}
					<User users={users} {isLoading} />
				{/if}
			{/key}
		{/if}
	</div>
</div>
