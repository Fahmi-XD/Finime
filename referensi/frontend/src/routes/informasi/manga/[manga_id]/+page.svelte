<script lang="ts">
  import type { IMangaSlug } from "./+page";

  export let data: IMangaSlug;
</script>

<section class="mt-20">
  <div class="md:hidden bg-finime-gray border-b border-finime-light-gray hidden" id="mobile-menu">
    <div class="px-4 py-2 space-y-1">
      <a href="#" class="block px-3 py-2 text-gray-400 hover:text-[hsl(var(--foreground))] transition-colors">Anime</a>
      <a href="#" class="block px-3 py-2 text-red-500 font-medium">Manga</a>
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
      <a href="#" class="text-gray-400 hover:text-[hsl(var(--foreground))] transition-colors">Manga</a>
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
                    <div class="text-[hsl(var(--foreground))] font-bold text-sm">Volume 34</div>
                    <div class="text-gray-300 text-xs">Final Volume</div>
                    <div class="flex items-center mt-2">
                      <span class="text-yellow-400 text-sm">★</span>
                      <span class="text-[hsl(var(--foreground))] text-sm ml-1">9.2</span>
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
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <button
              class="w-full px-4 py-3 bg-red-500 text-[hsl(var(--foreground))] rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
              Read Now
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
              Add to Library
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
                <span class="text-gray-400">Author:</span>
                <span class="text-[hsl(var(--foreground))] text-right">Hajime Isayama</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Artist:</span>
                <span class="text-[hsl(var(--foreground))] text-right">Hajime Isayama</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Status:</span>
                <span class="text-green-400 text-right">Completed</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Published:</span>
                <span class="text-[hsl(var(--foreground))] text-right">Sep 9, 2009 - Apr 9, 2021</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Magazine:</span>
                <span class="text-[hsl(var(--foreground))] text-right">Bessatsu Shōnen Magazine</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Publisher:</span>
                <span class="text-[hsl(var(--foreground))] text-right">Kodansha</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Demographic:</span>
                <span class="text-[hsl(var(--foreground))] text-right">Shōnen</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Chapters:</span>
                <span class="text-[hsl(var(--foreground))] text-right">139</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Volumes:</span>
                <span class="text-[hsl(var(--foreground))] text-right">34</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Score:</span>
                <span class="text-yellow-400 text-right">9.2/10</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Popularity:</span>
                <span class="text-[hsl(var(--foreground))] text-right">#1</span>
              </div>
              <div class="flex justify-between items-start">
                <span class="text-gray-400">Members:</span>
                <span class="text-[hsl(var(--foreground))] text-right">1,234,567</span>
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
                >Tragedy</span
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
            <span class="text-gray-400 text-sm">2009-2021 • 139 Chapters • Monthly</span>
          </div>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--foreground))] mb-3">
            Attack on Titan
          </h1>
          <h2 class="text-lg md:text-xl text-gray-300 mb-4">進撃の巨人 (Shingeki no Kyojin)</h2>
          <div class="flex items-center space-x-6 mb-6">
            <div class="flex items-center">
              <span class="text-yellow-400 text-xl md:text-2xl mr-2">★</span>
              <span class="text-[hsl(var(--foreground))] text-lg md:text-xl font-semibold">9.2</span>
              <span class="text-gray-400 ml-2 text-sm">(78,542 votes)</span>
            </div>
            <div class="text-gray-400 text-sm md:text-base">
              <span>Action, Drama, Fantasy, Military</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mobile-optimized">
          <div class="bg-finime-gray rounded-lg p-3 md:p-4 text-center">
            <div class="text-xl md:text-2xl font-bold text-red-500">139</div>
            <div class="text-gray-400 text-xs md:text-sm">Chapters</div>
          </div>
          <div class="bg-finime-gray rounded-lg p-3 md:p-4 text-center">
            <div class="text-xl md:text-2xl font-bold text-red-500">34</div>
            <div class="text-gray-400 text-xs md:text-sm">Volumes</div>
          </div>
          <div class="bg-finime-gray rounded-lg p-3 md:p-4 text-center">
            <div class="text-xl md:text-2xl font-bold text-red-500">12</div>
            <div class="text-gray-400 text-xs md:text-sm">Years</div>
          </div>
          <div class="bg-finime-gray rounded-lg p-3 md:p-4 text-center">
            <div class="text-xl md:text-2xl font-bold text-red-500">100M+</div>
            <div class="text-gray-400 text-xs md:text-sm">Copies Sold</div>
          </div>
        </div>

        <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
          <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] mb-4">Synopsis</h2>
          <div class="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
            <p>
              Several hundred years ago, humans were nearly exterminated by giants. Giants are
              typically several stories tall, seem to have no intelligence, devour human beings and,
              worst of all, seem to do it for the pleasure rather than as a food source. A small
              percentage of humanity survived by walling themselves in a city protected by extremely
              high walls, even taller than the biggest of giants.
            </p>
            <p>
              Flash forward to the present and the city has not seen a giant in over 100 years.
              Teenage boy Eren and his foster sister Mikasa witness something horrific as the city
              walls are destroyed by a colossal giant that appears out of thin air. As the smaller
              giants flood the city, the two kids watch in horror as Eren's mother is eaten alive.
              Eren vows that he will murder every single giant and take revenge for all of mankind.
            </p>
            <p>
              What follows is an epic tale of survival, mystery, and the dark truths behind
              humanity's struggle against the Titans. Hajime Isayama crafts a masterpiece that
              explores themes of freedom, sacrifice, and the cyclical nature of violence through
              stunning artwork and complex character development that has captivated millions of
              readers worldwide.
            </p>
            <p>
              The series is renowned for its intricate plot twists, morally complex characters, and
              its unflinching examination of war, prejudice, and the price of freedom. As the story
              progresses, readers discover that the true enemy may not be the Titans themselves, but
              the cycle of hatred and revenge that has plagued humanity for generations.
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
            <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))]">Chapters</h2>
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
                <option>Latest First</option>
                <option>Oldest First</option>
                <option>By Volume</option>
                <option>By Rating</option>
              </select>
              <button
                class="px-4 py-2 bg-red-500 text-[hsl(var(--foreground))] rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
              >
                Continue Reading
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6">
            <div
              class="chapter-item flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-finime-light-gray rounded-lg hover:bg-gray-600 transition-all cursor-pointer group"
            >
              <div
                class="w-12 md:w-16 h-16 md:h-20 bg-gradient-to-br from-red-500 to-red-800 rounded flex-shrink-0 relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                <div class="absolute bottom-1 right-1 bg-black bg-opacity-60 rounded px-1">
                  <span class="text-[hsl(var(--foreground))] text-xs">139</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Chapter 139: Final Chapter
                </h3>
                <p class="text-gray-400 text-xs md:text-sm mb-1 line-clamp-2">
                  The conclusion of humanity's fight against the Titans
                </p>
                <div class="flex items-center justify-between">
                  <div class="text-gray-500 text-xs">Apr 9, 2021</div>
                  <div class="flex items-center space-x-2">
                    <span class="text-red-500 text-xs bg-red-500/20 px-2 py-1 rounded"
                      >New</span
                    >
                    <svg
                      class="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="chapter-item flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-finime-light-gray rounded-lg hover:bg-gray-600 transition-all cursor-pointer group"
            >
              <div
                class="w-12 md:w-16 h-16 md:h-20 bg-gradient-to-br from-red-500 to-red-800 rounded flex-shrink-0 relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                <div class="absolute bottom-1 right-1 bg-black bg-opacity-60 rounded px-1">
                  <span class="text-[hsl(var(--foreground))] text-xs">138</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Chapter 138: A Long Dream
                </h3>
                <p class="text-gray-400 text-xs md:text-sm mb-1 line-clamp-2">
                  Eren's final moments and the truth revealed
                </p>
                <div class="flex items-center justify-between">
                  <div class="text-gray-500 text-xs">Mar 9, 2021</div>
                  <svg
                    class="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div
              class="chapter-item flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-finime-light-gray rounded-lg hover:bg-gray-600 transition-all cursor-pointer group"
            >
              <div
                class="w-12 md:w-16 h-16 md:h-20 bg-gradient-to-br from-red-500 to-red-800 rounded flex-shrink-0 relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                <div class="absolute bottom-1 right-1 bg-black bg-opacity-60 rounded px-1">
                  <span class="text-[hsl(var(--foreground))] text-xs">137</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Chapter 137: Titans
                </h3>
                <p class="text-gray-400 text-xs md:text-sm mb-1 line-clamp-2">
                  The battle reaches its climax
                </p>
                <div class="flex items-center justify-between">
                  <div class="text-gray-500 text-xs">Feb 9, 2021</div>
                  <svg
                    class="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div
              class="chapter-item flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-finime-light-gray rounded-lg hover:bg-gray-600 transition-all cursor-pointer group"
            >
              <div
                class="w-12 md:w-16 h-16 md:h-20 bg-gradient-to-br from-red-500 to-red-800 rounded flex-shrink-0 relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                <div class="absolute bottom-1 right-1 bg-black bg-opacity-60 rounded px-1">
                  <span class="text-[hsl(var(--foreground))] text-xs">136</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Chapter 136: Dedicate Your Heart
                </h3>
                <p class="text-gray-400 text-xs md:text-sm mb-1 line-clamp-2">
                  The Survey Corps makes their final stand
                </p>
                <div class="flex items-center justify-between">
                  <div class="text-gray-500 text-xs">Jan 9, 2021</div>
                  <svg
                    class="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div
              class="chapter-item flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-finime-light-gray rounded-lg hover:bg-gray-600 transition-all cursor-pointer group"
            >
              <div
                class="w-12 md:w-16 h-16 md:h-20 bg-gradient-to-br from-red-500 to-red-800 rounded flex-shrink-0 relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                <div class="absolute bottom-1 right-1 bg-black bg-opacity-60 rounded px-1">
                  <span class="text-[hsl(var(--foreground))] text-xs">135</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Chapter 135: Battle of Heaven and Earth
                </h3>
                <p class="text-gray-400 text-xs md:text-sm mb-1 line-clamp-2">
                  The final battle begins
                </p>
                <div class="flex items-center justify-between">
                  <div class="text-gray-500 text-xs">Dec 9, 2020</div>
                  <svg
                    class="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div
              class="chapter-item flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-finime-light-gray rounded-lg hover:bg-gray-600 transition-all cursor-pointer group"
            >
              <div
                class="w-12 md:w-16 h-16 md:h-20 bg-gradient-to-br from-red-500 to-red-800 rounded flex-shrink-0 relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                <div class="absolute bottom-1 right-1 bg-black bg-opacity-60 rounded px-1">
                  <span class="text-[hsl(var(--foreground))] text-xs">134</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3
                  class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors truncate text-sm md:text-base"
                >
                  Chapter 134: In the Depths of Despair
                </h3>
                <p class="text-gray-400 text-xs md:text-sm mb-1 line-clamp-2">
                  The world faces its darkest hour
                </p>
                <div class="flex items-center justify-between">
                  <div class="text-gray-500 text-xs">Nov 9, 2020</div>
                  <svg
                    class="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <button
            class="w-full px-4 py-3 text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-[hsl(var(--foreground))] transition-colors font-medium"
          >
            Load More Chapters (133 remaining)
          </button>
        </div>

        <div class="bg-finime-gray rounded-lg p-4 md:p-6 mobile-optimized">
          <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] mb-6">Main Characters</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div class="text-center group cursor-pointer">
              <div
                class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full mx-auto mb-3 group-hover:scale-105 transition-transform"
              ></div>
              <h3
                class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors text-sm md:text-base"
              >
                Eren Yeager
              </h3>
              <p class="text-gray-400 text-xs md:text-sm">Protagonist</p>
            </div>
            <div class="text-center group cursor-pointer">
              <div
                class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full mx-auto mb-3 group-hover:scale-105 transition-transform"
              ></div>
              <h3
                class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors text-sm md:text-base"
              >
                Mikasa Ackerman
              </h3>
              <p class="text-gray-400 text-xs md:text-sm">Main Character</p>
            </div>
            <div class="text-center group cursor-pointer">
              <div
                class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mx-auto mb-3 group-hover:scale-105 transition-transform"
              ></div>
              <h3
                class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors text-sm md:text-base"
              >
                Armin Arlert
              </h3>
              <p class="text-gray-400 text-xs md:text-sm">Main Character</p>
            </div>
            <div class="text-center group cursor-pointer">
              <div
                class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full mx-auto mb-3 group-hover:scale-105 transition-transform"
              ></div>
              <h3
                class="font-semibold text-[hsl(var(--foreground))] group-hover:text-red-500 transition-colors text-sm md:text-base"
              >
                Levi Ackerman
              </h3>
              <p class="text-gray-400 text-xs md:text-sm">Captain</p>
            </div>
          </div>
          <button
            class="mt-4 text-red-500 hover:text-red-400 transition-colors text-sm font-medium"
          >
            View All Characters →
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
                    <div class="font-semibold text-[hsl(var(--foreground))] text-sm md:text-base">MangaFan2024</div>
                    <div class="text-gray-400 text-xs md:text-sm">2 days ago</div>
                  </div>
                </div>
                <div class="flex items-center">
                  <span class="text-yellow-400 mr-1 text-sm">★★★★★</span>
                  <span class="text-[hsl(var(--foreground))] font-semibold text-sm">10/10</span>
                </div>
              </div>
              <p class="text-gray-300 leading-relaxed text-sm md:text-base">
                "Absolutely masterful storytelling. Isayama created something truly special that
                will be remembered for decades. The way he weaves together mystery, action, and deep
                philosophical themes is unparalleled."
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
                  124
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
                    <div class="font-semibold text-[hsl(var(--foreground))] text-sm md:text-base">TitanSlayer</div>
                    <div class="text-gray-400 text-xs md:text-sm">1 week ago</div>
                  </div>
                </div>
                <div class="flex items-center">
                  <span class="text-yellow-400 mr-1 text-sm">★★★★☆</span>
                  <span class="text-[hsl(var(--foreground))] font-semibold text-sm">9/10</span>
                </div>
              </div>
              <p class="text-gray-300 leading-relaxed text-sm md:text-base">
                "The ending was controversial but I think it fits the themes perfectly. The art
                evolution throughout the series is incredible and the character development is
                top-tier."
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
                  89
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
          <h2 class="text-xl md:text-2xl font-bold text-[hsl(var(--foreground))] mb-6">Related & Recommended</h2>
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
                  Attack on Titan: Before the Fall
                </h4>
                <p class="text-gray-400 text-xs">Prequel • Ryo Suzukaze</p>
                <div class="text-yellow-400 text-xs">★ 8.1 • 45 Chapters</div>
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
                <p class="text-gray-400 text-xs">Spin-off • Hiroshi Seko</p>
                <div class="text-yellow-400 text-xs">★ 7.8 • 9 Chapters</div>
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
                <p class="text-gray-400 text-xs">Similar • Sui Ishida</p>
                <div class="text-yellow-400 text-xs">★ 8.7 • 143 Chapters</div>
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
                <p class="text-gray-400 text-xs">Recommended • Makoto Yukimura</p>
                <div class="text-yellow-400 text-xs">★ 9.0 • 200+ Chapters</div>
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
  .chapter-item {
    transition: all 0.2s ease;
  }
  .chapter-item:hover {
    transform: translateX(4px);
  }
  .social-share {
    transition: all 0.2s ease;
  }
  .social-share:hover {
    transform: translateY(-2px);
  }
  .sticky-nav {
    backdrop-filter: blur(10px);
  }
  @media (max-width: 768px) {
    .mobile-optimized {
      padding: 0.75rem;
    }
  }
</style>
