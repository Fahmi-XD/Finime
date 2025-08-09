<script lang="ts">
  import { PUBLIC_API } from "$env/static/public";
  import { BadgeCheckIcon } from "@lucide/svelte";
  import { UserClient } from "$lib/api/clients/userClient";
  import { invalidateAll } from "$app/navigation";
  import { Loader, CloudUpload } from "@lucide/svelte";
  import toast from 'svelte-french-toast';
	import { toastOption } from "$lib/config/app";

  export let user: any;
  export let badges: any;

  let form = {
    username: user.username || "",
    name: user.name || "",
    email: user.email || "",
    bio: user.bio || "",
    banner: user.banner || "",
    avatar: user.avatar || "",
    avatarFile: null as File | null,
    pronoun: user.pronoun || ""
  }
  let isLoading = false;

  function getInitials(name: string) {
    return name ? name.charAt(0).toUpperCase() : "?";
  }

  async function updateUser() {
    try {
      isLoading = true;
      const response = await UserClient.updateUser(form, form.avatarFile);
      await invalidateAll();
      toast.success("Berhasil memperbarui profile", toastOption);
    } catch (error) {
      console.error(error);
      toast.error("Gagal memperbarui profile", toastOption);
    } finally {
      isLoading = false;
      window.history.back();
    }
  }

  function handleAvatarChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      form.avatarFile = file;
      form.avatar = URL.createObjectURL(file);
    }
  }
</script>

<section class="relative flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
  <div class="absolute top-10 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
  <div class="absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
  <div class="absolute bottom-40 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

  <div class="relative z-10 w-full max-w-4xl mx-auto">
    <div class="bg-[hsl(var(--background))] backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/10">
      <div class="flex flex-col md:flex-row">
        
        <div class="w-full md:w-1/3 p-0 pt-0 bg-gradient-to-b from-red-500/10 to-transparent flex flex-col items-center">
          
          <div class="relative w-full">
            {#if form.banner && form.banner.includes("mp4")}
              <video class="h-[160px] w-full object-cover rounded-xl" autoplay loop muted playsinline>
                <source src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={form.banner}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            {:else if form.banner}
              <img class="h-[160px] w-full object-cover rounded-xl" src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={form.banner}" alt={form.name} />
            {:else}
              <img class="h-[160px] w-full object-cover rounded-xl" src="placeholder.png" alt={form.name} />
            {/if}

            <div class="flex mt-5 items-center justify-around">
              <div class="">
                {#if form.avatar}
                  <img class="h-[145px] w-[145px] rounded-full border-4 border-white shadow-lg object-cover bg-white" src="{form.avatar}" alt={form.name} />
                {:else}
                <div class="flex items-center border-4 rounded-full border-red-500/30 bg-white/50 justify-center w-32 h-32 text-4xl font-bold text-white bg-gradient-to-br from-red-500 to-blue-500">
                  {getInitials(form.name)}
                </div>
                {/if}
              </div>

              <div class="flex flex-col items-center mt-4">
                <h2 class="text-2xl font-bold text-white text-center">{form.name}</h2>
                <p class="text-gray-400 text-sm mb-2">@{form.username} {form?.pronoun ? `(${form?.pronoun})` : ""}</p>
                <div class="flex items-center gap-2 mb-2">
                  <span class="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold">{user.role}</span>
                  {#if user.isVerify}
                    <BadgeCheckIcon class="text-blue-400" />
                  {/if}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 flex flex-col items-center w-full">
            <div class="flex flex-wrap gap-2 justify-center mt-2">
              {#each badges as badge}
                <span class="inline-flex items-center gap-1 px-3 py-1 bg-white/20 border-l-4 border-red-500 text-white text-xs font-semibold shadow">
                  <svelte:component this={badge.icon} size={14} /> {badge.name}
                </span>
              {/each}
            </div>
            <div class="mt-8 w-full px-8">
              <label for="bio" class="block text-sm font-medium text-gray-300 mb-2">Bio</label>
              <textarea
                class="w-full px-4 py-2 bg-[hsl(var(--background))] border border-white/20 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-all resize-none min-h-[60px] mb-2"
                placeholder="Tulis sesuatu tentang dirimu..."
                id="bio"
                bind:value={form.bio}
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>
        
        <div class="w-full md:w-2/3 p-8 bg-white/5 border-t md:border-t-0 md:border-l border-white/10">
          <h3 class="text-xl font-bold text-white mb-6">Account Settings</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <input id="username" type="text" bind:value={form.username} class="w-full px-4 py-2 bg-[hsl(var(--background))] border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500 transition-all" />
            </div>
            <div>
              <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
              <input id="name" type="text" bind:value={form.name} class="w-full px-4 py-2 bg-[hsl(var(--background))] border border-white/20 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-all" />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input id="email" type="text" bind:value={form.email} class="w-full px-4 py-2 bg-[hsl(var(--background))] border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all" />
            </div>
            <div>
              <label for="pronoun" class="block text-sm font-medium text-gray-300 mb-2">Pronoun</label>
              <input id="pronoun" type="text" bind:value={form.pronoun} class="w-full px-4 py-2 bg-[hsl(var(--background))] border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all" />
            </div>
            <div class="flex flex-row md:flex-col gap-4 items-center">
              <div>
                <label for="avatar-url" class="block text-sm font-medium text-gray-300 mb-2">Avatar URL</label>
                <input id="avatar-url" type="text" bind:value={form.avatar} class="w-full px-4 py-2 bg-[hsl(var(--background))] border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all" />
              </div>
              <div class="flex items-center h-[40px] gap-2 mt-10">
                <label for="avatar" class="flex items-center justify-center text-sm font-medium text-gray-300 mb-2 cursor-pointer bg-red-500 px-4 h-full rounded-lg text-tiny"><CloudUpload /></label>
                <input id="avatar" type="file" accept="image/*" on:change={handleAvatarChange} class="w-full hidden px-4 py-2 bg-[hsl(var(--background))] border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all" />
              </div>
            </div>
            <div>
              <label for="banner" class="block text-sm font-medium text-gray-300 mb-2">Banner URL</label>
              <input id="banner" type="text" bind:value={form.banner} class="w-full px-4 py-2 bg-[hsl(var(--background))] border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-all" />
            </div>
          </div>
          <!-- <div class="mt-8">
            <h4 class="text-lg font-bold text-white mb-4">Statistics</h4>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 flex flex-col items-center">
                <span class="text-2xl font-bold text-blue-400">{user.anime.length}</span>
                <span class="text-gray-300 text-sm mt-1">Anime Watched</span>
              </div>
              <div class="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 flex flex-col items-center">
                <span class="text-2xl font-bold text-purple-400">{user.manga.length}</span>
                <span class="text-gray-300 text-sm mt-1">Manga Read</span>
              </div>
            </div>
          </div> -->

          <button
            class="mt-5 mb-5 flex justify-center items-center w-full py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:from-red-600 hover:to-pink-700 transition-all"
            on:click={updateUser}
          >
            {#if isLoading}
              <Loader class="animate-spin" />
            {:else}
              Save
            {/if}
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
