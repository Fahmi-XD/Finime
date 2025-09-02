<script lang="ts">
	import { ArrowRight, Heart } from '@lucide/svelte';
	import { MangaMobileClient } from '$lib/api/clients/mobile/mangaClient';
	import { runtimeData } from '$lib/stores/runtime';
	import { onMount } from 'svelte';
	import type { MangaData } from '$lib/api/types/mobile/manga/genreType';
	import { seeAllTitle } from '$lib/stores/home.mobile';

	import SkeletonLoading from '../ui/SkeletonLoading.svelte';

	let mangaListRomance: MangaData[] = [];
	let mangaListSchool: MangaData[] = [];
	let mangaListScifi: MangaData[] = [];
	let mangaListAction: MangaData[] = [];
	let mangaListDrama: MangaData[] = [];
	let mangaListLoli: MangaData[] = [];
	let isLoading = new Array(6).fill(true);

	onMount(async () => {
		try {
			// Romance

			if (
				$runtimeData['manga.romance.cache'] &&
				typeof $runtimeData['manga.romance.cache'] == 'object'
			) {
	      mangaListRomance = $runtimeData['manga.romance.cache'];
				isLoading[0] = false;
			} else {
				isLoading[0] = true;
				const mangas = await MangaMobileClient.getbyGenre('romance');
				mangaListRomance = mangas;
				$runtimeData['manga.romance.cache'] = mangas;
	      isLoading[0] = false;
			}

			// School

			if (
				$runtimeData['manga.school.cache'] &&
				typeof $runtimeData['manga.school.cache'] == 'object'
			) {
	      mangaListSchool = $runtimeData['manga.school.cache'];
				isLoading[1] = false;
			} else {
				isLoading[1] = true;
				const mangas = await MangaMobileClient.getbyGenre('school');
				mangaListSchool = mangas;
				$runtimeData['manga.school.cache'] = mangas;
	      isLoading[1] = false;
			}

			// Scifi

			if (
				$runtimeData['manga.scifi.cache'] &&
				typeof $runtimeData['manga.scifi.cache'] == 'object'
			) {
	      mangaListScifi = $runtimeData['manga.scifi.cache'];
				isLoading[2] = false;
			} else {
				isLoading[2] = true;
				const mangas = await MangaMobileClient.getbyGenre('sci-fi');
				mangaListScifi = mangas;
				$runtimeData['manga.scifi.cache'] = mangas;
	      isLoading[2] = false;

			}

			// Action

			if (
				$runtimeData['manga.action.cache'] &&
				typeof $runtimeData['manga.action.cache'] == 'object'
			) {
	      mangaListAction = $runtimeData['manga.action.cache'];
				isLoading[3] = false;
			} else {
				isLoading[3] = true;
				const mangas = await MangaMobileClient.getbyGenre('action');
				mangaListAction = mangas;
				$runtimeData['manga.action.cache'] = mangas;
	      isLoading[3] = false;
			}

			// Drama

			if (
				$runtimeData['manga.drama.cache'] &&
				typeof $runtimeData['manga.drama.cache'] == 'object'
			) {
	      mangaListDrama = $runtimeData['manga.drama.cache'];
				isLoading[4] = false;
			} else {
				isLoading[4] = true;
				const mangas = await MangaMobileClient.getbyGenre('drama');
				mangaListDrama = mangas;
				$runtimeData['manga.drama.cache'] = mangas;
	      isLoading[4] = false;
			}

			// Loli

			if (
	      $runtimeData['manga.loli.cache'] &&
	      typeof $runtimeData['manga.loli.cache'] == 'object'
	    ) {
	      mangaListLoli = $runtimeData['manga.loli.cache'];
				isLoading[5] = false;
			} else {
				isLoading[5] = true;
				const mangas = await MangaMobileClient.getbyGenre('loli');
				mangaListLoli = mangas;
				$runtimeData['manga.loli.cache'] = mangas;
	      isLoading[5] = false;
			}
		} catch (error) {
			console.log(error);
		}
	});
</script>

