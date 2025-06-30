<script lang="ts">
  export let variant: "admin" | "member" | "badge";
  export let color: string = "";
</script>

<span
  class="text-[12px] px-1 py-0.5 flex items-center rounded font-medium {variant == "badge" ? `${color}` : variant === 'admin' ? 'bg-red-500/10 text-red-500' : 'bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]'}"
>
  <slot>{variant.toUpperCase()}</slot>
</span>
