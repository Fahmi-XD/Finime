<script lang="ts">
	import { scale } from 'svelte/transition';
  import { runtimeData } from '$lib/stores/runtime';

	import Home from '$lib/components/mobile/Home.svelte';
	import Anime from '$lib/components/mobile/Anime.svelte';
	import Manga from '$lib/components/mobile/Manga.svelte';
	import Other from '$lib/components/mobile/Other.svelte';

	import Donation from '$lib/components/ui/Donation.svelte';
	import Threejs from '$lib/components/models/Threejs.svelte';

	import { navigate, history as his } from '$lib/stores/history';

	const tabs = {
		Home: Home,
		Anime: Anime,
		Manga: Manga,
		Other: Other
	};

  let isModel: boolean = $runtimeData['donation'] != 'false';
	let tabsCache: Partial<Record<keyof typeof tabs, any>> = {};
	tabsCache['Home'] = tabs.Home;

	$: currentTab = $navigate[1];
	$: tabsCache[currentTab as keyof typeof tabs] = tabs[currentTab as keyof typeof tabs];
  // $: if ($runtimeData['donation'] == 'false') {
	// 	console.log("Anjay 2")
  //   setTimeout(() => {
  //     isModel = false;
  //   }, 1_000);
	// }

	let time: NodeJS.Timeout;

	async function onPop(e: PopStateEvent) {
		if (time) clearTimeout(time);

		time = setTimeout(() => {
			let current = $his.pop();
			if (current) {
				if (current[1] == currentTab) current = $his.pop();
				console.log('Tombol kembali ditekan', current);
				navigate.set(['back', current?.[1] || 'Home']);
			} else {
				navigate.set(['back', 'Home']);
			}
		}, 100);
	}
</script>

<Donation />
{#if isModel}
  <div class="-bottom-25 pointer-events-none fixed -left-15 z-[21]">
    <Threejs />
  </div>
{/if}
<main
	class="relative block h-screen w-full overflow-hidden will-change-auto"
	in:scale={{ duration: 200, start: 1.01 }}
>
	{#each Object.entries(tabsCache) as [key, component], i (i)}
		<section
			class="absolute inset-0 block h-full w-full overflow-x-hidden bg-black transition-opacity duration-200 {key ==
			currentTab
				? 'pointer-events-auto z-10 overflow-y-auto opacity-100'
				: 'pointer-events-none z-0 overflow-y-hidden opacity-0'}"
		>
			<svelte:component this={component} />
		</section>
	{/each}
</main>
