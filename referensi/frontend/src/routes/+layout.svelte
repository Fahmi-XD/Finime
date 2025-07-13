<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import Navbar from "$/components/Navbar.svelte";
  import Footer from "$/components/Footer.svelte";
  import "../app.css";
  import { onMount } from "svelte";
  import { fetchUser } from "$stores/user";
  import { page } from "$app/state";
  import SettingsProvider from "$/components/fragments/ProviderSettings.svelte"

  let loading: boolean = true;
  let isHidden: boolean = $state<boolean>(false);

  const hiddenPaths = ['/dashboard'];
  const { children } = $props();

  const currentPath = $derived(page.url.pathname);
  $effect(() => {
    isHidden = hiddenPaths.some(path => currentPath.startsWith(path));
  })

  onMount(async () => {
    await fetchUser();
    loading = false;
  });
</script>

<main class="bg-transparent relative">
  <ModeWatcher />
  <!-- <SettingsProvider /> -->
  {#if !isHidden}
    <Navbar />
  {/if}

  {@render children()}

  {#if !isHidden}
    <Footer />
  {/if}
</main>