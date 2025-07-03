<script lang="ts">
  import Input from "$components/elements/Input.svelte";
  import Button from "$components/elements/Button.svelte";

  import { Search } from "@lucide/svelte";

  let query = "";
  let timeoutId: NodeJS.Timeout | null = null;

  export let placeholder: string;
  export let onSearch: (query: string) => void;
  export let varian: "navbar" | "default" = "default";

  function handleSearch() {
    if (timeoutId) clearTimeout(timeoutId);
    if (query.trim()) {
      onSearch(query);
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
</script>

<div class="flex items-center space-x-2 w-full md:px-0 px-5 max-w-md">
  <div class="relative items-center">
    {#if varian == "navbar"}
      <Search class="absolute top-0 bottom-0 left-3 opacity-70 my-auto" />
    {/if}
    <Input
      type="text"
      value={query}
      {placeholder}
      {varian}
      classes="flex-grow px-4 py-2 {varian == 'default'
        ? 'border border-[hsl(var(--primary))] rounded-l-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
        : 'pl-12 outline-none'} transition-colors duration-300 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
      on:input={(e) => handleInputChange(e.detail)}
      handleOnKeyDown={handleSearch}
    />
  </div>

  {#if varian == "default"}
    <Button variant="primary" classes="px-6 py-2 rounded-r-md" on:click={handleSearch}>
      Search
    </Button>
  {/if}
</div>
