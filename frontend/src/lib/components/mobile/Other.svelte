<script lang="ts">
	import {
		History,
		Heart,
		Download,
		Settings,
		Bookmark,
		Star,
		Clock,
		Eye,
		Share2,
		Info,
		HelpCircle,
		Shield,
		Moon,
		Sun,
		Wifi,
		Bluetooth,
		Volume2,
		Battery,
		Grid3X3,
		Plus,
		Search,
		Filter,
		SortAsc,
		SortDesc,
		TrendingUp,
		X
	} from '@lucide/svelte';
	import { page } from '$app/state';
	import { getInitials } from '$lib';
	import { PUBLIC_API } from '$env/static/public';
	import { scale, fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { seeAllTitle } from '$lib/stores/home.mobile';

	const user = page.data.user;

	let dark = true;
	let showQuickActions = false;

	// Quick action buttons data
	const quickActions = [
		{
			id: 'history',
			label: 'History',
			icon: History,
			color: 'bg-blue-500',
			description: 'Watch history'
		},
		{
			id: 'favorites',
			label: 'Favorites',
			icon: Heart,
			color: 'bg-red-500',
			description: 'Liked content'
		},
		{
			id: 'downloads',
			label: 'Downloads',
			icon: Download,
			color: 'bg-green-500',
			description: 'Offline content'
		},
		{
			id: 'bookmarks',
			label: 'Bookmarks',
			icon: Bookmark,
			color: 'bg-yellow-500',
			description: 'Saved items'
		},
		{
			id: 'watchlist',
			label: 'Watchlist',
			icon: Eye,
			color: 'bg-purple-500',
			description: 'Plan to watch'
		},
		{
			id: 'recent',
			label: 'Recent',
			icon: Clock,
			color: 'bg-indigo-500',
			description: 'Recently viewed'
		},
		{
			id: 'top-rated',
			label: 'Top Rated',
			icon: Star,
			color: 'bg-orange-500',
			description: 'Highest rated'
		},
		{
			id: 'trending',
			label: 'Trending',
			icon: TrendingUp,
			color: 'bg-pink-500',
			description: 'Popular now'
		}
	];

	const systemActions = [
		{
			id: 'settings',
			label: 'Settings',
			icon: Settings,
			color: 'bg-gray-600',
			description: 'App settings'
		},
		{
			id: 'theme',
			label: 'Theme',
			icon: dark ? Sun : Moon,
			color: 'bg-gray-700',
			description: 'Dark/Light mode'
		},
		{
			id: 'wifi',
			label: 'WiFi',
			icon: Wifi,
			color: 'bg-blue-600',
			description: 'Network settings'
		},
		{
			id: 'bluetooth',
			label: 'Bluetooth',
			icon: Bluetooth,
			color: 'bg-blue-700',
			description: 'Bluetooth settings'
		},
		{
			id: 'volume',
			label: 'Volume',
			icon: Volume2,
			color: 'bg-green-600',
			description: 'Audio settings'
		},
		{
			id: 'battery',
			label: 'Battery',
			icon: Battery,
			color: 'bg-green-700',
			description: 'Battery info'
		}
	];

	const utilityActions = [
		{
			id: 'search',
			label: 'Search',
			icon: Search,
			color: 'bg-gray-500',
			description: 'Advanced search'
		},
		{
			id: 'filter',
			label: 'Filter',
			icon: Filter,
			color: 'bg-gray-600',
			description: 'Content filters'
		},
		{
			id: 'sort',
			label: 'Sort',
			icon: SortAsc,
			color: 'bg-gray-700',
			description: 'Sort options'
		},
		{
			id: 'share',
			label: 'Share',
			icon: Share2,
			color: 'bg-blue-500',
			description: 'Share content'
		},
		{
			id: 'info',
			label: 'About',
			icon: Info,
			color: 'bg-gray-600',
			description: 'App information'
		},
		{
			id: 'help',
			label: 'Help',
			icon: HelpCircle,
			color: 'bg-blue-600',
			description: 'Help & support'
		}
	];

	function toggleTheme() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
	}

	function handleQuickAction(actionId: string) {
		console.log('Quick action clicked:', actionId);
		
		switch (actionId) {
			case 'theme':
				toggleTheme();
				break;
			case 'history':
        seeAllTitle.set("Historimu")
				goto("/mobile/see-all")
				break;
			case 'info':
				goto("/mobile/about")
				break;
			default:
				// Handle other actions
				break;
		}
	}

	function toggleQuickActions() {
		showQuickActions = !showQuickActions;
	}
</script>

