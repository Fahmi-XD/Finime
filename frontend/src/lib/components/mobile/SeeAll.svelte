<script lang="ts">
  import { ArrowLeft, Search, Star } from "@lucide/svelte";
	import { scale } from "svelte/transition";
	import { seeAllTitle } from "$lib/stores/home.mobile";
	import { onMount } from "svelte";
	import type { Animes } from "$lib/api/types/mobile/summerType";
	import { truncate } from "$lib";
	import { goto } from "$app/navigation";

	import { runtimeData } from "$lib/stores/runtime";

	import LoadingElements from "../ui/LoadingElements.svelte";

	import { AnimeMobileClient } from "$lib/api/clients/mobile/animeClient";

	let animeList: Animes | undefined = {};
	let isLoading = true;

	onMount(async () => {
		if ($runtimeData["seeall.cache"] && typeof $runtimeData["seeall.cache"] == "object") {
			isLoading = false;
			animeList = $runtimeData["seeall.cache"];
		} else {
			isLoading = true;
			if ($seeAllTitle == "Teratas") {
				const animes = await AnimeMobileClient.getSummer();
				animeList = animes.animes;
				$runtimeData["seeall.cache"] = animes.animes
				isLoading = false;
			}
		}
	})
</script>

<div class="max-w-md pt-10 pb-5 px-6" in:scale={{ duration: 200, start: 0.95 }}>
	<header class="mb-10 flex items-center space-x-4">
		<button aria-label="Back" on:click={() => window.history.back()} class="text-lg flex items-center gap-1 text-white">
			<ArrowLeft size={20} />
			<h1 class="text-lg font-semibold text-white opacity-70">{$seeAllTitle}</h1>
		</button>
		<button aria-label="Search" class="ml-auto text-lg text-white" on:click={() => {goto("/mobile/search", { replaceState: true })}}>
			<Search size={20} />
		</button>
	</header>

	<ul class="space-y-6">
		{#if isLoading}
			<div class="h-30 w-full flex justify-center items-center">
				<LoadingElements variant="normal" />
			</div>
		{:else}
			{#each animeList?.data || [] as anime}	
				<li class="flex space-x-4">
					<div class="relative h-[160px] w-[120px] flex-shrink-0">
						<img
							alt={anime.title}
							class="h-[160px] w-[120px] rounded-lg object-cover"
							src={anime.image_portrait_url}
						/>
						<span class="absolute text-white left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-tiny font-semibold">
							{anime.posts?.length} / {anime.total_episodes} Eps
						</span>
						<span class="absolute text-white right-2 bottom-2 rounded bg-red-500 px-2 py-0.5 text-tiny font-semibold">
							{anime.type}
						</span>
					</div>
					<div class="flex flex-col justify-between">
						<div>
							<h2 class="text-lg font-semibold leading-tight text-white">
								{truncate(anime.title || "", 50)}
							</h2>
							<p class="mt-4 text-tiny text-gray-400">{anime.aired_from}</p>
							<p class="mt-1 max-w-xs text-tiny text-gray-400">
								Schedule: {anime.scheduled_day}
							</p>
							<p class="mt-1 max-w-xs text-tiny text-gray-400">
								Source: {anime.source}
							</p>
							<div class="flex gap-1 items-center">
								<Star size="10" fill="green" color="green" />
								<h1 class="opacity-80 text-green-500 text-[13px]">{anime.score?.toString()}</h1>
							</div>
						</div>
						<div class="flex gap-3 items-center">
							<a
								href="/mobile/anime/{anime.id}/{anime.slug}"
								class="mt-3 w-max rounded-full bg-red-500 px-5 py-2 text-tiny font-bold text-white"
							>
								Tonton
							</a>
							<button
								class="mt-3 w-max text-tiny rounded-full border-2 border-red-500 px-5 py-2 font-bold text-white"
							>
								Add to list
							</button>
						</div>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
</div>