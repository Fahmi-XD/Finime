<script lang="ts">
  import { PUBLIC_API } from '$env/static/public';
  import { badges as badgesStore } from '$lib/stores/user';
  import { Frown } from '@lucide/svelte';

  import Profile from '$lib/components/layouts/Profile.svelte';

	export let data: any;

  let user = data.userByUsername;
  $: badges = $badgesStore.filter((badge) => Object.keys(user).length > 0 ? user.badges.includes(badge.id) : false);
</script>

<svelte:head>
  <title>{user?.name ? user?.name : "User tidak ditemukan"} - Finime</title>
  <meta
    name="description"
    content={user?.bio || "Username yang anda cari tidak ditemukan, mungkin ada kesalahan pengetikan atau coba cari dengan username yang lain"}
  />
  <meta
    name="keywords"
    content="nonton anime gratis, {user?.name || "Not found"}, {user?.username || "Not found"}, baca manga gratis, streaming anime sub indo, download anime, anime tanpa iklan, manga tanpa iklan, anime sub indo, manga sub indo, anime terbaru, manga terbaru, anime update, manga update, anime HD, anime no ads, manga no ads, anime anti judi, situs anime terbaik, situs manga terbaik, finime, anime indonesia, manga indonesia, anime legal, baca komik, baca komik gratis, streaming anime indonesia, anime subtitle indonesia, anime tanpa iklan judi, manga tanpa iklan judi"
  />
  <meta name="author" content="Finime Team" />
  <link rel="canonical" href="https://www.finime.my.id/" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.finime.my.id/user/{user?.username}" />
  <meta
    property="og:title"
    content="{user?.name || "User tidak ditemukan"} - Finime"
  />
  <meta
    property="og:description"
    content="{user?.bio || "User tidak ditemukan"} - Finime"
  />
  <meta property="og:image" content={user?.avatar ? `${PUBLIC_API}/api/v1/proxy-media?mediaUrl=${user?.avatar}` : "/web-app-manifest-192x192.png"} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="id_ID" />
  <meta property="og:site_name" content="Finime" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@finime_id" />
  <meta name="twitter:creator" content="@finime_id" />
  <meta name="twitter:url" content="https://www.finime.my.id/{user?.username}" />
  <meta
    name="twitter:title"
    content="{user?.name || "User tidak ditemukan"} - Finime"
  />
  <meta
    name="twitter:description"
    content="{user?.bio || "User tidak ditemukan"} - Finime"
  />
  <meta
    name="twitter:image"
    content={user?.avatar ? `${PUBLIC_API}/api/v1/proxy-media?mediaUrl=${user?.avatar}` : "/web-app-manifest-192x192.png"}
  />

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": `${user?.name || "User tidak ditemukan"} - Finime`,
      "url": "https://www.finime.my.id/",
      "description": user?.bio || "Username yang anda cari tidak ditemukan, mungkin ada kesalahan pengetikan atau coba cari dengan username yang lain",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.finime.my.id/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Finime",
        "logo": {
          "@type": "ImageObject",
          "url": user?.avatar ? `${PUBLIC_API}/api/v1/proxy-media?mediaUrl=${user?.avatar}` : "/web-app-manifest-192x192.png"
        }
      }
    }
  </script>

  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href={user?.avatar ? `${PUBLIC_API}/api/v1/proxy-media?mediaUrl=${user?.avatar}` : "/web-app-manifest-192x192.png"}
  />
  <link rel="icon" type="image/png" sizes="96x96" href={user?.avatar ? `${PUBLIC_API}/api/v1/proxy-media?mediaUrl=${user?.avatar}` : "/web-app-manifest-192x192.png"} />
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
  <meta name="msapplication-TileColor" content="#da532c" />
  <meta name="theme-color" content="#111827" />
</svelte:head>

<div
  class="min-h-screen flex items-center justify-center bg-black pt-10"
>
  <div class="w-full max-w-5xl mx-auto">
    {#if Object.keys(user).length === 0}
      <div class="text-center text-white flex flex-col items-center justify-center">
        <Frown size={120} color="rgba(255, 255, 255, 0.4)" />
        <h1 class="text-2xl font-bold mb-4 mt-4">User tidak ditemukan</h1>
        <p class="text-gray-400">Mungkin ada kesalahan pengetikan atau coba cari dengan username yang lain.</p>
        <div class="mt-5">
          <a
            href="/"
            class="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Kembali ke Beranda
          </a>
        </div>
      </div>
    {:else}
      <Profile {user} {badges} visitor={true} />
    {/if}
  </div>
</div>