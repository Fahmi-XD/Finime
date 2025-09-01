<svelte:head>
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<div class="mx-auto max-w-sm p-4x text-white">
	<div class="relative overflow-hidden rounded-lg pt-10">
		<img
			alt="Colorful manga cover featuring a smiling young man with a straw hat and other characters behind him, vibrant and detailed"
			class="h-auto w-full rounded-lg object-cover"
			height="400"
			src="https://storage.googleapis.com/a1aa/image/06ea328f-912e-4bd5-fa5f-e79ee5a56122.jpg"
			width="400"
		/>
		<button
			aria-label="Favorite"
			class="absolute right-3 top-3 rounded-full bg-white bg-opacity-70 p-2 text-red-600"
		>
			<i class="fas fa-heart"> </i>
		</button>
	</div>
	<div class="mt-3">
		<h1 class="text-lg font-bold leading-tight text-white">
			Solo Leveling
		</h1>
		<h1 class="text-xs font-bold leading-tight text-white/60">
			Alternatif title
		</h1>
		<div class="mt-5 flex flex-wrap gap-2">
			<span class="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
				Action
			</span>
			<span class="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
				Fantasy
			</span>
		</div>
		<div class="mt-1 flex items-center gap-1 text-xs font-semibold text-yellow-500">
			<i class="fas fa-star"> </i>
			<span> 8.9 /10 </span>
			<span class="ml-2 text-xs font-normal text-white/70"> From 10,500 users </span>
		</div>
	</div>
  <div class="flex gap-2 text-xs my-4 items-center">
    <a href="/" class="bg-red-500 py-2 px-7 rounded-3xl">First Chap: 1</a>
    <a href="/" class="bg-transparent border-2 border-red-500 py-2 px-7 rounded-3xl">Last Chap: 60</a>
  </div>
	<div class="mt-6 border-b border-gray-300">
		<nav class="flex space-x-6 text-sm font-semibold text-red-500">
			<button class="pb-2"> Overview </button>
		</nav>
	</div>
	<div class="mt-4 text-xs leading-tight text-white/50">
		<p>
			"As a child, Monkey D. Luffy was inspired to become a pirate by listening to the tales of the
			buccaneer "Red-Haired" Shanks. But Luffy's life changed when he accidentally ate the Gum-Gum
			Devil Fruit and world..."
		</p>
	</div>
  <div class="flex w-full justify-center mt-5 text-white/90">
    <table class="w-full">
      <tbody>
        <tr class="[&>*]:px-4 [&>*]:py-2">
          <td class="border-r border-white/50">Source</td>
          <td class="opacity-70">Kiryuu</td>
        </tr>
        <tr class="[&>*]:px-4 [&>*]:py-2">
          <td class="border-r border-white/50">Status</td>
          <td class="opacity-70">kskskskkskks</td>
        </tr>
        <tr class="[&>*]:px-4 [&>*]:py-2">
          <td class="border-r border-white/50">dssdasdasdasd</td>
          <td class="opacity-70">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, impedit.</td>
        </tr>
        <tr class="[&>*]:px-4 [&>*]:py-2">
          <td class="border-r border-white/50">Status</td>
          <td class="opacity-70">OnGoing</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-6 border-b border-gray-300">
		<nav class="flex space-x-6 text-sm font-semibold text-red-500">
			<button class="pb-2"> Chapter </button>
		</nav>
	</div>
  <div class="flex flex-wrap justify-start gap-2 mt-5 pb-10">
    <a href="/" class="bg-transparent border border-red-500/70 shrink-0 text-sm font-bold flex items-center justify-center rounded-2xl h-10 w-10">1</a>
    <a href="/" class="bg-transparent border border-red-500/70 shrink-0 text-sm font-bold flex items-center justify-center rounded-2xl h-10 w-10">2</a>
    <a href="/" class="bg-transparent border border-red-500/70 shrink-0 text-sm font-bold flex items-center justify-center rounded-2xl h-10 w-10">3</a>
    <a href="/" class="bg-transparent border border-red-500/70 shrink-0 text-sm font-bold flex items-center justify-center rounded-2xl h-10 w-10">4</a>
    <a href="/" class="bg-transparent border border-red-500/70 shrink-0 text-sm font-bold flex items-center justify-center rounded-2xl h-10 w-10">5</a>
  </div>
</div>
