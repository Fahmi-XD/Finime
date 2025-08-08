<script lang="ts">
  import type { IAnimeDetail } from "$lib/api/types/mobile/detailType";

  import { SlidersHorizontal, Eye } from "@lucide/svelte";
	import type { IAnimeSlug } from "../../../../routes/(mobile)/mobile/anime/[...anime_slug]/+page";

  export let data: Record<string, any>

  const datas: IAnimeSlug = data.data;
  const animeDetail: IAnimeDetail = data.animeDetail;
</script>

<!-- Episode header -->
<div class="mb-4 flex items-center justify-between">
  <h2 class="text-xl font-semibold text-white">
    Episode ({animeDetail?.episodeList?.length})
  </h2>
  <button aria-label="Sort episodes" class="rounded-lg bg-[#2e2a3d] p-3 text-white">
    <SlidersHorizontal size={20} />
  </button>
</div>

<!-- Episodes list -->
<div class="flex flex-col gap-1.5">
  {#each animeDetail?.episodeList || [] as episode, i (i)}
    <a href="/mobile/anime/watch/{datas.animeSlug}/{i+1}">
      <div class="flex items-center justify-between rounded-xl bg-[#2e2a3d] p-4 text-gray-300">
        <div>
          <h3 class="mb-1 text-lg font-normal text-white">Episode {i+1}</h3>
          <!-- <p class="text-xs text-gray-400">27 Juli, 2025</p> -->
        </div>
        <div class="flex items-center space-x-1 text-sm text-gray-400">
          <Eye size={16} />
          <!-- <span> 4866 </span> -->
        </div>
      </div>
    </a>
  {/each}
</div>