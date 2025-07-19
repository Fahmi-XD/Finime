<script lang="ts">
  import { mode as modeStore } from '$lib/stores/mode';
</script>

<section class="relative min-h-screen flex items-center justify-center {$modeStore === 'colorful' ? 'bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden' : 'bg-black overflow-hidden'}">
  <!-- Floating Gradient Orbs -->
  {#if $modeStore === 'colorful'}
    <div class="absolute top-10 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
    <div class="absolute bottom-40 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
  {/if}

  <div class="relative z-10 max-w-xl w-full mx-auto px-4 py-20 flex flex-col items-center text-center">
    <div class="bg-[hsl(var(--background))] rounded-2xl p-10 border border-white/30 shadow-2xl">
      <h1 class="text-4xl sm:text-5xl font-black mb-6 {$modeStore === 'colorful' ? 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent' : 'text-red-500'}">
        Coming Soon
      </h1>
      <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">
        Halaman Manga Sedang Tahap Pengembangan
      </h2>
      <p class="text-lg text-gray-300 mb-8">
        Kami sedang menyiapkan fitur manga terbaik untuk kamu. Nantikan update terbaru dari kami!
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/" class="px-8 py-4 {$modeStore === 'colorful' ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:from-red-600 hover:to-pink-700 transition-all' : 'bg-red-500/50 text-red-500 rounded-xl font-bold hover:bg-red-500/20 transition-all'}">Kembali ke Beranda</a>
        <a href="/mobile/anime" class="px-8 py-4 {$modeStore === 'colorful' ? 'border-2 border-blue-500 text-blue-400 rounded-xl font-bold hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white transition-all' : 'border-2 border-blue-500 text-blue-400 rounded-xl font-bold hover:bg-blue-500/20 hover:text-white transition-all'}">Lihat Anime</a>
      </div>
    </div>
  </div>
</section>
