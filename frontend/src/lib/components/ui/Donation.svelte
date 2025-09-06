<script lang="ts">
	import { onMount } from 'svelte';
	import { X } from '@lucide/svelte';
	import { runtimeData } from '$lib/stores/runtime';

	let showPopup = false;
	let isHovering = false;

	onMount(() => {
		if ($runtimeData["donation"] !== 'false') {
			setTimeout(() => (showPopup = true), 1500);
		}
	});

	function submitButton() {
		// localStorage.setItem('donation', 'false');
		$runtimeData["donation"] = "false";
	}

	function closePopup() {
		showPopup = false;
		$runtimeData["donation"] = "false";
		// localStorage.setItem('donation', 'false');
	}
</script>

{#if showPopup}
	<div
		class="fixed inset-0 z-20 flex items-center justify-center p-4"
		style="background: hsla(var(--background)/0.8); backdrop-filter: blur(8px)"
	>
		<div
			class="relative w-full max-w-md rounded-xl border"
			style="background: hsl(var(--popover)); border-color: hsl(var(--border)); box-shadow: 0 20px 40px -10px hsla(var(--foreground)/0.1)"
		>
			<button
				on:click={closePopup}
				on:mouseenter={() => (isHovering = true)}
				on:mouseleave={() => (isHovering = false)}
				class="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border"
				style="background: hsl(var(--background)); border-color: hsl(var(--border))"
				aria-label="Close donation popup"
			>
				<X class="h-4 w-4 transition-all duration-300" style="color: hsl(var(--foreground))" />
			</button>

			<div class="p-6">
				<div class="space-y-4">
					<div class="flex items-center gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-lg"
							style="background: purple"
						>
							<img src="/logo.gif" alt="" />
						</div>
						<h3 class="text-lg font-semibold" style="color: hsl(var(--foreground))">
							Hmmm ngapain?
						</h3>
					</div>

					<p class="text-sm leading-relaxed" style="color: hsl(var(--muted-foreground))">
						Kenapa buka aplikasi ini? <span class="font-bold text-fuchsia-500">Capek?</span>
						Hehe, tenang aja… semua orang butuh tempat buat kabur <span class="font-bold text-fuchsia-500">sesaat</span>. Kalau hidup lagi berat, biar
						anime yang nemenin kamu hari ini 🙂
					</p>

					<div class="flex w-full gap-3 pt-2">
						<a
							on:click={submitButton}
							href="https://saweria.co/finime"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
							style="background: hsl(var(--primary)); color: hsl(var(--primary-foreground))"
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"
								></path>
							</svg>
							Saweria
						</a>
						<a
							on:click={submitButton}
							href="/chat-ai/assistant"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center ml-auto justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-purple-500 transition-all duration-200 hover:scale-[1.02]"
							style="background: hsl(var(--secondary)); border: 1px solid hsl(var(--border))"
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2a10 10 0 1 0 10 10A4 4 0 0 1 12 2z"></path>
								<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-7 3 4 4 0 0 1-6-6 4 4 0 0 1 3-7z"></path>
							</svg>
							Butuh Teman Ngobrol?
						</a>
					</div>

					<p class="text-xs" style="color: hsl(var(--muted-foreground))">
						Every contribution makes a <span class="font-bold text-cyan-500">difference</span>.
						Thank you for your support!
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}
