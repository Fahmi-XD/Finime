<script lang="ts">
	import { BadgeCheckIcon, Shield } from '@lucide/svelte';
	import { PUBLIC_API } from '$env/static/public';

	import { checkOnline } from '$lib';

	import SkeletonLoading from '$lib/components/ui/SkeletonLoading.svelte';

	export let users: any = [];
	export let isLoading: boolean;
</script>

<div>
	<h1 class="mb-5 text-lg font-semibold opacity-70">Relevant result</h1>

	{#if isLoading}
		<ul class="space-y-4">
			{#each new Array(5).fill(1) as user}
				<li
					class="flex items-start space-x-4 rounded-lg p-4 shadow transition-shadow hover:shadow-md"
				>
					<!-- Avatar -->
					<SkeletonLoading type="image" className="!h-12 !w-12 !rounded-full" />

					<!-- User Info -->
					<div class="flex-1">
						<div class="flex items-center space-x-2">
							<SkeletonLoading type="text" className="!w-12 !h-4 !rounded-full" />
							<SkeletonLoading type="text" className="!w-12 !h-4 !rounded-full" />
						</div>

						<SkeletonLoading type="text" className="!w-18 !h-3 mt-1" />

						<SkeletonLoading type="text" className="!w-full !h-7 mt-1" />

						<div class="mt-2 flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
							<SkeletonLoading type="text" className="!w-12 !h-4 !rounded-full" />
							<SkeletonLoading type="text" className="!w-12 !h-4 !rounded-full" />
							<SkeletonLoading type="text" className="!w-12 !h-4 !rounded-full" />
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{:else}
		<ul class="space-y-4">
			{#each users as user}
				<li class="shadow transition-shadow hover:shadow-md">
					<a class="flex items-start space-x-4 rounded-lg p-4" href="/user/{user.username}">
						<!-- Avatar -->
						<div class="relative block">
							<img
								src={`${PUBLIC_API}/api/v1/proxy-media?mediaUrl=${user.avatar}` ||
									'/web-app-manifest-512x512.png'}
								alt={user.username ?? 'user avatar'}
								class="mt-1 h-12 w-12 rounded-full object-cover"
							/>
              <span class="{user?.lastSeen ? checkOnline(user.lastSeen) ? "bg-green-500" : "bg-neutral-500" : "bg-neutral-500"} rounded-full w-4 h-4 absolute bottom-1 border-2 border-black -right-1 z-10 block"></span>
						</div>

						<!-- User Info -->
						<div class="flex-1">
							<div class="flex items-center space-x-2">
								<h2 class="text-sm font-semibold text-gray-900 dark:text-gray-100">{user.name}</h2>
								{#if user.isVerify}
									<BadgeCheckIcon size={17} fill="#1DA1F2" />
								{/if}
								<Shield size={17} />
							</div>

							<p class="text-xs text-gray-500 dark:text-gray-400">@{user.username}</p>

							<p class="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
								{user.bio ?? 'No bio available.'}
							</p>

							<div class="mt-2 flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
								<span>Anime: {user.anime.length}</span>
								<span>Manga: {user.manga.length}</span>
								{#if user.badges?.length}
									<span>Badges: {user.badges.length}</span>
								{/if}
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
