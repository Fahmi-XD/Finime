<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Moon,
		Sun,
		User,
		BarChart2,
		Database,
		BookOpen,
		Film,
		Users,
		CheckCircle,
		XCircle,
		LogOut,
		Plus,
		Search,
		Filter,
		MoreVertical,
		TrendingUp,
		Activity,
		Settings,
		Bell,
		Menu,
		X,
		Edit,
		Eye,
		List,
		Trash2,
		Shield,
		Pause,
		ChevronDown
	} from '@lucide/svelte';
	import { page } from '$app/state';
	import { getInitials } from '$lib';
	import { PUBLIC_API } from '$env/static/public';
	import { scale } from 'svelte/transition';

	const user = page.data.user;

	let dark = true;
	let activeMenu = 'dashboard';
	let searchQuery = '';
	let sidebarOpen = false;
	let openDropdowns = new Set();

	// Dropdown actions for different items
	const animeActions = [
		{ label: 'Edit Anime', icon: 'edit', action: 'edit' },
		{ label: 'View Details', icon: 'eye', action: 'view' },
		{ label: 'Manage Episodes', icon: 'list', action: 'episodes' },
		{ label: 'Delete Anime', icon: 'trash', action: 'delete', danger: true }
	];

	const mangaActions = [
		{ label: 'Edit Manga', icon: 'edit', action: 'edit' },
		{ label: 'View Details', icon: 'eye', action: 'view' },
		{ label: 'Manage Chapters', icon: 'list', action: 'chapters' },
		{ label: 'Delete Manga', icon: 'trash', action: 'delete', danger: true }
	];

	const userActions = [
		{ label: 'Edit User', icon: 'edit', action: 'edit' },
		{ label: 'View Profile', icon: 'eye', action: 'view' },
		{ label: 'Change Role', icon: 'shield', action: 'role' },
		{ label: 'Suspend User', icon: 'pause', action: 'suspend' },
		{ label: 'Delete User', icon: 'trash', action: 'delete', danger: true }
	];

	let stats = [
		{ icon: BarChart2, label: 'Total Visitors', value: '12,340', change: '+12.5%', trend: 'up' },
		{ icon: Film, label: 'Active Anime', value: '1,234', change: '+8.2%', trend: 'up' },
		{ icon: BookOpen, label: 'Manga Series', value: '567', change: '+15.3%', trend: 'up' },
		{ icon: Users, label: 'Registered Users', value: '8,921', change: '+5.7%', trend: 'up' }
	];

	let systemStatus = [
		{ name: 'API Server', status: true, uptime: '99.9%' },
		{ name: 'Database', status: true, uptime: '99.8%' },
		{ name: 'File Storage', status: true, uptime: '99.7%' },
		{ name: 'Email Service', status: false, uptime: '95.2%' }
	];

	let recentActivity = [
		{ type: 'user', message: 'New user registered: john_doe', time: '2 minutes ago' },
		{ type: 'anime', message: 'Added new anime: Demon Slayer Season 3', time: '15 minutes ago' },
		{ type: 'manga', message: 'Updated manga: One Piece Chapter 1100', time: '1 hour ago' },
		{ type: 'system', message: 'System backup completed', time: '2 hours ago' }
	];

	let animeList = [
		{
			id: 1,
			title: 'Attack on Titan',
			episodes: 87,
			status: 'Completed',
			rating: 9.0,
			views: '2.1M'
		},
		{ id: 2, title: 'Jujutsu Kaisen', episodes: 24, status: 'Ongoing', rating: 8.8, views: '1.8M' },
		{ id: 3, title: 'Demon Slayer', episodes: 44, status: 'Ongoing', rating: 8.9, views: '1.5M' },
		{ id: 4, title: 'One Piece', episodes: 1080, status: 'Ongoing', rating: 9.2, views: '3.2M' }
	];

	let mangaList = [
		{ id: 1, title: 'One Piece', chapters: 1100, status: 'Ongoing', rating: 9.1, readers: '500K' },
		{ id: 2, title: 'Naruto', chapters: 700, status: 'Completed', rating: 8.7, readers: '300K' },
		{ id: 3, title: 'Bleach', chapters: 686, status: 'Completed', rating: 8.5, readers: '250K' },
		{
			id: 4,
			title: 'Dragon Ball',
			chapters: 519,
			status: 'Completed',
			rating: 8.9,
			readers: '400K'
		}
	];

	let userList = [
		{
			id: 1,
			name: 'Admin User',
			username: 'admin',
			role: 'admin',
			email: 'admin@finime.com',
			joined: '2023-01-01',
			status: 'active',
			lastLogin: '2 hours ago'
		},
		{
			id: 2,
			name: 'John Doe',
			username: 'john_doe',
			role: 'user',
			email: 'john@mail.com',
			joined: '2024-05-10',
			status: 'active',
			lastLogin: '1 day ago'
		},
		{
			id: 3,
			name: 'Jane Smith',
			username: 'jane_smith',
			role: 'moderator',
			email: 'jane@mail.com',
			joined: '2024-03-15',
			status: 'active',
			lastLogin: '3 hours ago'
		}
	];

	function toggleDark() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
	}

	function getStatusColor(status: string) {
		return status === 'active' ? 'text-green-400' : 'text-red-400';
	}

	function getStatusBg(status: string) {
		return status === 'active' ? 'bg-green-400/10' : 'bg-red-400/10';
	}

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		sidebarOpen = false;
	}

	function toggleDropdown(itemId: string) {
		if (openDropdowns.has(itemId)) {
			openDropdowns.delete(itemId);
		} else {
			openDropdowns.add(itemId);
		}
		openDropdowns = openDropdowns; // Trigger reactivity
	}

	function closeAllDropdowns() {
		openDropdowns.clear();
		openDropdowns = openDropdowns; // Trigger reactivity
	}

	function handleAction(action: string, item: any, type: string) {
		closeAllDropdowns();

		switch (action) {
			case 'edit':
				console.log(`Edit ${type}:`, item);
				// Add your edit logic here
				break;
			case 'view':
				console.log(`View ${type}:`, item);
				// Add your view logic here
				break;
			case 'episodes':
				console.log(`Manage episodes for:`, item.title);
				// Add your episodes management logic here
				break;
			case 'chapters':
				console.log(`Manage chapters for:`, item.title);
				// Add your chapters management logic here
				break;
			case 'role':
				console.log(`Change role for:`, item.name);
				// Add your role change logic here
				break;
			case 'suspend':
				console.log(`Suspend user:`, item.name);
				// Add your suspend logic here
				break;
			case 'delete':
				if (confirm(`Are you sure you want to delete this ${type}?`)) {
					console.log(`Delete ${type}:`, item);
					// Add your delete logic here
				}
				break;
		}
	}
