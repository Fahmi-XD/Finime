<script lang="ts">
	import { onMount } from 'svelte';
	import { AnimeClient } from '$lib/api/clients/animeClient';
	import type { IRecentResponse } from '$lib/api/types/animeRecentType';
	import type { ISearchStandarResponse } from '$lib/api/types/animeSearchType';
	import { truncate } from '$lib';
	import { Loader } from '@lucide/svelte';
	import LoadingElements from '$lib/components/ui/LoadingElements.svelte';
	import { page } from "$app/state"
	import { page as pages } from "$app/stores"
	import { replaceState } from "$app/navigation";
	import { mode as modeStore } from '$lib/stores/mode';

	const backgroundImages: string[][] = [
		// Desktop
		['https://v1.pinimg.com/videos/iht/expMp4/43/7d/16/437d162fc79ab3377a653bce4ced4acc_720w.mp4'],
		// Mobile
		['https://v1.pinimg.com/videos/iht/720p/9c/9b/25/9c9b25a3317e04a70b913e84624715c3.mp4']
	];
	const MAX_PAGE = 10;

	let backgroundImage: string = backgroundImages[0][0];
	let currentPage = 1;
	let recentAnimeList: IRecentResponse[] = [];
	let searchResultElement: HTMLDivElement | null = null;
	let startPage = 1;
	let endPage = 5;
	let searchQuery = '';
	let searchResult: ISearchStandarResponse[] = [];
	let isLoading = false;
	let searchGenres: string[] = [];
	let filterGenres: string[] = [];
	let filteredResult: ISearchStandarResponse[] = [];
	let notFound: boolean = false;

	$: {
		// filteredResult = searchResult.filter((item) => item.genres?.every((genre) => filterGenres.length > 0 ? filterGenres.includes(genre?.name ?? '') : true	));
		filteredResult = searchResult.filter((item) => {
			return filterGenres.length > 0 ? item.genres?.some((genre) => filterGenres.includes(genre?.name ?? '')) : true;
		});
	}

	$: {
		startPage = Math.max(1, currentPage > Math.ceil((filteredResult.length > 0 ? filteredResult.length : recentAnimeList.length) / MAX_PAGE) - 2 ? Math.ceil((filteredResult.length > 0 ? filteredResult.length : recentAnimeList.length) / MAX_PAGE) - 4 : currentPage - Math.floor(5 / 2));
		endPage = Math.min(Math.ceil((filteredResult.length > 0 ? filteredResult.length : recentAnimeList.length) / MAX_PAGE), startPage + 5 - 1);
	}

	$: if ((currentPage && searchResultElement)) (searchResultElement as HTMLDivElement)?.scrollIntoView({ block: 'start', behavior: 'smooth' });

	onMount(() => {
		if (page.url.searchParams.get('q') && page.url.searchParams.get('q') != '') {
			searchQuery = page.url.searchParams.get('q') || '';
			handleSearch();
		}

		const handleResize = () => {
			if (window.innerWidth < 768) {
				backgroundImage = backgroundImages[1][0];
			} else {
				backgroundImage = backgroundImages[0][0];
			}
		};

		const fetchRecentAnimeList = async () => {
			isLoading = true;
			const response = await AnimeClient.getRecentAnimeList();
			recentAnimeList = response;
			isLoading = false;
		};

		fetchRecentAnimeList();

		handleResize();
		window.addEventListener('resize', handleResize);
	});

	async function handleSearch() {
		isLoading = true;
		const response = await AnimeClient.getSearchAnimeList(searchQuery);
		searchGenres = [...(new Set(response.map((item) => item.genres?.map((genre) => genre.name)).flat()))] as string[];
		searchResult = response;
		searchResult = searchResult.map((item) => {
			if (item.genres?.length == 0) {
				item.genres = [{ name: "N/A" }];
			}

			return item as ISearchStandarResponse;
		});

		if (searchResult.length == 0) {
			notFound = true;
		} else {
			notFound = false;
		}

		isLoading = false;
		$pages.url.searchParams.set('q', searchQuery); 
		replaceState($pages.url, $pages.state);
		(searchResultElement as HTMLDivElement)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Cari Anime & Manga Gratis di Finime | Streaming & Baca Tanpa Iklan</title>
	<meta
		name="description"
		content="Temukan anime dan manga favoritmu dengan fitur pencarian Finime. Streaming anime sub Indo gratis, baca manga tanpa iklan judi, update episode & chapter harian, kualitas HD, dan koleksi terlengkap."
	/>
	<meta
		name="keywords"
		content="cari anime, search anime, cari manga, search manga, pencarian anime, pencarian manga, streaming anime gratis, baca manga gratis, anime sub indo, manga sub indo, anime terbaru, manga terbaru, update anime, update manga, anime HD, manga HD, anime tanpa iklan, manga tanpa iklan, finime search, finime pencarian, anime indonesia, manga indonesia, anime legal, baca komik, baca komik gratis, streaming anime indonesia, anime subtitle indonesia"
	/>
	<meta name="author" content="Finime Team" />
	<link rel="canonical" href="https://www.finime.my.id/search" />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>

	<!-- Additional SEO Meta Tags -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="theme-color" content="#111827" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-title" content="Finime Search" />

	<!-- Open Graph Meta Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.finime.my.id/search" />
	<meta
		property="og:title"
		content="Cari Anime & Manga Gratis di Finime | Streaming & Baca Tanpa Iklan"
	/>
	<meta
		property="og:description"
		content="Temukan anime dan manga favoritmu dengan fitur pencarian Finime. Streaming anime sub Indo gratis, baca manga tanpa iklan judi, update episode & chapter harian, kualitas HD, dan koleksi terlengkap."
	/>
	<meta property="og:image" content="https://www.finime.my.id/web-app-manifest-512x512.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Finime Search - Cari Anime & Manga Gratis" />
	<meta property="og:locale" content="id_ID" />
	<meta property="og:site_name" content="Finime" />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@finime_id" />
	<meta name="twitter:creator" content="@finime_id" />
	<meta name="twitter:url" content="https://www.finime.my.id/search" />
	<meta
		name="twitter:title"
		content="Cari Anime & Manga Gratis di Finime | Streaming & Baca Tanpa Iklan"
	/>
	<meta
		name="twitter:description"
		content="Temukan anime dan manga favoritmu dengan fitur pencarian Finime. Streaming anime sub Indo gratis, baca manga tanpa iklan judi, update episode & chapter harian, kualitas HD, dan koleksi terlengkap."
	/>
	<meta name="twitter:image" content="https://www.finime.my.id/web-app-manifest-512x512.png" />
	<meta name="twitter:image:alt" content="Finime Search - Cari Anime & Manga Gratis" />

	<!-- Structured Data for Search Page -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "SearchResultsPage",
			"name": "Pencarian Finime",
			"description": "Halaman pencarian untuk menemukan anime dan manga favorit di Finime. Streaming anime sub Indo gratis, baca manga tanpa iklan judi.",
			"url": "https://www.finime.my.id/search",
			"potentialAction": {
				"@type": "SearchAction",
				"target": "https://www.finime.my.id/search?q={search_term_string}",
				"query-input": "required name=search_term_string"
			},
			"breadcrumb": {
				"@type": "BreadcrumbList",
				"itemListElement": [
					{
						"@type": "ListItem",
						"position": 1,
						"name": "Home",
						"item": "https://www.finime.my.id/"
					},
					{
						"@type": "ListItem",
						"position": 2,
						"name": "Search",
						"item": "https://www.finime.my.id/search"
					}
				]
			},
			"publisher": {
				"@type": "Organization",
				"name": "Finime",
				"logo": {
					"@type": "ImageObject",
					"url": "https://www.finime.my.id/web-app-manifest-512x512.png"
				}
			}
		}
	</script>

	<link rel="icon" type="image/x-icon" href="/favicon.ico" />
	<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

	<link rel="preconnect" href="https://www.finime.my.id" />
	<link rel="dns-prefetch" href="https://www.finime.my.id" />