<div class="bg-vanta h-screen overflow-x-hidden p-[20px] pb-[80px] pt-10 text-white">
	<ul>
		<li>
			<div class="block h-auto w-full">
				<div class="mt-10 flex w-full items-center gap-4">
					<h1 class="flex items-center gap-1 text-lg font-bold">Romance</h1>
					<h1 class="h-auto w-auto rounded-3xl bg-red-600 px-2 py-1 text-xs">Popular</h1>
					<a
						href="/mobile/see-all"
						class="ml-auto"
						on:click={() => seeAllTitle.set('Manga Romance')}
					>
						<ArrowRight />
					</a>
				</div>
				<div class="mt-5 grid w-full min-w-0 grid-cols-[290px_1fr]">
					<div class="relative flex w-full">
						{#if isLoading[0]}
							{#each new Array(6).fill({}) as _, i (i)}
								<SkeletonLoading
									type="image"
									style={`left: ${40 * i}px`}
									className="!w-[100px] rounded-2xl {i != 5
										? '!absolute'
										: '!z-1 !relative'} shrink-0 top-0 shadow-custom !h-[140px] object-cover"
								/>
							{/each}
						{:else}
							{#each mangaListRomance.slice(0, 6) as manga, i (i)}
								<img
									class="!w-[100px] rounded-2xl {i != 5
										? '!absolute'
										: '!z-1 !relative'} shadow-custom top-0 !h-[140px] object-cover"
									src={manga.image}
									style={`left: ${40 * i}px`}
									alt={manga.title}
								/>
							{/each}
						{/if}
					</div>
					<div class="flex h-full w-full items-center justify-center">
						<h1 class="text-body-medium text-white opacity-70">
							{mangaListRomance?.length || 5 - 5}+
						</h1>
					</div>
				</div>
				<div class="mt-5 flex w-full items-center justify-between">
					<div class="flex items-center gap-2">
						{#if isLoading[0]}
							{#each new Array(10).fill({}) as _, i (i)}
								<SkeletonLoading
									type="image"
									className="!h-[20px] !w-[20px]"
								/>
							{/each}
						{:else}
							{#each mangaListRomance.slice(0, 10) as manga, i (i)}
								<img
									class="h-[20px] w-[20px] rounded-full"
									src={manga.image}
									alt={manga.title}
								/>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</li>

		<li>
			<div class="block h-auto w-full">
				<div class="mt-10 flex w-full items-center gap-4">
					<h1 class="flex items-center gap-1 text-lg font-bold">School</h1>
					<a
						href="/mobile/see-all"
						class="ml-auto"
						on:click={() => seeAllTitle.set('Manga School')}
					>
						<ArrowRight />
					</a>
				</div>
				<div class="mt-5 grid w-full min-w-0 grid-cols-[290px_1fr]">
					<div class="relative flex w-full">
						{#if isLoading[1]}
							{#each new Array(6).fill({}) as _, i (i)}
								<SkeletonLoading
									type="image"
									style={`left: ${40 * i}px`}
									className="!w-[100px] rounded-2xl {i != 5
										? '!absolute'
										: '!z-1 !relative'} shrink-0 !top-{(
										10 * i
									).toString()}* i} shadow-custom !h-[140px] object-cover"
								/>
							{/each}
						{:else}
							{#each mangaListSchool.slice(0, 6) as manga, i (i)}
								<img
									class="!w-[100px] rounded-2xl {i != 5
										? '!absolute'
										: '!z-1 !relative'} shadow-custom top-0 !h-[140px] object-cover"
									src={manga.image}
									style={`left: ${40 * i}px`}
									alt={manga.title}
								/>
							{/each}
						{/if}
					</div>
					<div class="flex h-full w-full items-center justify-center">
						<h1 class="text-body-medium text-white opacity-70">
							{mangaListSchool?.length || 5 - 5}+
						</h1>
					</div>
				</div>
				<div class="mt-5 flex w-full items-center justify-between">
					<div class="flex items-center gap-2">
						{#if isLoading[1]}
							{#each new Array(10).fill({}) as _, i (i)}
								<SkeletonLoading
									type="image"
									className="!h-[20px] !w-[20px]"
								/>
							{/each}
						{:else}
							{#each mangaListSchool.slice(0, 10) as manga, i (i)}
								<img
									class="h-[20px] w-[20px] rounded-full"
									src={manga.image}
									alt={manga.title}
								/>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</li>

		<li>
			<div class="block h-auto w-full">
				<div class="mt-10 flex w-full items-center gap-4">
					<h1 class="flex items-center gap-1 text-lg font-bold">Sci-Fi</h1>
					<a
						href="/mobile/see-all"
						class="ml-auto"
						on:click={() => seeAllTitle.set('Manga Sci-Fi')}
					>
						<ArrowRight />
					</a>
				</div>
				<div class="mt-5 grid w-full min-w-0 grid-cols-[290px_1fr]">
					<div class="relative flex w-full">
						{#if isLoading[2]}
							{#each new Array(6).fill({}) as _, i (i)}
								<SkeletonLoading
									type="image"
									style={`left: ${40 * i}px`}
									className="!w-[100px] rounded-2xl {i != 5
										? '!absolute'
										: '!z-1 !relative'} shrink-0 !top-{(
										10 * i
									).toString()}* i} shadow-custom !h-[140px] object-cover"
								/>
							{/each}
						{:else}
							{#each mangaListScifi.slice(0, 6) as manga, i (i)}
								<img
									class="!w-[100px] rounded-2xl {i != 5
										? '!absolute'
										: '!z-1 !relative'} shadow-custom top-0 !h-[140px] object-cover"
									src={manga.image}
									style={`left: ${40 * i}px`}
									alt={manga.title}
								/>
							{/each}
						{/if}
					</div>
					<div class="flex h-full w-full items-center justify-center">
						<h1 class="text-body-medium text-white opacity-70">
							{mangaListScifi?.length || 5 - 5}+
						</h1>
					</div>
				</div>
				<div class="mt-5 flex w-full items-center justify-between">
					<div class="flex items-center gap-2">
						{#if isLoading[2]}
							{#each new Array(10).fill({}) as _, i (i)}
								<SkeletonLoading
									type="image"
									className="!h-[20px] !w-[20px]"
								/>
							{/each}
						{:else}
							{#each mangaListScifi.slice(0, 10) as manga, i (i)}
								<img
									class="h-[20px] w-[20px] rounded-full"
									src={manga.image}
									alt={manga.title}
								/>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</li>

		<li>
			<div class="block h-auto w-full">
				<div class="mt-10 flex w-full items-center gap-4">
					<h1 class="flex items-center gap-1 text-lg font-bold">Action</h1>
					<a
						href="/mobile/see-all"
						class="ml-auto"
						on:click={() => seeAllTitle.set('Manga Action')}
					>
						<ArrowRight />
					</a>
				</div>
				<div class="mt-5 grid w-full min-w-0 grid-cols-[290px_1fr]">
					<div class="relative flex w-full">
						{#if isLoading[3]}
							{#each new Array(6).fill({}) as _, i (i)}
								<SkeletonLoading
									type="image"
									style={`left: ${40 * i}px`}
									className="!w-[100px] rounded-2xl {i != 5
										? '!absolute'
										: '!z-1 !relative'} shrink-0 !top-{(
										10 * i
									).toString()}* i} shadow-custom !h-[140px] object-cover"
								/>
							{/each}
						{:else}
							{#each mangaListAction.slice(0, 6) as manga, i (i)}
								<img
									class="!w-[100px] rounded-2xl {i != 5
										? '!absolute'
										: '!z-1 !relative'} shadow-custom top-0 !h-[140px] object-cover"
									src={manga.image}
									style={`left: ${40 * i}px`}
									alt={manga.title}
								/>
							{/each}
						{/if}
					</div>
					<div class="flex h-full w-full items-center justify-center">
						<h1 class="text-body-medium text-white opacity-70">
							{mangaListAction?.length || 5 - 5}+
						</h1>
					</div>
				</div>
				<div class="mt-5 flex w-full items-center justify-between">
					<div class="flex items-center gap-2">
						{#if isLoading[3]}
							{#each new Array(10).fill({}) as _, i (i)}
								<SkeletonLoading
									type="image"
									className="!h-[20px] !w-[20px]"
								/>
							{/each}
						{:else}
							{#each mangaListAction.slice(0, 10) as manga, i (i)}
								<img
									class="h-[20px] w-[20px] rounded-full"
									src={manga.image}
									alt={manga.title}
								/>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</li>

		<li>
			<div class="block h-auto w-full">
				<div class="mt-10 flex w-full items-center gap-4">
					<h1 class="flex items-center gap-1 text-lg font-bold">Drama</h1>
					<a href="/mobile/see-all" class="ml-auto" on:click={() => seeAllTitle.set('Manga Drama')}>
						<ArrowRight />
					</a>
				</div>
				<div class="mt-5 grid w-full min-w-0 grid-cols-[290px_1fr]">
					<div class="relative flex w-full">
						{#if isLoading[4]}
							{#each new Array(6).fill({}) as _, i (i)}
								<SkeletonLoading
									type="image"
									style={`left: ${40 * i}px`}
									className="!w-[100px] rounded-2xl {i != 5
										? '!absolute'
										: '!z-1 !relative'} shrink-0 !top-{(
										10 * i
									).toString()}* i} shadow-custom !h-[140px] object-cover"
								/>
							{/each}
						{:else}
							{#each mangaListDrama.slice(0, 6) as manga, i (i)}
								<img
									class="!w-[100px] rounded-2xl {i != 5
										? '!absolute'
										: '!z-1 !relative'} shadow-custom top-0 !h-[140px] object-cover"
									src={manga.image}
									style={`left: ${40 * i}px`}
									alt={manga.title}
								/>
							{/each}
						{/if}
					</div>
					<div class="flex h-full w-full items-center justify-center">
						<h1 class="text-body-medium text-white opacity-70">
							{mangaListDrama?.length || 5 - 5}+
						</h1>
					</div>
				</div>
				<div class="mt-5 flex w-full items-center justify-between">
					<div class="flex items-center gap-2">
						{#if isLoading[4]}
							{#each new Array(10).fill({}) as _, i (i)}
								<SkeletonLoading
									type="image"
									className="!h-[20px] !w-[20px]"
								/>
							{/each}
						{:else}
							{#each mangaListDrama.slice(0, 10) as manga, i (i)}
								<img
									class="h-[20px] w-[20px] rounded-full"
									src={manga.image}
									alt={manga.title}
								/>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</li>

		<li>
			<div class="block h-auto w-full">
				<div class="mt-10 flex w-full items-center gap-4">
					<h1 class="flex items-center gap-1 text-lg font-bold">Loli</h1>
					<a href="/mobile/see-all" class="ml-auto" on:click={() => seeAllTitle.set('Manga Loli')}>
						<ArrowRight />
					</a>
				</div>
				<div class="mt-5 grid w-full min-w-0 grid-cols-[290px_1fr]">
					<div class="relative flex w-full">
						{#if isLoading[5]}
							{#each new Array(6).fill({}) as _, i (i)}
								<SkeletonLoading
									type="image"
									style={`left: ${40 * i}px`}
									className="!w-[100px] rounded-2xl {i != 5
										? '!absolute'
										: '!z-1 !relative'} shrink-0 !top-{(
										10 * i
									).toString()}* i} shadow-custom !h-[140px] object-cover"
								/>
							{/each}
						{:else}
							{#each mangaListLoli.slice(0, 6) as manga, i (i)}
								<img
									class="!w-[100px] rounded-2xl {i != 5
										? '!absolute'
										: '!z-1 !relative'} shadow-custom top-0 !h-[140px] object-cover"
									src={manga.image}
									style={`left: ${40 * i}px`}
									alt={manga.title}
								/>
							{/each}
						{/if}
					</div>
					<div class="flex h-full w-full items-center justify-center">
						<h1 class="text-body-medium text-white opacity-70">
							{mangaListLoli?.length || 5 - 5}+
						</h1>
					</div>
				</div>
				<div class="mt-5 flex w-full items-center justify-between">
					<div class="flex items-center gap-2">
						{#if isLoading[5]}
							{#each new Array(10).fill({}) as _, i (i)}
								<SkeletonLoading
									type="image"
									className="!h-[20px] !w-[20px]"
								/>
							{/each}
						{:else}
							{#each mangaListLoli.slice(0, 10) as manga, i (i)}
								<img
									class="h-[20px] w-[20px] rounded-full"
									src={manga.image}
									alt={manga.title}
								/>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>
