<script lang="ts">
  import { FetchApi } from "$/utils/Fetch";
  import Search from "$components/fragments/Search.svelte";
  import ResultSearchLayout from "$components/layouts/ResultSearchLayout.svelte";

  let searchResults: {
    title: string;
    type: string;
    endpoint: string;
    updated_on: string;
    thumb: string;
    sortDesc: string;
  }[] = [];

  let hasInteracted = false;
  let isLoading = true;

  async function handleSearch(query: string) {
    hasInteracted = true;
    isLoading = true;

    if (!query.trim()) {
      searchResults = [];
      hasInteracted = false;
      return;
    }

    try {
      const response = await FetchApi.get(`/manga/search?q=${query}`);
      isLoading = false;
      if (response.status && response.data.manga_list) {
        searchResults = response.data.manga_list;
      } else {
        searchResults = [];
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      searchResults = [];
    }
  }
</script>

<div class="bg-[hsl(var(--background))]">
  <div class="flex justify-center items-center">
    <Search placeholder="Search manga..." onSearch={(e) => handleSearch(e)} />
  </div>

  {#if hasInteracted}
    <div class="mt-8 mx-auto">
      <ResultSearchLayout {isLoading} mangaList={searchResults} />
    </div>
  {/if}
</div>
