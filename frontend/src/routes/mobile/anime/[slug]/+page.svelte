<script lang="ts">
	import type { ISlug } from './+page';

  import { Bookmark, ArrowLeft } from '@lucide/svelte';
  import { goto } from '$app/navigation';

	export let data: ISlug;

  function watchEpisode(eps: string) {
    goto(`/mobile/anime/watch/konosuba-sub-indo?eps=${eps}`, { replaceState: true })
  }
</script>

<div class="mx-auto max-w-4xl p-4 mt-12">
  <button class="mb-5 flex gap-1 items-center" on:click={() => history.back()}>
    <ArrowLeft size="35" />
    <h1 class="text-lg">Kembali</h1>
  </button>

	<img
		alt="Demon Slayer anime characters group with vibrant colors and Japanese text"
		class="mb-4 w-full rounded-lg"
		src="https://storage.googleapis.com/a1aa/image/1ad624e6-859a-4cbe-132e-7646995f03f5.jpg"
	/>

	<div class="mb-3 flex items-center justify-between">
		<h1 class="max-w-[70%] truncate text-2xl font-bold">Demon Slayer (Kimetsu no Yaiba)</h1>
		<div class="flex space-x-4 text-2xl">
			<button aria-label="Bookmark" class="hover:text-red-500">
				<Bookmark />
			</button>
		</div>
	</div>
  
	<div class="mb-4 flex items-center space-x-6">
		<div class="flex items-center space-x-1 text-red-500">
			<i class="fas fa-thumbs-up"> </i>
			<span> 12 Episode </span>
		</div>
		<div class="flex space-x-2 text-xs font-semibold text-red-500">
			<button class="rounded border border-red-600 px-2 py-0.5"> HD </button>
			<button class="rounded border border-red-600 px-2 py-0.5"> SUB ID </button>
			<button class="rounded border border-red-600 px-2 py-0.5"> 1080p </button>
		</div>
	</div>
	<div class="mb-6 flex space-x-4">
		<button
			class="flex-1 rounded-full bg-red-500 py-3 text-center font-semibold transition hover:bg-red-700"
      on:click={() => watchEpisode("1")}
		>
			<i class="fas fa-play mr-2"> </i>
			Tonton
		</button>
		<button
			class="flex-1 rounded-full border border-red-600 py-3 text-center font-semibold transition hover:bg-red-700 hover:text-white"
		>
			<i class="fas fa-download mr-2"> </i>
			Download
		</button>
	</div>
  
	<p class="mb-8 text-sm leading-relaxed text-gray-300 opacity-70">
		Demon Slayer: Kimetsu no Yaiba follows Tanjiro Kamado, a kind-hearted boy who becomes a demon
		slayer after his family is slaughtered and his sister Nezuko is turned into a demon. The story
		explores his journey to find a cure and fight evil demons.
	</p>
  
	<h2 class="mb-4 text-xl font-bold">Episodes</h2>
  
	<div class="mb-6 flex flex-wrap gap-4">
    {#each Array(12).fill(1) as ep, i (i)}
		  <button on:click={() => watchEpisode(i.toString())} class="border px-5 py-1 border-red-500 rounded-3xl">Eps {i + 1}</button>
    {/each}
	</div>
  
	<div class="mb-4 flex items-center justify-between text-sm font-semibold text-red-500">
		<span> Watched 1/12 Episodes </span>
	</div>
	<div class="mb-8 h-2 w-full rounded-full bg-gray-700">
		<div class="h-2 rounded-full bg-red-500" style="width: calc((1 / 12) * 100%)"></div>
	</div>
</div>