</svelte:head>

<div class="{$modeStore === 'colorful' ? 'bg-[hsl(var(--background))]' : 'bg-black'}">
	<div class="relative flex min-h-screen items-center justify-center overflow-hidden">
		<div class="absolute inset-0 z-0">
			<div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
			<div
				class="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90"
			></div>
			<video autoplay muted loop class="h-auto w-full object-cover">
				<source src={backgroundImage} type="video/mp4" />
			</video>
		</div>

		<div class="absolute inset-0 z-10 overflow-hidden">
			{#if $modeStore === 'colorful'}
			<div
				class="absolute left-10 top-20 h-32 w-32 animate-pulse rounded-full bg-red-500/20 blur-3xl"
			></div>
			<div
				class="absolute right-20 top-40 h-24 w-24 animate-pulse rounded-full bg-blue-500/20 blur-2xl delay-1000"
			></div>
				<div
					class="delay-2000 absolute bottom-40 left-1/4 h-40 w-40 animate-pulse rounded-full bg-purple-500/20 blur-3xl"
				></div>
			{/if}
		</div>

		<div class="md:mt-15 relative z-20 mx-auto mt-20 max-w-6xl px-4 text-center sm:px-6 lg:px-8">
			<div class="mb-12">
				<h1 class="mb-6 text-4xl font-black leading-tight text-white md:text-6xl">
					<span
						class="{$modeStore === 'colorful' ? 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent' : 'text-red-500'}"
					>
						Discover
					</span>
					<span class="text-white">Your Next</span>
					<br />
					<span
						class="{$modeStore === 'colorful' ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent' : 'text-red-500'}"
					>
						Adventure
					</span>
				</h1>
				<p class="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-lg">
					Explore thousands of anime and manga titles. From classic masterpieces to the latest
					releases, find your perfect story with our comprehensive search engine.
				</p>
			</div>

			<div class="relative mx-auto mb-12 max-w-4xl">
				<div class="relative">
					<input
						type="text"
						bind:value={searchQuery}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								handleSearch();
							}
						}}
						placeholder="Search for anime, manga, characters, studios, or genres..."
						class="w-full rounded-2xl border-2 border-white/20 bg-[hsl(var(--background))] px-8 py-4 pl-16 pr-32 text-xl text-white placeholder-gray-400 transition-all duration-300 focus:border-red-500 focus:bg-white/15 focus:outline-none"
					/>
					<svg
						class="absolute left-6 top-1/2 h-8 w-8 -translate-y-1/2 transform text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
					<button
						on:click={handleSearch}
						class="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-xl bg-gradient-to-r from-red-500 to-pink-600 px-8 py-2 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-red-600 hover:to-pink-700 hover:shadow-xl"
					>
						{#if !isLoading}
							Search
						{:else}
							<Loader class="animate-spin" />
						{/if}
					</button>
				</div>

				<div class="mt-4 flex flex-wrap items-center justify-center gap-3">
					<span class="text-sm text-gray-300">Popular:</span>
					<button
						on:click={() => {
							searchQuery = "Attack on Titan";
							handleSearch();
						}}
						class="rounded-full border border-white/20 bg-[hsl(var(--background))] px-4 py-2 text-sm text-gray-300 transition-all duration-300 hover:bg-red-500 hover:text-white"
					>
						Attack on Titan
					</button>
					<button
						on:click={() => {
							searchQuery = "Demon Slayer";
							handleSearch();
						}}
						class="rounded-full border border-white/20 bg-[hsl(var(--background))] px-4 py-2 text-sm text-gray-300 transition-all duration-300 hover:bg-red-500 hover:text-white"
					>
						Demon Slayer
					</button>
					<button
						on:click={() => {
							searchQuery = "One Piece";
							handleSearch();
						}}
						class="rounded-full border border-white/20 bg-[hsl(var(--background))] px-4 py-2 text-sm text-gray-300 transition-all duration-300 hover:bg-red-500 hover:text-white"
					>
						One Piece
					</button>
					<button
						on:click={() => {
							searchQuery = "Jujutsu Kaisen";
							handleSearch();
						}}
						class="rounded-full border border-white/20 bg-[hsl(var(--background))] px-4 py-2 text-sm text-gray-300 transition-all duration-300 hover:bg-red-500 hover:text-white"
					>
						Jujutsu Kaisen
					</button>
				</div>
			</div>

			<div class="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
				<div class="text-center">
					<div class="mb-2 text-4xl font-bold text-red-500">50K+</div>
					<div class="text-gray-300">Anime Titles</div>
				</div>
				<div class="text-center">
					<div class="mb-2 text-4xl font-bold text-blue-500">100K+</div>
					<div class="text-gray-300">Manga Series</div>
				</div>
				<div class="text-center">
					<div class="mb-2 text-4xl font-bold text-purple-500">1M+</div>
					<div class="text-gray-300">Characters</div>
				</div>
				<div class="text-center">
					<div class="mb-2 text-4xl font-bold text-green-500">24/7</div>
					<div class="text-gray-300">Updated</div>
				</div>
			</div>
		</div>

		<div class="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transform">
			<div class="animate-bounce">
				<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					></path>
				</svg>
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-10 lg:grid-cols-4">
			<aside class="lg:col-span-1">
				<div
					class="top-32 rounded-2xl border border-white/10 bg-[hsl(var(--background))] p-8 shadow-xl"
				>
					<h3 class="mb-8 text-2xl font-bold text-white">Filters</h3>
					<div class="mb-8">
						<h4 class="mb-4 font-semibold text-white">Type</h4>
						<div class="flex flex-wrap gap-4">
							<label class="flex cursor-pointer items-center gap-2">
								<input type="checkbox" checked disabled class="scale-125 accent-red-500" />
								<span class="text-gray-200">Anime</span>
							</label>
							<label class="flex cursor-pointer items-center gap-2">
								<input type="checkbox" disabled checked={false} class="scale-125 accent-red-500" />
								<span class="text-gray-200">Manga</span>
							</label>
						</div>
					</div>
					<div class="mb-8">
						<h4 class="mb-4 font-semibold text-white">Genre</h4>
						<div class="flex max-h-40 flex-wrap gap-2 overflow-y-auto">
							{#each searchResult.length > 0 ? searchGenres : ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi'] as genre}
								<label class="flex cursor-pointer items-center gap-2">
									<input value={genre} name="genres" bind:group={filterGenres} type="checkbox" disabled={searchResult.length == 0} class="scale-110 disabled:cursor-no-drop disabled:opacity-90 accent-red-500" />
									<span class="text-gray-300">{genre}</span>
								</label>
							{/each}
						</div>
					</div>
					
					<button
						class="mt-4 w-full rounded-xl bg-gradient-to-r from-red-500 to-pink-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:from-red-600 hover:to-pink-700"
					>
						Apply Filters
					</button>
				</div>
			</aside>

			<div class="lg:col-span-3" bind:this={searchResultElement}>
				<div class="mb-10 flex items-center justify-between">
					<div>
						<h2 class="text-3xl font-bold text-white">Search Results</h2>
						<p class="text-gray-400">Found 1,234 results for "attack"</p>
					</div>
				</div>
				<div class="grid grid-cols-1 gap-8 {isLoading || notFound ? 'md:grid-cols-1' : 'md:grid-cols-2'}">
					{#if isLoading}
						<div class="relative flex h-auto w-full justify-center">
							<LoadingElements variant="absolute" />
						</div>
					{:else if notFound}
						<div class="relative flex h-auto w-full justify-center">
							<h2 class="text-3xl font-bold text-white text-center">No results found</h2>
						</div>
					{:else if searchResult.length > 0}
						{#each filteredResult.slice(MAX_PAGE * (currentPage - 1), currentPage * MAX_PAGE) as result, i (i)}
							<a
								href={`/anime/${result?.mal_id}`}
								class="group flex cursor-pointer gap-6 rounded-2xl border border-white/10 bg-[hsl(var(--background))] p-6 shadow-xl transition-all hover:bg-white/20"
							>
								<div
									class="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-red-800"
								>
									<img
										src={result?.images?.jpg?.image_url}
										alt={result?.title}
										class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<!-- <span class="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded shadow">{result?.status}</span> -->
								</div>
								<div class="flex flex-1 flex-col justify-between">
									<div>
										<h3
											class="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-red-500"
										>
											{truncate(result?.title || "", 30)}
										</h3>
										<p class="text-gray-300 mb-3 line-clamp-3 text-[11px] opacity-70">{truncate(result?.rating || 'No rating available', 50)}</p>
										<p class="text-gray-300 mb-3 line-clamp-3">{truncate(result?.synopsis || 'No synopsis available', 50)}</p>
									</div>
									<div class="flex flex-wrap items-center gap-4 text-sm mt-2">
										<span class="text-yellow-400 font-bold">★ {result?.score || 'N/A'}</span>
										<span class="text-gray-400">{result?.genres?.map((genre) => genre.name).join(", ") || 'N/A'}</span>
										<span class="text-gray-400">{result?.year || 'N/A'}</span>
										<span class="text-gray-400">{result?.episodes || 'N/A'} Ep</span>
									</div>
								</div>
							</a>
						{/each}
					{:else}
						{#each recentAnimeList.slice(MAX_PAGE * (currentPage - 1), currentPage * MAX_PAGE) as result, i (i)}
							<a
								href={`/anime/${result?.mal_id?.split("-")[0]}`}
								class="group flex cursor-pointer gap-6 rounded-2xl border border-white/10 bg-[hsl(var(--background))] p-6 shadow-xl transition-all hover:bg-white/20"
							>
								<div
									class="relative h-40 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-red-800"
								>
									<img
										src={result?.entry?.[0]?.images?.jpg.image_url}
										alt={result?.entry?.[0]?.title}
										class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									<!-- <span class="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded shadow">{result?.status}</span> -->
								</div>
								<div class="flex flex-1 flex-col justify-between">
									<div>
										<h3
											class="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-red-500"
										>
											{truncate(result?.entry?.[0]?.title || "", 30)}
										</h3>
										<p class="text-gray-300 mb-3 line-clamp-3">{result?.content || 'No content available'}</p>
									</div>
									<!-- <div class="flex flex-wrap items-center gap-4 text-sm mt-2">
										<span class="text-yellow-400 font-bold">★ {result?.rating}</span>
										<span class="text-gray-400">{result?.genres?.join(", ")}</span>
										<span class="text-gray-400">{result?.year}</span>
										<span class="text-gray-400">{result?.episodes} Episodes</span>
									</div> -->
								</div>
							</a>
						{/each}
					{/if}
				</div>
				
				<div class="mt-16 flex justify-center">
					<nav
						class="flex items-center space-x-2 rounded-xl border border-white/10 bg-[hsl(var(--background))] px-6 py-3 shadow-lg"
					>
						<button
							aria-label="Previous"
							on:click={() => {
								if (currentPage > 1) currentPage = currentPage - 1;
							}}
							class="px-3 py-2 text-gray-400 transition-colors hover:text-white disabled:opacity-50"
							disabled={currentPage === 1}
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						{#each Array(endPage - startPage + 1)
							.fill(0)
							.map((_, i) => startPage + i) as page, i (i)}
							<button
								on:click={() => (currentPage = page)}
								class="px-4 {currentPage === page
									? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
									: 'text-gray-400 hover:bg-white/20 hover:text-white'} rounded-lg py-2 transition-colors"
								>{page}</button
							>
						{/each}
						<button
							aria-label="Next"
							on:click={() => {
								if (currentPage < Math.min(Math.ceil((filteredResult.length > 0 ? filteredResult.length : recentAnimeList.length) / MAX_PAGE), 5))
									currentPage = currentPage + 1;
							}}
							class="px-3 py-2 text-gray-400 transition-colors hover:text-white disabled:opacity-50"
							disabled={currentPage === Math.min(Math.ceil((filteredResult.length > 0 ? filteredResult.length : recentAnimeList.length) / MAX_PAGE), 5)}
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</nav>
				</div>
			</div>
		</div>
	</div>
</div>
