<script lang="ts">
  import { Eye, Heart, Sparkles, Star } from "@lucide/svelte";
  import { truncate } from "$lib";

  export let trending: any = [];
  export let mangaDetail: any = {};

  function handleImage(event: Event) {
    if (
      (event.target as HTMLImageElement)?.src !==
      (event.target as HTMLImageElement)?.getAttribute("data-src")
    )
      (event.target as HTMLImageElement).src = (event.target as HTMLImageElement)?.getAttribute(
        "data-src",
      ) as string;
  }
</script>

<section id="man" class="mt-20 relative max-w-7xl mx-auto px-4 space-y-8">
  <div
    class="absolute inset-0 bg-gradient-to-br -z-[1] from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--tertiary))] opacity-5 blur-lg"
  ></div>

  <section class="flex flex-col lg:flex-row gap-3">
    <div class="flex-1 rounded-xl bg-transparent p-6 shadow-lg">
      <div class="flex items-center gap-2 mb-4 text-[hsl(var(--primary))] font-semibold text-lg">
        <Sparkles />
        <span> New </span>
      </div>
      <div class="relative rounded-xl">
        <img
          class="w-full md:h-auto h-[200px] rounded-xl object-cover"
          src="/bokunohero.jpg"
          data-src={trending[0]?.image}
          alt="Page a {trending[0]?.title}"
          onload={handleImage}
          loading="lazy"
          decoding="sync"
        />
        <img
          class="w-[calc(100%+40px)] absolute blur-3xl opacity-50 top-0 -z-[1] left-10 md:h-[calc(100%+40px)] h-[200px] rounded-xl object-cover"
          src="/bokunohero.jpg"
          data-src={trending[0]?.image}
          alt="Page {trending[0]?.title}"
          onload={handleImage}
          loading="lazy"
          decoding="sync"
        />
        <div
          class="md:absolute md:mt-0 mt-10 inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent rounded-xl md:p-6 flex flex-col justify-end md:max-w-[60%]"
        >
          <p class="text-xs text-gray-300 mb-1">Manga</p>
          <h2 class="text-white font-bold text-2xl md:text-4xl mb-1 leading-tight">
            {trending[0]?.title || "Unknown"}
          </h2>
          {#if mangaDetail?.manga?.card_info.status}
            <div class="flex gap-2 items-center mb-2">
              <span
                class="w-[10px] h-[10px] {mangaDetail.manga.card_info.status == 'Ongoing'
                  ? 'bg-red-500'
                  : 'bg-green-500'} rounded-full block"
              ></span>
              <span class="text-[10px] opacity-70">{mangaDetail.manga.card_info.status}</span>
            </div>
          {/if}
          <p class="text-gray-400 text-xs mb-3">
            CHAP {mangaDetail?.manga?.chapter.length} · {trending[0]?.upload_on}
          </p>
          <div class="flex gap-2 mb-3 md:max-w-[300px] no-scroll overflow-x-auto pb-1">
            {#each mangaDetail?.manga?.genre_list as genre}
              <span class="bg-red-500 text-black text-xs font-semibold rounded px-2 py-0.5">
                {genre.genre_name}
              </span>
            {/each}
          </div>
          <p
            class="text-gray-300 text-xs md:max-w-[60%] md:no-scroll max-h-[140px] overflow-y-auto opacity-80 mb-6"
          >
            {mangaDetail?.manga?.synopsis}
          </p>

          <div class="absolute bottom-4 left-6 md:flex space-x-2 hidden">
            <span class="w-2 h-2 rounded-full bg-[#ff9f00]"> </span>
            <span class="w-2 h-2 rounded-full bg-gray-400"> </span>
            <span class="w-2 h-2 rounded-full bg-gray-400"> </span>
            <span class="w-2 h-2 rounded-full bg-gray-400"> </span>
            <span class="w-2 h-2 rounded-full bg-gray-400"> </span>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full max-w-[300px] rounded-xl bg-transparent p-3 shadow-lg flex flex-col">
      <div class="flex items-center gap-2 mb-4 text-[hsl(var(--primary))] font-semibold text-lg">
        <Star />
        <span> Trending </span>
      </div>
      <ol class="flex flex-col gap-4 text-lg font-semibold">
        {#each trending as tren, i (i)}
          <li class="flex items-center gap-3 rounded p-2">
            <a href="/manga/{tren.endpoint}" class="flex items-center gap-3 rounded p-2">
              <span class="text-gray-400 w-6 text-right">{(i + 1).toString().padStart(2, "0")}</span
              >
              <img
                alt="Chainsaw Man anime thumbnail with dark background and character"
                class="w-[60px] h-[60px] rounded object-cover"
                src={tren.image}
              />
              <div class="text-wrap w-auto">
                <div class="text-white text-lg mb-1">{truncate(tren.title)}</div>
                {#if tren.status}
                  <div class="flex gap-2 items-center">
                    <span class="w-[10px] h-[10px] bg-red-500 rounded-full block"></span>
                    <span class="text-[10px] opacity-70">{tren.status}</span>
                  </div>
                {/if}
                <div class="flex mt-1 items-center gap-2 text-gray-400 whitespace-nowrap">
                  <span class="opacity-70 text-[13px]">{tren.view}</span>
                  <!-- <Eye size="15" />
                <span class="opacity-70 text-[11px]">{tren.view}</span>
                <Heart size="15" />
                <span class="opacity-70 text-[11px]">{tren.like}</span> -->
                </div>
              </div>
            </a>
          </li>
        {/each}
      </ol>
    </div>
  </section>

  <section
    class="rounded-xl relative overflow-hidden bg-transparent border-3 border-red-500 p-6 flex flex-col md:flex-row items-center justify-between gap-6"
  >
    <div class="flex-1 text-white">
      <h2 class="font-bold text-base sm:text-lg leading-tight mb-1">
        Read {mangaDetail?.manga?.title.replace("Komik", "")} Online
      </h2>
      <p class="text-xs sm:text-sm mb-3">Highest Quality | No signups | No Ads</p>
      <div class="flex items-center gap-4">
        <a
          href="/manga/{trending[0]?.endpoint}"
          class="bg-red-500 text-white text-xs sm:text-sm font-semibold rounded w-full text-center md:w-auto px-20 py-1.5"
        >
          Read Now
        </a>
      </div>
    </div>
    <div class="flex-shrink-0 md:flex hidden">
      <img
        alt="Illustration md:block hidden of My Hero Academia characters standing side by side, from left to right: A dark-haired male character, a female character with orange hair, a male character with green hair, a male character with spiky blonde hair and a red X on his chest, and a male character with half red and half white hair"
        class="w-[80px] h-[80px] object-cover mr-23"
        src={trending[0]?.image || "/bokunohero.jpg"} 
      />
    </div>
    <span
      class="block w-[400px] -z-[1] h-[400px] bg-red-300/30 absolute top-0 bottom-0 right-[35px] my-auto rounded-full"
    ></span>
    <span
      class="block w-[300px] -z-[1] h-[300px] bg-red-300/30 absolute top-0 bottom-0 right-[45px] my-auto rounded-full"
    ></span>
    <span
      class="block w-[230px] -z-[1] h-[230px] bg-red-300/40 absolute top-0 bottom-0 right-[70px] my-auto rounded-full"
    ></span>
    <span
      class="block w-[150px] -z-[1] h-[150px] bg-red-400/50 absolute top-0 bottom-0 right-[95px] my-auto rounded-full"
    ></span>
    <span
      class="block w-[50px] -z-[1] h-[50px] bg-red-500/30 absolute top-0 bottom-0 right-30 my-auto rounded-full"
    ></span>
  </section>
</section>
