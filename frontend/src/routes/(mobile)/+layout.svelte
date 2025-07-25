<script lang="ts">
	import '../../app.css';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { mode } from '$lib/stores/mode';

	import Navbar from '$lib/components/complex/Navbar.svelte';
	import { Toaster } from "svelte-french-toast";
	import { onMount } from 'svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';

  beforeNavigate(({ from, to }) => {
      console.log('Before navigation:', from, '->', to);
  });
  
  afterNavigate(({ to }) => {
      console.log('After navigation:', to);
  });

  onMount(() => {
      if (typeof window != "undefined") {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
      }
  });

	const protectedRoute = ["/settings", "/profile"];
	const authRoute = ["/auth/login", "/auth/register"];

	mode.set("flat")

	let path = $derived(page.url.pathname)

	let { children } = $props();
</script>

<Navbar />
{@render children()}
<Toaster />