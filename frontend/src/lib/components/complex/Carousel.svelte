<script lang="ts">
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import type { EmblaCarouselType } from 'embla-carousel';
  import type { IAnimeSlug } from "../../../routes/(mobile)/mobile/anime/[...anime_slug]/+page";
  import type { IAnimeDetail } from '$lib/api/types/mobile/detailType';

  export let slides: any[] = [];
  export let slidesBtn: string[] = [];

  export let animeDetail: IAnimeDetail;
  export let data: IAnimeSlug

  let emblaApi: EmblaCarouselType | undefined;
  let selectedIndex = 0;
  let container: HTMLDivElement[] = [];

  function onEmblaInit(event: CustomEvent<EmblaCarouselType>) {
    emblaApi = event.detail;
    updateSelectedIndex();
    updateEmblaHeight();

    emblaApi.on('select', updateSelectedIndex);
    emblaApi.on('select', updateEmblaHeight);
  }

  function updateEmblaHeight() {
    const selectedIndex = emblaApi?.selectedScrollSnap();
    const activeSlide = container?.[selectedIndex as any];

    if (activeSlide && emblaApi) {
      const height = activeSlide.offsetHeight;
      emblaApi.containerNode().style.height = `${height + 10}px`;
    }
  }

  function updateSelectedIndex() {
    if (emblaApi) {
      selectedIndex = emblaApi.selectedScrollSnap();
    }
  }

  function scrollTo(index: number) {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }
</script>

<div class="embla__dots">
  {#each slidesBtn as slideBtn, i (i)}
    <button
      class="embla__dot border-transparent border-b-2 py-2 px-6 text-white"
      class:is-selected={i === selectedIndex}
      on:click={() => scrollTo(i)}
    >
      {slideBtn}
    </button>
  {/each}
</div>

<div class="embla" use:emblaCarouselSvelte on:emblaInit={onEmblaInit}>
  <div class="embla__container">
    {#each slides as Slide, i (i)}
      <div class="embla__slide px-4 transition-all duration-300 w-full">
        <div class="block w-full h-auto" bind:this={container[i]}>
          <!-- <svelte:component this={slide} data={{ animeDetail, data }} /> -->
           <Slide data={{ animeDetail, data }}></Slide>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .embla {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
  }

  .embla__slide {
    flex: 0 0 100%; /* Adjust as needed for your layout */
    min-width: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin: 0 5px; /* Add some spacing between slides */
  }

  .embla__dots {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .embla__dot {
    margin: 0 5px;
    cursor: pointer;
    transition: border-color 0.3s ease;
  }

  .embla__dot.is-selected {
    border-color: red;
  }
</style>