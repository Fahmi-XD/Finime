<script lang="ts">
	import '../../app.css';
	import { page } from '$app/state';
	import { mode } from '$lib/stores/mode';

	import Navbar from '$lib/components/complex/Navbar.svelte';
	import { Toaster } from "svelte-french-toast";
	import { onMount } from 'svelte';

  onMount(() => {
      if (typeof window != "undefined") {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
      }
  });

	mode.set("flat")

	let path = $derived(page.url.pathname)

	let { children } = $props();
</script>

<Navbar />
{@render children()}
<Toaster />