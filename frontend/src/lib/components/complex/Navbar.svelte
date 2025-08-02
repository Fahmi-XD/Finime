<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Bot,
		Home,
		Search,
		Tv,
		BookOpen,
		InfoIcon,
		PaintBucketIcon,
		Smartphone
	} from '@lucide/svelte';
	import ProfileMenu from '$lib/components/complex/ProfileMenu.svelte';
	import { fade } from 'svelte/transition';
	import { title, clearDisplay, exClearDisplayHeader } from '$lib/config/app';
	import { page } from '$app/stores';
	import { PUBLIC_API } from '$env/static/public';
	import { mode } from '$lib/stores/mode';
	import { goto } from '$app/navigation';
	import { navigate } from '$lib/stores/history';

	type ILinks = {
		name: string;
		link: string;
		icon: any;
	};

	let isMenuOpen = false;
	let isProfileMenuOpen = false;
	let isLoadUser: boolean = true;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function toggleProfileMenu(event: Event) {
		event.stopPropagation();
		isProfileMenuOpen = !isProfileMenuOpen;
	}

	function closeProfileMenu() {
		isProfileMenuOpen = false;
	}

	onMount(async () => {
		isLoadUser = false;
		window.addEventListener('click', closeProfileMenu);
	});

	$: path = $page.url.pathname;
	$: profile = $page.data.user;

	function getInitials(name: string | undefined) {
		return name ? name.charAt(0).toUpperCase() : '?';
	}

	let links: ILinks[] = [];

	$: {
		links = [
			{ name: 'Home', link: '/', icon: Home },
			{ name: 'Anime', link: `${$mode == 'colorful' ? '' : '/mobile'}/anime`, icon: Tv },
			{ name: 'Search', link: `${$mode == 'colorful' ? '' : '/mobile'}/search`, icon: Search },
			{ name: 'Manga', link: `${$mode == 'colorful' ? '' : '/mobile'}/manga`, icon: BookOpen },
			{ name: 'About', link: `${$mode == 'colorful' ? '' : '/mobile'}/about`, icon: InfoIcon }
		];
	}

	$: isClearDisplay = clearDisplay.some((route) => route == path)
	$: isExClearDisplayHeader = exClearDisplayHeader.some((route) => route == path)
</script>

{#if !isClearDisplay || isExClearDisplayHeader}
	<nav class="fixed inset-x-0 top-0 z-50 bg-[hsl(var(--background)/0.8)] shadow-sm backdrop-blur-lg">
		<div class="mx-auto w-full max-w-7xl px-4">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center gap-2">
					<!-- <button
							class="rounded-md p-2 text-[hsl(var(--foreground))] transition-all hover:bg-[hsl(var(--muted))/70] md:hidden"
							on:click={toggleMenu}
						>
							{#if isMenuOpen}
								<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							{:else}
								<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							{/if}
						</button> -->

					<a href={$mode == "flat" ? "/mobile?fragment=Home" : "/"} on:click={() => { if ($mode == "flat") navigate.set(["/", "Home"]) }} class="flex items-center gap-2 text-lg font-bold text-[hsl(var(--primary))]">
						<Bot />
						{title}
					</a>
				</div>

				<nav data-sveltekit-preload-data="false" class="hidden items-center gap-6 md:flex">
					{#each links as { name, link }}
						<a
							href={link}
							class="font-medium {path == link
								? 'text-red-500'
								: ''} text-lg text-[hsl(var(--foreground))] transition-colors hover:text-[hsl(var(--primary))]"
							>{name}</a
						>
					{/each}
				</nav>

				<div class="relative flex items-center gap-7">
					<!-- <button on:click={() => mode.set($mode === 'colorful' ? 'flat' : 'colorful')}>
							<Smartphone size="25" />
						</button> -->

					{#if profile}
						<div class="relative">
							<button
								class="flex cursor-pointer items-center gap-2"
								on:click|stopPropagation={toggleProfileMenu}
							>
								{#if profile?.avatar}
									<img
										src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={profile?.avatar}"
										alt="Profile"
										class="h-8 w-8 rounded-full object-cover"
									/>
								{:else}
									<div
										class="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-lg font-bold text-white"
									>
										{getInitials(profile?.name)}
									</div>
								{/if}
							</button>

							{#if isProfileMenuOpen}
								<div transition:fade>
									<ProfileMenu {profile} />
								</div>
							{/if}
						</div>
					{:else}
						<a
							data-sveltekit-preload-data="tap"
							href="/auth/login"
							class="rounded-md border border-[hsl(var(--primary))] px-4 py-1 text-lg font-medium text-[hsl(var(--primary))] transition-colors hover:bg-[hsl(var(--primary)/0.1)] md:py-2"
						>
							Sign In
						</a>
					{/if}
				</div>
			</div>

			<!-- {#if isMenuOpen}
					<div
						transition:fade
						class="mt-4 space-y-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-4 shadow-md transition-all md:hidden"
					>
						{#each links as { name, link }}
							<a
								href={link}
								on:click={handleNavbarClick}
								class="block rounded-md px-4 py-2 text-lg font-medium text-[hsl(var(--foreground))] transition-all hover:bg-[hsl(var(--muted))]/60 hover:text-[hsl(var(--primary))]"
								>{name}</a
							>
						{/each}
					</div>
				{/if} -->
		</div>
	</nav>
{/if}

{#if $mode == 'flat' && !isClearDisplay}
	<nav
		class="fixed bottom-0 left-0 z-50 flex h-auto w-full justify-around bg-[hsl(var(--background)/0.8)] py-2 pb-4 shadow-sm backdrop-blur-lg md:hidden"
	>
		{#each links as { icon, link, name }}
			<button
				on:click={() => clearDisplay.some((route) => route == link) ? goto(link) : navigate.set([link, name])}
				class="block rounded-md px-4 py-2 text-lg font-medium text-[hsl(var(--foreground))] transition-all hover:bg-[hsl(var(--muted))]/60 hover:text-[hsl(var(--primary))]"
				class:text-red-500={path === link || $navigate[1] == name}
			>
				<svelte:component this={icon} size="25" />
			</button>
		{/each}
	</nav>
{/if}
