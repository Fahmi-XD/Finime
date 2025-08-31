<script lang="ts">
  import { Loader } from "@lucide/svelte";

  import SkeletonLoading from "./SkeletonLoading.svelte";

  export let variant: "fixed" | "absolute" | "normal" = "fixed";
  export let teks: string = "Loading...";
</script>

<div class="{variant} inset-0 flex {variant === "absolute" ? "z-[0]" : ""} justify-center items-center bg-[hsl(var(--background))] z-50">
  <div class="text-center justify-center items-center space-y-2 flex flex-col">
    <img src="/images/loading-1.jpg" alt="Karbit banget yah" class="h-30 w-30 rounded-2xl border border-white/50">
    <!-- <Loader class="w-10 h-10 animate-spin mt-3" color="red" /> -->
     <SkeletonLoading type="text" className="!h-[15px] !w-[200px]" />
    <p class="text-[hsl(var(--primary))]">{teks}</p>
  </div>
</div>
