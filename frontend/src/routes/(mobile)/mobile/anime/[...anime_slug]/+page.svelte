<script lang="ts">
	import type { IAnimeSlug } from './+page';
	import { onMount, onDestroy } from 'svelte';
	import { scale } from 'svelte/transition';
	import { ArrowLeft, Star, LinkIcon, CheckIcon, Bookmark, BookmarkCheck } from '@lucide/svelte';

	import { AnimeMobileClient } from '$lib/api/clients/mobile/animeClient';
	import type { IAnimeDetail } from '$lib/api/types/mobile/detailType';
	import { runtimeMobile } from '$lib/stores/runtime';

	import SkeletonLoading from '$lib/components/ui/SkeletonLoading.svelte';
	import Carousel from '$lib/components/complex/Carousel.svelte';

	import Episode from '$lib/components/mobile/AnimeDetail/Episode.svelte';
	import Comming from '$lib/components/mobile/AnimeDetail/Comming.svelte';
	import Detail from '$lib/components/mobile/AnimeDetail/Detail.svelte';

	export let data: IAnimeSlug;

	let imgEl: HTMLImageElement;
	let bgHeight = 0;

	let animeDetail: IAnimeDetail;
	let isLoading = true;

	let isCopy = false;
	let isBookmart = false;

	const handleResize = () => {
		bgHeight = imgEl.clientHeight;
	};

	onMount(async () => {
		isLoading = true;
		if (
			$runtimeMobile['anime.detail.' + data.animeSlug] &&
			typeof $runtimeMobile['anime.detail.' + data.animeSlug] == 'object'
		) {
			animeDetail = $runtimeMobile['anime.detail.' + data.animeSlug];
		} else {
			const response = await AnimeMobileClient.getDetail(data.animeSlug);
			animeDetail = response;
			$runtimeMobile['anime.detail.' + data.animeSlug] = response;
		}
		isLoading = false;

		setTimeout(() => {
			if (imgEl) {
				if (imgEl.complete) {
					bgHeight = imgEl.clientHeight;
				} else {
					imgEl.addEventListener('load', () => {
						bgHeight = imgEl.clientHeight;
					});
				}
			}

			if (typeof window !== 'undefined') {
				window.addEventListener('resize', handleResize);
			}
		}, 10);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', handleResize);
		}
	});
</script>

