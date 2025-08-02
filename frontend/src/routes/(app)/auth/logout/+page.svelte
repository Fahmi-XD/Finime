<script lang="ts">
  import { goto } from '$app/navigation';
  import LoadingElements from '$lib/components/ui/LoadingElements.svelte';
  import { onMount } from 'svelte';
  import Cookie from "js-cookie"
  import toast from 'svelte-french-toast';
  import { toastOption } from '$lib/config/app';

  let isLoading = true;

  onMount(() => {
    Cookie.remove('token');
    toast.loading("Logout ...", toastOption);

    setTimeout(() => {
      isLoading = false;
      goto('/auth/login', {
        invalidateAll: true,
      });
    }, 2000);
  });
</script>

{#if isLoading}
  <LoadingElements teks="Logging out..." />
{/if}