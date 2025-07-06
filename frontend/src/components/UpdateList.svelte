<script lang="ts">
  import { Eye, Heart } from "@lucide/svelte";
  import { fetchDateManga, fetchNewsManga } from "$/hooks/mangaHook";
  import { onMount } from "svelte";

  let trending: any = [];
  let weakly: any = [];

  onMount(async () => {
    try {
      const response = await fetchNewsManga();
      const response2 = await fetchDateManga();
      trending = response.slice(0, 5);
      weakly = response2.slice(0, 6);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  });
</script>

<section
  class="w-[100%] max-w-7xl mx-auto px-4 sm:px-6 mb-15 lg:px-8 manga overflow-x-hidden bg-[var(--background)] text-[hsl(var(-- foreground))]"
>
  <div class="max-w-7xl mx-auto flex flex-col justify-center md:flex-row gap-8 md:gap-20">
    <section class="flex-1">
      <h2 class="md:text-4xl text-2xl font-bold border-b border-black pb-1 w-max mb-10">
        Weekly <span class="text-red-500">Spotlight</span>
      </h2>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3">
        {#each weakly as weak, i (i)}
          <a href="/manga/{weak.endpoint}" class="flex flex-col gap-2">
            <img
              alt="Sunshine Cafe cover art with anime girl holding a cup in a cafe setting"
              class="w-full h-auto object-cover rounded"
              height="200"
              src={weak.image}
              width="150"
            />
            <h3 class="md:text-lg text-[14px] font-semibold leading-4 mt-2">{weak.title}</h3>
            {#if weak.status}
              <div class="flex gap-2 items-center">
                <span class="w-[10px] h-[10px] bg-red-500 rounded-full block"></span>
                <span class="text-sm opacity-70">On Going</span>
              </div>
            {/if}
            <div class="flex items-center text-[10px] mt-auto text-[hsl(var(-- foreground))] space-x-4">
              <span class="text-sm opacity-70 flex items-center gap-1">{weak.view}</span>
              <!-- <span class="text-sm opacity-70 flex items-center gap-1"
                ><Heart size="15" /> 4.6m
              </span> -->
              <!-- <span class="text-sm opacity-70 flex items-center gap-1"
                ><Eye size="15" />74,107
              </span> -->
            </div>
            <!-- <div class="flex gap-2 flex-wrap text-[8px] text-[hsl(var(--foreground))] uppercase font-semibold">
              <span class="text-[10px] bg-red-500/90 p-1 rounded-2xl px-2">fantasy</span>
              <span class="text-[10px] bg-red-500/90 p-1 rounded-2xl px-2">Action</span>
              <span class="text-[10px] bg-red-500/90 p-1 rounded-2xl px-2">Action</span>
            </div> -->
          </a>
        {/each}
      </div>
    </section>

    <section class="max-w-md min-w-sm w-auto">
      <h2 class="md:text-4xl text-2xl font-semibold mb-10 border-b border-pink-400 pb-2 w-max text-[hsl(var(-- foreground))]">
        New &amp; Trending
      </h2>

      <ol class="space-y-4">
        {#each trending as tren, i (i)}
          <li class="flex gap-3 items-center">
            <a href="/manga/{tren.endpoint}" class="flex gap-3 items-center">
              <span class="text-lg font-semibold text-[hsl(var(--foreground))] w-5">{i + 1}</span>
              <img
                alt="Cover art of Spirit Tracer showing a character with white hair and a mystical background"
                class="w-[90px] object-cover h-[90px] rounded"
                src={tren.image}
              />
              <div class="flex-1">
                <h3 class="md:text-lg text-[14px] font-semibold leading-5">{tren.title}</h3>
                {#if tren.status}
                  <div class="flex gap-2 items-center mt-2">
                    <span class="w-[10px] h-[10px] bg-red-500 rounded-full block"></span>
                    <span class="text-[12px] opacity-70">{tren.status}</span>
                  </div>
                {/if}
                <div class="flex items-center text-[10px] text-[hsl(var(-- foreground))] space-x-4 mt-1">
                  <span class="text-[11px] opacity-70 flex items-center gap-1">{tren.view}</span>
                  <!-- <span class="text-[11px] opacity-70 flex items-center gap-1"><Heart size="15" />{tren.like}</span> -->
                  <!-- <span class="text-[11px] opacity-70 flex items-center gap-1"><Eye size="15" />{tren.view}</span> -->
                </div>
              </div>
            </a>
          </li>
        {/each}
      </ol>
    </section>
  </div>
</section>
