<script lang="ts">
	import { scale } from 'svelte/transition';
	import { ArrowLeft } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { runtimeData } from '$lib/stores/runtime';
	import { MangaMobileClient } from '$lib/api/clients/mobile/mangaClient';

	import LoadingElements from '$lib/components/ui/LoadingElements.svelte';

	import type { IMangaSlug } from './+page';
	import type { MangaDetail } from '$lib/api/types/mobile/manga/detailType';

	export let data: IMangaSlug;

	let mangaDetail: MangaDetail;
	let isLoading: boolean = true;

	onMount(async () => {
		if (
			$runtimeData['manga.detail.cache.' + data.mangaSlug] &&
			typeof $runtimeData['manga.detail.cache.' + data.mangaSlug] == 'object'
		) {
			mangaDetail = $runtimeData['manga.detail.cache.' + data.mangaSlug];
			isLoading = false;
		} else {
			isLoading = true;
			const mangas = await MangaMobileClient.getDetail(data.mangaSlug);
			mangaDetail = mangas;
			$runtimeData['manga.detail.cache.' + data.mangaSlug] = mangas;
			isLoading = false;
		}
	});
</script>

<svelte:head>
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
		rel="stylesheet"
	/>
</svelte:head>

{#if isLoading}
	<LoadingElements teks="Baca apa bang?" />
{/if}
<div class="p-4x mx-auto max-w-sm text-white" in:scale={{ duration: 200, start: 0.99 }}>
	<button
		aria-label="Back"
		on:click={() => window.history.back()}
		class="flex items-center gap-1 pt-10 text-lg text-white"
	>
		<ArrowLeft size={20} />
		<h1 class="text-lg font-semibold text-white opacity-70">Kembali</h1>
	</button>

	<div class="relative overflow-hidden rounded-lg pt-4">
		<img
			alt={mangaDetail?.title}
			class="h-auto w-full rounded-lg object-cover"
			src={mangaDetail?.yoastSchema?.image?.url}
		/>
		<button
			aria-label="Favorite"
			class="absolute right-3 top-3 rounded-full bg-white bg-opacity-70 p-2 text-red-600"
		>
			<i class="fas fa-heart"> </i>
		</button>
	</div>
	<div class="mt-3">
		<h1 class="text-lg font-bold leading-tight text-white">{mangaDetail?.title}</h1>
		{#each (mangaDetail?.altTitles || []) as alt}
			<h1 class="text-xs font-bold leading-tight text-white/60">{alt}</h1>
		{/each}
		<div class="mt-5 flex flex-wrap gap-2">
			{#each (mangaDetail?.genres || [{}]) as genre}
				<span class="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
					{genre?.name}
				</span>
			{/each}
		</div>
		<div class="mt-1 flex items-center gap-1 text-xs font-semibold text-yellow-500">
			<i class="fas fa-star"> </i>
			<span> {(mangaDetail?.rating?.value || 1.00)} / 10 </span>
			<span class="ml-2 text-xs font-normal text-white/70"> From {mangaDetail?.rating?.count} users </span>
		</div>
	</div>
	<div class="my-4 flex items-center gap-2 text-xs">
		<a href="/" class="rounded-3xl bg-red-500 px-7 py-2">First Chapter 1</a>
		<a href="/" class="rounded-3xl border-2 border-red-500 bg-transparent px-7 py-2"
			>Last {mangaDetail?.chapters?.[0]?.title}</a
		>
	</div>
	<div class="mt-6 border-b border-gray-300">
		<nav class="flex space-x-6 text-sm font-semibold text-red-500">
			<button class="pb-2"> Overview </button>
		</nav>
	</div>
	<div class="mt-4 text-xs leading-tight text-white/50">
		<p>
			"{mangaDetail?.description?.text}"
		</p>
	</div>
	<div class="mt-5 flex w-full justify-center text-white/90">
		<table class="w-full">
			<tbody>
				<tr class="[&>*]:px-4 [&>*]:py-2">
					<td class="border-r border-white/50 border-b">Source</td>
					<td class="opacity-70 border-b border-white/50">Kiryuu</td>
				</tr>
				<tr class="[&>*]:px-4 [&>*]:py-2">
					<td class="border-r border-white/50 border-b">Status</td>
					<td class="opacity-70 border-b border-white/50">{mangaDetail?.info?.status}</td>
				</tr>
				<tr class="[&>*]:px-4 [&>*]:py-2">
					<td class="border-r border-white/50 border-b">Type</td>
					<td class="opacity-70 border-b border-white/50">{mangaDetail?.info?.type}</td>
				</tr>
				<tr class="[&>*]:px-4 [&>*]:py-2">
					<td class="border-r border-white/50 border-b">Released</td>
					<td class="opacity-70 border-b border-white/50">{mangaDetail?.info?.released}</td>
				</tr>
				<tr class="[&>*]:px-4 [&>*]:py-2">
					<td class="border-r border-white/50 border-b">Author</td>
					<td class="opacity-70 border-b border-white/50">{mangaDetail?.info?.author}</td>
				</tr>
				<tr class="[&>*]:px-4 [&>*]:py-2">
					<td class="border-r border-white/50 border-b">Posted by</td>
					<td class="opacity-70 border-b border-white/50">{mangaDetail?.info?.postedBy}</td>
				</tr>
				<tr class="[&>*]:px-4 [&>*]:py-2">
					<td class="border-r border-white/50 border-b">Posted on</td>
					<td class="opacity-70 border-b border-white/50">{mangaDetail?.info?.postedOn}</td>
				</tr>
				<tr class="[&>*]:px-4 [&>*]:py-2">
					<td class="border-r border-white/50 border-b">Update on</td>
					<td class="opacity-70 border-b border-white/50">{mangaDetail?.info?.updatedOn}</td>
				</tr>
				<tr class="[&>*]:px-4 [&>*]:py-2">
					<td class="border-r border-white/50 border-b">Visited</td>
					<td class="opacity-70 border-b border-white/50">{mangaDetail?.info?.views}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="mt-6 border-b border-gray-300">
		<nav class="flex space-x-6 text-sm font-semibold text-red-500">
			<button class="pb-2"> Chapter </button>
		</nav>
	</div>
	<div class="mt-5 flex flex-wrap justify-around gap-2 pb-10">
		{#each (mangaDetail?.chapters || []) as chapter, i (i)}	
			<a
				href="/mobile/manga/read/{(chapter?.url || "").replace("https://kiryuu02.com/", "")}"
				class="flex h-10 w-20 shrink-0 items-center justify-center rounded-2xl border border-red-500/70 bg-transparent text-sm font-bold"
				>{chapter?.number}</a
			>
		{/each}
	</div>
</div>
