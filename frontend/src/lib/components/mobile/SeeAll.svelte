<script lang="ts">
  import { ArrowLeft, Search } from "@lucide/svelte";
	import { scale } from "svelte/transition";
</script>

<div class="max-w-md pt-10 px-6" in:scale={{ duration: 200, start: 0.95 }}>
	<header class="mb-10 flex items-center space-x-4">
		<button aria-label="Back" on:click={() => window.history.back()} class="text-lg flex items-center gap-1 text-white">
			<ArrowLeft />
			<h1 class="text-lg font-semibold text-white opacity-70">Top Hits Anime</h1>
		</button>
		<button aria-label="Search" class="ml-auto text-lg text-white">
			<Search />
		</button>
	</header>

	<ul class="space-y-6">
		<li class="flex space-x-4">
			<div class="relative flex-shrink-0">
				<img
					alt="Attack on Titan Final Season Part 2 anime cover showing a character with glasses and blue flowers"
					class="h-[160px] w-30 rounded-lg object-cover"
					src="https://storage.googleapis.com/a1aa/image/7f341426-6322-4775-7155-46cc3d878555.jpg"
				/>
				<span class="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-semibold">
					NEW
				</span>
			</div>
			<div class="flex flex-col justify-between">
				<div>
					<h2 class="text-lg font-semibold leading-tight text-white">
						Attack on Titan Final Season Part 2
					</h2>
					<p class="mt-4 text-xs text-gray-400">2023 | Japan</p>
					<p class="mt-1 max-w-xs text-xs text-gray-400">
						Genre: Action, Horror, Dark fantasy, Apocalyptic, Drama, Shōnen.
					</p>
				</div>
				<div class="flex gap-3 items-center">
					<button
						class="mt-3 w-max rounded-full bg-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Tonton
					</button>
					<button
						class="mt-3 w-max rounded-full border-2 border-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Add to list
					</button>
				</div>
			</div>
		</li>
		<li class="flex space-x-4">
			<div class="relative flex-shrink-0">
				<img
					alt="Demon Slayer Entertainment District anime cover with characters in red and orange tones"
					class="h-[160px] w-30 rounded-lg object-cover"
					src="https://storage.googleapis.com/a1aa/image/224a3807-75ae-49b5-6eaf-b43a12b5a076.jpg"
				/>
				<span class="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-semibold">
					NEW
				</span>
			</div>
			<div class="flex flex-col justify-between">
				<div>
					<h2 class="text-lg font-semibold leading-tight text-white">
						Demon Slayer: Entertainment Distrik...
					</h2>
					<p class="mt-4 text-xs text-gray-400">2022 | Japan</p>
					<p class="mt-1 max-w-xs text-xs text-gray-400">
						Genre: Adventure fiction, Dark fantasy, Supernatural.
					</p>
				</div>
				<div class="flex gap-3 items-center">
					<button
						class="mt-3 w-max rounded-full bg-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Tonton
					</button>
					<button
						class="mt-3 w-max rounded-full border-2 border-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Add to list
					</button>
				</div>
			</div>
		</li>
		<li class="flex space-x-4">
			<div class="relative flex-shrink-0">
				<img
					alt="Spy x Family anime cover with two characters in black and white with red background"
					class="h-[160px] w-30 rounded-lg object-cover"
					src="https://storage.googleapis.com/a1aa/image/fe6cbfb6-ec8b-46c8-df2f-4f6c783683b2.jpg"
				/>
				<span class="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-semibold">
					NEW
				</span>
			</div>
			<div class="flex flex-col justify-between">
				<div>
					<h2 class="text-lg font-semibold leading-tight text-white">Spy x Family</h2>
					<p class="mt-4 text-xs text-gray-400">2022 | Japan</p>
					<p class="mt-1 max-w-xs text-xs text-gray-400">
						Genre: Action, Fiction, Comedy, Spy fiction.
					</p>
				</div>
				<div class="flex gap-3 items-center">
					<button
						class="mt-3 w-max rounded-full bg-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Tonton
					</button>
					<button
						class="mt-3 w-max rounded-full border-2 border-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Add to list
					</button>
				</div>
			</div>
		</li>
		<li class="flex space-x-4">
			<div class="relative flex-shrink-0">
				<img
					alt="The King's Avatar Season 2 anime cover with characters in blue and white colors"
					class="h-[160px] w-30 rounded-lg object-cover"
					src="https://storage.googleapis.com/a1aa/image/6656d5af-01ad-4f4e-7dd5-c6fd60f8d1a3.jpg"
				/>
				<span class="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-semibold">
					NEW
				</span>
			</div>
			<div class="flex flex-col justify-between">
				<div>
					<h2 class="text-lg font-semibold leading-tight text-white">The King's Avatar Season 2</h2>
					<p class="mt-4 text-xs text-gray-400">2022 | Chinese</p>
					<p class="mt-1 max-w-xs text-xs text-gray-400">
						Genre: Action, Superhero, Science fiction, Romance, Thriller.
					</p>
				</div>
				<div class="flex gap-3 items-center">
					<button
						class="mt-3 w-max rounded-full bg-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Tonton
					</button>
					<button
						class="mt-3 w-max rounded-full border-2 border-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Add to list
					</button>
				</div>
			</div>
		</li>
		<li class="flex space-x-4">
			<div class="relative flex-shrink-0">
				<img
					alt="The King's Avatar Season 2 anime cover with characters in blue and white colors"
					class="h-[160px] w-30 rounded-lg object-cover"
					src="https://storage.googleapis.com/a1aa/image/6656d5af-01ad-4f4e-7dd5-c6fd60f8d1a3.jpg"
				/>
				<span class="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-semibold">
					NEW
				</span>
			</div>
			<div class="flex flex-col justify-between">
				<div>
					<h2 class="text-lg font-semibold leading-tight text-white">The King's Avatar Season 2</h2>
					<p class="mt-4 text-xs text-gray-400">2022 | Chinese</p>
					<p class="mt-1 max-w-xs text-xs text-gray-400">
						Genre: Action, Superhero, Science fiction, Romance, Thriller.
					</p>
				</div>
				<div class="flex gap-3 items-center">
					<button
						class="mt-3 w-max rounded-full bg-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Tonton
					</button>
					<button
						class="mt-3 w-max rounded-full border-2 border-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Add to list
					</button>
				</div>
			</div>
		</li>
		<li class="flex space-x-4">
			<div class="relative flex-shrink-0">
				<img
					alt="The King's Avatar Season 2 anime cover with characters in blue and white colors"
					class="h-[160px] w-30 rounded-lg object-cover"
					src="https://storage.googleapis.com/a1aa/image/6656d5af-01ad-4f4e-7dd5-c6fd60f8d1a3.jpg"
				/>
				<span class="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-semibold">
					NEW
				</span>
			</div>
			<div class="flex flex-col justify-between">
				<div>
					<h2 class="text-lg font-semibold leading-tight text-white">The King's Avatar Season 2</h2>
					<p class="mt-4 text-xs text-gray-400">2022 | Chinese</p>
					<p class="mt-1 max-w-xs text-xs text-gray-400">
						Genre: Action, Superhero, Science fiction, Romance, Thriller.
					</p>
				</div>
				<div class="flex gap-3 items-center">
					<button
						class="mt-3 w-max rounded-full bg-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Tonton
					</button>
					<button
						class="mt-3 w-max rounded-full border-2 border-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Add to list
					</button>
				</div>
			</div>
		</li>
		<li class="flex space-x-4">
			<div class="relative flex-shrink-0">
				<img
					alt="The King's Avatar Season 2 anime cover with characters in blue and white colors"
					class="h-[160px] w-30 rounded-lg object-cover"
					src="https://storage.googleapis.com/a1aa/image/6656d5af-01ad-4f4e-7dd5-c6fd60f8d1a3.jpg"
				/>
				<span class="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-semibold">
					NEW
				</span>
			</div>
			<div class="flex flex-col justify-between">
				<div>
					<h2 class="text-lg font-semibold leading-tight text-white">The King's Avatar Season 2</h2>
					<p class="mt-4 text-xs text-gray-400">2022 | Chinese</p>
					<p class="mt-1 max-w-xs text-xs text-gray-400">
						Genre: Action, Superhero, Science fiction, Romance, Thriller.
					</p>
				</div>
				<div class="flex gap-3 items-center">
					<button
						class="mt-3 w-max rounded-full bg-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Tonton
					</button>
					<button
						class="mt-3 w-max rounded-full border-2 border-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Add to list
					</button>
				</div>
			</div>
		</li>
		<li class="flex space-x-4">
			<div class="relative flex-shrink-0">
				<img
					alt="The King's Avatar Season 2 anime cover with characters in blue and white colors"
					class="h-[160px] w-30 rounded-lg object-cover"
					src="https://storage.googleapis.com/a1aa/image/6656d5af-01ad-4f4e-7dd5-c6fd60f8d1a3.jpg"
				/>
				<span class="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-semibold">
					NEW
				</span>
			</div>
			<div class="flex flex-col justify-between">
				<div>
					<h2 class="text-lg font-semibold leading-tight text-white">The King's Avatar Season 2</h2>
					<p class="mt-4 text-xs text-gray-400">2022 | Chinese</p>
					<p class="mt-1 max-w-xs text-xs text-gray-400">
						Genre: Action, Superhero, Science fiction, Romance, Thriller.
					</p>
				</div>
				<div class="flex gap-3 items-center">
					<button
						class="mt-3 w-max rounded-full bg-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Tonton
					</button>
					<button
						class="mt-3 w-max rounded-full border-2 border-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Add to list
					</button>
				</div>
			</div>
		</li>
		<li class="flex space-x-4">
			<div class="relative flex-shrink-0">
				<img
					alt="The King's Avatar Season 2 anime cover with characters in blue and white colors"
					class="h-[160px] w-30 rounded-lg object-cover"
					src="https://storage.googleapis.com/a1aa/image/6656d5af-01ad-4f4e-7dd5-c6fd60f8d1a3.jpg"
				/>
				<span class="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-semibold">
					NEW
				</span>
			</div>
			<div class="flex flex-col justify-between">
				<div>
					<h2 class="text-lg font-semibold leading-tight text-white">The King's Avatar Season 2</h2>
					<p class="mt-4 text-xs text-gray-400">2022 | Chinese</p>
					<p class="mt-1 max-w-xs text-xs text-gray-400">
						Genre: Action, Superhero, Science fiction, Romance, Thriller.
					</p>
				</div>
				<div class="flex gap-3 items-center">
					<button
						class="mt-3 w-max rounded-full bg-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Tonton
					</button>
					<button
						class="mt-3 w-max rounded-full border-2 border-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Add to list
					</button>
				</div>
			</div>
		</li>
		<li class="flex space-x-4">
			<div class="relative flex-shrink-0">
				<img
					alt="The King's Avatar Season 2 anime cover with characters in blue and white colors"
					class="h-[160px] w-30 rounded-lg object-cover"
					src="https://storage.googleapis.com/a1aa/image/6656d5af-01ad-4f4e-7dd5-c6fd60f8d1a3.jpg"
				/>
				<span class="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-semibold">
					NEW
				</span>
			</div>
			<div class="flex flex-col justify-between">
				<div>
					<h2 class="text-lg font-semibold leading-tight text-white">The King's Avatar Season 2</h2>
					<p class="mt-4 text-xs text-gray-400">2022 | Chinese</p>
					<p class="mt-1 max-w-xs text-xs text-gray-400">
						Genre: Action, Superhero, Science fiction, Romance, Thriller.
					</p>
				</div>
				<div class="flex gap-3 items-center">
					<button
						class="mt-3 w-max rounded-full bg-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Tonton
					</button>
					<button
						class="mt-3 w-max rounded-full border-2 border-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Add to list
					</button>
				</div>
			</div>
		</li>
		<li class="flex space-x-4">
			<div class="relative flex-shrink-0">
				<img
					alt="The King's Avatar Season 2 anime cover with characters in blue and white colors"
					class="h-[160px] w-30 rounded-lg object-cover"
					src="https://storage.googleapis.com/a1aa/image/6656d5af-01ad-4f4e-7dd5-c6fd60f8d1a3.jpg"
				/>
				<span class="absolute left-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs font-semibold">
					NEW
				</span>
			</div>
			<div class="flex flex-col justify-between">
				<div>
					<h2 class="text-lg font-semibold leading-tight text-white">The King's Avatar Season 2</h2>
					<p class="mt-4 text-xs text-gray-400">2022 | Chinese</p>
					<p class="mt-1 max-w-xs text-xs text-gray-400">
						Genre: Action, Superhero, Science fiction, Romance, Thriller.
					</p>
				</div>
				<div class="flex gap-3 items-center">
					<button
						class="mt-3 w-max rounded-full bg-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Tonton
					</button>
					<button
						class="mt-3 w-max rounded-full border-2 border-red-500 px-5 py-2 text-xs font-bold text-white"
					>
						Add to list
					</button>
				</div>
			</div>
		</li>
	</ul>
</div>