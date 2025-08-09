<script lang="ts">
  import { goto } from '$app/navigation';
  import { Bot } from '@lucide/svelte';
  import { AuthClient } from '$lib/api/clients/authClient';
  import { page } from '$app/state';
  import toast from 'svelte-french-toast';
  import { toastOption } from '$lib/config/app';
  
  let name = '';
  let username = '';
  let password = '';
  let isLoading = false;
  let showPassword = false;
  let email = '';

  async function handleRegister() {
    try {
      if (!username || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      isLoading = true;
      
      const response = await AuthClient.register({
        name: name,
        username: username,
        email: email,
        password: password
      });

      if (response.status !== 200) {
        alert(response.error.message);
      }

      const payload = {
        username: username,
        password: password
      }

      toast.success("Berhasil mendaftar, silahkan login", toastOption);

      setTimeout(() => {
        goto(`/auth/login?${page.url.searchParams.size ? "?" + page.url.searchParams.toString() + "&" : ""}payload=${btoa(JSON.stringify(payload))}`);
      }, 1000);
    } catch (error) {
      toast.error("Gagal mendaftar", toastOption);
    } finally {
      isLoading = false;
    }
  }
  
  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }
</script>

<svelte:head>
  <title>Daftar Finime - Buat Akun Anime & Manga Gratis Tanpa Iklan | Finime</title>
  <meta
    name="description"
    content="Daftar gratis di Finime untuk akses penuh ke koleksi anime dan manga terbaru. Streaming anime sub Indo gratis, baca manga tanpa iklan judi, update episode & chapter harian, kualitas HD. Bergabung dengan komunitas anime terbesar!"
  />
  <meta
    name="keywords"
    content="daftar finime, register finime, buat akun finime, sign up finime, registrasi finime, pendaftaran finime, akun anime, akun manga, member finime, user finime, komunitas anime, streaming anime gratis, baca manga gratis, anime sub indo, manga sub indo, anime terbaru, manga terbaru, anime update, manga update, anime HD, anime tanpa iklan, manga tanpa iklan, finime, anime indonesia, manga indonesia, anime legal, baca komik, baca komik gratis, streaming anime indonesia, anime subtitle indonesia"
  />
  <meta name="author" content="Finime Team" />
  <link rel="canonical" href="https://www.finime.my.id/auth/register" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  
  <!-- Additional SEO Meta Tags -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="theme-color" content="#111827" />
  <meta name="msapplication-TileColor" content="#da532c" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Finime Register" />

  <!-- Open Graph Meta Tags -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.finime.my.id/auth/register" />
  <meta
    property="og:title"
    content="Daftar Finime - Buat Akun Anime & Manga Gratis Tanpa Iklan"
  />
  <meta
    property="og:description"
    content="Daftar gratis di Finime untuk akses penuh ke koleksi anime dan manga terbaru. Streaming anime sub Indo gratis, baca manga tanpa iklan judi, update episode & chapter harian, kualitas HD. Bergabung dengan komunitas anime terbesar!"
  />
  <meta property="og:image" content="https://www.finime.my.id/web-app-manifest-512x512.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Finime Register - Daftar Akun Anime & Manga Gratis" />
  <meta property="og:locale" content="id_ID" />
  <meta property="og:site_name" content="Finime" />

  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@finime_id" />
  <meta name="twitter:creator" content="@finime_id" />
  <meta name="twitter:url" content="https://www.finime.my.id/auth/register" />
  <meta
    name="twitter:title"
    content="Daftar Finime - Buat Akun Anime & Manga Gratis Tanpa Iklan"
  />
  <meta
    name="twitter:description"
    content="Daftar gratis di Finime untuk akses penuh ke koleksi anime dan manga terbaru. Streaming anime sub Indo gratis, baca manga tanpa iklan judi, update episode & chapter harian, kualitas HD. Bergabung dengan komunitas anime terbesar!"
  />
  <meta
    name="twitter:image"
    content="https://www.finime.my.id/web-app-manifest-512x512.png"
  />
  <meta name="twitter:image:alt" content="Finime Register - Daftar Akun Anime & Manga Gratis" />

  <!-- Structured Data for Register Page -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Daftar Finime",
      "description": "Halaman pendaftaran untuk membuat akun Finime. Akses penuh ke koleksi anime dan manga terbaru, streaming anime sub Indo gratis, baca manga tanpa iklan judi.",
      "url": "https://www.finime.my.id/auth/register",
      "mainEntity": {
        "@type": "WebApplication",
        "name": "Finime",
        "applicationCategory": "EntertainmentApplication",
        "operatingSystem": "Web Browser",
        "description": "Platform streaming anime dan baca manga gratis tanpa iklan judi online",
        "url": "https://www.finime.my.id/",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "IDR",
          "description": "Gratis tanpa biaya"
        }
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.finime.my.id/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Register",
            "item": "https://www.finime.my.id/auth/register"
          }
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Finime",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.finime.my.id/web-app-manifest-512x512.png"
        }
      }
    }
  </script>

  <!-- Favicon and App Icons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="/apple-touch-icon.png"
  />
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
  
  <!-- Preconnect for Performance -->
  <link rel="preconnect" href="https://www.finime.my.id" />
  <link rel="dns-prefetch" href="https://www.finime.my.id" />
