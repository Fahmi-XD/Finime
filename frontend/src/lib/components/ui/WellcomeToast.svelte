<script lang="ts">
	import toast_ from 'svelte-french-toast';

	export let toast;
</script>

<span class="flex flex-col items-center gap-2 text-center text-white">
	<h1 class="text-2xl font-bold">Selamat datang di <span class="font-bold text-red-500">Finime</span></h1>
  <p class="text-sm text-gray-500">
    Finime adalah situs nonton anime dan baca manga sub Indo gratis tanpa iklan, terutama tanpa iklan judi online. Streaming anime terbaru, koleksi manga terlengkap, update episode & chapter setiap hari, kualitas HD, dan komunitas aktif. Nikmati pengalaman menonton dan membaca tanpa gangguan iklan!
  </p>
	<button class="text-white bg-red-500 px-2 py-1 rounded-md" on:click={() => toast_.dismiss(toast.id)}>Tutup</button>
</span>