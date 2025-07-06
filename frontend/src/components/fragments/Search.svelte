<script lang="ts">
  import Input from "$components/elements/Input.svelte";
  import Button from "$components/elements/Button.svelte";

  import { Search, SlidersHorizontal } from "@lucide/svelte";

  let query = "";
  let timeoutId: NodeJS.Timeout | null = null;

  export let placeholder: string;
  export let onSearch: (query: string) => void;
  export let varian: "navbar" | "default" = "default";
  export let size: "small" | "large" = "small";
  export let handleFilterIsOpen: () => void;

  function handleSearch() {
    if (timeoutId) clearTimeout(timeoutId);
    if (query.trim()) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        onSearch(query);
        query = "";
      }, 200);
    }
  }

  function handleInputChange(newValue: string) {
    query = newValue;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      onSearch(query);
    }, 1_500);
  }

  // on:input={(e) => handleInputChange(e.detail)}
</script>

<div class="space-x-2 w-full {varian === 'default' ? 'max-w-md' : ''}">
  <div class="relative items-center">
    {#if varian == "navbar"}
      <Search class="absolute top-0 bottom-0 left-3 opacity-70 my-auto" />
    {/if}
    <Input
      type="text"
      bind:value={query}
      {placeholder}
      {varian}
      classes="flex px-4 py-2 {varian == 'default'
        ? 'border border-[hsl(var(--primary))] rounded-l-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
        : 'pl-12 outline-none'} {size === 'small'
        ? 'min-w-[350px]'
        : 'min-w-[100%]'} transition-colors duration-300 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
      handleOnKeyDown={handleSearch}
    />
    {#if varian == "navbar"}
      <SlidersHorizontal onclick={handleFilterIsOpen} class="absolute cursor-pointer top-0 bottom-0 right-3 opacity-70 my-auto" />
    {/if}
  </div>

  {#if varian == "default"}
    <Button variant="primary" classes="px-6 py-2 rounded-r-md" on:click={handleSearch}>
      Search
    </Button>
  {/if}
</div>