<div class="min-h-screen bg-black text-white px-4 pb-[70px] pt-5" in:scale={{ duration: 200, start: 0.95 }}>
	<!-- Header -->
	<div class="mb-6">
		<div class="flex items-center justify-between mb-4">
			<div class="flex items-center gap-3">
				{#if user?.avatar}
					<div class="h-10 w-10 rounded-full bg-white/50 object-cover transition-all duration-300 hover:scale-110">
						<img
							src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={user?.avatar}"
							alt="Profile picture of {user.name}"
							class="h-10 w-10 rounded-full object-cover"
						/>
					</div>
				{:else}
					<div class="flex h-10 w-10 items-center justify-center rounded-full border-4 border-red-500/30 bg-white/50 bg-gradient-to-br from-red-500 to-blue-500 text-2xl font-bold text-white">
						{getInitials(user?.name)}
					</div>
				{/if}
				<div>
					<h1 class="text-sm font-bold text-white">Quick Actions</h1>
					<p class="text-xs text-gray-400">Access your favorite features</p>
				</div>
			</div>
			<button
				class="rounded-full bg-white/10 p-2 text-white transition-all duration-200 hover:bg-white/20"
				on:click={toggleQuickActions}
			>
				<Grid3X3 class="h-5 w-5" />
			</button>
		</div>
	</div>

	<!-- Quick Actions Grid -->
	<div class="space-y-6">
		<!-- Main Quick Actions -->
		<div>
			<h2 class="mb-4 text-lg font-semibold text-white text-center">Quick Access</h2>
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
				{#each quickActions as action}
					<button
						class="group relative overflow-hidden rounded-2xl bg-white/5 p-4 text-center transition-all duration-300 hover:bg-white/10 hover:scale-105"
						on:click={() => handleQuickAction(action.id)}
						in:fly={{ y: 20, duration: 300, delay: quickActions.indexOf(action) * 50 }}
					>
						<div class="mb-3 flex justify-center">
							<div class="flex h-12 w-12 items-center justify-center rounded-xl {action.color} shadow-lg transition-all duration-300 group-hover:scale-110">
								<svelte:component this={action.icon} class="h-6 w-6 text-white" />
							</div>
						</div>
						<h3 class="text-sm font-semibold text-white">{action.label}</h3>
						<p class="mt-1 text-xs text-gray-400">{action.description}</p>
						
						<!-- Hover effect -->
						<div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
					</button>
				{/each}
			</div>
		</div>

		<!-- System Actions -->
		<div>
			<h2 class="mb-4 text-lg font-semibold text-white text-center">System</h2>
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
				{#each systemActions as action}
					<button
						class="group relative overflow-hidden rounded-xl bg-white/5 p-3 text-center transition-all duration-300 hover:bg-white/10 hover:scale-105"
						on:click={() => handleQuickAction(action.id)}
						in:fly={{ y: 20, duration: 300, delay: systemActions.indexOf(action) * 50 }}
					>
						<div class="mb-2 flex justify-center">
							<div class="flex h-10 w-10 items-center justify-center rounded-lg {action.color} shadow-lg transition-all duration-300 group-hover:scale-110">
								<svelte:component this={action.icon} class="h-5 w-5 text-white" />
							</div>
						</div>
						<h3 class="text-xs font-medium text-white">{action.label}</h3>
						<p class="mt-1 text-xs text-gray-400">{action.description}</p>
						
						<!-- Hover effect -->
						<div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
					</button>
				{/each}
			</div>
		</div>

		<!-- Utility Actions -->
		<div>
			<h2 class="mb-4 text-lg font-semibold text-white text-center">Utilities</h2>
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
				{#each utilityActions as action}
					<button
						class="group relative overflow-hidden rounded-xl bg-white/5 p-3 text-center transition-all duration-300 hover:bg-white/10 hover:scale-105"
						on:click={() => handleQuickAction(action.id)}
						in:fly={{ y: 20, duration: 300, delay: utilityActions.indexOf(action) * 50 }}
					>
						<div class="mb-2 flex justify-center">
							<div class="flex h-10 w-10 items-center justify-center rounded-lg {action.color} shadow-lg transition-all duration-300 group-hover:scale-110">
								<svelte:component this={action.icon} class="h-5 w-5 text-white" />
							</div>
						</div>
						<h3 class="text-xs font-medium text-white">{action.label}</h3>
						<p class="mt-1 text-xs text-gray-400">{action.description}</p>
						
						<!-- Hover effect -->
						<div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
					</button>
				{/each}
			</div>
		</div>

		<!-- Quick Actions Panel (Hidden by default) -->
		{#if showQuickActions}
			<div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" transition:scale={{ duration: 200 }}>
				<div class="flex h-full items-center justify-center p-4">
					<div class="w-full max-w-md rounded-2xl bg-neutral-800 p-6 shadow-2xl" in:scale={{ duration: 200 }}>
						<div class="mb-4 flex items-center justify-between">
							<h3 class="text-lg font-semibold text-white">Quick Actions</h3>
							<button
								class="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
								on:click={toggleQuickActions}
							>
								<X class="h-5 w-5" />
							</button>
						</div>
						
						<div class="grid grid-cols-3 gap-3">
							{#each quickActions.slice(0, 6) as action}
								<button
									class="group rounded-xl bg-transparent p-3 text-center transition-all duration-200 hover:bg-gray-600"
									on:click={() => { handleQuickAction(action.id); toggleQuickActions(); }}
								>
									<div class="mb-2 flex justify-center">
										<div class="flex h-8 w-8 items-center justify-center rounded-lg {action.color}">
											<svelte:component this={action.icon} class="h-4 w-4 text-white" />
										</div>
									</div>
									<p class="text-xs text-white">{action.label}</p>
								</button>
							{/each}
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Floating Action Button -->
	<!-- <div class="fixed bottom-6 right-6">
		<button
			class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
			on:click={() => console.log('Add new item')}
		>
			<Plus class="h-6 w-6 text-white" />
		</button>
	</div> -->
</div>

<style>
	/* Custom scrollbar */
	::-webkit-scrollbar {
		width: 6px;
	}

	::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
	}

	::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.3);
		border-radius: 3px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.5);
	}
</style>
