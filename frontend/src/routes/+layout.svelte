<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { badges } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

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

	onMount(async () => {
		badges.set(await UserClient.getAllBadges());
	});
</script>

<ModeWatcher defaultMode="dark" />
<Navbar />
{@render children()}
<Footer />
<Toaster />