<script lang="ts">
  import {
    BookOpen,
    Film,
    Edit,
    Mail,
    Shield,
    BadgeCheckIcon,
    History,
    Star,
    ArrowLeft,
    CheckIcon,
    LinkIcon
  } from "@lucide/svelte";
  import { PUBLIC_API } from "$env/static/public";
  import { getInitials } from "$lib";

	export let user: any;
  export let statistics: any = { anime: [], manga: [] };
  export let badges: any[] = [];
  export let visitor: boolean = false;

  let isCopy = false;
</script>

<div
	class="overflow-hidden rounded-2xl border border-white/10 bg-[hsl(var(--background))] shadow-xl backdrop-blur-md"
>
  <div class="mb-4 flex items-center justify-between px-4">
    <button aria-label="Back" class="text-2xl text-white" on:click={() => window.history.back()}>
      <ArrowLeft size={24} />
    </button>
    <button class="rounded-full bg-white px-5 py-1.5 text-sm font-medium text-black">
      Profile
    </button>
  </div>

	<div class="flex flex-col md:flex-row">
		<div class="flex w-full flex-col bg-gradient-to-b from-red-500/10 to-transparent p-8 md:w-1/2">
			<div class="relative flex w-auto">
				{#if user.banner && user.banner.includes('mp4')}
					<video class="h-[160px] w-full rounded-xl object-cover" autoplay loop muted playsinline>
						<source src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={user.banner}" type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				{:else if user.banner}
					<img
						src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={user.banner}"
						alt="Banner"
						class="h-[160px] w-full rounded-xl object-cover"
					/>
				{:else}
					<img
						src="/images/finime-poster.png"
						alt="Banner"
						class="h-[160px] w-full rounded-xl object-cover"
					/>
				{/if}
				<div class="absolute -bottom-20 left-0 flex h-auto w-auto overflow-hidden rounded-full">
					{#if user.avatar}
						<img
							src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={user.avatar}"
							alt="Profile picture of {user.name}"
							class="h-32 w-32 rounded-full border-4 border-red-500/30 bg-white/50 object-cover transition-all duration-300 hover:scale-110"
						/>
					{:else}
						<div
							class="flex h-32 w-32 items-center justify-center rounded-full border-4 border-red-500/30 bg-white/50 bg-gradient-to-br from-red-500 to-blue-500 text-4xl font-bold text-white"
						>
							{getInitials(user.name)}
						</div>
					{/if}
				</div>
			</div>

			<div class="mt-24 flex items-center gap-3">
				<h1 class="text-2xl font-bold tracking-tight">
					{user.name}
				</h1>
				{#if user.role === 'ADMIN' || user.isVerify}
					<BadgeCheckIcon fill="#1DA1F2" />
				{/if}
			</div>
			<p class="mt-1 text-sm text-gray-400">
				@{user.username}
				{user?.pronoun ? `(${user.pronoun})` : ''}
			</p>

			<div class="mt-6 w-full space-y-3 text-left">
				<div class="flex items-start">
					<div class="mt-0.5 flex-shrink-0">
						<div
							class="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10 text-red-500"
						>
							<Mail size={12} />
						</div>
					</div>
					<p class="ml-2 break-all text-sm">{user.email}</p>
				</div>
				<div class="flex items-center gap-1">
					<div class="flex-shrink-0">
						<div
							class="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10 text-red-500"
						>
							<Shield size={12} />
						</div>
					</div>
					<div class="flex items-center">
						<span class="rounded bg-blue-500/10 px-2 text-xs font-bold text-blue-400">
							{user.role}
						</span>
					</div>
				</div>
				<ul class="flex flex-wrap gap-2">
					{#each badges as badge}
						<li class="flex items-center gap-1 border-l-4 border-red-500 bg-white/20 px-1">
							<div class="flex-shrink-0 items-center">
								<div class="flex h-5 w-5 items-center justify-center rounded-full text-white">
									<svelte:component this={badge.icon} size={15} />
								</div>
							</div>
							<div class="flex items-center">
								<span class="rounded text-[11px] font-bold text-white">
									{badge.name}
								</span>
							</div>
						</li>
					{/each}
				</ul>
			</div>

      {#if !visitor}
        <div class="mt-8 w-full">
          <a
            href="/settings"
            class="block w-full rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 py-2 text-center font-bold text-white transition-all hover:from-red-600 hover:to-pink-700"
          >
            <span class="flex items-center justify-center">
              <Edit size={16} class="mr-2" />
              Settings
            </span>
          </a>
        </div>
      {/if}
		</div>

		<div
			class="w-full border-t border-white/10 bg-[hsl(var(--background))] p-8 md:w-2/3 md:border-l md:border-t-0"
		>
			<div class="mb-8">
				<h2 class="mb-6 border-b border-white/20 pb-2 text-xl font-semibold">{visitor ? "" : "Your "}Statistics</h2>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div
						class="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-sm"
					>
						<div class="flex items-center">
							<div class="mr-4 rounded-lg bg-blue-500/10 p-2 text-blue-500">
								<Film size={20} />
							</div>
							<div>
								<p class="text-sm font-medium text-gray-400">Anime Watched</p>
								<p class="mt-1 text-2xl font-bold">{(visitor ? user : statistics).anime.length}</p>
							</div>
						</div>
					</div>
					<div
						class="rounded-xl border border-purple-500/20 bg-purple-500/10 p-4 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-sm"
					>
						<div class="flex items-center">
							<div class="mr-4 rounded-lg bg-purple-500/10 p-2 text-purple-500">
								<BookOpen size={20} />
							</div>
							<div>
								<p class="text-sm font-medium text-gray-400">Manga Read</p>
								<p class="mt-1 text-2xl font-bold">{(visitor ? user : statistics).manga.length}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mb-2 border-t border-white/20 pt-6">
				<h2 class="mb-3 border-b border-white/20 pb-2 text-xl font-semibold">Bio</h2>
				<div class="flex">
					<p class="text-[15px] opacity-70">{user.bio || 'No bio'}</p>
				</div>
			</div>

			{#if !visitor}
        <div class="border-t border-white/20 pt-6">
          <h2 class="mb-6 border-b border-white/20 pb-2 text-xl font-semibold">Quick Actions</h2>
          <div class="grid grid-cols-2 gap-4">
            <button
              class="flex h-24 w-full flex-col items-center justify-center rounded-xl border-2 border-white/10 bg-white/5 transition-all hover:bg-[hsl(var(--background))]"
            >
              <History size={24} class="mb-2 text-blue-500" />
              <span class="font-bold text-white">History</span>
            </button>
            <button
              class="flex h-24 w-full flex-col items-center justify-center rounded-xl border-2 border-white/10 bg-white/5 transition-all hover:bg-[hsl(var(--background))]"
            >
              <Star size={24} class="mb-2 text-yellow-400" />
              <span class="font-bold text-white">Favorite</span>
            </button>
          </div>
        </div>
      {/if}
		</div>
	</div>
</div>

<div class="fixed bottom-4 right-4 z-10 flex items-center justify-center bg-red-500 p-4 w-[50px] h-[50px] rounded-full">
	<button on:click={() => {
		if (!isCopy) {
			const thisLink = window.location.origin + "/user/" + user.username;
			navigator.clipboard.writeText(thisLink || '');
			isCopy = true;
			setTimeout(() => {
				isCopy = false;
			}, 2000);
		}
	}} disabled={isCopy} class="flex items-center justify-center disabled:cursor-not-allowed">
		{#if isCopy}
			<CheckIcon class="text-white" size={24} />
		{:else}
			<LinkIcon class="text-white" size={24} />
		{/if}
	</button>
</div>