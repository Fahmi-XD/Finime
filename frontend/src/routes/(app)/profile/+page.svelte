<script lang="ts">
  import LoadingElements from "$lib/components/ui/LoadingElements.svelte";
  import {
    BookOpen,
    Film,
    Edit,
    Mail,
    Shield,
    BadgeCheckIcon,
    History,
    Star,
  } from "@lucide/svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/state";
  import { badges as badgesStore } from "$lib/stores/user";
  import { PUBLIC_API } from "$env/static/public";
  
  let user = page.data.user;
  $: badges = $badgesStore.filter((badge) => user.badges.includes(badge.id));

  let isLoading = writable(false);  

  function getInitials(name: string) {
    return name ? name.charAt(0).toUpperCase() : "?";
  }
</script>

<div
  class="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8 sm:mt-0 mt-10"
>
  <div class="w-full max-w-5xl mx-auto">
    {#if $isLoading}
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <LoadingElements />
      </div>
    {/if}

    <div
      class="bg-[hsl(var(--background))] backdrop-blur-md rounded-2xl md:mt-10 shadow-xl overflow-hidden border border-white/10"
    >
      <div class="flex flex-col md:flex-row">
        <div
          class="w-full md:w-1/2 p-8 bg-gradient-to-b from-red-500/10 to-transparent flex flex-col"
        >
          <div class="relative w-auto flex">
            {#if user.banner && user.banner.includes("mp4")}
              <video class="h-[160px] w-full object-cover rounded-xl" autoplay loop muted playsinline>
                <source src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={user.banner}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            {:else if user.banner}
              <img src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={user.banner}" alt="Banner" class="h-[160px] w-full object-cover rounded-xl" />
            {:else}
              <img src="placeholder.png" alt="Banner" class="h-[160px] w-full object-cover rounded-xl" />
            {/if}
            <div
              class="w-auto absolute left-0 -bottom-20 h-auto rounded-full overflow-hidden flex"
            >
              {#if user.avatar}
                <img
                  src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={user.avatar}"
                  alt="Profile picture of {user.name}"
                  class="w-32 h-32 border-4 border-red-500/30 bg-white/50 rounded-full object-cover transition-all duration-300 hover:scale-110"
                />
              {:else}
                <div
                  class="flex items-center border-4 rounded-full border-red-500/30 bg-white/50 justify-center w-32 h-32 text-4xl font-bold text-white bg-gradient-to-br from-red-500 to-blue-500"
                >
                  {getInitials(user.name)}
                </div>
              {/if}
            </div>
          </div>

          <div class="flex gap-3 mt-24 items-center">
            <h1 class="text-2xl font-bold tracking-tight">
              {user.name}
            </h1>
            {#if user.role === "ADMIN" || user.isVerify}
              <BadgeCheckIcon fill="#1DA1F2" />
            {/if}
          </div>
          <p class="text-gray-400 mt-1 text-sm">
            @{user.username} {user?.pronoun ? `(${user.pronoun})` : ""}
          </p>

          <div class="mt-6 w-full space-y-3 text-left">
            <div class="flex items-start">
              <div class="flex-shrink-0 mt-0.5">
                <div
                  class="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center text-red-500"
                >
                  <Mail size={12} />
                </div>
              </div>
              <p class="ml-2 text-sm break-all">{user.email}</p>
            </div>
            <div class="flex items-center gap-1">
              <div class="flex-shrink-0">
                <div
                  class="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center text-red-500"
                >
                  <Shield size={12} />
                </div>
              </div>
              <div class="flex items-center">
                <span class="px-2 rounded bg-blue-500/10 text-blue-400 text-xs font-bold">
                  {user.role}
                </span>
              </div>
            </div>
            <ul class="flex flex-wrap gap-2">
              {#each badges as badge}
                <li class="flex gap-1 items-center bg-white/20 px-1 border-l-4 border-red-500">
                  <div class="flex-shrink-0 items-center">
                    <div
                      class="w-5 h-5 rounded-full flex items-center justify-center text-white"
                    >
                      <svelte:component this={badge.icon} size={15} />
                    </div>
                  </div>
                  <div class="flex items-center">
                    <span class="rounded text-white text-[11px] font-bold">
                      {badge.name}
                    </span>
                  </div>
                </li>
              {/each}
            </ul>
          </div>

          <div class="mt-8 w-full">
            <a href="/settings" class="w-full bg-gradient-to-r from-red-500 to-pink-600 block py-2 rounded-2xl text-white font-bold text-center hover:from-red-600 hover:to-pink-700 transition-all">
              <span class="flex items-center justify-center">
                <Edit size={16} class="mr-2" />
                Settings
              </span>
            </a>
          </div>
        </div>

        <div
          class="w-full md:w-2/3 p-8 bg-[hsl(var(--background))] border-t md:border-t-0 md:border-l border-white/10"
        >
          <div class="mb-8">
            <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-white/20">
              Your Statistics
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                class="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 hover:shadow-sm transition-all duration-200 hover:translate-y-[-2px]"
              >
                <div class="flex items-center">
                  <div
                    class="p-2 rounded-lg bg-blue-500/10 text-blue-500 mr-4"
                  >
                    <Film size={20} />
                  </div>
                  <div>
                    <p class="text-sm text-gray-400 font-medium">
                      Anime Watched
                    </p>
                    <p class="text-2xl font-bold mt-1">{user.anime.length}</p>
                  </div>
                </div>
              </div>
              <div
                class="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 hover:shadow-sm transition-all duration-200 hover:translate-y-[-2px]"
              >
                <div class="flex items-center">
                  <div
                    class="p-2 rounded-lg bg-purple-500/10 text-purple-500 mr-4"
                  >
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <p class="text-sm text-gray-400 font-medium">
                      Manga Read
                    </p>
                    <p class="text-2xl font-bold mt-1">{user.manga.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t mb-2 border-white/20">
            <h2 class="text-xl font-semibold mb-3 pb-2 border-b border-white/20">
              Bio
            </h2>
            <div class="flex">
              <p class="opacity-70 text-[15px]">{user.bio || "No bio"}</p>
            </div>
          </div>

          <div class="pt-6 border-t border-white/20">
            <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-white/20">
              Quick Actions
            </h2>
            <div class="grid grid-cols-2 gap-4">
              <button
                class="w-full h-24 flex flex-col items-center justify-center rounded-xl border-2 border-white/10 bg-white/5 hover:bg-[hsl(var(--background))] transition-all"
              >
                <History size={24} class="mb-2 text-blue-500" />
                <span class="font-bold text-white">History</span>
              </button>
              <button
                class="w-full h-24 flex flex-col items-center justify-center rounded-xl border-2 border-white/10 bg-white/5 hover:bg-[hsl(var(--background))] transition-all"
              >
                <Star size={24} class="mb-2 text-yellow-400" />
                <span class="font-bold text-white">Favorite</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{#if $isLoading}
  <div class="fixed inset-0 flex items-center justify-center bg-black/50">
    <LoadingElements />
  </div>
{/if}