<svelte:head>
	<title>Finime - Nonton Anime & Baca Manga Gratis Tanpa Iklan Judi Online</title>
	<meta
		name="description"
		content="Finime adalah situs nonton anime dan baca manga sub Indo gratis tanpa iklan, terutama tanpa iklan judi online. Streaming anime terbaru, koleksi manga terlengkap, update episode & chapter setiap hari, kualitas HD, dan komunitas aktif. Nikmati pengalaman menonton dan membaca tanpa gangguan iklan!"
	/>
	<meta
		name="keywords"
		content="nonton anime gratis, baca manga gratis, streaming anime sub indo, download anime, anime tanpa iklan, manga tanpa iklan, anime sub indo, manga sub indo, anime terbaru, manga terbaru, anime update, manga update, anime HD, anime no ads, manga no ads, anime anti judi, situs anime terbaik, situs manga terbaik, finime, anime indonesia, manga indonesia, anime legal, baca komik, baca komik gratis, streaming anime indonesia, anime subtitle indonesia, anime tanpa iklan judi, manga tanpa iklan judi"
	/>
	<meta name="author" content="Finime Team" />
	<link rel="canonical" href="https://www.finime.my.id/" />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.finime.my.id/" />
	<meta
		property="og:title"
		content="Finime - Nonton Anime & Baca Manga Gratis Tanpa Iklan Judi Online"
	/>
	<meta
		property="og:description"
		content="Finime adalah website streaming anime dan baca manga sub Indo gratis tanpa iklan, terutama tanpa iklan judi online. Koleksi anime & manga terlengkap, update setiap hari, kualitas HD, dan tanpa gangguan iklan. Nikmati pengalaman terbaik di Finime!"
	/>
	<meta property="og:image" content="https://www.finime.my.id/web-app-manifest-512x512.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="id_ID" />
	<meta property="og:site_name" content="Finime" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@finime_id" />
	<meta name="twitter:creator" content="@finime_id" />
	<meta name="twitter:url" content="https://www.finime.my.id/" />
	<meta
		name="twitter:title"
		content="Finime - Nonton Anime & Baca Manga Gratis Tanpa Iklan Judi Online"
	/>
	<meta
		name="twitter:description"
		content="Finime adalah situs streaming anime dan baca manga gratis tanpa iklan, terutama tanpa iklan judi online. Update anime & manga terbaru setiap hari, kualitas HD, dan komunitas aktif. Nikmati pengalaman tanpa gangguan iklan di Finime!"
	/>
	<meta name="twitter:image" content="https://www.finime.my.id/web-app-manifest-512x512.png" />

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebSite",
			"name": "Finime",
			"url": "https://www.finime.my.id/",
			"description": "Finime adalah website nonton anime dan baca manga sub Indo gratis tanpa iklan, terutama tanpa iklan judi online. Streaming anime & manga terlengkap, update setiap hari, kualitas HD, dan komunitas aktif.",
			"potentialAction": {
				"@type": "SearchAction",
				"target": {
					"@type": "EntryPoint",
					"urlTemplate": "https://www.finime.my.id/search?q={search_term_string}"
				},
				"query-input": "required name=search_term_string"
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

	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#111827" />
</svelte:head>

<div
	class="relative block overflow-x-hidden will-change-auto"
	in:scale={{ duration: 200, start: 0.99 }}
>
	<div class="fixed top-0 -z-[5] flex h-auto w-screen">
		{#if isLoading}
			<SkeletonLoading type="image" className="bg-black" />
		{:else}
			<span
				style="height: {bgHeight + 20}px"
				class="absolute top-0 z-[5] flex w-screen bg-gradient-to-b from-black/30 to-black/95 transition-all duration-200"
			></span>
			<img
				bind:this={imgEl}
				class="h-full w-screen object-contain blur-[2px]"
				src={animeDetail?.image}
				alt={animeDetail?.title}
			/>
		{/if}
	</div>

	<div class="mx-auto max-w-md pb-20 pt-3">
		<!-- Top bar -->
		<div class="mb-4 flex items-center justify-between px-4">
			<button aria-label="Back" class="text-2xl text-white" on:click={() => window.history.back()}>
				<ArrowLeft size={20} />
			</button>
			<button class="rounded-full bg-white px-5 py-1.5 text-xs font-medium text-black">
				My Kisah
			</button>
		</div>

		<!-- Poster -->
		<div class="mb-4 mt-10 flex justify-center px-4">
			{#if isLoading}
				<SkeletonLoading type="image" className="!h-[380px] !w-[270px]" />
			{:else}
				<img
					alt="Anime poster showing five characters around a table with various dishes, one standing behind, colorful anime style"
					class="h-[380px] w-[270px] rounded-xl object-cover shadow-lg"
					src={animeDetail?.image}
				/>
			{/if}
		</div>

		<div class="px-4">
			<!-- Title and info -->
			{#if isLoading}
				<div class="flex flex-col items-center">
					<SkeletonLoading type="text" className="!h-[20px] !w-[270px]" />
					<SkeletonLoading type="text" className="!h-[20px] !w-[200px] mt-1" />
					<SkeletonLoading type="text" className="!h-[20px] !w-[270px] mt-1" />
				</div>
			{:else}
				<h1 class="mb-1 text-center text-xl font-semibold text-white">
					{animeDetail?.title}
				</h1>
			{/if}
			{#if isLoading}
				<div class="mt-5 flex flex-col items-center">
					<SkeletonLoading type="text" className="!h-[10px] !w-[180px]" />
					<SkeletonLoading type="text" className="!h-[10px] !w-[220px] mt-1" />
					<SkeletonLoading type="text" className="!h-[10px] !w-[160px] mt-1" />
					<SkeletonLoading type="text" className="!h-[10px] !w-[200px] mt-1" />
				</div>
			{:else}
				{#each animeDetail?.altTitles as title}
					<p class="text-tiny mb-1 text-center text-gray-300">{title}</p>
				{/each}
			{/if}
			{#if isLoading}
				<SkeletonLoading type="text" className="!h-[20px] !w-[200px] mt-5 mx-auto" />
			{:else}
				<p class="mb-1 text-center text-sm text-gray-300">
					{animeDetail?.type} | {animeDetail?.status} | {animeDetail?.airing?.from}
				</p>
			{/if}
			<p
				class="text-tiny mb-3 flex items-center justify-center space-x-1 text-center font-semibold text-yellow-400"
			>
				<Star size={18} fill="yellow" />
				{#if isLoading}
					<SkeletonLoading type="text" className="!h-[10px] !w-[50px] mt-1" />
				{:else}
					<span>7.19</span>
				{/if}
			</p>
		</div>

		<!-- Tags -->
		<div class="mb-4 flex flex-wrap justify-center gap-2 px-4">
			{#if isLoading}
				<SkeletonLoading type="text" className="!h-[30px] !w-[100px]" />
				<SkeletonLoading type="text" className="!h-[30px] !w-[100px]" />
				<SkeletonLoading type="text" className="!h-[30px] !w-[100px]" />
				<SkeletonLoading type="text" className="!h-[30px] !w-[100px]" />
				<SkeletonLoading type="text" className="!h-[30px] !w-[100px]" />
			{:else}
				{#each animeDetail?.genres as genre}
					<span
						class="rounded-full border-2 border-red-500 px-3 py-1 text-xs font-medium text-white"
					>
						{genre.replace(',', '')}
					</span>
				{/each}
			{/if}
		</div>
		<div class="mb-4 flex flex-wrap justify-center gap-2 px-4">
			{#if isLoading}
				<SkeletonLoading type="text" className="!h-[30px] !w-[100px]" />
				<SkeletonLoading type="text" className="!h-[30px] !w-[100px]" />
				<SkeletonLoading type="text" className="!h-[30px] !w-[100px]" />
				<SkeletonLoading type="text" className="!h-[30px] !w-[100px]" />
				<SkeletonLoading type="text" className="!h-[30px] !w-[100px]" />
			{:else}
				{#each animeDetail?.relatedTags as tag}
					<span class="rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white">
						{tag.replace(',', '')}
					</span>
				{/each}
			{/if}
		</div>

		<!-- Description -->
		<div
			class="no-scroll max-h-50 relative mb-3 min-h-0 overflow-y-hidden px-4 text-center text-sm leading-relaxed text-gray-300"
		>
			<span
				class="pointer-events-none absolute inset-0 block h-full w-full bg-gradient-to-b from-black/20 via-transparent to-black/20"
			></span>
			{#if isLoading}
				<div class="flex flex-col items-center">
					<SkeletonLoading type="text" className="!h-[10px] !w-full" />
					<SkeletonLoading type="text" className="!h-[10px] !w-[300px] mt-1" />
					<SkeletonLoading type="text" className="!h-[10px] !w-[200px] mt-1" />
					<SkeletonLoading type="text" className="!h-[10px] !w-[2500px] mt-1" />
					<SkeletonLoading type="text" className="!h-[10px] !w-full mt-1" />
					<SkeletonLoading type="text" className="!h-[10px] !w-[179px] mt-1" />
					<SkeletonLoading type="text" className="!h-[10px] !w-[239px] mt-1" />
					<SkeletonLoading type="text" className="!h-[10px] !w-full mt-1" />
				</div>
			{:else}
				<p class="max-h-50 no-scroll h-full w-full overflow-y-auto text-xs">
					{animeDetail?.description}
				</p>
			{/if}
		</div>

		<div class="mt-10">
			{#if Object.keys(animeDetail || {}).length > 0}
				<Carousel
					slides={[Episode, Detail, Comming]}
					slidesBtn={['Episode', 'Detail', 'Komentar']}
					{animeDetail}
					{data}
				/>
			{/if}
		</div>
	</div>
</div>
<div
	class="fixed bottom-4 right-20 z-10 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-red-500 p-4"
>
	<button
		on:click={() => {
			if (!isCopy) {
				const thisLink = window.location.href;
				navigator.clipboard.writeText(thisLink || '');
				isCopy = true;
				setTimeout(() => {
					isCopy = false;
				}, 2000);
			}
		}}
		disabled={isCopy}
		class="flex items-center justify-center disabled:cursor-not-allowed"
	>
		{#if isCopy}
			<CheckIcon class="text-white" size={24} />
		{:else}
			<LinkIcon class="text-white" size={24} />
		{/if}
	</button>
</div>
<div
	class="fixed bottom-4 right-4 z-10 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-red-500 p-4"
>
	<button
		on:click={() => {
			if (!isBookmart) {
				const thisLink = window.location.href;
				navigator.clipboard.writeText(thisLink || '');
				isBookmart = true;
			}
		}}
		disabled={isBookmart}
		class="flex items-center justify-center disabled:cursor-not-allowed"
	>
		{#if isBookmart}
			<BookmarkCheck class="text-white" size={24} />
		{:else}
			<Bookmark class="text-white" size={24} />
		{/if}
	</button>
</div>