</script>

<div class="flex min-h-screen bg-black text-gray-100 will-change-transform" in:scale={{ duration: 200, start: 0.95 }}>
	<!-- Mobile Sidebar Overlay -->
	{#if sidebarOpen}
		<button
			aria-label="Close sidebar"
			class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
			on:click={closeSidebar}
		>
			<span class="sr-only">Close sidebar</span>
		</button>
	{/if}

	<!-- Sidebar -->
	<aside
		class="fixed left-0 top-0 z-50 h-full w-64 transform bg-black shadow-2xl transition-transform duration-300 lg:translate-x-0 {sidebarOpen
			? 'translate-x-0'
			: '-translate-x-full'}"
	>
		<div class="flex h-full flex-col">
			<!-- Logo -->
			<div class="flex h-16 items-center justify-between border-b border-gray-800 px-6">
				<div class="flex items-center gap-3">
					<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500">
						<span class="text-lg font-bold text-white">F</span>
					</div>
					<span class="text-xl font-bold text-white">Finime Admin</span>
				</div>
				<button
					class="rounded p-1 text-gray-400 hover:bg-neutral-900 hover:text-white lg:hidden"
					on:click={closeSidebar}
				>
					<X class="h-5 w-5" />
				</button>
			</div>

			<!-- Navigation -->
			<nav class="flex-1 space-y-1 p-4">
				{#each [{ key: 'dashboard', icon: BarChart2, label: 'Dashboard' }, { key: 'anime', icon: Film, label: 'Anime' }, { key: 'manga', icon: BookOpen, label: 'Manga' }, { key: 'users', icon: Users, label: 'Users' }, { key: 'system', icon: Settings, label: 'System' }] as item}
					<button
						class="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200"
						class:bg-neutral-900={activeMenu === item.key}
						class:text-white={activeMenu === item.key}
						class:text-gray-400={activeMenu !== item.key}
						class:hover:bg-neutral-900={activeMenu !== item.key}
						class:hover:text-white={activeMenu !== item.key}
						on:click={() => {
							activeMenu = item.key;
							closeSidebar();
						}}
					>
						<svelte:component this={item.icon} class="h-5 w-5" />
						<span>{item.label}</span>
					</button>
				{/each}
			</nav>

			<!-- Bottom Actions -->
			<div class="space-y-2 border-t border-gray-800 p-4">
				<button
					class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-all duration-200 hover:bg-neutral-900 hover:text-white"
					on:click={toggleDark}
				>
					{#if dark}
						<Sun class="h-5 w-5" />
						<span>Light Mode</span>
					{:else}
						<Moon class="h-5 w-5" />
						<span>Dark Mode</span>
					{/if}
				</button>
				<button
					on:click={() => window.history.back()}
					class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-900/20"
				>
					<LogOut class="h-5 w-5" />
					<span>Logout</span>
				</button>
			</div>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="flex-1 lg:ml-64">
		<div
			on:click={closeAllDropdowns}
			on:keydown={(e) => e.key === 'Escape' && closeAllDropdowns()}
			tabindex="0"
			role="button"
			aria-label="Close dropdowns"
		>
			<!-- Topbar -->
			<header class="sticky top-0 z-30 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
				<div class="flex h-16 items-center justify-between px-4 lg:px-6">
					<div class="flex items-center gap-4">
						<!-- Mobile Menu Button -->
						<button
							class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-neutral-900 hover:text-white lg:hidden"
							on:click={toggleSidebar}
						>
							<Menu class="h-5 w-5" />
						</button>

						<!-- Logo for mobile -->
						<div class="flex items-center gap-2 lg:hidden">
							<div class="flex h-6 w-6 items-center justify-center rounded bg-red-500">
								<span class="text-sm font-bold text-white">F</span>
							</div>
							<span class="text-lg font-bold text-white">Finime</span>
						</div>

						<!-- Page Title -->
						<h1 class="hidden text-xl font-semibold text-white sm:block">
							{#if activeMenu === 'dashboard'}Dashboard
							{:else if activeMenu === 'anime'}Anime Management
							{:else if activeMenu === 'manga'}Manga Management
							{:else if activeMenu === 'users'}User Management
							{:else if activeMenu === 'system'}System Information
							{/if}
						</h1>
					</div>

					<div class="flex items-center gap-2 lg:gap-4">
						<!-- Search - Hidden on mobile -->
						<div class="relative hidden sm:block">
							<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<input
								type="text"
								placeholder="Search..."
								bind:value={searchQuery}
								class="h-9 w-48 rounded-lg border border-gray-700 bg-neutral-900 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600 lg:w-64"
							/>
						</div>

						<!-- Notifications -->
						<button
							class="relative rounded-lg p-2 text-gray-400 transition-colors hover:bg-neutral-900 hover:text-white"
						>
							<Bell class="h-5 w-5" />
							<!-- <span class="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500"></span> -->
						</button>

						<!-- User Menu -->
						<div
							class="flex items-center gap-2 rounded-lg border border-gray-700 bg-neutral-900 px-2 py-2 lg:gap-3 lg:px-3"
						>
							<div
								class="flex h-7 w-7 items-center justify-center rounded-full bg-gray-600 lg:h-8 lg:w-8"
							>
								<!-- <User class="h-3 w-3 text-white lg:h-4 lg:w-4" /> -->
								{#if user?.avatar}
									<div class="h-7 w-7 rounded-full bg-white/50 object-cover transition-all duration-300 hover:scale-110">
										<img
											src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={user?.avatar}"
											alt="Profile picture of {user.name}"
											class="h-7 w-7 rounded-full object-cover"
										/>
									</div>
								{:else}
									<div
										class="flex h-4 w-4 items-center justify-center rounded-full border-4 border-red-500/30 bg-white/50 bg-gradient-to-br from-red-500 to-blue-500 text-4xl font-bold text-white"
									>
										{getInitials(user?.name)}
									</div>
								{/if}
							</div>
							<div class="hidden sm:block">
								<div class="text-sm font-medium text-white">Admin</div>
								<div class="text-xs text-gray-400">admin@finime.com</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			<!-- Dashboard Content -->
			<div class="p-4 lg:p-6">
				{#if activeMenu === 'dashboard'}
					<!-- Stats Cards -->
					<div class="mb-6 grid grid-cols-2 gap-4 lg:mb-8 lg:grid-cols-4 lg:gap-6">
						{#each stats as stat}
							<div class="rounded-xl border border-gray-700 bg-neutral-900 p-4 lg:p-6">
								<div class="flex items-center justify-between">
									<div class="min-w-0 flex-1">
										<p class="truncate text-xs font-medium text-gray-400 lg:text-sm">
											{stat.label}
										</p>
										<p class="mt-1 text-xl font-bold text-white lg:mt-2 lg:text-3xl">
											{stat.value}
										</p>
									</div>
									<div class="ml-2 rounded-lg bg-gray-700 p-2 lg:p-3">
										<svelte:component this={stat.icon} class="h-4 w-4 text-white lg:h-6 lg:w-6" />
									</div>
								</div>
								<div class="mt-3 flex items-center gap-1 lg:mt-4 lg:gap-2">
									<TrendingUp class="h-3 w-3 text-green-400 lg:h-4 lg:w-4" />
									<span class="text-xs font-medium text-green-400 lg:text-sm">{stat.change}</span>
									<span class="hidden text-xs text-gray-400 sm:inline lg:text-sm"
										>from last month</span
									>
								</div>
							</div>
						{/each}
					</div>

					<!-- System Status & Recent Activity -->
					<div class="mb-6 grid grid-cols-1 gap-4 lg:mb-8 lg:grid-cols-2 lg:gap-6">
						<!-- System Status -->
						<div class="rounded-xl border border-gray-700 bg-neutral-900 p-4 lg:p-6">
							<div class="mb-4 flex items-center justify-between">
								<h3 class="text-base font-semibold text-white lg:text-lg">System Status</h3>
								<Activity class="h-4 w-4 text-gray-400 lg:h-5 lg:w-5" />
							</div>
							<div class="space-y-3 lg:space-y-4">
								{#each systemStatus as sys}
									<div class="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
										<div class="flex min-w-0 flex-1 items-center gap-2 lg:gap-3">
											{#if sys.status}
												<CheckCircle class="h-4 w-4 flex-shrink-0 text-green-400 lg:h-5 lg:w-5" />
											{:else}
												<XCircle class="h-4 w-4 flex-shrink-0 text-red-400 lg:h-5 lg:w-5" />
											{/if}
											<span class="truncate text-sm font-medium text-white lg:text-base"
												>{sys.name}</span
											>
										</div>
										<div class="flex-shrink-0 text-right">
											<div
												class="text-xs font-medium lg:text-sm {sys.status
													? 'text-green-400'
													: 'text-red-400'}"
											>
												{sys.status ? 'Online' : 'Offline'}
											</div>
											<div class="text-xs text-gray-400">Uptime: {sys.uptime}</div>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<!-- Recent Activity -->
						<div class="rounded-xl border border-gray-700 bg-neutral-900 p-4 lg:p-6">
							<div class="mb-4 flex items-center justify-between">
								<h3 class="text-base font-semibold text-white lg:text-lg">Recent Activity</h3>
								<button class="text-xs text-gray-400 hover:text-white lg:text-sm">View All</button>
							</div>
							<div class="space-y-3 lg:space-y-4">
								{#each recentActivity as activity}
									<div class="flex items-start gap-2 lg:gap-3">
										<div class="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400"></div>
										<div class="min-w-0 flex-1">
											<p class="text-xs text-white lg:text-sm">{activity.message}</p>
											<p class="text-xs text-gray-400">{activity.time}</p>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>

					<!-- Content Management -->
					<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
						<!-- Anime Management -->
						<div class="rounded-xl border border-gray-700 bg-neutral-900">
							<div class="border-b border-gray-700 p-4 lg:p-6">
								<div class="flex items-center justify-between">
									<h3 class="text-base font-semibold text-white lg:text-lg">Anime Management</h3>
									<button
										class="flex items-center gap-1 rounded-lg bg-white px-2 py-1.5 text-xs font-medium text-black transition-colors hover:bg-gray-100 lg:gap-2 lg:px-3 lg:py-2 lg:text-sm"
									>
										<Plus class="h-3 w-3 lg:h-4 lg:w-4" />
										<span class="hidden sm:inline">Add Anime</span>
										<span class="sm:hidden">Add</span>
									</button>
								</div>
							</div>
							<div class="p-4 lg:p-6">
								<div class="space-y-3 lg:space-y-4">
									{#each animeList as anime}
										<div
											class="flex items-center justify-between rounded-lg bg-gray-800/50 p-3 lg:p-4"
										>
											<div class="min-w-0 flex-1">
												<h4 class="truncate text-sm font-medium text-white lg:text-base">
													{anime.title}
												</h4>
												<div
													class="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400 lg:gap-4 lg:text-sm"
												>
													<span>{anime.episodes} episodes</span>
													<span class="hidden sm:inline">•</span>
													<span class="capitalize">{anime.status}</span>
													<span class="hidden sm:inline">•</span>
													<span>⭐ {anime.rating}</span>
												</div>
											</div>
											<div class="ml-2 flex items-center gap-2">
												<span class="hidden text-xs text-gray-400 sm:block lg:text-sm"
													>{anime.views} views</span
												>
												<div class="relative">
													<button
														class="rounded p-1 text-gray-400 hover:bg-gray-600 hover:text-white"
														on:click|stopPropagation={() => toggleDropdown(`anime-${anime.id}`)}
													>
														<MoreVertical class="h-3 w-3 lg:h-4 lg:w-4" />
													</button>

													{#if openDropdowns.has(`anime-${anime.id}`)}
														<div
															class="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-gray-700 bg-neutral-900 shadow-lg"
														>
															<div class="py-1">
																{#each animeActions as action}
																	<button
																		class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-gray-800 {action.danger
																			? 'text-red-400 hover:text-red-300'
																			: 'text-gray-300 hover:text-white'}"
																		on:click={() => handleAction(action.action, anime, 'anime')}
																	>
																		{#if action.icon === 'edit'}
																			<Edit class="h-3 w-3" />
																		{:else if action.icon === 'eye'}
																			<Eye class="h-3 w-3" />
																		{:else if action.icon === 'list'}
																			<List class="h-3 w-3" />
																		{:else if action.icon === 'trash'}
																			<Trash2 class="h-3 w-3" />
																		{/if}
																		{action.label}
																	</button>
																{/each}
															</div>
														</div>
													{/if}
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>

						<!-- Manga Management -->
						<div class="rounded-xl border border-gray-700 bg-neutral-900">
							<div class="border-b border-gray-700 p-4 lg:p-6">
								<div class="flex items-center justify-between">
									<h3 class="text-base font-semibold text-white lg:text-lg">Manga Management</h3>
									<button
										class="flex items-center gap-1 rounded-lg bg-white px-2 py-1.5 text-xs font-medium text-black transition-colors hover:bg-gray-100 lg:gap-2 lg:px-3 lg:py-2 lg:text-sm"
									>
										<Plus class="h-3 w-3 lg:h-4 lg:w-4" />
										<span class="hidden sm:inline">Add Manga</span>
										<span class="sm:hidden">Add</span>
									</button>
								</div>
							</div>
							<div class="p-4 lg:p-6">
								<div class="space-y-3 lg:space-y-4">
									{#each mangaList as manga}
										<div
											class="flex items-center justify-between rounded-lg bg-gray-800/50 p-3 lg:p-4"
										>
											<div class="min-w-0 flex-1">
												<h4 class="truncate text-sm font-medium text-white lg:text-base">
													{manga.title}
												</h4>
												<div
													class="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400 lg:gap-4 lg:text-sm"
												>
													<span>{manga.chapters} chapters</span>
													<span class="hidden sm:inline">•</span>
													<span class="capitalize">{manga.status}</span>
													<span class="hidden sm:inline">•</span>
													<span>⭐ {manga.rating}</span>
												</div>
											</div>
											<div class="ml-2 flex items-center gap-2">
												<span class="hidden text-xs text-gray-400 sm:block lg:text-sm"
													>{manga.readers} readers</span
												>
												<div class="relative">
													<button
														class="rounded p-1 text-gray-400 hover:bg-gray-600 hover:text-white"
														on:click|stopPropagation={() => toggleDropdown(`manga-${manga.id}`)}
													>
														<MoreVertical class="h-3 w-3 lg:h-4 lg:w-4" />
													</button>

													{#if openDropdowns.has(`manga-${manga.id}`)}
														<div
															class="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-gray-700 bg-neutral-900 shadow-lg"
														>
															<div class="py-1">
																{#each mangaActions as action}
																	<button
																		class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-gray-800 {action.danger
																			? 'text-red-400 hover:text-red-300'
																			: 'text-gray-300 hover:text-white'}"
																		on:click={() => handleAction(action.action, manga, 'manga')}
																	>
																		{#if action.icon === 'edit'}
																			<Edit class="h-3 w-3" />
																		{:else if action.icon === 'eye'}
																			<Eye class="h-3 w-3" />
																		{:else if action.icon === 'list'}
																			<List class="h-3 w-3" />
																		{:else if action.icon === 'trash'}
																			<Trash2 class="h-3 w-3" />
																		{/if}
																		{action.label}
																	</button>
																{/each}
															</div>
														</div>
													{/if}
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>

					<!-- User Management -->
					<div class="mt-6 rounded-xl border border-gray-700 bg-neutral-900">
						<div class="border-b border-gray-700 p-4 lg:p-6">
							<div class="flex items-center justify-between">
								<h3 class="text-base font-semibold text-white lg:text-lg">User Management</h3>
								<button
									class="flex items-center gap-1 rounded-lg bg-white px-2 py-1.5 text-xs font-medium text-black transition-colors hover:bg-gray-100 lg:gap-2 lg:px-3 lg:py-2 lg:text-sm"
								>
									<Plus class="h-3 w-3 lg:h-4 lg:w-4" />
									<span class="hidden sm:inline">Add User</span>
									<span class="sm:hidden">Add</span>
								</button>
							</div>
						</div>
						<div class="overflow-x-auto">
							<table class="w-full">
								<thead class="border-b border-gray-700 bg-gray-700/50">
									<tr>
										<th
											class="px-3 py-3 text-left text-xs font-medium text-gray-400 lg:px-6 lg:text-sm"
											>User</th
										>
										<th
											class="hidden px-3 py-3 text-left text-xs font-medium text-gray-400 sm:table-cell lg:px-6 lg:text-sm"
											>Role</th
										>
										<th
											class="px-3 py-3 text-left text-xs font-medium text-gray-400 lg:px-6 lg:text-sm"
											>Status</th
										>
										<th
											class="hidden px-3 py-3 text-left text-xs font-medium text-gray-400 lg:table-cell lg:px-6 lg:text-sm"
											>Joined</th
										>
										<th
											class="hidden px-3 py-3 text-left text-xs font-medium text-gray-400 lg:px-6 lg:text-sm xl:table-cell"
											>Last Login</th
										>
										<th class="px-3 py-3 lg:px-6"></th>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-700">
									{#each userList as user}
										<tr class="hover:bg-gray-700/50">
											<td class="px-3 py-4 lg:px-6">
												<div>
													<div class="text-sm font-medium text-white lg:text-base">{user.name}</div>
													<div class="text-xs text-gray-400 lg:text-sm">{user.email}</div>
												</div>
											</td>
											<td class="hidden px-3 py-4 sm:table-cell lg:px-6">
												<span
													class="inline-flex rounded-full bg-gray-700 px-2 py-1 text-xs font-medium capitalize text-white"
												>
													{user.role}
												</span>
											</td>
											<td class="px-3 py-4 lg:px-6">
												<span
													class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium {getStatusBg(
														user.status
													)} {getStatusColor(user.status)}"
												>
													<div
														class="h-1.5 w-1.5 rounded-full {user.status === 'active'
															? 'bg-green-400'
															: 'bg-red-400'}"
													></div>
													<span class="hidden sm:inline">{user.status}</span>
												</span>
											</td>
											<td
												class="hidden px-3 py-4 text-xs text-gray-400 lg:table-cell lg:px-6 lg:text-sm"
												>{user.joined}</td
											>
											<td
												class="hidden px-3 py-4 text-xs text-gray-400 lg:px-6 lg:text-sm xl:table-cell"
												>{user.lastLogin}</td
											>
											<td class="px-3 py-4 lg:px-6">
												<div class="relative">
													<button
														class="rounded p-1 text-gray-400 hover:bg-gray-600 hover:text-white"
														on:click|stopPropagation={() => toggleDropdown(`user-${user.id}`)}
													>
														<MoreVertical class="h-3 w-3 lg:h-4 lg:w-4" />
													</button>

													{#if openDropdowns.has(`user-${user.id}`)}
														<div
															class="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-gray-700 bg-neutral-900 shadow-lg"
														>
															<div class="py-1">
																{#each userActions as action}
																	<button
																		class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-gray-800 {action.danger
																			? 'text-red-400 hover:text-red-300'
																			: 'text-gray-300 hover:text-white'}"
																		on:click={() => handleAction(action.action, user, 'user')}
																	>
																		{#if action.icon === 'edit'}
																			<Edit class="h-3 w-3" />
																		{:else if action.icon === 'eye'}
																			<Eye class="h-3 w-3" />
																		{:else if action.icon === 'shield'}
																			<Shield class="h-3 w-3" />
																		{:else if action.icon === 'pause'}
																			<Pause class="h-3 w-3" />
																		{:else if action.icon === 'trash'}
																			<Trash2 class="h-3 w-3" />
																		{/if}
																		{action.label}
																	</button>
																{/each}
															</div>
														</div>
													{/if}
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				{:else if activeMenu === 'anime'}
					<div class="space-y-4 lg:space-y-6">
						<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<h2 class="text-xl font-bold text-white lg:text-2xl">Anime Management</h2>
							<button
								class="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-gray-100 sm:w-auto lg:px-4 lg:text-sm"
							>
								<Plus class="h-4 w-4" />
								Add New Anime
							</button>
						</div>

						<!-- Search and Filters -->
						<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<div class="relative max-w-sm flex-1">
								<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
								<input
									type="text"
									placeholder="Search anime..."
									class="h-10 w-full rounded-lg border border-gray-700 bg-neutral-900 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
								/>
							</div>
							<div class="flex gap-2">
								<button
									class="flex items-center gap-2 rounded-lg border border-gray-700 bg-neutral-900 px-3 py-2 text-xs font-medium text-gray-300 transition-colors hover:bg-gray-700"
								>
									<Filter class="h-4 w-4" />
									<span class="hidden sm:inline">Filter</span>
								</button>
							</div>
						</div>

						<!-- Anime List -->
						<div class="rounded-xl border border-gray-700 bg-neutral-900">
							<div class="p-4 lg:p-6">
								<div class="space-y-3 lg:space-y-4">
									{#each animeList as anime}
										<div
											class="flex flex-col gap-3 rounded-lg bg-gray-800/50 p-3 sm:flex-row sm:items-center sm:justify-between lg:p-4"
										>
											<div class="min-w-0 flex-1">
												<h4 class="truncate text-sm font-medium text-white lg:text-base">
													{anime.title}
												</h4>
												<div
													class="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400 lg:gap-4 lg:text-sm"
												>
													<span>{anime.episodes} episodes</span>
													<span class="hidden sm:inline">•</span>
													<span class="capitalize">{anime.status}</span>
													<span class="hidden sm:inline">•</span>
													<span>⭐ {anime.rating}</span>
												</div>
											</div>
											<div class="flex items-center justify-between gap-2 sm:justify-end">
												<span class="text-xs text-gray-400 lg:text-sm">{anime.views} views</span>
												<div class="relative">
													<button
														class="rounded p-1 text-gray-400 hover:bg-gray-600 hover:text-white"
														on:click|stopPropagation={() =>
															toggleDropdown(`anime-page-${anime.id}`)}
													>
														<MoreVertical class="h-3 w-3 lg:h-4 lg:w-4" />
													</button>

													{#if openDropdowns.has(`anime-page-${anime.id}`)}
														<div
															class="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-gray-700 bg-neutral-900 shadow-lg"
														>
															<div class="py-1">
																{#each animeActions as action}
																	<button
																		class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-gray-800 {action.danger
																			? 'text-red-400 hover:text-red-300'
																			: 'text-gray-300 hover:text-white'}"
																		on:click={() => handleAction(action.action, anime, 'anime')}
																	>
																		{#if action.icon === 'edit'}
																			<Edit class="h-3 w-3" />
																		{:else if action.icon === 'eye'}
																			<Eye class="h-3 w-3" />
																		{:else if action.icon === 'list'}
																			<List class="h-3 w-3" />
																		{:else if action.icon === 'trash'}
																			<Trash2 class="h-3 w-3" />
																		{/if}
																		{action.label}
																	</button>
																{/each}
															</div>
														</div>
													{/if}
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{:else if activeMenu === 'manga'}
					<div class="space-y-4 lg:space-y-6">
						<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<h2 class="text-xl font-bold text-white lg:text-2xl">Manga Management</h2>
							<button
								class="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-gray-100 sm:w-auto lg:px-4 lg:text-sm"
							>
								<Plus class="h-4 w-4" />
								Add New Manga
							</button>
						</div>

						<!-- Search and Filters -->
						<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<div class="relative max-w-sm flex-1">
								<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
								<input
									type="text"
									placeholder="Search manga..."
									class="h-10 w-full rounded-lg border border-gray-700 bg-neutral-900 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
								/>
							</div>
							<div class="flex gap-2">
								<button
									class="flex items-center gap-2 rounded-lg border border-gray-700 bg-neutral-900 px-3 py-2 text-xs font-medium text-gray-300 transition-colors hover:bg-gray-700"
								>
									<Filter class="h-4 w-4" />
									<span class="hidden sm:inline">Filter</span>
								</button>
							</div>
						</div>

						<!-- Manga List -->
						<div class="rounded-xl border border-gray-700 bg-neutral-900">
							<div class="p-4 lg:p-6">
								<div class="space-y-3 lg:space-y-4">
									{#each mangaList as manga}
										<div
											class="flex flex-col gap-3 rounded-lg bg-gray-800/50 p-3 sm:flex-row sm:items-center sm:justify-between lg:p-4"
										>
											<div class="min-w-0 flex-1">
												<h4 class="truncate text-sm font-medium text-white lg:text-base">
													{manga.title}
												</h4>
												<div
													class="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400 lg:gap-4 lg:text-sm"
												>
													<span>{manga.chapters} chapters</span>
													<span class="hidden sm:inline">•</span>
													<span class="capitalize">{manga.status}</span>
													<span class="hidden sm:inline">•</span>
													<span>⭐ {manga.rating}</span>
												</div>
											</div>
											<div class="flex items-center justify-between gap-2 sm:justify-end">
												<span class="text-xs text-gray-400 lg:text-sm">{manga.readers} readers</span
												>
												<div class="relative">
													<button
														class="rounded p-1 text-gray-400 hover:bg-gray-600 hover:text-white"
														on:click|stopPropagation={() =>
															toggleDropdown(`manga-page-${manga.id}`)}
													>
														<MoreVertical class="h-3 w-3 lg:h-4 lg:w-4" />
													</button>

													{#if openDropdowns.has(`manga-page-${manga.id}`)}
														<div
															class="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-gray-700 bg-neutral-900 shadow-lg"
														>
															<div class="py-1">
																{#each mangaActions as action}
																	<button
																		class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-gray-800 {action.danger
																			? 'text-red-400 hover:text-red-300'
																			: 'text-gray-300 hover:text-white'}"
																		on:click={() => handleAction(action.action, manga, 'manga')}
																	>
																		{#if action.icon === 'edit'}
																			<Edit class="h-3 w-3" />
																		{:else if action.icon === 'eye'}
																			<Eye class="h-3 w-3" />
																		{:else if action.icon === 'list'}
																			<List class="h-3 w-3" />
																		{:else if action.icon === 'trash'}
																			<Trash2 class="h-3 w-3" />
																		{/if}
																		{action.label}
																	</button>
																{/each}
															</div>
														</div>
													{/if}
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{:else if activeMenu === 'users'}
					<div class="space-y-4 lg:space-y-6">
						<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<h2 class="text-xl font-bold text-white lg:text-2xl">User Management</h2>
							<button
								class="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-gray-100 sm:w-auto lg:px-4 lg:text-sm"
							>
								<Plus class="h-4 w-4" />
								Add New User
							</button>
						</div>

						<!-- Search and Filters -->
						<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<div class="relative max-w-sm flex-1">
								<Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
								<input
									type="text"
									placeholder="Search users..."
									class="h-10 w-full rounded-lg border border-gray-700 bg-neutral-900 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
								/>
							</div>
							<div class="flex gap-2">
								<button
									class="flex items-center gap-2 rounded-lg border border-gray-700 bg-neutral-900 px-3 py-2 text-xs font-medium text-gray-300 transition-colors hover:bg-gray-700"
								>
									<Filter class="h-4 w-4" />
									<span class="hidden sm:inline">Filter</span>
								</button>
							</div>
						</div>

						<!-- User List -->
						<div class="rounded-xl border border-gray-700 bg-neutral-900">
							<div class="p-4 lg:p-6">
								<div class="space-y-3 lg:space-y-4">
									{#each userList as user}
										<div
											class="flex flex-col gap-3 rounded-lg bg-gray-800/50 p-3 sm:flex-row sm:items-center sm:justify-between lg:p-4"
										>
											<div class="min-w-0 flex-1">
												<div class="flex items-center gap-3">
													<div
														class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-600"
													>
														<User class="h-4 w-4 text-white" />
													</div>
													<div class="min-w-0 flex-1">
														<h4 class="truncate text-sm font-medium text-white lg:text-base">
															{user.name}
														</h4>
														<p class="truncate text-xs text-gray-400 lg:text-sm">{user.email}</p>
													</div>
												</div>
												<div
													class="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-400 lg:text-sm"
												>
													<span
														class="inline-flex rounded-full bg-gray-700 px-2 py-1 text-xs font-medium capitalize text-white"
													>
														{user.role}
													</span>
													<span
														class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium {getStatusBg(
															user.status
														)} {getStatusColor(user.status)}"
													>
														<div
															class="h-1.5 w-1.5 rounded-full {user.status === 'active'
																? 'bg-green-400'
																: 'bg-red-400'}"
														></div>
														{user.status}
													</span>
												</div>
											</div>
											<div class="flex items-center justify-between gap-2 sm:justify-end">
												<div class="text-xs text-gray-400 lg:text-sm">
													<div>Joined: {user.joined}</div>
													<div>Last: {user.lastLogin}</div>
												</div>
												<div class="relative">
													<button
														class="rounded p-1 text-gray-400 hover:bg-gray-600 hover:text-white"
														on:click|stopPropagation={() => toggleDropdown(`user-page-${user.id}`)}
													>
														<MoreVertical class="h-3 w-3 lg:h-4 lg:w-4" />
													</button>

													{#if openDropdowns.has(`user-page-${user.id}`)}
														<div
															class="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-gray-700 bg-neutral-900 shadow-lg"
														>
															<div class="py-1">
																{#each userActions as action}
																	<button
																		class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-gray-800 {action.danger
																			? 'text-red-400 hover:text-red-300'
																			: 'text-gray-300 hover:text-white'}"
																		on:click={() => handleAction(action.action, user, 'user')}
																	>
																		{#if action.icon === 'edit'}
																			<Edit class="h-3 w-3" />
																		{:else if action.icon === 'eye'}
																			<Eye class="h-3 w-3" />
																		{:else if action.icon === 'shield'}
																			<Shield class="h-3 w-3" />
																		{:else if action.icon === 'pause'}
																			<Pause class="h-3 w-3" />
																		{:else if action.icon === 'trash'}
																			<Trash2 class="h-3 w-3" />
																		{/if}
																		{action.label}
																	</button>
																{/each}
															</div>
														</div>
													{/if}
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{:else if activeMenu === 'system'}
					<div class="space-y-4 lg:space-y-6">
						<h2 class="text-xl font-bold text-white lg:text-2xl">System Information</h2>
						<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
							<div class="rounded-xl border border-gray-700 bg-neutral-900 p-4 lg:p-6">
								<h3 class="mb-4 text-base font-semibold text-white lg:text-lg">System Health</h3>
								<div class="space-y-3 lg:space-y-4">
									{#each systemStatus as sys}
										<div class="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
											<div class="flex min-w-0 flex-1 items-center gap-2 lg:gap-3">
												{#if sys.status}
													<CheckCircle class="h-4 w-4 flex-shrink-0 text-green-400 lg:h-5 lg:w-5" />
												{:else}
													<XCircle class="h-4 w-4 flex-shrink-0 text-red-400 lg:h-5 lg:w-5" />
												{/if}
												<span class="truncate text-sm font-medium text-white lg:text-base"
													>{sys.name}</span
												>
											</div>
											<div class="flex-shrink-0 text-right">
												<div
													class="text-xs font-medium lg:text-sm {sys.status
														? 'text-green-400'
														: 'text-red-400'}"
												>
													{sys.status ? 'Online' : 'Offline'}
												</div>
												<div class="text-xs text-gray-400">Uptime: {sys.uptime}</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
							<div class="rounded-xl border border-gray-700 bg-neutral-900 p-4 lg:p-6">
								<h3 class="mb-4 text-base font-semibold text-white lg:text-lg">System Details</h3>
								<div class="space-y-3 text-xs lg:text-sm">
									<div class="flex justify-between">
										<span class="text-gray-400">Server:</span>
										<span class="font-mono text-white">Vercel ( ServerLess )</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-400">Runtime:</span>
										<span class="font-mono text-white">Bun</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-400">Database:</span>
										<span class="font-mono text-white">MongoDB</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-400">Storage:</span>
										<span class="font-mono text-white">Cloud Storage</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-400">Uptime:</span>
										<span class="font-mono text-white">99.99%</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-400">Last Deploy:</span>
										<span class="font-mono text-white">2025-01-24</span>
									</div>
								</div>
							</div>
						</div>

						<!-- Additional System Info -->
						<div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
							<div class="rounded-xl border border-gray-700 bg-neutral-900 p-4 lg:p-6">
								<h3 class="mb-3 text-sm font-semibold text-white lg:text-base">Performance</h3>
								<div class="space-y-2 text-xs lg:text-sm">
									<div class="flex justify-between">
										<span class="text-gray-400">CPU Usage:</span>
										<span class="text-green-400">23%</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-400">Memory:</span>
										<span class="text-yellow-400">67%</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-400">Disk:</span>
										<span class="text-green-400">45%</span>
									</div>
								</div>
							</div>
							<div class="rounded-xl border border-gray-700 bg-neutral-900 p-4 lg:p-6">
								<h3 class="mb-3 text-sm font-semibold text-white lg:text-base">Network</h3>
								<div class="space-y-2 text-xs lg:text-sm">
									<div class="flex justify-between">
										<span class="text-gray-400">Bandwidth:</span>
										<span class="text-green-400">1.2 GB/s</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-400">Requests/min:</span>
										<span class="text-blue-400">27</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-400">Response Time:</span>
										<span class="text-green-400">45ms</span>
									</div>
								</div>
							</div>
							<div class="rounded-xl border border-gray-700 bg-neutral-900 p-4 lg:p-6">
								<h3 class="mb-3 text-sm font-semibold text-white lg:text-base">Security</h3>
								<div class="space-y-2 text-xs lg:text-sm">
									<div class="flex justify-between">
										<span class="text-gray-400">SSL Status:</span>
										<span class="text-green-400">Active</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-400">Firewall:</span>
										<span class="text-green-400">Enabled</span>
									</div>
									<div class="flex justify-between">
										<span class="text-gray-400">Last Scan:</span>
										<span class="text-blue-400">2h ago</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</main>
</div>