</svelte:head>

<div class="min-h-screen mt-15 flex items-center justify-center bg-black relative overflow-hidden p-8">
  <div class="w-full max-w-md z-10">
    <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/20 shadow-2xl">
      <div class="text-center mb-10">
        <div class="mb-6">
          <div class="w-16 h-16 bg-gradient-to-br from-red-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
            <Bot size={40} />
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">Register</h1>
          <p class="text-white/80">Sign up to watch anime and manga</p>
        </div>
      </div>
      
      <form class="mb-8" on:submit|preventDefault={handleRegister}>
        <div class="mb-6">
          <label for="username" class="block text-white font-medium mb-2 text-sm">Full Name</label>
          <div class="relative flex items-center">
            <svg class="absolute left-4 text-white/60 z-10" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input
              id="name"
              type="text"
              bind:value={name}
              placeholder="Enter your full name"
              required
              disabled={isLoading}
              class="w-full px-4 py-3.5 pl-12 border border-white/20 rounded-xl bg-white/10 text-white text-base backdrop-blur-lg transition-all duration-300 placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/15 focus:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>
        
        <div class="mb-6">
          <label for="username" class="block text-white font-medium mb-2 text-sm">Username</label>
          <div class="relative flex items-center">
            <svg class="absolute left-4 text-white/60 z-10" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input
              id="username"
              type="text"
              bind:value={username}
              placeholder="Enter your username or email"
              required
              disabled={isLoading}
              class="w-full px-4 py-3.5 pl-12 border border-white/20 rounded-xl bg-white/10 text-white text-base backdrop-blur-lg transition-all duration-300 placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/15 focus:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>
        
        <div class="mb-6">
          <label for="email" class="block text-white font-medium mb-2 text-sm">Email</label>
          <div class="relative flex items-center">
            <svg class="absolute left-4 text-white/60 z-10" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input
              id="email"
              type="email"
              bind:value={email}
              placeholder="Enter your email"
              required
              disabled={isLoading}
              class="w-full px-4 py-3.5 pl-12 border border-white/20 rounded-xl bg-white/10 text-white text-base backdrop-blur-lg transition-all duration-300 placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/15 focus:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>
        
        <div class="mb-6">
          <label for="password" class="block text-white font-medium mb-2 text-sm">Password</label>
          <div class="relative flex items-center">
            <svg class="absolute left-4 text-white/60 z-10" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <circle cx="12" cy="16" r="1"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              bind:value={password}
              placeholder="Enter your password"
              required
              disabled={isLoading}
              class="w-full px-4 py-3.5 pl-12 pr-12 border border-white/20 rounded-xl bg-white/10 text-white text-base backdrop-blur-lg transition-all duration-300 placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/15 focus:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            />
            <button 
              type="button" 
              class="absolute right-4 bg-transparent border-none text-white/60 cursor-pointer p-1 rounded transition-colors duration-300 hover:text-white/80 disabled:opacity-60 disabled:cursor-not-allowed"
              on:click={togglePasswordVisibility}
              disabled={isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                {#if showPassword}
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                {:else}
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                {/if}
              </svg>
            </button>
          </div>
        </div>
        
        <!-- <div class="flex justify-between items-center mb-8">
          <label class="flex items-center gap-2 text-white/80 text-sm cursor-pointer">
            <input 
              type="checkbox" 
              bind:checked={rememberMe}
              disabled={isLoading}
              class="hidden"
            />
            <span class="w-4.5 h-4.5 border-2 border-white/30 rounded relative transition-all duration-300 {rememberMe ? 'bg-gradient-to-br from-red-400 to-cyan-400 border-transparent' : ''}">
              {#if rememberMe}
                <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">✓</span>
              {/if}
            </span>
            Remember me
          </label>
          
          <a href="/auth/forgot-password" class="text-white/80 text-sm no-underline transition-colors duration-300 hover:text-white">
            Forgot password?
          </a>
        </div> -->
        
        <button 
          type="submit" 
          class="w-full py-4 bg-gradient-to-r from-red-400 to-cyan-400 border-none rounded-xl text-white text-base font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          disabled={isLoading}
        >
          {#if isLoading}
            <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Registering...
          {:else}
            Register
          {/if}
        </button>
      </form>
      
      <div class="text-center text-white/80 text-sm">
        <p>
          Have an account? 
          <a href="/auth/login{page.url.searchParams.size ? "?" + page.url.searchParams.toString() : ""}" class="text-cyan-400 no-underline font-semibold transition-colors duration-300 hover:text-red-400">Sign in</a>
        </p>
      </div>
    </div>
  </div>
</div>
