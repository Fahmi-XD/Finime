<script lang="ts">
  import { fetchAnimeDetail } from "$/hooks/animeHook";
  import { Bot } from "@lucide/svelte";
  import { onMount } from "svelte";
  import { truncate } from "$lib";

  export let animeList: {
    title?: string;
    poster?: string;
    episodes?: string;
    latestReleaseDate?: string;
    animeId?: string;
    href?: string;
    url?: string;
  }[] = [];

  let animeDetail: any = null;

  onMount(async () => {
    try {
      console.log(animeList[0]?.animeId || "");
      const response = await fetchAnimeDetail(animeList[0]?.animeId || "");
      animeDetail = response.data;
      console.log(animeDetail);
    } catch (error) {
      console.error("Error in AnimeHero component:", error);
    }
  });

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

<section
  id="ani"
  class="flex relative ml-auto flex-col mt-25 justify-between max-w-7xl mx-auto px-4 md:px-20 space-y-8"
>
  <div
    class="absolute inset-0 -z-[1] bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--tertiary))] opacity-20 blur-lg"
  ></div>

  <div class="flex md:flex-row flex-col overflow-x-hidden md:overflow-y-hidden items-center">
    <div class="flex-shrink-0 w-auto relative">
      <img
        class="rounded-xl md:w-[400px] md:h-[620px] w-[300px] h-[420px] object-cover"
        src="/placeholder.png"
        data-src={animeDetail?.poster}
        alt="Page {animeDetail?.title}"
        onload={handleImage}
        loading="lazy"
        decoding="sync"
      />
      <img
        src="/placeholder.png"
        class="rounded-xl absolute top-10 blur-3xl -z-[1] opacity-30 left-10 md:w-[400px] md:h-[620px] w-[300px] h-[420px] object-cover"
        data-src={animeDetail?.poster}
        alt="Page {animeDetail?.title}"
        onload={handleImage}
        loading="lazy"
        decoding="sync"
      />
    </div>

    <div class="w-full min-w-0 md:pl-10 flex flex-col gap-3 md:mt-0 mt-10">
      <div>
        <p class="text-sm text-white/70 mb-1">Home | TV</p>
        <h1 class="text-4xl font-extrabold mb-2">{animeList[0]?.title}</h1>
        <div class="flex gap-2 mb-2 items-center">
          <span class="w-[10px] h-[10px] bg-red-500 rounded-full block"></span>
          <span class="text-[13px] opacity-70">On Going</span>
        </div>
        <p class="text-sm text-white/70 mb-3">
          EP {animeList[0]?.episodes} • {animeList[0]?.latestReleaseDate}
        </p>
        <div class="flex space-x-2 mb-3">
          {#each animeDetail?.genreList as genre}
            <span class="text-xs font-semibold bg-red-500 rounded px-2 py-0.5">{genre.title}</span>
          {/each}
        </div>
        <p class="text-[16px] text-white/70 max-w-xl">
          Mohon maaf, tapi kami belum memiliki sinopsis untuk anime ini. Kami akan berusaha untuk
          memperbarui informasi ini secepatnya.
        </p>
      </div>

      <section class="bg-[#1a1a1a] rounded-xl p-4 ml-10 max-w-xl">
        <div class="flex items-center space-x-3">
          <button aria-label="Play" class="bg-red-600 text-white rounded-full p-2 hover:bg-red-700">
            <Bot size="20" />
          </button>
          <span class="text-red-400 font-semibold text-sm">My kisah inimah</span>
        </div>
        <p class="text-xs text-white/70 mb-3 mt-4">
          Karbit, atau yang juga dikenal sebagai kalsium karbida (CaC2), adalah senyawa kimia yang
          berbentuk padatan kristal berwarna abu-abu kehitaman. Senyawa ini digunakan dalam berbagai
          aplikasi, termasuk dalam industri pengelasan untuk menghasilkan gas asetilena, serta dalam
          proses pematangan buah-buahan.
        </p>
      </section>

      <section class="flex space-x-4 overflow-x-auto flex-nowrap w-full">
        {#each animeList.slice(1) as anime}
          <article
            class="flex-shrink-0 gap-3 items-center flex max-w-[400px] bg-[#1a1a1a] rounded-xl p-3"
          >
            <img
              alt="Season 1 thumbnail with My Hero Academia characters"
              class="w-[90px] h-[130px] object-cover rounded-md mb-2"
              src={anime?.poster}
            />
            <div class="block">
              <h3 class="text-2xl font-semibold mb-1">
                {truncate((anime?.title as string) || "", 20)}
              </h3>
              <div class="flex gap-2 items-center">
                <span class="w-[10px] h-[10px] bg-red-500 rounded-full block"></span>
                <span class="text-[12px] opacity-70">On Going</span>
              </div>
              <p class="text-xs text-white/70 mb-1 mt-2">
                EP {anime?.episodes} | {anime.latestReleaseDate}
              </p>
            </div>
          </article>
        {/each}
      </section>
    </div>
  </div>

  <section>
    <h2 class="text-red-500 text-2xl mb-4 font-semibold">Characters &amp; Voice Actors</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <article class="flex items-center gap-4 bg-[#1a1a1a] rounded-xl p-4 border border-red-500">
        <img
          alt="Midoriya Izuku character avatar with red hair and determined expression"
          class="rounded-full"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/337d9979-a8f9-4295-2e5b-a2eac12da689.jpg"
          width="40"
        />
        <div>
          <h3 class="text-red-500 font-semibold text-sm">Midoriya, Izuku</h3>
          <p class="text-xs text-white/70">Yamashita, Daiki</p>
        </div>
      </article>
      <article class="flex items-center gap-4 bg-[#1a1a1a] rounded-xl p-4 border border-red-500">
        <img
          alt="All Might character avatar with blond hair and heroic smile"
          class="rounded-full"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/3fbbe291-6687-4c59-d504-cd2757b7f270.jpg"
          width="40"
        />
        <div>
          <h3 class="text-red-500 font-semibold text-sm">All Might</h3>
          <p class="text-xs text-white/70">Miyake, Kenta</p>
        </div>
      </article>
      <article class="flex items-center gap-4 bg-[#1a1a1a] rounded-xl p-4 border border-red-500">
        <img
          alt="Katsuki Bakugou character avatar with spiky blond hair and fierce expression"
          class="rounded-full"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/6b029e23-54f4-4365-c2bd-c01ce8bd4ec7.jpg"
          width="40"
        />
        <div>
          <h3 class="text-red-500 font-semibold text-sm">Katsuki Bakugou</h3>
          <p class="text-xs text-white/70">Kaito Ishikawa</p>
        </div>
      </article>
      <article class="flex items-center gap-4 bg-[#1a1a1a] rounded-xl p-4 border border-red-500">
        <img
          alt="Tenya Iida character avatar with glasses and serious expression"
          class="rounded-full"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/76d6d75d-f5d9-4101-7fdc-0f4d99bb4547.jpg"
          width="40"
        />
        <div>
          <h3 class="text-red-500 font-semibold text-sm">Tenya Iida</h3>
          <p class="text-xs text-white/70">Yamashita, Daiki</p>
        </div>
      </article>
      <article class="flex items-center gap-4 bg-[#1a1a1a] rounded-xl p-4 border border-red-500">
        <img
          alt="Ochako Uraraka character avatar with brown hair and cheerful smile"
          class="rounded-full"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/c67e2527-38ef-47db-ac08-ac7880094ce5.jpg"
          width="40"
        />
        <div>
          <h3 class="text-red-500 font-semibold text-sm">Ochako Uraraka</h3>
          <p class="text-xs text-white/70">Ayane Sakura</p>
        </div>
      </article>
      <article class="flex items-center gap-4 bg-[#1a1a1a] rounded-xl p-4 border border-red-500">
        <img
          alt="Shouta Aizawa character avatar with messy black hair and tired expression"
          class="rounded-full"
          height="40"
          src="https://storage.googleapis.com/a1aa/image/1f46725f-61f2-4c61-ab61-e55a7021625d.jpg"
          width="40"
        />
        <div>
          <h3 class="text-red-500 font-semibold text-sm">Shouta Aizawa</h3>
          <p class="text-xs text-white/70">Junichi Suwabe</p>
        </div>
      </article>
    </div>
  </section>
</section>
