<script lang="ts">
  import { history } from "$lib/stores/history";
  import type { Component } from "svelte";
  import { type IconProps, Gavel, Star, Languages, Gamepad, Annoyed, Bitcoin, ArrowLeft, Heart, TriangleAlertIcon, Info, Github, Hexagon, ChartArea, RocketIcon } from "@lucide/svelte";
  import { page } from "$app/state";
  import { scale } from "svelte/transition";

  type Badge = {
    id: string;
    label: string;
    description: string;
    icon: Component<IconProps, {}, "">;
    bgColor: string;
    labelColor: string;
    textColor: string;
  };

  const badges: Badge[] = [
    {
      id: "moderator",
      label: "Moderator",
      description:
        "Tukang bersih-bersih komen dan tangan kanan atmin.",
      icon: Gavel,
      bgColor: "bg-blue-200",
      labelColor: "text-blue-200",
      textColor: "text-blue-800",
    },
    {
      id: "superadmin",
      label: "Super Admin",
      description:
        "Aku raja kau member, waspadalah jika atmin datang.",
      icon: Star,
      bgColor: "bg-red-200",
      labelColor: "text-red-200",
      textColor: "text-red-800",
    },
    {
      id: "translator",
      label: "Translator",
      description:
        "King japanese, kontribusi atas penerjemah anime.",
      icon: Languages,
      bgColor: "bg-green-200",
      labelColor: "text-green-200",
      textColor: "text-green-800",
    },
    {
      id: "nolep",
      label: "Nolep",
      description:
        "Pencapaian nonton anime 10+ perhari ( Nganggur jir )",
      icon: Gamepad,
      bgColor: "bg-yellow-200",
      labelColor: "text-yellow-200",
      textColor: "text-yellow-800",
    },
    {
      id: "karbit",
      label: "Karbit",
      description:
        "Suka ngeklem waifu dari setiap anime tanpa menontonnya sampai tamat.",
      icon: Annoyed,
      bgColor: "bg-purple-200",
      labelColor: "text-purple-200",
      textColor: "text-purple-800",
    },
    {
      id: "kripto",
      label: "Raja kripto",
      description:
        "Mekleren lu warna apa bos 🤪",
      icon: Bitcoin,
      bgColor: "bg-cyan-200",
      labelColor: "text-cyan-200",
      textColor: "text-cyan-800",
    },
    {
      id: "waifu",
      label: "Istri: [char]",
      description:
        "Waifunya user, waifumu waifu kita juga, satu untuk semua",
      icon: Heart,
      bgColor: "bg-indigo-200",
      labelColor: "text-indigo-200",
      textColor: "text-indigo-800",
    },
  ];
</script>

{#if page.url.searchParams.get("fragment") == "About"}
  <div
    class="max-w-3xl bg-vanta mx-auto p-[20px] pb-[80px] text-white h-screen overflow-x-hidden"
    transition:scale={{ duration: 200, start: 0.9 }}
  >
    <div
      class="flex justify-between items-center mb-6"
    >
      <button
        on:click={() => history.update((prev) => [...prev, prev[prev.length - 2]])}
        class="p-2 rounded-full"
      >
        <ArrowLeft />
      </button>
      <h1 class="text-title-large font-bold">
        Info
      </h1>
      <div class="w-8"></div>
    </div>

    <div class="mb-8 mt-5">
      <h2
        class="text-xl font-semibold mb-2"
      >
        Tentang NexoPlay Anime Web
      </h2>
      <p class="opacity-60">
        NexoPlay Anime adalah platform
        mobile web yang dirancang untuk
        pecinta anime, menyediakan
        streaming cepat, interaksi
        komunitas, dan fitur kustom. Salah
        satu fitur unggulan adalah sistem
        badge pengguna yang memberikan
        pengakuan peran dan tingkatan
        akses.
      </p>
    </div>

    <div>
      <h2
        class="text-xl font-semibold mb-4"
      >
        List Badge
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {#each badges as badge}
          <div
            class="flex items-start space-x-4 p-1 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div
              class={`p-3 rounded-full ${badge.bgColor}`}
            >
              <svelte:component
                this={badge.icon}
                class={`w-6 h-6 ${badge.textColor}`}
              />
            </div>
            <div>
              <h3
                class="text-lg font-medium"
              >
                {badge.label}
              </h3>
              <p
                class="opacity-60 text-sm"
              >
                {badge.description}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div
      class="mt-10 border-l-3 border-yellow-500 pl-5"
    >
      <TriangleAlertIcon
        font-size={35}
        color="var(--color-yellow-500)"
      />
      <p class="mt-2 opacity-70">
        Harap diperhatikan bahwa konten
        anime di aplikasi ini bersumber
        dari proses pengambilan (scraping)
        situs pihak ketiga. Kami tidak
        memiliki lisensi resmi untuk
        menayangkan konten tersebut.
      </p>
    </div>

    <div
      class="mt-10 border-l-3 border-cyan-500 pl-5"
    >
      <Info
        font-size={35}
        color="var(--color-cyan-500)"
      />
      <p class="mt-2 opacity-70">
        Untuk pengalaman menonton yang
        sepenuhnya legal, kami menyarankan
        Anda berkunjung ke layanan resmi
        seperti Crunchyroll, Netflix, atau
        platform lokal berlisensi. Dengan
        begitu, Anda turut mendukung para
        kreator dan industri anime.
      </p>
    </div>

    <div
      class="mt-10 border-l-3 border-yellow-500 pl-5"
    >
      <TriangleAlertIcon
        font-size={35}
        color="var(--color-yellow-500)"
      />
      <ul class="mt-3 list-decimal">
        <li class="opacity-70 ml-5">
          Aplikasi ini hanya bersifat
          edukasi/demontrasi dan bukan
          distributor resmi.
        </li>
        <li class="opacity-70 ml-5">
          Nikmati anime secara aman dan
          legal melalui situs atau
          aplikasi berizin.
        </li>
        <li class="opacity-70 ml-5">
          Terima kasih atas pengertian dan
          dukungan Anda terhadap ekosistem
          anime!
        </li>
      </ul>
    </div>

    <div
      class="mt-10 w-full flex justify-center gap-5"
    >
      <Github
        font-size="35"
      />
      <Hexagon
        font-size="35"
      />
      <ChartArea
        font-size="35"
      />
      <RocketIcon
        font-size="35"
      />
    </div>
  </div>
{/if}
