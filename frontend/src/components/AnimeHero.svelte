<script lang="ts">
  import { Bot, Sparkles } from "@lucide/svelte";
  import { truncate } from "$lib";
  import type { IAnimeDetail, IGenreList } from "$/types/animeType";
  import type { Characters } from "$/types/toanimelistType";

  export let animeList: {
    title?: string;
    poster?: string;
    episodes?: string;
    latestReleaseDate?: string;
    animeId?: string;
    href?: string;
    url?: string;
  }[] = [];

  export let animeDetail: Partial<IAnimeDetail> = {};
  export let animeCharacters: Characters = { data: [] };
  export let synopsis: string = "";
</script>

<section
  id="ani"
  class="flex relative ml-auto flex-col mt-25 justify-between max-w-7xl mx-auto px-4 md:px-20 space-y-8"
>
  <div
    class="absolute inset-0 -z-[1] bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--tertiary))] opacity-20 blur-lg"
  ></div>

  <div class="flex md:flex-row flex-col overflow-x-hidden md:pb-10 items-center">
    <div class="flex-shrink-0 w-auto relative">
      <img
        class="rounded-xl md:w-[400px] md:h-[620px] w-[300px] h-[420px] object-cover"
        alt="Page {animeDetail?.title}"
        src={animeDetail?.poster || "/placeholder.png"}
      />
      <img
        class="rounded-xl absolute top-10 blur-3xl -z-[1] opacity-30 left-10 md:w-[400px] md:h-[620px] w-[300px] h-[420px] object-cover"
        alt="Page {animeDetail?.title}"
        src={animeDetail?.poster || "/placeholder.png"}
      />
    </div>

    <div class="w-full min-w-0 md:pl-10 flex flex-col gap-3 md:mt-0 mt-10">
      <div>
        <div class="flex items-center gap-2 mb-4 text-[hsl(var(--primary))] font-semibold text-lg">
          <Sparkles />
          <span> New </span>
        </div>
        <p class="text-sm text-[hsl(var(--foreground))] mb-1">Home | TV</p>
        <h1 class="text-4xl font-extrabold mb-2">{animeList[0]?.title}</h1>
        <div class="flex gap-2 mb-2 items-center">
          <span class="w-[10px] h-[10px] bg-red-500 rounded-full block"></span>
          <span class="text-[13px] opacity-70">On Going</span>
        </div>
        <p class="text-sm text-[hsl(var(--foreground))] mb-3">
          EP {animeList[0]?.episodes} • {animeList[0]?.latestReleaseDate}
        </p>
        <div class="flex space-x-2 mb-3">
          {#each animeDetail?.genreList as IGenreList[] as genre}
            <span class="text-xs font-semibold bg-red-500 rounded px-2 py-0.5">{genre.title}</span>
          {/each}
        </div>
        {#if synopsis}
          <p class="text-[16px] text-[hsl(var(--foreground))] max-w-xl opacity-70">
            {synopsis.replace("[Written by MAL Rewrite]", "").trim()}
          </p>
        {:else}
          <p class="text-[16px] text-[hsl(var(--foreground))] max-w-xl opacity-70">
            Mohon maaf, tapi kami belum memiliki sinopsis untuk anime ini. Kami akan berusaha untuk
            memperbarui informasi ini secepatnya.
          </p>
        {/if}
      </div>

      <section class="bg-[hsl(var(--background))] rounded-xl p-4 ml-10 max-w-xl">
        <div class="flex items-center space-x-3">
          <button aria-label="Play" class="bg-red-600 text-white rounded-full p-2 hover:bg-red-700">
            <Bot size="20" />
          </button>
          <span class="text-red-400 font-semibold text-sm">My kisah inimah</span>
        </div>
        <p class="text-xs text-[hsl(var(--foreground))] mb-3 mt-4 opacity-70">
          Karbit, atau yang juga dikenal sebagai kalsium karbida (CaC2), adalah senyawa kimia yang
          berbentuk padatan kristal berwarna abu-abu kehitaman.
        </p>
      </section>

      <section class="flex space-x-4 overflow-x-auto flex-nowrap w-full">
        {#each animeList.slice(1) as anime}
          <article
            class="flex-shrink-0 gap-3 items-center flex max-w-[400px] bg-[hsl(var(--background))] rounded-xl p-3"
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
              <p class="text-xs text-[hsl(var(--foreground))] mb-1 mt-2">
                EP {anime?.episodes} | {anime.latestReleaseDate}
              </p>
            </div>
          </article>
        {/each}
      </section>
    </div>
  </div>

  {#if animeCharacters.data.length > 0}
    <section>
      <h2 class="text-red-500 text-2xl mb-4 font-semibold">Characters &amp; Voice Actors</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each animeCharacters.data as character}
          <article
            class="flex items-center gap-4 bg-[hsl(var(--background))] rounded-xl p-4 border border-red-500"
          >
            <img
              alt={character.character.name}
              class="rounded-full"
              height="40"
              src={character?.character?.images?.webp.image_url}
              width="40"
            />
            <div class="flex flex-col w-full">
              <h3 class="text-red-500 font-semibold w-full text-sm">{character.character.name}</h3>
              <p class="text-xs text-white/60">{character.role}</p>
              <p class="text-xs text-[hsl(var(--foreground))] w-full text-end">
                {character.voice_actors[0].person.name}
              </p>
            </div>
            <img
              alt={character.voice_actors[0].person.name}
              class="rounded-full ml-auto"
              height="40"
              src={character?.voice_actors[0]?.person?.images?.jpg.image_url}
              width="40"
            />
          </article>
        {/each}
      </div>
    </section>
  {/if}
</section>
