<script lang="ts">
	import { BadgeCheckIcon, Shield } from '@lucide/svelte';
	import { PUBLIC_API } from '$env/static/public';
	import { UserMobileClient } from '$lib/api/clients/mobile/userClient';
	import { MAX_SEGMENT } from '$lib/config/app';
	import { runtimeData } from '$lib/stores/runtime';
	import { onMount, onDestroy } from 'svelte';

	import { checkOnline } from '$lib';

	import SkeletonLoading from '$lib/components/ui/SkeletonLoading.svelte';

	import type { User } from '$lib/api/types/mobile/usersType';

	export let first: boolean;
	export let isLoading: boolean;
  export let query: string = "";
  export let oldQueryUsers: string = "";
  export let searchQueryUsers: string = "";
  export let htmlInputElement: HTMLInputElement;

	let usersList: User[] = [];
	let segmentList: User[] = [];
  let lastObserved: Element | undefined;
	let obs: IntersectionObserver;
  let isLoadingInter = false;

	let usersListElement: HTMLUListElement;

  $: {
		if (usersListElement || isLoadingInter) {
      const children = usersListElement.children;
      const last = children[children.length - 1];
      if (last && last !== lastObserved) {
        // if (lastObserved) obs.unobserve(lastObserved);
				if (obs) obs.observe(last);
        lastObserved = last;
      }
    };
	}

  $: {
    if (searchQueryUsers != oldQueryUsers) {
      searchUsersQuery();
    }
  }
  
  async function searchUsersQuery() {
		if (query || query.trim() != '') {
			lastObserved = undefined;
			htmlInputElement.blur();
			first = false;
			isLoading = true;
			const response = await UserMobileClient.getUsersByQuery(query);
			usersList = response.users || [];
			segmentList = (response.users || []).slice(0, MAX_SEGMENT);
			$runtimeData['search.users.segment'] = segmentList;
			$runtimeData['search.users.cache'] = response.users;
			isLoading = false;
			oldQueryUsers = query;
		}
	}

  function handleIntersect(entries: IntersectionObserverEntry[]) {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				// stop observing the old target
				obs.unobserve(entry.target);
				loadMoreSegment();
			}
		}
	}

	function loadMoreSegment() {
		if (!isLoadingInter) {
			isLoadingInter = true;
			segmentList = usersList.slice(
				0,
				Math.min(segmentList.length + MAX_SEGMENT, usersList.length)
			);
			$runtimeData['search.users.segment'] = segmentList;
			setTimeout(() => {
				isLoadingInter = false;
			}, 100);
		}
	}

	onMount(() => {
    obs = new IntersectionObserver(handleIntersect, { threshold: 1 });

		if ($runtimeData['search.users.cache'] && $runtimeData['search.users.cache']?.length) {
			first = false;
			usersList = $runtimeData['search.users.cache'];
			if ($runtimeData['search.users.segment'] && $runtimeData['search.users.segment']?.length) {
				segmentList = $runtimeData['search.users.segment'];
			}
		}
	});

  onDestroy(() => {
		if (obs) obs.disconnect();
	});
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
		<ul class="space-y-4" bind:this={usersListElement}>
			{#each usersList as user}
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
								<span>Anime: {user.anime?.length}</span>
								<span>Manga: {user.manga?.length}</span>
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
