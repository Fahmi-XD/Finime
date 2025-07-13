<script lang="ts">
  import Account from "$/components/fragments/Account.svelte";
  import Preferences from "$/components/fragments/Preferences.svelte";
  import { modeStore } from "$/stores/providerStore"

  let mode: string = $modeStore;
  let isDisable: boolean = true;

  const fragmentObj: any = {
    account: Account,
    preferences: Preferences,
  };

  let currentFragment = fragmentObj.account;
  let currentFragmantString = "account";

  function handleFragment(fragment: string) {
    currentFragmantString = fragment;
    currentFragment = (fragmentObj as any)[fragment];
  }

  $: {
    isDisable = $modeStore === mode;
  }

  function handleMode() {
    modeStore.set(mode);
    isDisable = true;
  }
</script>

<section
  class="max-w-7xl text-[hsl(var(--foreground))] mt-20 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8"
>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
    <div class="lg:col-span-1">
      <nav class="space-y-2">
        <button
          on:click={() => handleFragment("account")}
          class="flex items-center cursor-pointer px-4 py-3 {currentFragmantString === 'account'
            ? 'text-[hsl(var(--foreground))]'
            : 'text-gray-400'} hover:text-[hsl(var(--foreground))] text-finime-red bg-finime-gray rounded-lg font-medium"
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
        <button
          on:click={() => handleFragment("preferences")}
          class="flex items-center cursor-pointer px-4 py-3 {currentFragmantString === 'preferences'
            ? ''
            : 'text-gray-400'} hover:text-[hsl(var(--foreground))] hover:bg-finime-gray rounded-lg transition-colors"
        >
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            >
            </path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          Preferences
        </button>
      </nav>
    </div>

    <div class="lg:col-span-3">
      <svelte:component this={currentFragment} bind:mode={mode as string} />

      <div class="flex ml-auto w-auto flex-col sm:flex-row gap-4 pt-6">
        <button
          disabled={isDisable}
          on:click={handleMode}
          class="px-6 ml-auto py-3 disabled:opacity-70 disabled:bg-red-500/50 disabled:cursor-no-drop cursor-pointer bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          Save Changes
        </button>
        <button
          class="px-6 py-3 cursor-pointer bg-finime-light-gray text-gray-300 rounded-lg font-medium hover:bg-gray-600 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</section>
