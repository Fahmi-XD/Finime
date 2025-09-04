<script lang="ts">
	import { ArrowLeft, SlidersHorizontal, Search } from '@lucide/svelte';
	import { scale } from 'svelte/transition';
	import { runtimeData } from '$lib/stores/runtime';

	import Anime from "$lib/components/mobile/Search/Anime.svelte"
	import User from "$lib/components/mobile/Search/User.svelte"
	import Manga from "$lib/components/mobile/Search/Manga.svelte"

	let query: string = '';
	let oldQueryAnime: string = '';
	let oldQueryUsers: string = '';
	let oldQueryManga: string = '';

	let searchQueryAnime: string = '';
	let searchQueryManga: string = '';
	let searchQueryUsers: string = '';

	let isLoading = false;
	let first: boolean = $runtimeData["first"] ?? true;
	let currentTab: string = $runtimeData["currentTab"] ?? "0";

	let htmlInputElement: HTMLInputElement;

	$: if (!first || first) {
		$runtimeData["first"] = first;
	}

	$: if (currentTab) {
		$runtimeData["currentTab"] = currentTab;
	}

	function searchQuery() {
		first = false;

		searchQueryAnime = searchQueryUsers = searchQueryManga = query;
	}
</script>

<div class="pt-5 px-5 pb-[70px] text-white will-change-transform" in:scale={{ duration: 200, start: 0.99 }}>
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
				<button on:click={() => currentTab = "2"} class="text-sm w-full h-11 before:transition-transform before:duration-100 relative before:block before:bg-red-500 before:w-full before:h-[2px] before:rounded-xl before:bottom-0 before:absolute {currentTab == "2" ? "before:scale-x-100" : "before:scale-x-0"}">Manga</button>
				<p class="opacity-50">|</p>
				<button on:click={() => currentTab = "1"} class="text-sm w-full h-11 before:transition-transform before:duration-100 relative before:block before:bg-red-500 before:w-full before:h-[2px] before:rounded-xl before:bottom-0 before:absolute {currentTab == "1" ? "before:scale-x-100" : "before:scale-x-0"}">User</button>
			</div>
			{#key currentTab}
				{#if currentTab == "0"}
					<Anime first={first} htmlInputElement={htmlInputElement} isLoading={isLoading} bind:oldQueryAnime={oldQueryAnime} searchQueryAnime={searchQueryAnime} query={query} />
				{:else if currentTab == "2"}
					<Manga first={first} htmlInputElement={htmlInputElement} isLoading={isLoading} bind:oldQueryManga={oldQueryManga} searchQueryManga={searchQueryManga} query={query} />
				{:else if currentTab == "1"}
					<User first={first} htmlInputElement={htmlInputElement} isLoading={isLoading} bind:oldQueryUsers={oldQueryUsers} searchQueryUsers={searchQueryUsers} query={query} />
				{/if}
			{/key}
		{/if}
	</div>
</div>
