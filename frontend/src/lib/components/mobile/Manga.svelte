<script lang="ts">
  import { navigate } from '$lib/stores/history';
</script>

<div class="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
  <div class="relative z-10 max-w-xl w-full mx-auto px-4 py-20 flex flex-col items-center text-center">
    <div class="bg-[hsl(var(--background))] rounded-2xl p-10 border border-white/30 shadow-2xl">
      <h1 class="text-lg font-black mb-6 text-red-500">
        Coming Soon
      </h1>
      <h2 class="text-sm font-bold text-white mb-4">
        Halaman Manga Sedang Tahap Pengembangan
      </h2>
      <p class="text-sm text-gray-300 mb-8">
        Kami sedang menyiapkan fitur manga terbaik untuk kamu. Nantikan update terbaru dari kami!
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button on:click={() => navigate.set(["", "Home"])} class="px-8 py-4 text-sm bg-red-500/50 text-red-500 rounded-xl font-bold hover:bg-red-500/20 transition-all">Kembali ke Beranda</button>
        <button on:click={() => navigate.set(["", "Anime"])} class="px-8 py-4 text-sm border-2 border-blue-500 text-blue-400 rounded-xl font-bold hover:bg-blue-500/20 hover:text-white transition-all">Lihat Anime</button>
      </div>
    </div>
  </div>
</div>
