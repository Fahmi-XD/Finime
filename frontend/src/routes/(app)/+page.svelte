<script>
  import { mode } from '$lib/stores/mode';

  import Donation from '$lib/components/ui/Donation.svelte';
  import Hero from '$lib/components/layouts/Hero.svelte';
  import SecondaryHero from '$lib/components/layouts/SecondaryHero.svelte';

  import Home from '$lib/components/mobile/Home.svelte';

  import { handleResize } from '$lib';
  import { onMount } from 'svelte';
  import { page } from '$app/state';

  onMount(() => {
    if (typeof window != "undefined") {
      // handleResize(page.url.pathname)
    }
  })
</script>

<svelte:head>
  <title>Finime - Nonton Anime & Baca Manga Gratis Tanpa Iklan Judi Online</title>
  <meta
    name="description"
    content="Finime adalah situs nonton anime dan baca manga sub Indo gratis tanpa iklan, terutama tanpa iklan judi online. Streaming anime terbaru, koleksi manga terlengkap, update episode & chapter setiap hari, kualitas HD, dan komunitas aktif. Nikmati pengalaman menonton dan membaca tanpa gangguan iklan!"
  />
  <meta
    name="keywords"
    content="nonton anime gratis, baca manga gratis, streaming anime sub indo, download anime, anime tanpa iklan, manga tanpa iklan, anime sub indo, manga sub indo, anime terbaru, manga terbaru, anime update, manga update, anime HD, anime no ads, manga no ads, anime anti judi, situs anime terbaik, situs manga terbaik, finime, anime indonesia, manga indonesia, anime legal, baca komik, baca komik gratis, streaming anime indonesia, anime subtitle indonesia, anime tanpa iklan judi, manga tanpa iklan judi"
  />
  <meta name="author" content="Finime Team" />
  <link rel="canonical" href="https://www.finime.my.id/" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.finime.my.id/" />
  <meta
    property="og:title"
    content="Finime - Nonton Anime & Baca Manga Gratis Tanpa Iklan Judi Online"
  />
  <meta
    property="og:description"
    content="Finime adalah website streaming anime dan baca manga sub Indo gratis tanpa iklan, terutama tanpa iklan judi online. Koleksi anime & manga terlengkap, update setiap hari, kualitas HD, dan tanpa gangguan iklan. Nikmati pengalaman terbaik di Finime!"
  />
  <meta property="og:image" content="https://www.finime.my.id/web-app-manifest-512x512.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="id_ID" />
  <meta property="og:site_name" content="Finime" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@finime_id" />
  <meta name="twitter:creator" content="@finime_id" />
  <meta name="twitter:url" content="https://www.finime.my.id/" />
  <meta
    name="twitter:title"
    content="Finime - Nonton Anime & Baca Manga Gratis Tanpa Iklan Judi Online"
  />
  <meta
    name="twitter:description"
    content="Finime adalah situs streaming anime dan baca manga gratis tanpa iklan, terutama tanpa iklan judi online. Update anime & manga terbaru setiap hari, kualitas HD, dan komunitas aktif. Nikmati pengalaman tanpa gangguan iklan di Finime!"
  />
  <meta
    name="twitter:image"
    content="https://www.finime.my.id/web-app-manifest-512x512.png"
  />

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Finime",
      "url": "https://www.finime.my.id/",
      "description": "Finime adalah website nonton anime dan baca manga sub Indo gratis tanpa iklan, terutama tanpa iklan judi online. Streaming anime & manga terlengkap, update setiap hari, kualitas HD, dan komunitas aktif.",
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
          "url": "https://www.finime.my.id/web-app-manifest-512x512.png"
        }
      }
    }
  </script>

  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="/apple-touch-icon.png"
  />
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
  <meta name="msapplication-TileColor" content="#da532c" />
  <meta name="theme-color" content="#111827" />
</svelte:head>

<main class="block w-full h-full bg-[hsl(var(--background))]">
  <Donation />
  {#if $mode === "colorful"}
    <Hero />
    <SecondaryHero />
  {:else}
    <Home />
  {/if}
</main>