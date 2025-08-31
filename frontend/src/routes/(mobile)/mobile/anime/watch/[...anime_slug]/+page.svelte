<script lang="ts">
	import type { IAnimeSlug } from './+page';
	import { onMount, onDestroy } from 'svelte';
	import {
		Star,
		Shield,
		BadgeCheckIcon,
		SendHorizonal,
		EllipsisVertical,
		Loader,
		CheckIcon,
		LinkIcon,
		ThumbsUp,
		ThumbsDown,
		Code
	} from '@lucide/svelte';
	import { scale, fade } from 'svelte/transition';
	import { page } from '$app/state';
	import { page as pages } from '$app/stores';
	import { PUBLIC_API } from '$env/static/public';
	import { BrowserData } from '$lib';

	import { AnimeMobileClient } from '$lib/api/clients/mobile/animeClient';
	import { UserMobileClient } from '$lib/api/clients/mobile/userClient';
	import type { IAnimeEpisodeDetail } from '$lib/api/types/mobile/episodeType';
	import type { IAnimeDetail } from '$lib/api/types/mobile/detailType';
	import type { ICommentModel } from '$lib/api/types/mobile/commentType';
	import { runtimeMobile } from '$lib/stores/runtime';
	import { getInitials } from '$lib';

	import PlyrPlayer from '$lib/components/mobile/VideoPlayers/PlyrPlayer.svelte';
	import VideoJsPlayer from '$lib/components/mobile/VideoPlayers/VideoJSPlayer.svelte';

	import LoadingElements from '$lib/components/ui/LoadingElements.svelte';
	import { goto } from '$app/navigation';

	export let data: IAnimeSlug;

	const animeSlug = page.url.pathname.split('/').slice(-3, -1).join('/');
	const user = page.data.user;
	const PLAYER_MAP = {
		"plyr": PlyrPlayer,
		"videojs": VideoJsPlayer
	}

	$: animeSlugWithEpisode = '';

	$: {
		if ($pages.url.pathname.split('/').slice(-3).length > 2) {
			animeSlugWithEpisode = $pages.url.pathname.split('/').slice(-3).join('/');
		} else {
			animeSlugWithEpisode = data.animeSlug;
		}
	}

	let animeDetail: IAnimeEpisodeDetail;
	let animeDetail2: IAnimeDetail;
	let commentList: ICommentModel[] = [];
	let isLoading = false;
	let lastSlug = data.animeSlug;
	let isOpenDots = false;
	let isCopy = false;
	let isOpenDotsId = '';
	let isCommentLoading = false;
	let isCommentLoadingDelete = false;
	let commentStr = '';

	$: playerType = "plyr";

	$: if (animeSlugWithEpisode && animeSlugWithEpisode !== lastSlug) {
		lastSlug = animeSlugWithEpisode;
		fetchAllData();
	}

	$: if (playerType && typeof window != "undefined") {
		BrowserData.set("playerType", playerType);

		const plyrPlayer = document.querySelectorAll(".plyr-player");
		const videojsPlayer = document.querySelectorAll(".videojs-player");

		console.log(plyrPlayer.length, videojsPlayer.length)
		
		if (playerType == "videojs" && plyrPlayer) {
			console.log("PLYR Remove")
			plyrPlayer.forEach((el) => {
				el.remove();
			})
		} else if (playerType == "pylr" && videojsPlayer) {
			console.log("VideoJS Remove")
			videojsPlayer.forEach((el) => {
				el.remove();
			})
		}
	}

	async function postComment(comment: string) {
		if (!user || !user.id) {
			return;
		}

		try {
			const response = await UserMobileClient.postComment(comment, animeSlugWithEpisode);
		} catch (error) {
			console.error('Error posting comment:', error);
		}
	}

	async function fetchComment() {
		const response = await UserMobileClient.getComment(animeSlugWithEpisode);
		commentList = response;
		$runtimeMobile['comment.detail.' + data.animeSlug] = response;
	}

	async function fetchAllData() {
		isLoading = true;
		if (
			$runtimeMobile['episode.detail.' + data.animeSlug] &&
			typeof $runtimeMobile['episode.detail.' + data.animeSlug] == 'object'
		) {
			animeDetail = $runtimeMobile['episode.detail.' + data.animeSlug];
		} else {
			const response = await AnimeMobileClient.getEpisode(data.animeSlug);
			animeDetail = response;
			$runtimeMobile['episode.detail.' + data.animeSlug] = response;
		}

		if (
			$runtimeMobile['anime.detail.' + data.animeSlug] &&
			typeof $runtimeMobile['anime.detail.' + data.animeSlug] == 'object'
		) {
			animeDetail2 = $runtimeMobile['anime.detail.' + data.animeSlug];
		} else {
			const response = await AnimeMobileClient.getDetail(animeSlug);
			animeDetail2 = response;
			$runtimeMobile['anime.detail.' + data.animeSlug] = response;
		}

		// if ($runtimeMobile["comment.detail." + data.animeSlug] && typeof $runtimeMobile["comment.detail." + data.animeSlug] == "object") {
		// 	commentList = $runtimeMobile["comment.detail." + data.animeSlug]
		// } else {
		// 	await fetchComment();
		// }
		await fetchComment();

		isLoading = false;
	}

	function handleCloseDots(event: MouseEvent) {
		console.log(isOpenDots);
		if ((!event.target || !(event.target as HTMLElement).closest('.dots-menu')) && isOpenDots) {
			isOpenDots = false;
		} else if ((event.target as HTMLElement).closest('.dots-menu') && !isOpenDots) {
			isOpenDots = true;
			isOpenDotsId =
				(event.target as HTMLElement).closest('.dots-menu')?.getAttribute('data-commentId') || '';
		}
	}

	onMount(async () => {
		if (typeof window == 'undefined') return;

		playerType = BrowserData.get("playerType") as string || "plyr";

		await fetchAllData();

		setTimeout(() => {
			// console.log(animeDetail?.videoUrls[animeDetail?.videoUrls?.length - 1]);

			if (typeof window !== 'undefined') {
				window.addEventListener('click', handleCloseDots);
			}
		}, 10);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('click', handleCloseDots);
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

{#if isLoading}
	<LoadingElements teks="Kalau ada bug atau error, biarin aja error itu fitur bos yahaha hayyuukkkk" />
{/if}
<div class="mx-auto max-w-md pb-20 text-white will-change-auto" in:scale={{ duration: 200, start: 0.95 }}>
	{#if Array.isArray(animeDetail?.videoUrls) && animeDetail?.videoUrls.length > 0}
		<!-- <CustomVideoPlayer videoUrl={animeDetail?.videoUrls[animeDetail?.videoUrls?.length - 1]} /> -->

		<div class="container">
			{#key playerType}
				<svelte:component this={(PLAYER_MAP as any)[playerType as any]} {animeDetail} />
			{/key}
		</div>
	{:else}
		<iframe
			class="aspect-video w-full"
			src={animeDetail?.videoUrls as string}
			frameborder="0"
			allowfullscreen
			allow="autoplay; encrypted-media; picture-in-picture"
			loading="lazy"
			title="Anime Video Player"
		></iframe>
	{/if}
	<div class="bg-gradient-to-t w-full from-black/90 to-transparent pb-8 pt-5">
		<div class="px-4 flex items-start gap-3 mb-4">
			<img src={animeDetail2?.image} alt={(animeDetail?.title || '').replace('- Kuramanime', '')} class="w-[40px] h-[40px] object-cover rounded-full shrink-0" />
			<div class="flex flex-col justify-center min-w-0">
				<h1 class="text-sm font-extrabold leading-tight opacity-70">
					{(animeDetail?.title || '').replace('- Kuramanime', '')}
				</h1>
				<p class="mt-1 text-sm font-normal">
					Episode {parseInt((animeDetail?.title || '-').match(/\(\w+\s?([0-9]+)\)/i)?.[1] || '1') ||
						'1'}
				</p>
			</div>
		</div>
		<!-- <div class="mb-3 flex flex-wrap gap-2">
			<button
				class="flex items-center gap-2 rounded-md bg-neutral-800/60 px-3 py-2 text-sm font-semibold"
			>
				<i class="fas fa-thumbs-up"> </i>
				396
			</button>
			<button
				class="flex items-center gap-2 rounded-md border-l border-gray-600 bg-neutral-800/60 px-3 py-2 pl-3 text-sm font-semibold"
			>
				1
				<i class="fas fa-thumbs-down"> </i>
			</button>
			<button class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
				360p
			</button>
			<button class="rounded-md bg-neutral-800/60 px-4 py-2 text-sm font-semibold"> Ganti </button>
			<button class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
				S1
			</button>
			<button class="rounded-md bg-neutral-800/60 px-4 py-2 text-sm font-semibold">
				Ganti Server
			</button>
		</div> -->
		<div class="flex gap-2 items-center px-4">
			<div class="mb-4 flex h-[40px] w-[40px] items-center justify-center rounded-2xl bg-neutral-800/60 p-4">
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
						<CheckIcon class="text-white" size={20} />
					{:else}
						<LinkIcon class="text-white" size={20} />
					{/if}
				</button>
			</div>
			<div class="mb-4 flex h-[40px] w-auto items-center justify-center rounded-2xl bg-neutral-800/60 p-4">
				<button
					on:click={() => {
						console.log("Anjay")
					}}
					class="flex items-center gap-1 justify-center disabled:cursor-not-allowed"
				>
					<ThumbsUp class="text-white" size={15} />
					<p class="text-sm">0</p>
				</button>
			</div>
			<div class="mb-4 flex h-[40px] w-auto items-center justify-center rounded-2xl bg-neutral-800/60 p-4">
				<button
					on:click={() => {
						console.log("Anjay")
					}}
					class="flex items-center gap-1 justify-center disabled:cursor-not-allowed"
				>
					<ThumbsDown class="text-white" size={15} />
					<p class="text-sm">0</p>
				</button>
			</div>
			<div class="mb-4 flex h-[40px] w-auto items-center justify-center rounded-2xl bg-neutral-800/60 p-4">
				<Code class="text-white mr-1" size={15} />
				<select
					bind:value={playerType}
					class="flex items-center text-xs gap-1 justify-center disabled:cursor-not-allowed"
				>
					<option value="plyr" class="text-xs text-white bg-black">PLYR</option>
					<option value="videojs" class="text-xs text-white bg-black">Video JS</option>
				</select>
			</div>
		</div>
		<div class="mb-6 flex flex-nowrap no-scroll px-4 overflow-x-auto w-full gap-3">
			<!-- <button
				class="flex items-center gap-2 rounded-md bg-neutral-800/60 px-4 py-2 text-sm font-semibold"
			>
				<i class="fas fa-arrow-down"> </i>
				Download
			</button> -->
			{#each animeDetail2?.episodeList || [] as episode, i (i)}
				<button
					on:click={() => {
						goto(`/mobile/anime/watch/${animeSlug}/${i + 1}`, { replaceState: true });
					}}
					class="flex {i + 1 ==
					parseInt((animeDetail?.title || '-').match(/\(\w+\s?([0-9]+)\)/i)?.[1] || '1')
						? 'bg-red-500'
						: 'bg-neutral-800/60'} shrink-0 min-w-0 cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold"
				>
					{i + 1}
				</button>
			{/each}
		</div>
		<h2 class="mb-4 text-lg font-extrabold px-4">Komentar</h2>
		{#if Object.keys(user).length > 0}
			<form class="mb-6 flex gap-3 px-4">
				<textarea
					class="flex-grow text-sm rounded-lg bg-neutral-800/50 border border-white/15 px-4 py-3 text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b6bf5]"
					placeholder="Komentar.."
					bind:value={commentStr}
				></textarea>
				<button
					aria-label="Send comment"
					class="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-800/50 border border-white/15 text-white"
					type="submit"
					disabled={isCommentLoading}
					on:click={async (e) => {
						e.preventDefault();
						const comment = commentStr;
						if (!comment) return;

						isCommentLoading = true;
						try {
							await postComment(comment);
							await fetchComment();
							commentStr = '';
						} catch (error) {
							console.error('Error posting comment:', error);
						} finally {
							isCommentLoading = false;
						}
					}}
				>
					{#if isCommentLoading}
						<Loader color="red" class="animate-spin" />
					{:else}
						<SendHorizonal color="red" />
					{/if}
				</button>
			</form>
		{:else}
			<a
				href="/auth/login?from={btoa('/mobile/anime/watch/' + animeSlugWithEpisode)}"
				class="text-sm my-4 text-blue-500 px-4">Masuk untuk berkomentar</a
			>
		{/if}
		<div class="space-y-3 px-4">
			{#each commentList as comment}
				<div
					aria-label="Comment by {comment.user.name}"
					class="flex max-w-full flex-col gap-2 rounded-xl bg-neutral-800/50 border border-white/15 p-5"
				>
					<div class="flex items-center gap-4">
						<div class="relative">
							{#if comment.user.avatar}
								<img
									alt="Avatar of {comment.user.name}"
									class="h-10 w-10 rounded-full object-cover"
									height="40"
									src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={comment.user.avatar}"
									width="40"
								/>
							{:else}
								<div
									class="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[hsl(var(--primary))] text-lg font-bold text-white"
								>
									{getInitials(comment.user.name)}
								</div>
							{/if}
						</div>
						<div>
							<div class="flex items-center gap-1">
								<p class="font-semibold text-sm text-white">{comment.user.name}</p>
								<!-- {#if comment.user.role == "ADMIN"}
									<p class="font-semibold text-red-500">( Admin )</p>
								{/if} -->
								{#if comment.user.isVerify}
									<span
										class="flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
										title="Verified"
									>
										<BadgeCheckIcon size={15} color="#1DA1F2" />
									</span>
									<Star size={15} />
									<Shield size={15} />
								{/if}
							</div>
							<div class="flex items-center gap-2">
								<span
									class="rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-2 py-0.5 text-tiny font-semibold"
								>
									{comment.user.role}
								</span>
								<p class="text-tiny text-gray-400">@{comment.user.username}</p>
							</div>
						</div>
						<div
							class="dots-menu relative ml-auto flex items-center gap-2"
							data-commentId={comment.id}
						>
							<button
								on:click={() => {
									isOpenDots = !isOpenDots;
									isOpenDotsId = comment.id;
								}}
								class="rounded-full bg-neutral-800/50 border border-white/15 p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
							>
								<EllipsisVertical class="h-5 w-5 text-gray-400" />
							</button>
							{#if isOpenDots && isOpenDotsId === comment.id}
								<div
									class="absolute right-0 top-10 z-10 w-48 rounded-lg border border-white/20 bg-black p-2 shadow-lg"
									transition:fade={{ duration: 100 }}
								>
									<ul class="space-y-1">
										<li class="cursor-pointer px-4 py-2 text-white hover:bg-gray-500">
											<a
												href="/user/{comment.user.username}"
											>
												Lihat profile
											</a>
										</li>
										{#if (Object.keys(user).length > 0 && user.id == comment.user.id) || (user?.role && user?.role == "ADMIN")}
											<li class="cursor-pointer px-4 py-2 text-red-500 hover:bg-gray-500">
												<button
													on:click={async () => {
														isCommentLoadingDelete = true;
														isOpenDots = false;
														await UserMobileClient.deleteComment(comment.id);
														await fetchComment();
														isCommentLoadingDelete = false;
													}}
													disabled={isCommentLoadingDelete}
												>
													{#if isCommentLoadingDelete}
														<Loader color="red" class="animate-spin" />
													{:else}
														Hapus
													{/if}
												</button>
											</li>
										{/if}
									</ul>
								</div>
							{/if}
						</div>
						<!-- {#if Object.keys(user).length > 0 && user.id == comment.user.id}
						{/if} -->
						<!-- <p class="ml-auto text-xs font-semibold text-gray-400">Lv. 9999999</p> -->
					</div>
					<p class="text-sm opacity-70 font-normal leading-snug text-white">
						{comment.content}
					</p>
					<div class="flex justify-between text-tiny font-normal text-gray-400">
						<span> {new Date(comment.created_at).toLocaleDateString()} </span>
						<!-- <button class="font-bold text-white"> Balas (0) </button> -->
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
