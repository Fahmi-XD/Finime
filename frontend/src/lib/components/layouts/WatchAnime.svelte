<script lang="ts">
	import { MessageSquare, Info, Tag, ChevronRight, ThumbsUp, ThumbsDown } from '@lucide/svelte';
	import LoadingElements from '$lib/components/ui/LoadingElements.svelte';
	import { onMount } from 'svelte';
	import type { IConvertOtakudesuStreamModel } from '$lib/api/types/convertOtakudesuStream';
	import type { IConvertOtakudesuDetailModel } from '$lib/api/types/convertOtakudesuType';
	import CustomVideoPlayer from '$lib/components/complex/CustomVideoPlayer.svelte';

	export let isLoading: boolean;
	export let notFound: boolean;
	export let episodeId: string = '';
	export let animeDetail: IConvertOtakudesuDetailModel;
	export let episodeList: IConvertOtakudesuStreamModel[];
	export let selectedQuality: string = '360p';
	export let currentEpisode: string = '';

	let showVideoWarning = true;
	let hasAcceptedWarning = false;
	let poster = "/placeholder.png";
  let videoUrl = episodeList?.[0]?.stream?.filter((item) => item?.link?.includes('mp4'))?.[0]?.link as string || "";

	function acceptWarning() {
		hasAcceptedWarning = true;
		showVideoWarning = false;
	}

	function handleIframeLoad() {
		isLoading = false;
	}

	onMount(() => {
		console.log(episodeList);
	});
</script>

<div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8 pt-[100px] text-white">
	<div class="mx-auto min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-5">
		<div class="mb-8">
			<div class="group relative overflow-hidden rounded-xl bg-black shadow-2xl">
				{#if showVideoWarning && !hasAcceptedWarning}
					<div
						class="flex aspect-video w-full flex-col items-center justify-center bg-black p-8 text-center"
					>
						<div class="mx-auto max-w-2xl">
							<h3 class="mb-4 text-xl font-bold text-white">⚠️ Unofficial Content Warning</h3>
							<p class="mb-4 text-gray-300">
								This video is <span class="font-bold text-red-500">NOT OFFICIAL</span> and is shared
								without proper authorization from the copyright holders.
							</p>
							<p class="mb-2 text-gray-300">By continuing, you acknowledge that</p>
							<div class="flex justify-center gap-4">
								<button
									on:click={acceptWarning}
									class="rounded-md bg-red-500 px-6 py-2 font-medium text-white transition-colors hover:bg-red-500"
								>
									I Understand - Continue
								</button>
								<a
									href="/"
									class="rounded-md bg-gray-700 px-6 py-2 text-white transition-colors hover:bg-gray-600"
								>
									Go Back to Safety
								</a>
							</div>
							<p class="mt-6 text-xs text-gray-500">
								We recommend supporting the anime industry through official platforms like
								Crunchyroll, Netflix, or local distributors.
							</p>
						</div>
					</div>
				{:else}
					<div class="relative aspect-video w-full">
						{#if isLoading}
							<LoadingElements variant="absolute" />
						{/if}

						<!-- <iframe
							src={episodeList?.[0]?.stream?.[1]?.link}
							class="h-full w-full"
							allow="fullscreen"
							frameborder="0"
							allowfullscreen
							on:load={handleIframeLoad}
							loading="eager"
							title={episodeList?.[0]?.stream?.[1]?.link}
						></iframe> -->
						<CustomVideoPlayer {videoUrl} />
					</div>
					<div
						class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
					></div>
				{/if}
			</div>
		</div>

		<div class="flex justify-start min-w-0 gap-10 w-fit py-3 px-5 items-center border border-white/20 rounded-lg">
			<div class="flex flex-col items-center gap-2">
				<div class="flex items-center gap-2">
					<ThumbsUp class="h-7 w-7 text-white" />
					<p class="opacity-70">{episodeList?.[0]?.likeCount}</p>
				</div>
			</div>
			<div class="flex flex-col items-center gap-2">
				<div class="flex items-center gap-2">
					<ThumbsDown class="h-7 w-7 text-white" />
					<p class="opacity-70">{episodeList?.[0]?.dislikeCount}</p>
				</div>
			</div>
		</div>

		<!-- {#if episode?.qualities && episode.qualities.length > 0}
			<div class="mb-4 flex gap-2">
				<span class="font-semibold text-white">Quality:</span>
				{#each episode.qualities as q}
					<button
						class="rounded-lg border border-white/20 bg-white/10 px-3 py-1 font-medium text-white transition-all hover:bg-red-500/80 {selectedQualityUrl ===
						q.url
							? 'bg-red-500 text-white'
							: ''}"
						on:click={() => selectQuality(q.url)}
						disabled={selectedQualityUrl === q.url}
					>
						{q.label}
					</button>
				{/each}
			</div>
		{/if} -->

		<!-- Episode List Selector -->
		<!-- {#if episode?.episodeList && episode.episodeList.length > 1}
			<div class="mb-6 flex gap-2 overflow-x-auto">
				<span class="font-semibold text-white">Episode:</span>
				{#each episode.episodeList as ep}
					<button
						class="rounded-lg border border-white/20 bg-white/10 px-3 py-1 font-medium text-white transition-all hover:bg-blue-500/80 {selectedEpisodeId ===
						ep.id
							? 'bg-blue-500 text-white'
							: ''}"
						on:click={() => selectEpisode(ep)}
						disabled={selectedEpisodeId === ep.id}
					>
						{ep.title}
					</button>
				{/each}
			</div>
		{/if} -->

		<div class="space-y-8">
			<!-- <div class="rounded-xl border border-white/10 bg-white/5 p-6 shadow-sm">
				<div class="mb-5 flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-md bg-red-500/20">
						<Info class="h-5 w-5 text-red-500" />
					</div>
					<h2 class="text-xl font-bold">Episode Synopsis</h2>
				</div>
				<div class="prose prose-invert max-w-none">
					{#if !episode?.synopsis}
						<p class="mb-4 text-white last:mb-0">Unavailable</p>
					{/if}
					{#each episode?.synopsis?.paragraphs as paragraph}
						<p class="mb-4 text-white last:mb-0">{paragraph}</p>
					{/each}
				</div>
			</div> -->

			<!-- <div>
				<h3 class="mb-4 flex items-center gap-2 text-lg font-semibold">
					<Tag class="h-5 w-5 text-red-500" />
					Genres
				</h3>
				<div class="flex flex-wrap gap-2">
					{#each (episode as any)?.info?.genreList as genre}
						<div
							class="flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/20"
						>
							{genre.title}
							<ChevronRight class="h-4 w-4" />
						</div>
					{/each}
				</div>
			</div> -->

			<!-- <div class="mt-12">
				<h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-white">
					<MessageSquare class="h-5 w-5 text-red-500" />
					Komentar
				</h2>
				<div class="mb-6">
					<textarea
						class="mb-2 min-h-[60px] w-full resize-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition-all focus:border-red-500 focus:outline-none"
						placeholder="Tulis komentar..."
						bind:value={newComment}
						rows="3"
					></textarea>
					<button
						class="w-full rounded-xl bg-gradient-to-r from-red-500 to-red-500 py-2 font-bold text-white shadow-lg transition-all hover:from-red-600 hover:to-red-700"
						on:click={addComment}
					>
						Kirim Komentar
					</button>
				</div>
				<CommentThread {comments} on:reply={handleReply} />
			</div> -->
		</div>
	</div>
</div>
