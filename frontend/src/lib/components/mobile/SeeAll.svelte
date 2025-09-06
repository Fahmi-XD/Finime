<script lang="ts">
	import { ArrowLeft, Search, Star } from '@lucide/svelte';
	import { scale } from 'svelte/transition';
	import { seeAllTitle } from '$lib/stores/home.mobile';
	import { onMount } from 'svelte';
	import type { Animes, Post } from '$lib/api/types/mobile/summerType';
	import { truncate } from '$lib';
	import { goto } from '$app/navigation';
	import { UserMobileClient } from '$lib/api/clients/mobile/userClient';
	import { MangaMobileClient } from '$lib/api/clients/mobile/mangaClient';

	import type { MangaData } from '$lib/api/types/mobile/manga/genreType';

	import { runtimeData } from '$lib/stores/runtime';

	import SkeletonLoading from '../ui/SkeletonLoading.svelte';

	import { AnimeMobileClient } from '$lib/api/clients/mobile/animeClient';

	let animeList: Partial<Animes> | undefined = {};
	let mangaList: Partial<MangaData[]> | undefined = [];
	let isLoading = true;

	onMount(async () => {
		try {
			if (
				$runtimeData['seeall.cache.' + $seeAllTitle] &&
				typeof $runtimeData['seeall.cache.' + $seeAllTitle] == 'object'
			) {
				isLoading = false;
				animeList = $runtimeData['seeall.cache.' + $seeAllTitle];
			} else {
				isLoading = true;
				if ($seeAllTitle == 'Teratas') {
					const animes = await AnimeMobileClient.getSummer();
					animeList = animes.animes;
					$runtimeData['seeall.cache.' + $seeAllTitle] = animes.animes;
				} else if ($seeAllTitle == 'Historimu') {
					const animes = await UserMobileClient.getUserInfoHistory();
					const serialization = {
						data: animes.map((p) => {
							return {
								title: p.title,
								image_portrait_url: p.cover,
								posts: Array.from({ length: parseInt(p.current_eps || '0') }).fill({}) as Post[],
								total_episodes: parseInt(p.total_eps || '0'),
								type: 'TV',
								aired_from: p.date,
								scheduled_day: p.schedule,
								watch_eps: p.watch_eps,
								source: p.source,
								score: parseFloat(p.rating || '0'),
								id: parseInt(p.anime_id?.split('/')[0] || '0'),
								slug: p.anime_id?.split('/')[1]
							};
						})
					};

					animeList = serialization;
				} else if ($seeAllTitle == 'Manga Romance') {
					// console.log($runtimeData["manga.romance.cache"].length)
					if (
						$runtimeData['manga.romance.cache']?.length &&
						$runtimeData['manga.romance.cache']?.length > 0
					) {
						mangaList = $runtimeData['manga.romance.cache'];
					} else {
						const manga = await MangaMobileClient.getbyGenre('romance');
						mangaList = manga;
						$runtimeData['manga.romance.cache'] = manga;
					}
				} else if ($seeAllTitle == 'Manga School') {
					// console.log($runtimeData["manga.school.cache"].length)
					if (
						$runtimeData['manga.school.cache']?.length &&
						$runtimeData['manga.school.cache']?.length > 0
					) {
						mangaList = $runtimeData['manga.school.cache'];
					} else {
						const manga = await MangaMobileClient.getbyGenre('school');
						mangaList = manga;
						$runtimeData['manga.school.cache'] = manga;
					}
				} else if ($seeAllTitle == 'Manga Sci-Fi') {
					// console.log($runtimeData["manga.scifi.cache"].length)
					if (
						$runtimeData['manga.scifi.cache']?.length &&
						$runtimeData['manga.scifi.cache']?.length > 0
					) {
						mangaList = $runtimeData['manga.scifi.cache'];
					} else {
						const manga = await MangaMobileClient.getbyGenre('sci-fi');
						mangaList = manga;
						$runtimeData['manga.scifi.cache'] = manga;
					}
				} else if ($seeAllTitle == 'Manga Action') {
					// console.log($runtimeData["manga.action.cache"].length)
					if (
						$runtimeData['manga.action.cache']?.length &&
						$runtimeData['manga.action.cache']?.length > 0
					) {
						mangaList = $runtimeData['manga.action.cache'];
					} else {
						const manga = await MangaMobileClient.getbyGenre('action');
						mangaList = manga;
						$runtimeData['manga.action.cache'] = manga;
					}
				} else if ($seeAllTitle == 'Manga Drama') {
					// console.log($runtimeData["manga.drama.cache"].length)
					if (
						$runtimeData['manga.drama.cache']?.length &&
						$runtimeData['manga.drama.cache']?.length > 0
					) {
						mangaList = $runtimeData['manga.drama.cache'];
					} else {
						const manga = await MangaMobileClient.getbyGenre('drama');
						mangaList = manga;
						$runtimeData['manga.drama.cache'] = manga;
					}
				} else if ($seeAllTitle == 'Manga Loli') {
					// console.log($runtimeData["manga.drama.cache"].length)
					if (
						$runtimeData['manga.loli.cache']?.length &&
						$runtimeData['manga.loli.cache']?.length > 0
					) {
						mangaList = $runtimeData['manga.loli.cache'];
					} else {
						const manga = await MangaMobileClient.getbyGenre('loli');
						mangaList = manga;
						$runtimeData['manga.loli.cache'] = manga;
					}
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			// console.log(mangaList);
			isLoading = false;
		}
	});
</script>

<div class="max-w-md px-6 pb-5 pt-10 w-full h-screen overflow-y-auto will-change-auto" in:scale={{ duration: 200, start: 0.99 }}>
	<header class="mb-4 flex items-center">
		<button
			aria-label="Back"
			on:click={() => window.history.back()}
			class="flex items-center gap-1 text-lg text-white"
		>
			<ArrowLeft size={20} />
			<h1 class="text-lg font-semibold text-white opacity-70">{$seeAllTitle}</h1>
		</button>
		<button
			aria-label="Search"
			class="ml-auto text-lg text-white"
			on:click={() => {
				goto('/mobile/search', { replaceState: true });
			}}
		>
			<Search size={20} />
		</button>
	</header>

	<ul class="space-y-6">
		{#if isLoading}
			<SkeletonLoading type="card-2" count={5} />
		{:else if !animeList?.data && !$seeAllTitle.includes('Manga')}
			<h1 class="text-center text-sm text-white opacity-70">Belum ada data :(</h1>
		{:else if !$seeAllTitle.includes('Manga')}
			{#each animeList?.data || [] as anime}
				<li class="flex space-x-4">
					<div class="relative h-[160px] w-[120px] flex-shrink-0">
						<img
							alt={anime.title}
							class="h-[160px] w-[120px] rounded-lg object-cover"
							src={anime.image_portrait_url}
						/>
						<span
							class="text-tiny absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 font-semibold text-white"
						>
							{anime.posts?.length} / {anime.total_episodes} Eps
						</span>
						<span
							class="text-tiny absolute bottom-2 right-2 rounded bg-red-500 px-2 py-0.5 font-semibold text-white"
						>
							{anime.type}
						</span>
					</div>
					<div class="flex flex-col justify-between">
						<div>
							<h2 class="text-lg font-semibold leading-tight text-white">
								{truncate(anime.title || '', 50)}
							</h2>
							<p class="text-tiny mt-4 text-gray-400">{anime.aired_from}</p>
							<p class="text-tiny mt-1 max-w-xs text-gray-400">
								Schedule: {anime.scheduled_day}
							</p>
							<p class="text-tiny mt-1 max-w-xs text-gray-400">
								Source: {anime.source}
							</p>
							<div class="flex items-center gap-1">
								<Star size="10" fill="green" color="green" />
								<h1 class="text-[13px] text-green-500 opacity-80">{anime.score?.toString()}</h1>
							</div>
						</div>
						<div class="flex items-center gap-3">
							<a
								href="/mobile/anime/{anime.id}/{anime.slug}"
								class="text-tiny mt-3 w-max rounded-full bg-red-500 px-5 py-2 font-bold text-white"
							>
								Tonton
							</a>
							<a
								href="/mobile/anime/watch/{anime.id}/{anime.slug}/{anime.watch_eps}"
								class="text-tiny mt-3 w-max rounded-full border-2 border-red-500 px-5 py-2 font-bold text-white"
							>
								{$seeAllTitle == 'Historimu' ? 'Lanjutkan Eps ' + anime.watch_eps : 'Favorite'}
							</a>
						</div>
					</div>
				</li>
			{/each}
		{:else if $seeAllTitle.includes('Manga')}
			{#each mangaList || [] as manga}
				<li class="flex space-x-4 w-full h-auto items-stretch">
					<div class="relative h-[160px] w-[120px] flex-shrink-0">
						<img
							alt={manga?.title}
							class="h-[160px] w-[120px] rounded-lg object-cover"
							src={manga?.image}
						/>
						<span
							class="text-tiny absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 font-semibold text-white"
						>
							{manga?.chapter}
						</span>
						<span
							class="text-tiny absolute bottom-2 right-2 rounded bg-red-500 px-2 py-0.5 font-semibold text-white"
						>
							{manga?.ratingPercentage}
						</span>
					</div>
					<div class="flex flex-col flex-1 justify-between">
						<div class="h-auto block">
							<h2 class="text-lg font-semibold leading-tight text-white">
								{truncate(manga?.title || '', 50)}
							</h2>
						</div>
						<div class="h-full mt-auto flex flex-col">
							<div class="flex flex-col min-h-0 h-full">
								<p class="text-tiny mt-auto max-w-xs text-gray-400">
									Berwarna: {manga?.isColored ? "Ya" : "Tidak"}
								</p>
								<div class="flex items-center gap-1">
									<Star size="10" fill="green" color="green" />
									<h1 class="text-[13px] opacity-80">{manga?.rating}</h1>
								</div>
							</div>
							<div class="flex items-center gap-3">
								<a
									href="/mobile/manga/{(manga?.url || "").replace("https://kiryuu02.com/manga/", "")}"
									class="text-tiny mt-3 w-max rounded-full bg-red-500 px-5 py-2 font-bold text-white"
								>
									Mulai baca
								</a>
								<a
									href="/mobile/manga/read/{(manga?.url || "").replace("https://kiryuu02.com/manga/", "")}"
									class="text-tiny mt-3 w-max rounded-full border-2 border-red-500 px-5 py-2 font-bold text-white"
								>
									{$seeAllTitle == 'Manga Historimu' ? 'Lanjutkan Chapter ' + manga?.read_chapter || '1' : 'Favorite'}
								</a>
							</div>
						</div>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
</div>
