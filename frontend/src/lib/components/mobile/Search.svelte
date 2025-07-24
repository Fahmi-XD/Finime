<script lang="ts">
  import { ArrowLeft, SlidersHorizontal, Search, Star } from "@lucide/svelte";
  import { scale } from "svelte/transition";
</script>

<div class="pt-15 text-white px-5 pb-[70px]" transition:scale={{ duration: 200, start: 0.9 }}>
  <div class="!fixed z-10 w-full block h-auto bg-black left-0 top-0 p-4">
    <div class="flex justify-between w-full items-center h-auto">
      <button on:click={() => window.history.back()}>
        <ArrowLeft />
      </button>
      <h1 class="text-[20px] font-bold">Search</h1>
      <SlidersHorizontal />
    </div>
    <div class="relative mt-5">
      <Search class="absolute left-3 top-0 bottom-0 my-auto" />
      <input
        class="bg-dark outline-none pl-12 w-full h-auto p-2 rounded-2xl border border-white/10"
        type="text"
        placeholder="Attack On Titan"
      />
    </div>
  </div>

  <div class="mt-17">
    <h1 class="text-title-large font-semibold mb-5 opacity-70">Relevan result</h1>
    <div class="w-full">
      <img
        class="rounded-2xl h-[200px] w-full object-cover"
        src="/images/konosuba.jpg"
        alt="Konosuba"
      />
      <div class="mt-3 flex flex-col justify-between">
        <h1 class="text-title-medium font-semibold">
          KonoSuba: God's Blessing on This Wonderful World! 3
        </h1>
        <div class="flex gap-2 items-center my-2">
          <span class="block w-[10px] h-[10px] bg-yellow-500 rounded-full"
          ></span>
          <h1 class="opacity-80 text-label-small">On Going</h1>
          <div class="flex gap-5 ml-auto items-center text-label-small">
            <h1 class="opacity-80">2020</h1>
            <div class="flex gap-2 items-center">
              <Star size="15" fill="green" color="green" />
              <h1 class="opacity-80 text-green-500">4.4</h1>
            </div>
          </div>
        </div>
        <div class="flex flex-nowrap items-center text-label-small overflow-x-auto gap-3">
          <span class="text-red-500">Comedy</span>
          <span class="text-red-500">Isekai</span>
          <span class="text-red-500">Romance</span>
          <span class="text-red-500">Ecchi</span>
        </div>
      </div>
    </div>
    <ul class="mt-7">
      <li class="mt-5">
        <div class="w-full grid grid-cols-[90px_1fr] gap-3 justify-start">
          <img
            class="rounded-2xl shrink-0 h-[140px] w-[90px] object-cover"
            src="/images/arona.jpg"
            alt="Konosuba"
          />
          <div class="flex w-full min-w-0 flex-col justify-center">
            <h1 class="text-title-medium font-semibold">
              Blue Archive: Anime Terkeren Sedunia
            </h1>
            <div class="flex gap-2 items-center my-2">
              <span class="block w-[10px] h-[10px] bg-green-500 rounded-full"
              ></span>
              <h1 class="opacity-80 text-label-small">Finish</h1>
            </div>
            <div class="flex gap-5 items-center text-label-small">
              <h1 class="opacity-80">2023</h1>
              <div class="flex gap-2 items-center">
                <Star size="15" fill="green" color="green" />
                <h1 class="opacity-80 text-green-500 text-label-small">4.7</h1>
              </div>
            </div>
            <div class="flex flex-nowrap text-label-small no-scroll items-center w-full mt-3 overflow-x-auto gap-3">
              <span class="text-red-500">Comedy</span>
              <span class="text-red-500">Isekai</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
            </div>
          </div>
        </div>
      </li>
      
      <li class="mt-5">
        <div class="w-full grid grid-cols-[90px_1fr] gap-3 justify-start">
          <img
            class="rounded-2xl shrink-0 h-[140px] w-[90px] object-cover"
            src="/images/arona.jpg"
            alt="Konosuba"
          />
          <div class="flex w-full min-w-0 flex-col justify-center">
            <h1 class="text-title-medium font-semibold">
              Blue Archive: Anime Terkeren Sedunia
            </h1>
            <div class="flex gap-2 items-center my-2">
              <span class="block w-[10px] h-[10px] bg-green-500 rounded-full"
              ></span>
              <h1 class="opacity-80 text-label-small">Finish</h1>
            </div>
            <div class="flex gap-5 items-center text-label-small">
              <h1 class="opacity-80">2023</h1>
              <div class="flex gap-2 items-center">
                <Star size="15" fill="green" color="green" />
                <h1 class="opacity-80 text-green-500 text-label-small">4.7</h1>
              </div>
            </div>
            <div class="flex flex-nowrap text-label-small no-scroll items-center w-full mt-3 overflow-x-auto gap-3">
              <span class="text-red-500">Comedy</span>
              <span class="text-red-500">Isekai</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
            </div>
          </div>
        </div>
      </li>
      
      <li class="mt-5">
        <div class="w-full grid grid-cols-[90px_1fr] gap-3 justify-start">
          <img
            class="rounded-2xl shrink-0 h-[140px] w-[90px] object-cover"
            src="/images/arona.jpg"
            alt="Konosuba"
          />
          <div class="flex w-full min-w-0 flex-col justify-center">
            <h1 class="text-title-medium font-semibold">
              Blue Archive: Anime Terkeren Sedunia
            </h1>
            <div class="flex gap-2 items-center my-2">
              <span class="block w-[10px] h-[10px] bg-green-500 rounded-full"
              ></span>
              <h1 class="opacity-80 text-label-small">Finish</h1>
            </div>
            <div class="flex gap-5 items-center text-label-small">
              <h1 class="opacity-80">2023</h1>
              <div class="flex gap-2 items-center">
                <Star size="15" fill="green" color="green" />
                <h1 class="opacity-80 text-green-500 text-label-small">4.7</h1>
              </div>
            </div>
            <div class="flex flex-nowrap text-label-small no-scroll items-center w-full mt-3 overflow-x-auto gap-3">
              <span class="text-red-500">Comedy</span>
              <span class="text-red-500">Isekai</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
            </div>
          </div>
        </div>
      </li>

      <li class="mt-5">
        <div class="w-full grid grid-cols-[90px_1fr] gap-3 justify-start">
          <img
            class="rounded-2xl shrink-0 h-[140px] w-[90px] object-cover"
            src="/images/arona.jpg"
            alt="Konosuba"
          />
          <div class="flex w-full min-w-0 flex-col justify-center">
            <h1 class="text-title-medium font-semibold">
              Blue Archive: Anime Terkeren Sedunia
            </h1>
            <div class="flex gap-2 items-center my-2">
              <span class="block w-[10px] h-[10px] bg-green-500 rounded-full"
              ></span>
              <h1 class="opacity-80 text-label-small">Finish</h1>
            </div>
            <div class="flex gap-5 items-center text-label-small">
              <h1 class="opacity-80">2023</h1>
              <div class="flex gap-2 items-center">
                <Star size="15" fill="green" color="green" />
                <h1 class="opacity-80 text-green-500 text-label-small">4.7</h1>
              </div>
            </div>
            <div class="flex flex-nowrap text-label-small no-scroll items-center w-full mt-3 overflow-x-auto gap-3">
              <span class="text-red-500">Comedy</span>
              <span class="text-red-500">Isekai</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
            </div>
          </div>
        </div>
      </li>

      <li class="mt-5">
        <div class="w-full grid grid-cols-[90px_1fr] gap-3 justify-start">
          <img
            class="rounded-2xl shrink-0 h-[140px] w-[90px] object-cover"
            src="/images/arona.jpg"
            alt="Konosuba"
          />
          <div class="flex w-full min-w-0 flex-col justify-center">
            <h1 class="text-title-medium font-semibold">
              Blue Archive: Anime Terkeren Sedunia
            </h1>
            <div class="flex gap-2 items-center my-2">
              <span class="block w-[10px] h-[10px] bg-green-500 rounded-full"
              ></span>
              <h1 class="opacity-80 text-label-small">Finish</h1>
            </div>
            <div class="flex gap-5 items-center text-label-small">
              <h1 class="opacity-80">2023</h1>
              <div class="flex gap-2 items-center">
                <Star size="15" fill="green" color="green" />
                <h1 class="opacity-80 text-green-500 text-label-small">4.7</h1>
              </div>
            </div>
            <div class="flex flex-nowrap text-label-small no-scroll items-center w-full mt-3 overflow-x-auto gap-3">
              <span class="text-red-500">Comedy</span>
              <span class="text-red-500">Isekai</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
              <span class="text-red-500">Romance</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>