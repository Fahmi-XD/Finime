<script lang="ts">
  import { onMount } from "svelte";
  import { X, Network } from "@lucide/svelte";

  let showPopup = false;
  let isHovering = false;

  // onMount(() => {
  //   if ( !window.navigator.onLine ) {
  //     setTimeout(() => (showPopup = true), 1500);
  //   }
  // });

  function submitButton() {
    console.log("Tombol submit ditekan");
  }

  function closePopup() {
    showPopup = false;
  }
</script>

{#if showPopup}
  <div
    class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    style="background: hsla(var(--background)/0.8); backdrop-filter: blur(8px)"
  >
    <div
      class="relative w-full max-w-md rounded-xl border"
      style="background: hsl(var(--popover)); border-color: hsl(var(--border)); box-shadow: 0 20px 40px -10px hsla(var(--foreground)/0.1)"
    >
      <!-- Close button -->
      <button
        on:click={closePopup}
        on:mouseenter={() => (isHovering = true)}
        on:mouseleave={() => (isHovering = false)}
        class="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border"
        style="background: hsl(var(--background)); border-color: hsl(var(--border))"
        aria-label="Close donation popup"
      >
        <X
          class="h-4 w-4 transition-all duration-300"
          style="color: hsl(var(--foreground))"
        />
      </button>

      <!-- Content -->
      <div class="p-6">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg"
              style="background: hsla(var(--primary)/0.1)"
            >
              <!-- <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                ></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg> -->
              <Network />
            </div>
            <h3
              class="text-lg font-semibold text-red-500"
            >
              Network Error!
            </h3>
          </div>

          <p
            class="text-sm leading-relaxed"
            style="color: hsl(var(--muted-foreground))"
          >
            Enjoying our platform? Your donation helps us continue development
            and bring you even better features.
          </p>

          <p class="text-xs" style="color: hsl(var(--muted-foreground))">
            Every contribution makes a difference. Thank you for your support!
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}
