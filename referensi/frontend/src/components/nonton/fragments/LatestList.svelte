<script lang="ts">
  export let items: any;
  export let title: string;
</script>

<div
  class="bg-[hsl(var(--background))] rounded-3xl border border-[hsl(var(--border)/0.3)] shadow-xl p-6 relative overflow-hidden"
>
  <div
    class="absolute -inset-2 bg-gradient-to-r from-[hsl(var(--primary)/0.08)] to-[hsl(var(--tertiary)/0.08)] rounded-3xl blur-lg opacity-60 pointer-events-none"
  ></div>
  <h2 class="text-2xl font-bold mb-6 text-[hsl(var(--primary))]">{title}</h2>
  <div class="flex gap-4 overflow-x-auto pb-2">
    {#each items as item}
      <div class="min-w-[140px] max-w-[160px] bg-[hsl(var(--background))] rounded-2xl border border-[hsl(var(--border)/0.2)] shadow-lg p-2 flex flex-col items-center relative group transition-transform duration-300 hover:scale-105">
        <div class="absolute -inset-1 bg-gradient-to-br from-[hsl(var(--primary)/0.12)] to-[hsl(var(--tertiary)/0.12)] rounded-2xl blur-md opacity-50 group-hover:opacity-80 transition-opacity"></div>
        <img src={item.cover} alt={item.title} class="relative w-full rounded-xl mb-2 border border-[hsl(var(--border)/0.2)] shadow" />
        <div class="relative z-10 text-center">
          <div class="font-semibold text-[hsl(var(--foreground))] text-base mb-1">{item.title}</div>
          <div class="text-xs text-[hsl(var(--muted-foreground))] line-clamp-2">{item.desc}</div>
        </div>
      </div>
    {/each}
  </div>
</div>