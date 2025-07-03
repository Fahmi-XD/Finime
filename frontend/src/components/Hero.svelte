<script lang="ts">
  import Link from "svelte-link";

  import { title } from "$data/index";
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

<section
  class="relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden min-h-screen flex items-center"
>
  <div class="absolute inset-0 overflow-hidden">
    <div
      class="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.2)] via-[hsl(var(--secondary)/0.15)] to-[hsl(var(--tertiary)/0.1)] opacity-30 animate-gradient-shift"
    ></div>
  </div>

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
          color="rgba(255, 255, 255, 0.2)"
          size={Math.random() * 20 + 10}
        />
        <!-- {['</>', '{}', '()', '=>', '[]', '/*', '*/', '||', '&&', '==', '!='][i % 11]} -->
      </div>
    {/each}
  </div>

  <div
    class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-12"
  >
    <div class="text-center md:text-left mb-8 md:mb-0 z-10">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--accent)/0.2)] rounded-full mb-6 border border-[hsl(var(--border)/0.3)]"
      >
        <span class="relative flex h-3 w-3">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--primary))] opacity-75"
          ></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-[hsl(var(--primary))]"></span>
        </span>
        <span class="text-sm font-medium text-[hsl(var(--foreground))]">New releases every day</span
        >
      </div>

      <h1
        class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-[hsl(var(--background-foreground))]"
      >
        <span
          class="animate-slide-right flex text-center justify-center sm:justify-start text-[hsl(var(--primary))]"
        >
          Welcome to {title}!
        </span>
        <span class="animate-slide-right block text-[hsl(var(--foreground))]">Read Manga & Watch Anime</span>
      </h1>

      <p
        class="mt-6 animate-slide-right-2 block text-lg sm:text-xl text-[hsl(var(--muted-foreground))] max-w-lg leading-relaxed"
      >
        {title} is the best platform to read manga, manhwa, and watch anime for free. Discover thousands
        of titles, connect with the community, and enjoy a delightful reading experience!
      </p>

      <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <Link
          href="/manga"
          class="relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[hsl(var(--primary-foreground))] bg-[hsl(var(--primary))] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
        >
          <span
            class="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary)/0.8)] to-[hsl(var(--primary)/0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></span>
          <span class="relative z-10 flex items-center gap-2">
            Start Reading
            <ArrowRight class="w-5 h-5" />
          </span>
        </Link>

        <Link
          href="/anime"
          class="relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[hsl(var(--foreground))] bg-transparent rounded-full border-2 border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-all duration-300 hover:-translate-y-1"
        >
          Explore Anime
        </Link>
      </div>

      <div
        class="mt-12 flex items-center justify-center md:justify-start gap-4 text-sm text-[hsl(var(--muted-foreground))]"
      >
        <div class="flex items-center gap-2">
          <BookmarkCheck class="w-4 h-4" />
          <span>10,000+ Titles</span>
        </div>
        <div class="flex items-center gap-2">
          <Package class="w-4 h-4" />
          <span>Open source</span>
        </div>
      </div>
    </div>

    <div class="flex-shrink-0 animate-slide-left block z-10">
      <div class="relative group">
        <div
          class="absolute -inset-4 bg-gradient-to-r from-[hsl(var(--primary)/0.4)] to-[hsl(var(--tertiary)/0.4)] rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
        ></div>
        <img
          src="https://media.tenor.com/7hiQYhUQY2QAAAAM/dis.gif"
          alt="Finime Hero Illustration"
          class="relative w-full block max-w-[400px] h-auto md:w-[400px] rounded-2xl border-2 border-[hsl(var(--border)/0.3)] shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"
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
