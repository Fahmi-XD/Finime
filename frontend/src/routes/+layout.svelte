<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { badges } from '$lib/stores/user';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { mode as modeStore } from '$lib/stores/mode';

	import Navbar from '$lib/components/complex/Navbar.svelte';
	import Footer from '$lib/components/complex/Footer.svelte';
	import { UserClient } from '$lib/api/clients/userClient';
	import { Toaster } from "svelte-french-toast";

	const protectedRoute = ["/settings", "/profile"];
	const authRoute = ["/auth/login", "/auth/register"];

	let path = $derived(page.url.pathname)

	$effect(() => {
		if (!page.data.user && protectedRoute.includes(path)) {
			const urlEncoded = btoa(path)
			goto(`/auth/login?from=${urlEncoded}`)
		}

		if (page.data.user && authRoute.includes(path)) {
			goto(`/`)
		}
	});

	let { children } = $props();

	const handleResize = () => {
		if (window.innerWidth < 768) {
			modeStore.set("flat")
		} else {
			modeStore.set("colorful")
		}
	};

	onMount(async () => {
		badges.set(await UserClient.getAllBadges());
		
		if (typeof window == "undefined") return;

		handleResize();
		window.addEventListener("resize", handleResize)
	});
	
	onDestroy(() => {
		if (typeof window == "undefined") return;
	
		window.removeEventListener("resize", handleResize)
	})
</script>

<ModeWatcher defaultMode="dark" />
<Navbar />
{@render children()}
{#if $modeStore == "colorful"}
	<Footer />
{/if}
<Toaster />