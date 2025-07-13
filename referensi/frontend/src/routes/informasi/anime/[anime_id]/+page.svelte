<script lang="ts">
  import type { IAnimeSlug } from "./+page";

  export let data: IAnimeSlug;
</script>

<svelte:head>
  <title> - Finime</title>
  
  <meta
    name="title"
    content="Finime - Platform baca manga & nonton anime."
  />
  <meta name="description" content="Nonton anime dan baca manga favoritmu hanya di finime. Jelajahi konten yang seru dan fitur terlangkap." />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.finime.my.id/" />
  <meta
    property="og:title"
    content="Finime - Platform baca manga & nonton anime."
  />
  <meta property="og:description" content="" />
  <meta property="og:image" content="https://www.finime.my.id/icon.jpg" />

  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://www.finime.my.id/" />
  <meta
    property="twitter:title"
    content="Finime - Platform baca manga & nonton anime."
  />
  <meta property="twitter:description" content="" />
  <meta property="twitter:image" content="https://www.finime.my.id/icon.jpg" />
</svelte:head>

<section class="mt-20">
  <div class="md:hidden bg-finime-gray border-b border-finime-light-gray hidden" id="mobile-menu">
    <div class="px-4 py-2 space-y-1">
      <a href="#" class="block px-3 py-2 text-red-500 font-medium">Anime</a>
      <a href="#" class="block px-3 py-2 text-gray-400 hover:text-[hsl(var(--foreground))] transition-colors">Manga</a>
      <a href="#" class="block px-3 py-2 text-gray-400 hover:text-[hsl(var(--foreground))] transition-colors">Search</a
      >
    </div>
  </div>

  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
    <div class="flex items-center space-x-2 text-sm">
      <a href="#" class="text-gray-400 hover:text-[hsl(var(--foreground))] transition-colors">Home</a>
      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
        ></path>
      </svg>
      <a href="#" class="text-gray-400 hover:text-[hsl(var(--foreground))] transition-colors">Anime</a>
      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
        ></path>
      </svg>
      <a href="#" class="text-gray-400 hover:text-[hsl(var(--foreground))] transition-colors">Action</a>
      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
        ></path>
      </svg>
      <span class="text-red-500">Attack on Titan</span>
    </div>
  </nav>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
      <div class="lg:col-span-1">
        <div class="sticky top-24 space-y-6">
          <div class="relative group">
            <div
              class="aspect-[3/4] bg-gradient-to-br from-red-500 to-red-800 rounded-lg overflow-hidden shadow-2xl"
            >
              <div class="image-zoom w-full h-full bg-black bg-opacity-20 cursor-pointer relative">
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                ></div>
                <div class="absolute bottom-4 left-4 right-4">
                  <div class="bg-black/80 backdrop-blur-sm rounded-lg p-3">
                    <div class="text-[hsl(var(--foreground))] font-bold text-sm">Season 4</div>
                    <div class="text-gray-300 text-xs">Final Season</div>
                    <div class="flex items-center mt-2">
                      <span class="text-yellow-400 text-sm">★</span>
                      <span class="text-[hsl(var(--foreground))] text-sm ml-1">9.0</span>
                    </div>
                  </div>
                </div>
                <div
                  class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div class="bg-black/60 backdrop-blur-sm rounded-full p-2">
                    <svg
                      class="w-5 h-5 text-[hsl(var(--foreground))]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div class="bg-red-500/80 backdrop-blur-sm rounded-full p-4">
                    <svg class="w-8 h-8 text-[hsl(var(--foreground))]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-finime-gray rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[hsl(var(--foreground))] text-sm font-medium">Your Progress</span>
              <span class="text-gray-400 text-xs">Episode 25/87</span>
            </div>
            <div class="w-full bg-finime-light-gray rounded-full h-2 mb-3">
              <div class="progress-bar bg-red-500 h-2 rounded-full" style="width: 28.7%"></div>
            </div>
            <div class="text-gray-400 text-xs">Last watched: Episode 25 - "Night of the End"</div>
          </div>

          <div class="space-y-3">
            <button
              class="w-full px-4 py-3 bg-red-500 text-[hsl(var(--foreground))] rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Now
            </button>
            <button
              class="w-full px-4 py-3 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-500 hover:text-[hsl(var(--foreground))] transition-colors flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              Add to Watchlist
            </button>
            <button
              class="w-full px-4 py-3 bg-finime-gray text-[hsl(var(--foreground))] rounded-lg font-semibold hover:bg-finime-light-gray transition-colors flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Add to List
            </button>
          </div>

          <div class="bg-finime-gray rounded-lg p-4">
            <h3 class="font-semibold text-[hsl(var(--foreground))] mb-3 text-sm">Share</h3>
            <div class="grid grid-cols-4 gap-2">
              <button
                class="social-share p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg class="w-5 h-5 text-[hsl(var(--foreground))] mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                  />
                </svg>
              </button>
              <button
                class="social-share p-3 bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors"
              >
                <svg class="w-5 h-5 text-[hsl(var(--foreground))] mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </button>
              <button
                class="social-share p-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg class="w-5 h-5 text-[hsl(var(--foreground))] mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                  />
                </svg>
              </button>
              <button
                class="social-share p-3 bg-finime-light-gray rounded-lg hover:bg-gray-600 transition-colors"
              >
                <svg
                  class="w-5 h-5 text-[hsl(var(--foreground))] mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="bg-finime-gray rounded-lg p-4">
            <h3 class="font-semibold text-[hsl(var(--foreground))] mb-4 text-sm">Information</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Studio:</span>
                <span class="text-[hsl(var(--foreground))] text-right">Mappa, Studio Pierrot</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Director:</span>
                <span class="text-[hsl(var(--foreground))] text-right">Tetsuro Araki</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Status:</span>
                <span class="text-green-400 text-right">Completed</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Aired:</span>
                <span class="text-[hsl(var(--foreground))] text-right">Apr 7, 2013 - Nov 5, 2023</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Season:</span>
                <span class="text-[hsl(var(--foreground))] text-right">Spring 2013</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Episodes:</span>
                <span class="text-[hsl(var(--foreground))] text-right">87</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Duration:</span>
                <span class="text-[hsl(var(--foreground))] text-right">24 min per ep</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Rating:</span>
                <span class="text-[hsl(var(--foreground))] text-right">R - 17+</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Score:</span>
                <span class="text-yellow-400 text-right">9.0/10</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Popularity:</span>
                <span class="text-[hsl(var(--foreground))] text-right">#1</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Members:</span>
                <span class="text-[hsl(var(--foreground))] text-right">3,456,789</span>
              </div>
            </div>

            <hr class="border-finime-light-gray my-4" />

            <h4 class="font-semibold text-[hsl(var(--foreground))] mb-3 text-sm">Genres</h4>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-red-500 text-[hsl(var(--foreground))] text-xs rounded-full">Action</span>
              <span class="px-2 py-1 bg-finime-light-gray text-gray-300 text-xs rounded-full"
                >Drama</span
              >
              <span class="px-2 py-1 bg-finime-light-gray text-gray-300 text-xs rounded-full"
                >Fantasy</span
              >
              <span class="px-2 py-1 bg-finime-light-gray text-gray-300 text-xs rounded-full"
                >Military</span
              >
              <span class="px-2 py-1 bg-finime-light-gray text-gray-300 text-xs rounded-full"
                >Supernatural</span
              >
              <span class="px-2 py-1 bg-finime-light-gray text-gray-300 text-xs rounded-full"
                >Shounen</span
              >
            </div>

            <hr class="border-finime-light-gray my-4" />

            <h4 class="font-semibold text-[hsl(var(--foreground))] mb-3 text-sm">External Links</h4>
            <div class="space-y-2">
              <a
                href="#"
                class="flex items-center justify-between p-2 bg-finime-light-gray rounded hover:bg-gray-600 transition-colors"
              >
                <span class="text-gray-300 text-sm">MyAnimeList</span>
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                class="flex items-center justify-between p-2 bg-finime-light-gray rounded hover:bg-gray-600 transition-colors"
              >
                <span class="text-gray-300 text-sm">AniList</span>
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                class="flex items-center justify-between p-2 bg-finime-light-gray rounded hover:bg-gray-600 transition-colors"
              >
                <span class="text-gray-300 text-sm">Official Site</span>
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-3 space-y-6">
        <div class="mobile-optimized">
          <div class="flex items-center mb-4">
            <span class="bg-green-600 text-[hsl(var(--foreground))] text-xs px-2 py-1 rounded mr-3">COMPLETED</span>
            <span class="text-gray-400 text-sm">2013-2023 • 87 Episodes • TV Series</span>
          </div>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--foreground))] mb-3">
            Attack on Titan
          </h1>
          <h2 class="text-lg md:text-xl text-gray-300 mb-4">進撃の巨人 (Shingeki no Kyojin)</h2>
          <div class="flex items-center space-x-6 mb-6">
            <div class="flex items-center">
              <span class="text-yellow-400 text-xl md:text-2xl mr-2">★</span>
              <span class="text-[hsl(var(--foreground))] text-lg md:text-xl font-semibold">9.0</span>
              <span class="text-gray-400 ml-2 text-sm">(1,234,567 votes)</span>
            </div>
            <div class="text-gray-400 text-sm md:text-base">
              <span>Action, Drama, Fantasy, Military</span>
            </div>
          </div>
        </div>

        <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
          <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] mb-4">Official Trailer</h2>
          <div class="video-container bg-finime-light-gray rounded-lg overflow-hidden">
            <div
              class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-500 to-red-800"
            >
              <div class="text-center">
                <div class="bg-black/60 backdrop-blur-sm rounded-full p-6 mb-4 mx-auto w-fit">
                  <svg class="w-12 h-12 text-[hsl(var(--foreground))]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div class="text-[hsl(var(--foreground))] font-semibold">Attack on Titan Final Season Trailer</div>
                <div class="text-gray-300 text-sm">Click to play trailer</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mobile-optimized">
          <div class="bg-finime-gray rounded-lg p-3 md:p-4 text-center">
            <div class="text-xl md:text-2xl font-bold text-red-500">87</div>
            <div class="text-gray-400 text-xs md:text-sm">Episodes</div>
          </div>
          <div class="bg-finime-gray rounded-lg p-3 md:p-4 text-center">
            <div class="text-xl md:text-2xl font-bold text-red-500">4</div>
            <div class="text-gray-400 text-xs md:text-sm">Seasons</div>
          </div>
          <div class="bg-finime-gray rounded-lg p-3 md:p-4 text-center">
            <div class="text-xl md:text-2xl font-bold text-red-500">10</div>
            <div class="text-gray-400 text-xs md:text-sm">Years</div>
          </div>
          <div class="bg-finime-gray rounded-lg p-3 md:p-4 text-center">
            <div class="text-xl md:text-2xl font-bold text-red-500">3.4M+</div>
            <div class="text-gray-400 text-xs md:text-sm">Members</div>
          </div>
        </div>

        <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
          <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] mb-4">Synopsis</h2>
          <div class="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
            <p>
              Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid
              creatures called Titans, forcing humans to hide in fear behind enormous concentric
              walls. What makes these giants truly terrifying is that their taste for human flesh is
              not born out of hunger but what appears to be out of pleasure.
            </p>
            <p>
              To ensure their survival, the remnants of humanity began living within defensive
              barriers, resulting in one hundred years without a single titan encounter. However,
              that fragile calm is soon shattered when a colossal titan manages to breach the
              supposedly impregnable outer wall, reigniting the fight for survival against the
              man-eating abominations.
            </p>
            <p>
              After witnessing a horrific personal loss at the hands of the invading creatures, Eren
              Yeager dedicates his life to their eradication by enlisting into the Survey Corps, an
              elite military unit that combats the merciless humanoids outside the protection of the
              walls. Eren, his adopted sister Mikasa Ackerman, and his childhood friend Armin Arlert
              join the brutal war against the titans and race to discover a way of defeating them
              before the last walls are breached.
            </p>
            <p>
              What begins as a simple tale of survival evolves into an epic saga of political
              intrigue, moral complexity, and the true nature of freedom. As secrets about the
              titans and the world beyond the walls are revealed, the characters must confront
              difficult truths about humanity, war, and the price of peace.
            </p>
          </div>
          <button
            class="mt-4 text-red-500 hover:text-red-400 transition-colors text-sm font-medium"
          >
            Read Full Synopsis →
          </button>
        </div>

        <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
          <div
            class="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0"
          >
            <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))]">Episodes</h2>
            <div
              class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
            >
              <div class="flex items-center space-x-2">
                <button
                  class="p-2 bg-finime-light-gray rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <svg
                    class="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    ></path>
                  </svg>
                </button>
                <button class="p-2 bg-red-500 rounded-lg">
                  <svg
                    class="w-4 h-4 text-[hsl(var(--foreground))]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    ></path>
                  </svg>
                </button>
              </div>
              <select
                class="px-3 py-2 bg-finime-light-gray border border-gray-600 rounded-lg text-[hsl(var(--foreground))] focus:outline-none focus:border-red-500 text-sm"
              >
                <option>All Seasons</option>
                <option>Season 1</option>
                <option>Season 2</option>
                <option>Season 3</option>
                <option>Season 4</option>
              </select>
              <select
                class="px-3 py-2 bg-finime-light-gray border border-gray-600 rounded-lg text-[hsl(var(--foreground))] focus:outline-none focus:border-red-500 text-sm"
              >
                <option>Latest First</option>
                <option>Oldest First</option>
                <option>By Rating</option>
              </select>
              <button
                class="px-4 py-2 bg-red-500 text-[hsl(var(--foreground))] rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
              >
                Continue Watching
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6">
            <div
              class="episode-item flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-finime-light-gray rounded-lg hover:bg-gray-600 transition-all cursor-pointer group"
            >
              <div
                class="w-20 md:w-24 h-12 md:h-14 bg-gradient-to-br from-red-500 to-red-800 rounded flex-shrink-0 relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg
                    class="w-6 h-6 text-[hsl(var(--foreground))] opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div class="absolute bottom-1 right-1 bg-black bg-opacity-60 rounded px-1">
                  <span class="text-[hsl(var(--foreground))] text-xs">24:12</span>
                </div>
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-40">
                  <div class="h-full bg-red-500" style="width: 75%"></div>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Episode 87: The Dawn of Humanity
                </h3>
                <p class="text-gray-400 text-xs md:text-sm mb-1 line-clamp-2">
                  The final confrontation reaches its conclusion
                </p>
                <div class="flex items-center justify-between">
                  <div class="text-gray-500 text-xs">Nov 5, 2023 • Season 4</div>
                  <div class="flex items-center space-x-2">
                    <span class="text-red-500 text-xs bg-red-500/20 px-2 py-1 rounded"
                      >New</span
                    >
                    <div
                      class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                    >
                      <svg class="w-3 h-3 text-[hsl(var(--foreground))]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="episode-item flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-finime-light-gray rounded-lg hover:bg-gray-600 transition-all cursor-pointer group"
            >
              <div
                class="w-20 md:w-24 h-12 md:h-14 bg-gradient-to-br from-red-500 to-red-800 rounded flex-shrink-0 relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg
                    class="w-6 h-6 text-[hsl(var(--foreground))] opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div class="absolute bottom-1 right-1 bg-black bg-opacity-60 rounded px-1">
                  <span class="text-[hsl(var(--foreground))] text-xs">23:45</span>
                </div>
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-40">
                  <div class="h-full bg-red-500" style="width: 100%"></div>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Episode 86: Retrospective
                </h3>
                <p class="text-gray-400 text-xs md:text-sm mb-1 line-clamp-2">
                  Looking back at the journey that led to this moment
                </p>
                <div class="flex items-center justify-between">
                  <div class="text-gray-500 text-xs">Oct 29, 2023 • Season 4</div>
                  <div class="flex items-center space-x-2">
                    <div
                      class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                    >
                      <svg class="w-3 h-3 text-[hsl(var(--foreground))]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="episode-item flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-finime-light-gray rounded-lg hover:bg-gray-600 transition-all cursor-pointer group"
            >
              <div
                class="w-20 md:w-24 h-12 md:h-14 bg-gradient-to-br from-red-500 to-red-800 rounded flex-shrink-0 relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg
                    class="w-6 h-6 text-[hsl(var(--foreground))] opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div class="absolute bottom-1 right-1 bg-black bg-opacity-60 rounded px-1">
                  <span class="text-[hsl(var(--foreground))] text-xs">24:30</span>
                </div>
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-40">
                  <div class="h-full bg-red-500" style="width: 45%"></div>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Episode 85: Traitor
                </h3>
                <p class="text-gray-400 text-xs md:text-sm mb-1 line-clamp-2">
                  Betrayal strikes at the heart of the alliance
                </p>
                <div class="flex items-center justify-between">
                  <div class="text-gray-500 text-xs">Oct 22, 2023 • Season 4</div>
                  <div class="flex items-center space-x-2">
                    <span class="text-gray-400 text-xs">In Progress</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="episode-item flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-finime-light-gray rounded-lg hover:bg-gray-600 transition-all cursor-pointer group"
            >
              <div
                class="w-20 md:w-24 h-12 md:h-14 bg-gradient-to-br from-red-500 to-red-800 rounded flex-shrink-0 relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg
                    class="w-6 h-6 text-[hsl(var(--foreground))] opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div class="absolute bottom-1 right-1 bg-black bg-opacity-60 rounded px-1">
                  <span class="text-[hsl(var(--foreground))] text-xs">23:55</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Episode 84: Night of the End
                </h3>
                <p class="text-gray-400 text-xs md:text-sm mb-1 line-clamp-2">
                  The battle for humanity's future begins
                </p>
                <div class="flex items-center justify-between">
                  <div class="text-gray-500 text-xs">Oct 15, 2023 • Season 4</div>
                  <div class="flex items-center space-x-2">
                    <span class="text-gray-400 text-xs">Not Watched</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            class="w-full px-4 py-3 text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-[hsl(var(--foreground))] transition-colors font-medium"
          >
            Load More Episodes (83 remaining)
          </button>
        </div>

        <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
          <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
            Main Characters & Voice Actors
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div class="flex items-center space-x-4 group cursor-pointer">
              <div
                class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex-shrink-0 group-hover:scale-105 transition-transform"
              ></div>
              <div class="flex-1">
                <h3
                  class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors text-sm md:text-base"
                >
                  Eren Yeager
                </h3>
                <p class="text-gray-400 text-xs md:text-sm">Protagonist</p>
                <p class="text-gray-500 text-xs">CV: Yuki Kaji</p>
              </div>
            </div>
            <div class="flex items-center space-x-4 group cursor-pointer">
              <div
                class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex-shrink-0 group-hover:scale-105 transition-transform"
              ></div>
              <div class="flex-1">
                <h3
                  class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors text-sm md:text-base"
                >
                  Mikasa Ackerman
                </h3>
                <p class="text-gray-400 text-xs md:text-sm">Main Character</p>
                <p class="text-gray-500 text-xs">CV: Marina Inoue</p>
              </div>
            </div>
            <div class="flex items-center space-x-4 group cursor-pointer">
              <div
                class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex-shrink-0 group-hover:scale-105 transition-transform"
              ></div>
              <div class="flex-1">
                <h3
                  class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors text-sm md:text-base"
                >
                  Armin Arlert
                </h3>
                <p class="text-gray-400 text-xs md:text-sm">Main Character</p>
                <p class="text-gray-500 text-xs">CV: Marina Inoue</p>
              </div>
            </div>
            <div class="flex items-center space-x-4 group cursor-pointer">
              <div
                class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex-shrink-0 group-hover:scale-105 transition-transform"
              ></div>
              <div class="flex-1">
                <h3
                  class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors text-sm md:text-base"
                >
                  Levi Ackerman
                </h3>
                <p class="text-gray-400 text-xs md:text-sm">Captain</p>
                <p class="text-gray-500 text-xs">CV: Hiroshi Kamiya</p>
              </div>
            </div>
          </div>
          <button
            class="mt-4 text-red-500 hover:text-red-400 transition-colors text-sm font-medium"
          >
            View All Characters & Staff →
          </button>
        </div>

        <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
          <div
            class="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0"
          >
            <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))]">User Reviews</h2>
            <button
              class="px-4 py-2 bg-red-500 text-[hsl(var(--foreground))] rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
            >
              Write Review
            </button>
          </div>
          <div class="space-y-4">
            <div class="bg-finime-light-gray rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-red-500 to-red-800 rounded-full flex-shrink-0"
                  ></div>
                  <div>
                    <div class="font-semibold text-[hsl(var(--foreground))] text-sm md:text-base">AnimeFan2024</div>
                    <div class="text-gray-400 text-xs md:text-sm">3 days ago</div>
                  </div>
                </div>
                <div class="flex items-center">
                  <span class="text-yellow-400 mr-1 text-sm">★★★★★</span>
                  <span class="text-[hsl(var(--foreground))] font-semibold text-sm">10/10</span>
                </div>
              </div>
              <p class="text-gray-300 leading-relaxed text-sm md:text-base">
                "An absolute masterpiece that redefined anime storytelling. The animation quality,
                especially in the final season, is breathtaking. Every episode leaves you wanting
                more, and the character development is phenomenal."
              </p>
              <div class="flex items-center space-x-4 mt-3 text-sm">
                <button
                  class="text-gray-400 hover:text-red-500 transition-colors flex items-center"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    ></path>
                  </svg>
                  256
                </button>
                <button class="text-gray-400 hover:text-red-500 transition-colors">Reply</button>
              </div>
            </div>
            <div class="bg-finime-light-gray rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex-shrink-0"
                  ></div>
                  <div>
                    <div class="font-semibold text-[hsl(var(--foreground))] text-sm md:text-base">TitanHunter</div>
                    <div class="text-gray-400 text-xs md:text-sm">1 week ago</div>
                  </div>
                </div>
                <div class="flex items-center">
                  <span class="text-yellow-400 mr-1 text-sm">★★★★☆</span>
                  <span class="text-[hsl(var(--foreground))] font-semibold text-sm">9/10</span>
                </div>
              </div>
              <p class="text-gray-300 leading-relaxed text-sm md:text-base">
                "The ending was divisive but I think it was perfect for the themes explored. The
                voice acting is top-tier and the soundtrack by Hiroyuki Sawano is absolutely
                incredible. A must-watch series."
              </p>
              <div class="flex items-center space-x-4 mt-3 text-sm">
                <button
                  class="text-gray-400 hover:text-red-500 transition-colors flex items-center"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    ></path>
                  </svg>
                  142
                </button>
                <button class="text-gray-400 hover:text-red-500 transition-colors">Reply</button>
              </div>
            </div>
          </div>
          <button
            class="mt-4 text-red-500 hover:text-red-400 transition-colors text-sm font-medium"
          >
            View All Reviews →
          </button>
        </div>

        <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
          <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] mb-6">Related & Recommended Anime</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              class="flex items-center space-x-3 cursor-pointer group bg-finime-light-gray rounded-lg p-3 hover:bg-gray-600 transition-colors"
            >
              <div
                class="w-12 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded flex-shrink-0"
              ></div>
              <div class="flex-1 min-w-0">
                <h4
                  class="font-medium text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Attack on Titan: Junior High
                </h4>
                <p class="text-gray-400 text-xs">Spin-off • Comedy</p>
                <div class="text-yellow-400 text-xs">★ 7.1 • 12 Episodes</div>
              </div>
            </div>
            <div
              class="flex items-center space-x-3 cursor-pointer group bg-finime-light-gray rounded-lg p-3 hover:bg-gray-600 transition-colors"
            >
              <div
                class="w-12 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex-shrink-0"
              ></div>
              <div class="flex-1 min-w-0">
                <h4
                  class="font-medium text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Attack on Titan: Lost Girls
                </h4>
                <p class="text-gray-400 text-xs">OVA • Drama</p>
                <div class="text-yellow-400 text-xs">★ 7.8 • 3 Episodes</div>
              </div>
            </div>
            <div
              class="flex items-center space-x-3 cursor-pointer group bg-finime-light-gray rounded-lg p-3 hover:bg-gray-600 transition-colors"
            >
              <div
                class="w-12 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded flex-shrink-0"
              ></div>
              <div class="flex-1 min-w-0">
                <h4
                  class="font-medium text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Tokyo Ghoul
                </h4>
                <p class="text-gray-400 text-xs">Similar • Dark Fantasy</p>
                <div class="text-yellow-400 text-xs">★ 7.8 • 48 Episodes</div>
              </div>
            </div>
            <div
              class="flex items-center space-x-3 cursor-pointer group bg-finime-light-gray rounded-lg p-3 hover:bg-gray-600 transition-colors"
            >
              <div
                class="w-12 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded flex-shrink-0"
              ></div>
              <div class="flex-1 min-w-0">
                <h4
                  class="font-medium text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Demon Slayer
                </h4>
                <p class="text-gray-400 text-xs">Recommended • Action</p>
                <div class="text-yellow-400 text-xs">★ 8.7 • 44 Episodes</div>
              </div>
            </div>
            <div
              class="flex items-center space-x-3 cursor-pointer group bg-finime-light-gray rounded-lg p-3 hover:bg-gray-600 transition-colors"
            >
              <div
                class="w-12 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded flex-shrink-0"
              ></div>
              <div class="flex-1 min-w-0">
                <h4
                  class="font-medium text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Vinland Saga
                </h4>
                <p class="text-gray-400 text-xs">Recommended • Historical</p>
                <div class="text-yellow-400 text-xs">★ 9.0 • 48 Episodes</div>
              </div>
            </div>
            <div
              class="flex items-center space-x-3 cursor-pointer group bg-finime-light-gray rounded-lg p-3 hover:bg-gray-600 transition-colors"
            >
              <div
                class="w-12 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded flex-shrink-0"
              ></div>
              <div class="flex-1 min-w-0">
                <h4
                  class="font-medium text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Jujutsu Kaisen
                </h4>
                <p class="text-gray-400 text-xs">Recommended • Supernatural</p>
                <div class="text-yellow-400 text-xs">★ 8.5 • 24 Episodes</div>
              </div>
            </div>
          </div>
          <button
            class="mt-4 text-red-500 hover:text-red-400 transition-colors text-sm font-medium"
          >
            View More Recommendations →
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .image-zoom {
    transition: transform 0.3s ease;
  }
  .image-zoom:hover {
    transform: scale(1.05);
  }
  .episode-item {
    transition: all 0.2s ease;
  }
  .episode-item:hover {
    transform: translateX(4px);
  }
  .social-share {
    transition: all 0.2s ease;
  }
  .social-share:hover {
    transform: translateY(-2px);
  }
  .progress-bar {
    transition: width 0.3s ease;
  }
  .video-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
  }
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 768px) {
    .mobile-optimized {
      padding: 0.75rem;
    }
  }
</style>
