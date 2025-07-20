<script lang="ts">
  import WatchAnime from "$lib/components/layouts/WatchAnime.svelte";
  import LoadingElements from "$lib/components/ui/LoadingElements.svelte";
	import type { EpisodeIdSlug } from "./+page";
  import type { IConvertOtakudesuDetailModel } from "$lib/api/types/convertOtakudesuType";
  import { onMount } from "svelte";
  import { AnimeClient } from "$lib/api/clients/animeClient";
  import type { IConvertOtakudesuStreamModel } from "$lib/api/types/convertOtakudesuStream";
  import { page } from "$app/state";

  export let data: EpisodeIdSlug;

  let animeDetail: IConvertOtakudesuDetailModel;
  let episodeList: IConvertOtakudesuStreamModel[] = [];
  let currentEpisode = page.url.searchParams.get('eps') || "";
  let selectedQuality = "360p";

  let isLoading = true;
  let notFound = false;

  onMount(async () => {
    isLoading = true;
    animeDetail = await AnimeClient.getDetailOtakudesuAnimeBySlug(data.episodeId);
    console.log((animeDetail?.chapter?.[(animeDetail?.chapter?.length || 0) - parseInt(currentEpisode)].url || ""))
    episodeList = await AnimeClient.getStreamOtakudesuAnime((currentEpisode ? (animeDetail?.chapter?.[(animeDetail?.chapter?.length || 0) - parseInt(currentEpisode)].url || "") : "") || (animeDetail?.chapter?.[animeDetail.chapter?.length - 1].url || ""), selectedQuality);
    isLoading = false;
  });

</script>

<div>
  {#if isLoading}
  <LoadingElements />
  {:else if notFound}
  <div class="min-h-screen flex justify-center items-center">
    <h1 class="text-[hsl(var(--background-foreground))] font-bold text-1xl">
      Mohon maaf, episode Id anda salah.
    </h1>
  </div>
  {:else}
    <WatchAnime bind:isLoading={isLoading} bind:notFound={notFound} episodeId={data.episodeId} animeDetail={animeDetail} episodeList={episodeList} selectedQuality={selectedQuality} currentEpisode={currentEpisode} />
  {/if}
</div>
