<script lang="ts">
	import type { Component } from 'svelte';
	import {
		type IconProps,
		Gavel,
		Star,
		Languages,
		Gamepad,
		Annoyed,
		Bitcoin,
		ArrowLeft,
		Heart,
		TriangleAlertIcon,
		Info,
		Github,
		Hexagon,
		ChartArea,
		RocketIcon
	} from '@lucide/svelte';

	import { scale, crossfade } from 'svelte/transition';

	type Badge = {
		id: string;
		label: string;
		description: string;
		icon: Component<IconProps, {}, ''>;
		bgColor: string;
		labelColor: string;
		textColor: string;
	};

	const badges: Badge[] = [
		{
			id: 'moderator',
			label: 'Moderator',
			description: 'Tukang bersih-bersih komen dan tangan kanan atmin.',
			icon: Gavel,
			bgColor: 'bg-blue-200',
			labelColor: 'text-blue-200',
			textColor: 'text-blue-800'
		},
		{
			id: 'superadmin',
			label: 'Super Admin',
			description: 'Aku raja kau member, waspadalah jika atmin datang.',
			icon: Star,
			bgColor: 'bg-red-200',
			labelColor: 'text-red-200',
			textColor: 'text-red-800'
		},
		{
			id: 'translator',
			label: 'Translator',
			description: 'King japanese, kontribusi atas penerjemah anime.',
			icon: Languages,
			bgColor: 'bg-green-200',
			labelColor: 'text-green-200',
			textColor: 'text-green-800'
		},
		{
			id: 'nolep',
			label: 'Nolep',
			description: 'Pencapaian nonton anime 10+ perhari ( Nganggur jir )',
			icon: Gamepad,
			bgColor: 'bg-yellow-200',
			labelColor: 'text-yellow-200',
			textColor: 'text-yellow-800'
		},
		{
			id: 'karbit',
			label: 'Karbit',
			description: 'Suka ngeklem waifu dari setiap anime tanpa menontonnya sampai tamat.',
			icon: Annoyed,
			bgColor: 'bg-purple-200',
			labelColor: 'text-purple-200',
			textColor: 'text-purple-800'
		},
		{
			id: 'kripto',
			label: 'Raja kripto',
			description: 'Mekleren lu warna apa bos 🤪',
			icon: Bitcoin,
			bgColor: 'bg-cyan-200',
			labelColor: 'text-cyan-200',
			textColor: 'text-cyan-800'
		},
		{
			id: 'waifu',
			label: 'Istri: [char]',
			description: 'Waifunya user, waifumu waifu kita juga, satu untuk semua',
			icon: Heart,
			bgColor: 'bg-indigo-200',
			labelColor: 'text-indigo-200',
			textColor: 'text-indigo-800'
		}
	];
</script>

<div
	class="bg-vanta mx-auto h-screen max-w-3xl overflow-x-hidden p-[20px] pb-[80px] text-white"
	in:scale={{ duration: 200, start: 0.95 }}
>
	<div class="mb-6 flex items-center justify-between">
		<button on:click={() => window.history.back()} class="rounded-full p-2">
			<ArrowLeft size={20} />
		</button>
		<h1 class="text-lg font-bold">Info</h1>
		<div class="w-8"></div>
	</div>

	<div class="mb-8 mt-5">
		<h2 class="mb-2 text-lg font-semibold">Tentang Aplikasi Finime</h2>
		<p class="opacity-60 text-sm">
			Finime adalah platform mobile yang dirancang untuk pecinta anime, menyediakan streaming cepat,
			interaksi komunitas, dan fitur kustom. Salah satu fitur unggulan adalah sistem badge pengguna
			yang memberikan pengakuan peran dan tingkatan akses.
		</p>
	</div>

	<div>
		<h2 class="mb-4 text-lg font-semibold">List Badge</h2>
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
			{#each badges as badge}
				<div
					class="flex items-start space-x-4 rounded-2xl p-1 shadow-sm transition hover:shadow-md"
				>
					<div class={`rounded-full p-3 ${badge.bgColor}`}>
						<svelte:component this={badge.icon} class={`h-6 w-6 ${badge.textColor}`} />
					</div>
					<div>
						<h3 class="text-lg font-medium">
							{badge.label}
						</h3>
						<p class="text-sm opacity-60">
							{badge.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="border-l-3 mt-10 border-yellow-500 pl-5">
		<TriangleAlertIcon font-size={35} color="var(--color-yellow-500)" />
		<p class="mt-2 opacity-70 text-sm">
			Harap diperhatikan bahwa konten anime di aplikasi ini bersumber dari proses pengambilan
			(scraping) situs pihak ketiga. Kami tidak memiliki lisensi resmi untuk menayangkan konten
			tersebut.
		</p>
	</div>

	<div class="border-l-3 mt-10 border-cyan-500 pl-5">
		<Info font-size={35} color="var(--color-cyan-500)" />
		<p class="mt-2 opacity-70 text-sm">
			Untuk pengalaman menonton yang sepenuhnya legal, kami menyarankan Anda berkunjung ke layanan
			resmi seperti Crunchyroll, Netflix, atau platform lokal berlisensi. Dengan begitu, Anda turut
			mendukung para kreator dan industri anime.
		</p>
	</div>

	<div class="border-l-3 mt-10 border-yellow-500 pl-5">
		<TriangleAlertIcon font-size={35} color="var(--color-yellow-500)" />
		<ul class="mt-3 list-decimal">
			<li class="ml-5 opacity-70 text-sm">
				Aplikasi ini hanya bersifat edukasi/demontrasi dan bukan distributor resmi.
			</li>
			<li class="ml-5 opacity-70 text-sm">
				Nikmati anime secara aman dan legal melalui situs atau aplikasi berizin.
			</li>
			<li class="ml-5 opacity-70 text-sm">
				Terima kasih atas pengertian dan dukungan Anda terhadap ekosistem anime!
			</li>
		</ul>
	</div>

	<div class="mt-10 flex w-full justify-center gap-5">
		<Github size={20} />
		<Hexagon size={20} />
		<ChartArea size={20} />
		<RocketIcon size={20} />
	</div>
</div>
