<script lang="ts">
  import LoadingElements from "$lib/components/ui/LoadingElements.svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/state";
  import { badges as badgesStore } from "$lib/stores/user";
  import { onMount } from "svelte";
  import { UserMobileClient } from "$lib/api/clients/mobile/userClient";

  import Profile from "$lib/components/layouts/Profile.svelte";
  
  let user = page.data.user;
  $: badges = $badgesStore.filter((badge) => user.badges.includes(badge.id));

  let isLoading = writable(true);
  let statistics = {anime: [], manga: []};

  onMount(async () => {
    $isLoading = true;
    const userInfo = await UserMobileClient.getUserInfoStatistics();
    statistics = userInfo;
    $isLoading = false;
  })
</script>

<div
  class="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="w-full max-w-5xl mx-auto">
    {#if $isLoading}
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <LoadingElements />
      </div>
    {/if}

    <Profile {user} {badges} {statistics} />
  </div>
</div>

{#if $isLoading}
  <div class="fixed inset-0 flex items-center justify-center bg-black/50">
    <LoadingElements />
  </div>
{/if}
