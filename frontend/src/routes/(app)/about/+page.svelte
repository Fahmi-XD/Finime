<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import LoadingElements from '$lib/components/ui/LoadingElements.svelte';
	import { mode as modeStore } from '$lib/stores/mode';

	interface Contributor {
		login: string;
		avatar_url: string;
		html_url: string;
		contributions: number;
	}

	let contributors: Contributor[] = [];
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			const response = await axios.get<Contributor[]>(
				'https://api.github.com/repos/SyntxFlow/Finime/contributors'
			);
			contributors = response.data;
		} catch (err) {
			error = 'Failed to fetch contributors.';
		} finally {
			loading = false;
		}
	});
</script>

<section class="relative min-h-screen flex flex-col items-center justify-center {$modeStore === 'colorful' ? 'bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden py-16' : 'bg-black overflow-hidden py-16'}">
	<!-- Floating Gradient Orbs -->
	{#if $modeStore === 'colorful'}
		<div class="absolute top-10 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
		<div class="absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
		<div class="absolute bottom-40 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
	{/if}

	<div class="relative z-10 w-full max-w-5xl mx-auto px-6 py-16 text-center">
		<h1 class="text-5xl font-extrabold mb-4 {$modeStore === 'colorful' ? 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg' : 'text-red-500'}">About Finime</h1>
		<p class="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-300">
			Finime adalah platform open-source terbaik untuk membaca manga, manhwa, dan menonton anime tanpa iklan. Bergabunglah dengan komunitas dan nikmati pengalaman membaca yang bebas gangguan! 🎉📖
		</p>

		<h2 class="mt-16 text-4xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent mb-6">Contributors</h2>

		{#if loading}
			<LoadingElements />
		{:else if error}
			<p class="mt-6 font-semibold text-red-500">{error}</p>
		{:else}
			<div class="mx-auto mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
				{#each contributors as contributor}
					<a
						href={contributor.html_url}
						target="_blank"
						class="group flex w-full flex-col items-center rounded-2xl bg-[hsl(var(--background))] {$modeStore === 'colorful' ? 'backdrop-blur-md' : ''} p-6 shadow-xl border border-white/20 hover:bg-[hsl(var(--background))] hover:shadow-2xl transition-all duration-300"
					>
						<img
							src={contributor.avatar_url}
							alt={contributor.login}
							class="h-20 w-20 rounded-full border-4 border-gradient-to-r from-red-500 to-blue-500 transition-all group-hover:scale-105 group-hover:border-purple-500"
						/>
						<p class="mt-3 text-lg font-semibold text-white group-hover:text-red-400">
							{contributor.login}
						</p>
						<p class="text-sm text-gray-300">
							{contributor.contributions} contributions
						</p>
					</a>
				{/each}
			</div>
		{/if}

		<!-- Community Section -->
		<div class="relative overflow-hidden py-32 mt-24 rounded-2xl bg-[hsl(var(--background))] {$modeStore === 'colorful' ? 'backdrop-blur-md' : ''} border border-white/20 shadow-2xl">
			<div class="absolute inset-0 {$modeStore === 'colorful' ? 'bg-gradient-to-br from-red-500 via-blue-500 to-purple-500 opacity-20 blur-lg' : ''}"></div>
			<div class="relative z-10 mx-auto max-w-3xl px-4 text-center">
				<img class="mx-auto h-auto w-[120px] mb-6 rounded-xl shadow-lg" src="/logo.gif" alt="Finime Logo" />
				<h1 class="text-4xl font-extrabold mb-4 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
					Welcome to the Finime Community
				</h1>
				<p class="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
					Finime bukan hanya tempat membaca manga online, tetapi juga komunitas penggemar yang aktif! Bergabunglah dengan kami untuk berdiskusi, berbagi rekomendasi, dan mendapatkan update terbaru tentang manga favoritmu.
				</p>
				<div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="/about"
						class="rounded-full bg-gradient-to-r from-red-500 to-pink-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
					>
						About Us
					</a>
					<a
						href="https://chat.whatsapp.com/CkXA34zc4c9Kw3KOOMPuy1"
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						Join WhatsApp Group
					</a>
				</div>
			</div>
			<div class="animate-bounce-slow absolute left-1/4 top-1/3 h-24 w-24 rounded-full bg-red-500 opacity-30 blur-3xl"></div>
			<div class="animate-float absolute bottom-1/3 right-1/4 h-16 w-16 rounded-full bg-blue-500 opacity-30 blur-2xl"></div>
		</div>
	</div>
</section>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	@keyframes bounce-slow {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}
	
	@keyframes float {
		0%, 100% { transform: translateY(0) translateX(0); }
		25% { transform: translateY(-10px) translateX(10px); }
		50% { transform: translateY(10px) translateX(-10px); }
		75% { transform: translateY(-5px) translateX(5px); }
	}
	
	.animate-bounce-slow {
		animation: bounce-slow 5s infinite ease-in-out;
	}
	.animate-float {
		animation: float 8s infinite ease-in-out;
	}
</style>
