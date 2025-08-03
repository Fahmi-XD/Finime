<script lang="ts">
	import { Flame, Star, ArrowRight } from "@lucide/svelte";
  import { goto } from "$app/navigation";
  import { seeAllTitle } from "$lib/stores/home.mobile";
  import { onMount } from "svelte";
  import { truncate } from "$lib";

  import LoadingElements from "../ui/LoadingElements.svelte";

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

<div class="flex-1 bg-transparent text-white overflow-auto mb-[70px]">
	<h1 class="opacity-70 mt-4 text-title-small">Watch today</h1>
  <div class="relative w-full h-auto overflow-hidden">
    <div class="relative z-10 min-h-0 bg-transparent flex w-full h-auto py-3 overflow-hidden justify-center mt-10">
      <img
        class="w-[210px] h-[320px] translate-y-3 object-cover border border-white/60 rounded-2xl -rotate-5 absolute -translate-x-15"
        src={popularAnime?.data?.[0].image_portrait_url}
        alt="Watch today"
      />
      <img
        class="w-[210px] h-[320px] translate-y-3 object-cover border border-white/60 rounded-2xl rotate-8 absolute translate-x-15"
        src={popularAnime?.data?.[1].image_portrait_url}
        alt="Watch today"
      />
      <img
        class="w-[255px] h-[370px] object-cover border border-white/60 rounded-2xl rotate-1"
        src={popularAnime?.data?.[2].image_portrait_url}
        alt="Watch today"
      />
    </div>

    <div class="block relative z-10 h-auto w-full mt-5">
      <h1 class="px-10 font-normal opacity-70 text-body-medium">
        Up on your watchlist
      </h1>
      <h1 class="px-10 font-bold text-title-large">{popularAnime?.data?.[2].title}</h1>
      <div class="flex gap-5 text-body-medium px-10 mt-1 items-center">
        <h1 class="opacity-80">{popularAnime?.data?.[2].aired_from}</h1>
        <div class="flex gap-2 items-center">
          <Star size="15" fill="green" color="green" />
          <h1 class="opacity-80 text-green-500">{popularAnime?.data?.[2].score}</h1>
        </div>
      </div>
    </div>

    <img
      class="w-screen py-3 overflow-x-hidden -z-[1] h-[650px] blur-[100px] object-cover rotate-1 opacity-40 absolute left-0 -top-[60px]"
      src={popularAnime?.data?.[2].image_portrait_url}
      alt="Watch today"
    />
  </div>

  <div class="overflow-x-hidden px-8">
    <div class="flex justify-between items-center mt-10">
			<h1 class="text-title-large flex items-center gap-1 font-bold">
				Teratas <Flame color="#FF4500" />
			</h1>
			<button class="text-red-500 flex items-center gap-1" on:click={() => {seeAllTitle.set("Teratas"); goto("/mobile/see-all")}}>Lainnya <ArrowRight /></button>
		</div>
    <div class="mt-7 grid {isLoading ? "grid-cols-1" : "grid-cols-2"} overflow-x-hidden gap-5">
      {#if isLoading}
        <div class="flex w-full justify-center items-center h-auto">
          <LoadingElements variant="normal" />
        </div>
      {:else}
        {#each popularAnime?.data || [] as anime}
          <a href="/mobile/anime/{anime.id}/{anime.slug}">
            <div class="w-full h-auto min-h-0 flex flex-col">
              <img
                class="rounded-2xl h-[270px] w-full object-cover"
                src={anime.image_portrait_url}
                alt={anime.title}
              />
              <div class="mt-3 flex flex-col h-full justify-between">
                <h1 class="text-title-medium h-auto mb-2 font-semibold">
                  {truncate(anime?.title || "", 50)}
                </h1>
                <div class="mt-auto min-h-0 flex flex-col h-full">
                  <div class="flex gap-2 items-center mb-1 mt-auto">
                    <span class="block w-[10px] h-[10px] bg-yellow-500 rounded-full"
                    ></span>
                    <h1 class="opacity-80 text-label-medium">{anime.status}</h1>
                  </div>
                  <div class="flex text-label-medium gap-5 items-center">
                    <h1 class="opacity-80">{anime.aired_from}</h1>
                    <div class="flex gap-2 items-center">
                      <Star size="15" fill="green" color="green" />
                      <h1 class="opacity-80 text-green-500">{anime.score?.toString()}</h1>
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
              <h1 class="opacity-80 text-label-medium">On Going</h1>
            </div>
            <div class="flex text-label-medium gap-5 mt-2 items-center">
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
              <h1 class="opacity-80 text-label-medium">Finish</h1>
            </div>
            <div class="flex text-label-medium gap-5 mt-2 items-center">
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
              <h1 class="opacity-80 text-label-medium">On Going</h1>
            </div>
            <div class="flex text-label-medium gap-5 mt-2 items-center">
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