<script lang="ts">
	import { Flame, Star, ArrowRight } from "@lucide/svelte";
  import { goto } from "$app/navigation";
  import { seeAllTitle } from "$lib/stores/home.mobile";
  import { onMount } from "svelte";
  import { truncate } from "$lib";

  import LoadingElements from "../ui/LoadingElements.svelte";
  import SkeletonLoading from "../ui/SkeletonLoading.svelte";

  import { runtimeData } from "$lib/stores/runtime";

  import { AnimeMobileClient } from "$lib/api/clients/mobile/animeClient";
  import type { Animes } from "$lib/api/types/mobile/summerType";

  let popularAnime: Animes | undefined = {}
  let isLoading = true;

  onMount(async () => {
    if ($runtimeData["home.cache"] && typeof $runtimeData["home.cache"] == "object") {
      isLoading = false;
      popularAnime = $runtimeData["home.cache"];
    } else {
      isLoading = true;
      const animes = await AnimeMobileClient.getSummer("1");
      popularAnime = animes.topAnimes;
      $runtimeData["home.cache"] = animes.topAnimes;
      isLoading = false;
    }
  })
</script>

<div class="flex-1 text-white w-full overflow-x-hidden bg-transparent mb-[70px] mt-[60px]">
	<h1 class="opacity-70 mt-4 text-sm px-8">Watch today</h1>
  <div class="relative w-full h-auto overflow-hidden">
    <div class="relative z-10 min-h-0 bg-transparent flex w-full h-auto py-3 overflow-hidden justify-center">
      <div class="w-[200px] bg-neutral-700 h-[300px] translate-y-3 object-cover border border-white/60 rounded-2xl -rotate-5 absolute -translate-x-15">
        <img
          class="w-[200px] bg-neutral-700 h-[300px] object-cover border border-white/60 rounded-2xl"
          src={popularAnime?.data?.[0].image_portrait_url}
          alt=""
        />
        {#if isLoading}
          <SkeletonLoading type="image" className="absolute inset-0 rounded-2xl" />
        {/if}
      </div>
      <div class="w-[200px] bg-neutral-700 h-[300px] translate-y-3 object-cover border border-white/60 rounded-2xl rotate-8 absolute translate-x-15">
        <img
          class="w-[200px] bg-neutral-700 h-[300px] object-cover border border-white/60 rounded-2xl"
          src={popularAnime?.data?.[1].image_portrait_url}
          alt=""
        />
        {#if isLoading}
            <SkeletonLoading type="image" className="absolute inset-0 rounded-2xl" />
          {/if}
      </div>
      <div class="w-[250px] bg-neutral-700 h-[350px] object-cover border border-white/60 rounded-2xl rotate-1">
        <img
          class="w-[250px] bg-neutral-700 h-[350px] object-cover border border-white/60 rounded-2xl"
          src={popularAnime?.data?.[2].image_portrait_url}
          alt=""
        />
        {#if isLoading}
            <SkeletonLoading type="image" className="absolute inset-0 rounded-2xl" />
          {/if}
      </div>
    </div>

    <div class="block relative z-10 h-auto w-full mt-5">
      <h1 class="px-10 font-normal opacity-70 text-sm">
        Up on your watchlist
      </h1>
      <div class="relative">
        <h1 class="px-10 font-bold text-lg">{popularAnime?.data?.[2].title || "-"}</h1>
        {#if isLoading}
            <SkeletonLoading type="text" className="absolute inset-0 ml-10" variant="short" />
          {/if}
      </div>
      <div class="flex gap-5 px-10 mt-1 items-center">
        <div class="relative">
          <h1 class="opacity-80 text-sm">{popularAnime?.data?.[2].aired_from || "----------"}</h1>
          {#if isLoading}
            <SkeletonLoading type="text" className="absolute inset-0" variant="long" />
          {/if}
        </div>
        <div class="flex gap-2 items-center">
          <Star size="15" fill="green" color="green" />
          <div class="relative">
            <h1 class="opacity-80 text-green-500 text-sm">{popularAnime?.data?.[2].score || "------"}</h1>
            {#if isLoading}
              <SkeletonLoading type="text" className="absolute inset-0" variant="long" />
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>

  <img
    class="w-full overflow-x-hidden -z-[1] h-[650px] blur-[100px] object-cover rotate-1 opacity-40 absolute left-0 -top-[30px]"
    src={popularAnime?.data?.[2].image_portrait_url}
    alt="Watch today"
  />

  <div class="overflow-x-hidden px-8">
    <div class="flex justify-between items-center mt-10">
			<h1 class="text-lg flex items-center gap-1 font-bold">
				Teratas <Flame color="#FF4500" />
			</h1>
			<button class="text-red-500 flex items-center gap-1 text-lg" on:click={() => {seeAllTitle.set("Teratas"); goto("/mobile/see-all")}}>Lainnya <ArrowRight /></button>
		</div>
    <div class="mt-7 grid grid-cols-2 overflow-x-hidden gap-5">
      {#if isLoading}
        <SkeletonLoading type="card" count={5} className="h-[220px]" />
      {:else}
        {#each popularAnime?.data || [] as anime}
          <a href="/mobile/anime/{anime.id}/{anime.slug}">
            <div class="w-full h-full min-h-0 flex flex-col">
              <img
                class="rounded-2xl h-[220px] w-full object-cover"
                src={anime.image_portrait_url}
                alt={anime.title}
              />
              <div class="mt-3 flex flex-col h-full justify-between">
                <h1 class="text-sm h-auto mb-2 font-semibold">
                  {truncate(anime?.title || "", 50)}
                </h1>
                <div class="mt-auto min-h-0 flex flex-col h-full">
                  <div class="flex gap-2 items-center mb-1 mt-auto">
                    <span class="block w-[10px] h-[10px] bg-red-500 rounded-full"
                    ></span>
                    <h1 class="opacity-80 text-tiny">{anime.status}</h1>
                  </div>
                  <div class="flex text-tiny gap-5 items-center">
                    <h1 class="opacity-80 text-tiny">{anime.aired_from}</h1>
                    <div class="flex gap-2 items-center">
                      <Star size="15" fill="green" color="green" />
                      <h1 class="opacity-80 text-tiny text-green-500">{anime.score?.toString()}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        {/each}
      {/if}
    </div>
  </div>

  <!-- <div class="overflow-x-hidden px-8">
    <div class="flex justify-between items-center mt-10">
			<h1 class="text-title-large flex items-center gap-1 font-bold">
				Historimu
			</h1>
			<button class="text-red-500 flex items-center gap-1" on:click={() => {seeAllTitle.set("History"); goto("/mobile/see-all")}}>Lainnya <ArrowRight /></button>
		</div>
    <div class="mt-7 grid grid-cols-2 overflow-x-hidden gap-5">
      <div class="w-full">
        <img
          class="rounded-2xl h-[270px] w-full object-cover"
          src="/images/konosuba.jpg"
          alt="Konosuba"
        />
        <div class="mt-3 flex flex-col justify-between">
          <h1 class="text-title-medium font-semibold">
            KonoSuba: God's Blessing on This Wonderful World! 3
          </h1>
          <div>
            <div class="flex gap-2 items-center my-2">
              <span class="block w-[10px] h-[10px] bg-yellow-500 rounded-full"
              ></span>
              <h1 class="opacity-80 text-xs">On Going</h1>
            </div>
            <div class="flex text-xs gap-5 mt-2 items-center">
              <h1 class="opacity-80">2020</h1>
              <div class="flex gap-2 items-center">
                <Star size="15" fill="green" color="green" />
                <h1 class="opacity-80 text-green-500">4.4</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full flex flex-col overflow-hidden">
        <img
          class="rounded-2xl h-[270px] w-full object-cover"
          src="/images/arona.jpg"
          alt="Konosuba"
        />
        <div class="mt-3 flex flex-col justify-between flex-1">
          <h1 class="text-title-medium font-semibold">
            Blue Archive: Anime Terkeren Sedunia
          </h1>
          <div>
            <div class="flex gap-2 items-center my-2">
              <span class="block w-[10px] h-[10px] bg-green-500 rounded-full"
              ></span>
              <h1 class="opacity-80 text-xs">Finish</h1>
            </div>
            <div class="flex text-xs gap-5 mt-2 items-center">
              <h1 class="opacity-80">2020</h1>
              <div class="flex gap-2 items-center">
                <Star size="15" fill="green" color="green" />
                <h1 class="opacity-80 text-green-500">4.4</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full flex flex-col overflow-hidden">
        <img
          class="rounded-2xl h-[270px] w-full object-cover"
          src="/images/aot.jpg"
          alt="Konosuba"
        />
        <div class="mt-3 flex flex-col justify-between flex-1">
          <h1 class="text-title-medium font-semibold">
            Attack On Titan: Ngantuks
          </h1>
          <div>
            <div class="flex gap-2 items-center my-2">
              <span class="block w-[10px] h-[10px] bg-yellow-500 rounded-full"
              ></span>
              <h1 class="opacity-80 text-xs">On Going</h1>
            </div>
            <div class="flex text-xs gap-5 mt-2 items-center">
              <h1 class="opacity-80">2020</h1>
              <div class="flex gap-2 items-center">
                <Star size="15" fill="green" color="green" />
                <h1 class="opacity-80 text-green-500">4.4</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</div>