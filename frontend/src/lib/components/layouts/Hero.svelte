<script lang="ts">
  import { title } from "$lib/config/app";
  import {
    ArrowRight,
    BookmarkCheck,
    Star,
    Package,
    Smile,
    LucideMove,
    Rocket,
    Book,
    Dna,
    Cloud,
  } from "@lucide/svelte";
  import { onMount } from "svelte";
  import { mode as modeStore } from '$lib/stores/mode';

  let isMobile: boolean = false;

  onMount(() => {
    const handleResize = () => {
      isMobile = window.innerWidth < 700;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
</script>

<section class="relative bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden min-h-screen flex items-center">
  {#if $modeStore === 'colorful'}
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-red-500/10 via-blue-500/8 to-purple-500/6 opacity-40 animate-gradient-shift"></div>
    </div>
  {/if}

  {#if $modeStore === 'colorful'}
    <!-- Floating Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-20 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute top-40 right-20 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div class="absolute bottom-40 left-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>
  {/if}

  <!-- Animated Icons -->
  <div class="absolute inset-0 overflow-hidden">
    {#each Array(isMobile ? 20 : 40) as _, i}
      <div
        class="absolute block font-mono"
        style={`
          font-size: ${Math.random() * 20 + 10}px;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          animation: float ${Math.random() * 20 + 10}s linear infinite;
          animation-delay: ${Math.random() * 5}s;
        `}
      >
        <svelte:component
          this={[Smile, LucideMove, Rocket, Star, Book, Dna, Cloud][i % 7]}
          class="block"
          color="rgba(255, 255, 255, 0.15)"
          size={Math.random() * 20 + 10}
        />
      </div>
    {/each}
  </div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
    <div class="text-center md:text-left mb-8 md:mb-0 z-10">
      <div class="inline-flex items-center gap-3 px-6 py-3 {$modeStore === 'colorful' ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-full mb-8 border border-red-500/30' : 'bg-red-500/20 rounded-full mb-8 border border-red-500/30'}">
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span class="text-sm font-semibold text-white">New releases every day</span>
      </div>

      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
        <span class="animate-slide-right flex text-center justify-center sm:justify-start">
          <span class="{$modeStore === 'colorful' ? 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent' : 'text-red-500'}">
            Welcome to {title}!
          </span>
        </span>
        <span class="animate-slide-right block text-white">Read Manga & Watch Anime</span>
      </h1>

      <p class="mt-6 animate-slide-right-2 block text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
        {title} is the best platform to read manga, manhwa, and watch anime for free. Discover thousands
        of titles, connect with the community, and enjoy a 
        <span class="{$modeStore === 'colorful' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent font-semibold' : 'text-red-500'}">
          delightful reading experience
        </span>!
      </p>

      <div class="mt-12 flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
        <a
          href="/manga"
          class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
          {#if $modeStore === 'colorful'}
            <span class="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          {/if}
          <span class="relative z-10 flex items-center gap-3">
            Start Reading
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </a>

        <a
          href="/anime"
          class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl border-2 border-blue-500/30 hover:border-blue-500/60 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
        >
          <span class="relative z-10 flex items-center gap-3">
            Explore Anime
            <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </span>
        </a>
      </div>

      <div class="mt-12 flex items-center justify-center md:justify-start gap-8 text-sm text-gray-300">
        <div class="flex items-center gap-3 bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-red-500/20">
          <BookmarkCheck class="w-5 h-5 text-red-400" />
          <span class="font-semibold">10,000+ Titles</span>
        </div>
        <div class="flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-500/20">
          <Package class="w-5 h-5 text-blue-400" />
          <span class="font-semibold">Open source</span>
        </div>
      </div>
    </div>

    <div class="flex-shrink-0 animate-slide-left block z-10">
      <div class="relative group">
        {#if $modeStore === 'colorful'}
          <div class="absolute -inset-6 bg-gradient-to-r from-red-500/30 via-blue-500/20 to-purple-500/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        {/if}
        <img
          src="https://media.tenor.com/7hiQYhUQY2QAAAAM/dis.gif"
          alt="Finime Hero Illustration"
          class="relative w-full block max-w-[400px] h-auto md:w-[400px] rounded-2xl border-2 border-white/20 shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02] backdrop-blur-sm"
        />
      </div>
    </div>
  </div>

  <style>
    @keyframes gradient-shift {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    @keyframes float {
      0% {
        transform: translateY(0) translateX(0);
      }
      50% {
        transform: translateY(-50px) translateX(20px);
      }
      100% {
        transform: translateY(0) translateX(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateX(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideRight {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideLeft {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes rotateLeft {
      from {
        transform: rotate3d(0, 0, 0, 0);
      }
      to {
        transform: rotate3d(1, 1, -1, 5deg);
      }
    }

    .animate-rotate-left {
      animation: rotateLeft 1s ease forwards;
      animation-delay: 400ms
    }
    .animate-fade-in {
      animation: fadeIn 1s ease-out;
    }
    .animate-slide-right {
      animation: slideRight 1s ease-out;
    }
    .animate-slide-left {
      animation: slideLeft 1s ease-out;
    }
    .animate-slide-right-2 {
      animation: slideRight 1s ease-out forwards;
      animation-delay: 300ms;
      opacity: 0;
      transform: translateX(-50px);
    }

    .animate-gradient-shift {
      background-size: 200% 200%;
      animation: gradient-shift 12s ease infinite;
    }
  </style>
</section>
