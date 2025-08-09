<script lang="ts">
	import '../../app.css';
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
	import { handleResize } from '$lib';

	const protectedRoute = ["/settings", "/profile"];
	const publicRoute = ["/auth/login", "/auth/register"];

	let path = $derived(page.url.pathname)

	$effect(() => {
		if (Object.keys(page.data.user).length == 0 && protectedRoute.includes(path)) {
			const urlEncoded = btoa(path)
			goto(`/auth/login?from=${urlEncoded}`)
		}

		if (Object.keys(page.data.user).length > 0 && publicRoute.includes(path)) {
			goto(`/`)
		}
	});

	let { children } = $props();

	onMount(async () => {
		badges.set(await UserClient.getAllBadges());
		
		if (typeof window == "undefined") return;

		handleResize(path);
	});
</script>

<ModeWatcher defaultMode="dark" />
<Navbar />
{@render children()}
{#if $modeStore == "colorful"}
	<Footer />
{/if}
<Toaster />