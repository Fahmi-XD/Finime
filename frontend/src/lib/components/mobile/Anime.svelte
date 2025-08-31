<script lang="ts">
  import { ArrowRight, Star } from "@lucide/svelte";
  import { onMount } from "svelte";

  import { truncate } from "$lib";
  import { runtimeData } from "$lib/stores/runtime";

  import type { IHomeModel } from "$lib/api/types/mobile/homeType";
  import { AnimeMobileClient } from "$lib/api/clients/mobile/animeClient";

  import LoadingElements from "../ui/LoadingElements.svelte";
  import SkeletonLoading from "../ui/SkeletonLoading.svelte";

  let animeList: IHomeModel | undefined = {};
  let isLoading = true;

  onMount(async () => {
    if ($runtimeData["anime.cache"] && typeof $runtimeData["anime.cache"] == "object") {
      isLoading = false;
      animeList = $runtimeData["anime.cache"];
    } else {
      isLoading = true;
      const animes = await AnimeMobileClient.getHome();
      animeList = animes;
      $runtimeData["anime.cache"] = animes;
      isLoading = false;
    }
  })
</script>

<div class="text-white pt-10 pb-[70px] px-5">
  <div>
    <div class="mt-10">
      <div class="flex w-full h-auto items-center">
        <h1 class="text-lg flex items-center gap-1 font-bold">Sedang Tayang</h1>
        <button class="ml-auto">
          <ArrowRight class="ml-auto" />
        </button>
      </div>
      <ul
        class="flex gap-5 flex-nowrap min-w-0 min-h-0 overflow-x-auto w-full mt-5 no-scroll"
      >
        {#if isLoading}
          <SkeletonLoading type="card" count={5} className="h-[160px] w-[120px]" />
        {:else}
          {#each animeList?.ongoingAnimes?.data || [] as anime}
            <li class="flex flex-col w-[120px]">
              <a href="/mobile/anime/{anime.id}/{anime.slug}" class="flex h-full flex-col w-auto">
                <div class="h-[160px] w-[120px]">
                  <img
                    class="rounded-2xl h-[160px] w-[120px] object-cover"
                    src={anime.image_portrait_url}
                    alt={anime.title}
                  />
                </div>
                <div class="flex flex-col justify-between h-full mt-2">
                  <h1 class="text-sm font-semibold mb-1 flex">
                    {truncate(anime?.title || "", 30)}
                  </h1>
                  <div class="flex flex-col">
                    <div class="flex gap-2 items-center">
                      <span class="block w-[10px] h-[10px] bg-yellow-500 rounded-full"></span>
                      <h1 class="opacity-80 text-tiny">{anime.status}</h1>
                    </div>
                    <div class="flex gap-1 flex-col text-label-medium">
                      <h1 class="opacity-80 text-tiny">{anime.aired_from}</h1>
                      <div class="flex gap-1 items-center">
                        <Star size="15" fill="green" color="green" />
                        <h1 class="opacity-80 text-green-500 text-tiny">{anime.score || "Unknown"}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          {/each}
        {/if}
      </ul>
    </div>
  </div>
  
  <div>
    <div class="mt-10">
      <div class="flex w-full h-auto items-center">
        <h1 class="text-lg flex items-center gap-1 font-bold">Tamat</h1>
        <button class="ml-auto">
          <ArrowRight class="ml-auto" />
        </button>
      </div>
      <ul
        class="flex gap-5 flex-nowrap min-w-0 min-h-0 overflow-x-auto w-full mt-5 no-scroll"
      >
        {#if isLoading}
          <SkeletonLoading type="card" count={5} className="h-[160px] w-[120px]" />
        {:else}
          {#each animeList?.finishedAnimes?.data || [] as anime}
            <li class="flex flex-col w-[120px]">
              <a href="/mobile/anime/{anime.id}/{anime.slug}" class="flex h-full flex-col w-auto">
                <div class="h-[160px] w-[120px]">
                  <img
                    class="rounded-2xl h-[160px] w-[120px] object-cover"
                    src={anime.image_portrait_url}
                    alt={anime.title}
                  />
                </div>
                <div class="flex flex-col justify-between h-full mt-2">
                  <h1 class="text-sm font-semibold mb-1 flex">
                    {truncate(anime?.title || "", 30)}
                  </h1>
                  <div class="flex flex-col">
                    <div class="flex gap-2 items-center">
                      <span class="block w-[10px] h-[10px] bg-yellow-500 rounded-full"></span>
                      <h1 class="opacity-80 text-tiny">{anime.status}</h1>
                    </div>
                    <div class="flex gap-1 flex-col text-label-medium">
                      <h1 class="opacity-80 text-tiny">{anime.aired_from}</h1>
                      <div class="flex gap-1 items-center">
                        <Star size="15" fill="green" color="green" />
                        <h1 class="opacity-80 text-green-500 text-tiny">{anime.score || "Unknown"}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          {/each}
        {/if}
      </ul>
    </div>
  </div>
  
  <div>
    <div class="mt-10">
      <div class="flex w-full h-auto items-center">
        <h1 class="text-lg flex items-center gap-1 font-bold">Movie</h1>
        <button class="ml-auto">
          <ArrowRight class="ml-auto" />
        </button>
      </div>
      <ul
        class="flex gap-5 flex-nowrap min-w-0 min-h-0 overflow-x-auto w-full mt-5 no-scroll"
      >
        {#if isLoading}
          <SkeletonLoading type="card" count={5} className="h-[160px] w-[120px]" />
        {:else}
          {#each animeList?.movieAnimes?.data || [] as anime}
            <li class="flex flex-col w-[120px]">
              <a href="/mobile/anime/{anime.id}/{anime.slug}" class="flex h-full flex-col w-auto">
                <div class="h-[160px] w-[120px]">
                  <img
                    class="rounded-2xl h-[160px] w-[120px] object-cover"
                    src={anime.image_portrait_url}
                    alt={anime.title}
                  />
                </div>
                <div class="flex flex-col justify-between h-full mt-2">
                  <h1 class="text-sm font-semibold mb-1 flex">
                    {truncate(anime?.title || "", 30)}
                  </h1>
                  <div class="flex flex-col">
                    <div class="flex gap-2 items-center">
                      <span class="block w-[10px] h-[10px] bg-yellow-500 rounded-full"></span>
                      <h1 class="opacity-80 text-tiny">{anime.status}</h1>
                    </div>
                    <div class="flex gap-1 flex-col text-label-medium">
                      <h1 class="opacity-80 text-tiny">{anime.aired_from}</h1>
                      <div class="flex gap-1 items-center">
                        <Star size="15" fill="green" color="green" />
                        <h1 class="opacity-80 text-green-500 text-tiny">{anime.score || "Unknown"}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          {/each}
        {/if}
      </ul>
    </div>
  </div>
  
  <div>
    <div class="mt-10">
      <div class="flex w-full h-auto items-center">
        <h1 class="text-lg flex items-center gap-1 font-bold">Top Anime</h1>
        <button class="ml-auto">
          <ArrowRight class="ml-auto" />
        </button>
      </div>
      <ul
        class="flex gap-5 flex-nowrap min-w-0 min-h-0 overflow-x-auto w-full mt-5 no-scroll"
      >
        {#if isLoading}
          <SkeletonLoading type="card" count={5} className="h-[160px] w-[120px]" />
        {:else}
          {#each animeList?.topAnimes?.data || [] as anime}
            <li class="flex flex-col w-[120px]">
              <a href="/mobile/anime/{anime.id}/{anime.slug}" class="flex h-full flex-col w-auto">
                <div class="h-[160px] w-[120px]">
                  <img
                    class="rounded-2xl h-[160px] w-[120px] object-cover"
                    src={anime.image_portrait_url}
                    alt={anime.title}
                  />
                </div>
                <div class="flex flex-col justify-between h-full mt-2">
                  <h1 class="text-sm font-semibold mb-1 flex">
                    {truncate(anime?.title || "", 30)}
                  </h1>
                  <div class="flex flex-col">
                    <div class="flex gap-2 items-center">
                      <span class="block w-[10px] h-[10px] bg-yellow-500 rounded-full"></span>
                      <h1 class="opacity-80 text-tiny">{anime.status}</h1>
                    </div>
                    <div class="flex gap-1 flex-col text-label-medium">
                      <h1 class="opacity-80 text-tiny">{anime.aired_from}</h1>
                      <div class="flex gap-1 items-center">
                        <Star size="15" fill="green" color="green" />
                        <h1 class="opacity-80 text-green-500 text-tiny">{anime.score || "Unknown"}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          {/each}
        {/if}
      </ul>
    </div>
  </div>
</div>