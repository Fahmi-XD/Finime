<script lang="ts">
  import { title } from "$lib/config/app";
  import { Facebook, Twitter, Instagram, Send } from "@lucide/svelte";
</script>

<footer
  class="relative bg-[hsl(var(--background))] text-[hsl(var(--foreground))] overflow-hidden"
>
  <div class="relative max-w-7xl mx-auto px-4 py-12 sm:py-16">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
      <div class="space-y-4">
        <h3 class="text-xl font-bold text-[hsl(var(--primary))]">
          About {title}
        </h3>
        <p class="text-sm text-[hsl(var(--muted-foreground))]">
          Your ultimate destination for reading manga online. Discover thousands
          of titles, connect with fellow fans, and enjoy seamless reading.
        </p>
      </div>

      <div class="space-y-4">
        <h3 class="text-xl font-bold text-[hsl(var(--primary))]">
          Quick Links
        </h3>
        <ul class="space-y-2">
          <li><a href="/">Home</a></li>
          <li><a href="/anime">Explore Anime</a></li>
          <li><a href="/manga">Explore Manga</a></li>
          <li><a href="/community">Community</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>

      <div class="space-y-4">
        <h3 class="text-xl font-bold text-[hsl(var(--primary))]">Follow Us</h3>
        <div class="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
          >
            <Facebook
              class="w-5 h-5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300"
            />
          </a>
          <a href="https://twitter.com" target="_blank" aria-label="Twitter">
            <Twitter
              class="w-5 h-5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
          >
            <Instagram
              class="w-5 h-5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300"
            />
          </a>
          <a href="https://discord.com" target="_blank" aria-label="Discord">
            <Send
              class="w-5 h-5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors duration-300"
            />
          </a>
        </div>
      </div>
    </div>

    <div
      class="mt-12 border-t border-[hsl(var(--border))] pt-6 text-center text-sm text-[hsl(var(--muted-foreground))]"
    >
      &copy; {new Date().getFullYear()} Finime. All rights reserved.
    </div>
  </div>
</footer>
