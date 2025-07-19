<script lang="ts">
  import { mode as modeStore } from '$lib/stores/mode';
</script>

<section class="relative overflow-hidden {$modeStore === 'colorful' ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-black'}">
  {#if $modeStore === 'colorful'}
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div class="absolute bottom-40 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
    </div>
  {/if}
  
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <div class="lg:col-span-8">
        <div class="flex items-center mb-8">
          <div class="flex items-center {$modeStore === 'colorful' ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30' : 'bg-red-500/20'} rounded-xl px-6 py-3 mr-6 backdrop-blur-sm">
            <svg class="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-red-400 font-bold text-sm">INFORMATION</span>
          </div>
          <div class="flex items-center text-gray-400 text-sm bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2">
            <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            Read Carefully
          </div>
        </div>

        <div class="mb-8">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span class="{$modeStore === 'colorful' ? 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent' : 'text-red-500'}">
              NONTON
            </span>
            <br />
            <span class="text-white">ANIME / MANGA</span>
          </h1>
          <h2 class="text-2xl md:text-3xl font-semibold text-gray-300 mb-4">
            Jelajahi dengan Aman, 
            <span class="{$modeStore === 'colorful' ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent' : 'text-red-500'}">
              Tanpa Gangguan
            </span>
          </h2>
        </div>

        <div class="{$modeStore === 'colorful' ? 'bg-white/5 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10 shadow-xl' : 'bg-red-500/5 rounded-2xl p-8 mb-8 border border-red-500/10 shadow-xl'}">
          <p class="text-lg text-gray-300 leading-relaxed">
            Semua anime dan manga di sini diambil dari 
            <span class="{$modeStore === 'colorful' ? 'bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent font-bold' : 'text-red-500'}">
              website mirror lain
            </span>, 
            jadi bukan terjemahan asli kami, tapi tenang saja—situs ini sepenuhnya gratis dan bebas iklan 
            (<span class="text-red-400 font-bold">Apalagi iklan slot</span>) 
            agar kamu bisa menikmati tanpa gangguan. Kami tampil beda dengan UI segar yang jauh dari kesan generik, 
            menyuguhkan pengalaman nonton dan baca yang benar‑benar baru, dan semua kode sumbernya tersedia open source di 
            <span class="{$modeStore === 'colorful' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent font-bold' : 'text-blue-500'}">
              Github
            </span>.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div class="{$modeStore === 'colorful' ? 'bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-md rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300' : 'bg-red-500/10 rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300'}">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              </div>
              <h3 class="font-bold text-white text-lg">Gratis & Tanpa Iklan</h3>
            </div>
            <p class="text-gray-300">Fokus nonton dan baca tanpa gangguan iklan yang mengganggu</p>
          </div>

          <div class="{$modeStore === 'colorful' ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-md rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300' : 'bg-red-500/10 rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300'}">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              </div>
              <h3 class="font-bold text-white text-lg">Open Source</h3>
            </div>
            <p class="text-gray-300">Semua kode sumbernya tersedia open source di Github</p>
          </div>

          <div class="{$modeStore === 'colorful' ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300' : 'bg-red-500/10 rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300'}">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              </div>
              <h3 class="font-bold text-white text-lg">UI yang Segar</h3>
            </div>
            <p class="text-gray-300">UI yang segar dan inovatif dengan desain modern</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-6">
          <a href="/informasi/anime" class="group relative px-8 py-4 {$modeStore === 'colorful' ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105' : 'bg-red-500/30 text-red-500 rounded-xl font-bold hover:bg-red-500/20 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105'}">
            <svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Mulai Jelajahi Anime & Manga Sekarang
          </a>
          <a href="https://github.com/SyntxFlow/Finime" target="_blank" class="group px-8 py-4 border-2 border-blue-500 text-blue-400 rounded-xl font-bold hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white transition-all duration-300 flex items-center justify-center backdrop-blur-sm hover:shadow-xl transform hover:scale-105">
            <svg class="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            Lihat Proyek Kami di GitHub
          </a>
        </div>
      </div>

      <div class="lg:col-span-4 space-y-8">
        <div class="{$modeStore === 'colorful' ? 'bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-md rounded-2xl p-8 border border-red-500/20 shadow-xl' : 'bg-red-500/10 rounded-2xl p-8 border border-red-500/20 shadow-xl'}">
          <h3 class="text-2xl font-bold text-white mb-6 flex items-center">
            <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            </div>
            Available Content
          </h3>
          <div class="grid grid-cols-2 gap-6">
            <div class="text-center group">
              <div class="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">15,420</div>
              <div class="text-gray-300 text-sm">Anime Titles</div>
            </div>
            <div class="text-center group">
              <div class="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">28,750</div>
              <div class="text-gray-300 text-sm">Manga Series</div>
            </div>
            <div class="text-center group">
              <div class="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">450+</div>
              <div class="text-gray-300 text-sm">Studios</div>
            </div>
            <div class="text-center group">
              <div class="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">1,200+</div>
              <div class="text-gray-300 text-sm">Authors</div>
            </div>
          </div>
        </div>

        <div class="{$modeStore === 'colorful' ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20 shadow-xl' : 'bg-red-500/10 rounded-2xl p-8 border border-red-500/20 shadow-xl'}">
          <h3 class="text-xl font-bold text-white mb-6 flex items-center">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            </div>
            Apa yang Membuat Kami Unggul?
          </h3>
          <div class="space-y-4 text-sm">
            <div class="text-gray-300 leading-relaxed">
              Di tengah lautan website anime dan manga yang generik, kami hadir sebagai 
              <span class="{$modeStore === 'colorful' ? 'bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent font-semibold' : 'text-red-500'}">
                angin segar
              </span>. 
              Kami menawarkan pengalaman menonton dan membaca yang baru, dengan antarmuka yang inovatif dan jauh dari kata membosankan.
            </div>
            <div class="text-gray-300 leading-relaxed">
              Lebih dari itu, website ini adalah proyek 
              <span class="{$modeStore === 'colorful' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent font-semibold' : 'text-red-500'}">
                open-source
              </span> 
              yang didedikasikan untuk komunitas. Kami percaya bahwa pengalaman hiburan yang luar biasa harus dapat diakses oleh semua orang.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
