<script lang="ts">
  import Account from "$lib/components/fragments/Account.svelte";
  import { page } from "$app/state";
  import { badges as badgesStore } from "$lib/stores/user";

  const fragmentObj: any = {
    account: Account
  };

  let user = page.data.user;
  $: badges = $badgesStore.filter((badge) => user.badges.includes(badge.id));

  let currentFragment = fragmentObj.account;
  let currentFragmantString = "account";

  function handleFragment(fragment: string) {
    currentFragmantString = fragment;
    currentFragment = (fragmentObj as any)[fragment];
  }
</script>

<section
  class="max-w-7xl text-red-500 mt-20 w-full bg-[hsl(var(--background))] mx-auto px-4 sm:px-6 lg:px-8 py-8"
>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
    <div class="lg:col-span-1 flex">
      <nav class="space-y-2 flex flex-col w-full items-center">
        <button
          on:click={() => handleFragment("account")}
          class="flex text-center w-full items-center justify-center cursor-pointer px-4 py-3 {currentFragmantString === 'account'
            ? 'text-red-500'
            : 'text-gray-400'} hover:text-red-500 text-finime-red bg-finime-gray rounded-lg font-medium"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          Account
        </button>
      </nav>
    </div>

    <div class="lg:col-span-3">
      <svelte:component this={currentFragment} user={user} badges={badges}/>

      <!-- <div class="flex ml-auto w-auto flex-col sm:flex-row gap-4 pt-6">
        <button
          class="px-6 ml-auto py-3 disabled:opacity-70 disabled:bg-red-500/50 disabled:cursor-no-drop cursor-pointer bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          Save Changes
        </button>
        <button
          class="px-6 py-3 cursor-pointer bg-finime-light-gray text-gray-300 rounded-lg font-medium hover:bg-gray-600 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div> -->
    </div>
  </div>
</section>
