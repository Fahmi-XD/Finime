<script lang="ts">
  import { Loader } from "@lucide/svelte";

  export let variant: "fixed" | "absolute" = "fixed";
  export let teks: string = "Loading...";
</script>

<div class="{variant} inset-0 flex {variant === "absolute" ? "z-[0]" : ""} justify-center items-center bg-[hsl(var(--background))] z-50">
  <div class="text-center justify-center items-center space-y-2 flex flex-col">
    <Loader class="w-10 h-10 animate-spin" />
    <p class="text-[hsl(var(--primary))]">{teks}</p>
  </div>
</div>
