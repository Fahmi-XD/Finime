<script lang="ts">
  import { user } from "$/stores/user";
  import { PUBLIC_API } from "$env/static/public";

  function getInitials(name: string) {
    return name ? name.charAt(0).toUpperCase() : "?";
  }
</script>

<div id="account" class="space-y-6">
  <div>
    <h2 class="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">Account Settings</h2>
    <p class="text-gray-400">Pengaturan akunmu. Ingat jangan pernah memakai informasi asli!</p>
  </div>

  {#if $user?.name && $user?.username}
    <div class="bg-finime-gray rounded-lg p-6">
      <h3 class="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">Profile Information</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label for="username" class="block text-sm font-medium text-[hsl(var(--foreground))] opacity-70 mb-2">Username</label>
          <input
            type="text"
            id="username"
            value={$user?.username || "Username not available"}
            class="w-full px-3 py-2 bg-finime-light-gray border border-gray-600 rounded-lg text-[hsl(var(--foreground))] focus:outline-none focus:border-finime-red transition-colors"
          />
          <p class="text-[11px] opacity-60 mt-1 text-[hsl(var(--foreground))]">*Ini akan menjadi id dari profilemu</p>
        </div>

        <div class="row-span-4 flex flex-col justify-center items-center md:order-none -order-1">
          {#if $user?.avatar}
            <img
              src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={$user.avatar}"
              alt="Profile picture of {$user.name}"
              class="w-60 h-60 border-4 border-[hsl(var(--primary)/30%)] bg-white/50 object-cover"
            />
          {:else}
            <div
              class="flex items-center border-4 border-[hsl(var(--primary)/30%)] bg-white/50 justify-center w-60 h-60 text-4xl font-bold text-[hsl(var(--foreground))] bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))]"
            >
              {getInitials("Fahmi XD")}
            </div>
          {/if}
          <div class="mt-4 cursor-pointer bg-red-500 rounded-3xl px-10 hover:opacity-70 hover:scale-105 transition-all duration-300 py-1">
            <label for="add" class="cursor-pointer text-white">Add Image</label>
            <input id="add" type="file" accept="image/*" class="hidden" />
          </div>
        </div>

        <div>
          <label for="pronoun" class="block text-sm font-medium text-[hsl(var(--foreground))] opacity-70 mb-2">Pronoun</label>
          <input
            type="text"
            id="pronoun"
            value={$user?.name || "N/A"}
            class="w-full px-3 py-2 bg-finime-light-gray border border-gray-600 rounded-lg text-[hsl(var(--foreground))] focus:outline-none focus:border-finime-red transition-colors"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-[hsl(var(--foreground))] opacity-70 mb-2">Email</label>
          <input
            id="email"
            type="text"
            value={$user?.contact?.email || "Email not available"}
            class="w-full px-3 py-2 bg-finime-light-gray border border-gray-600 rounded-lg text-[hsl(var(--foreground))] focus:outline-none focus:border-finime-red transition-colors"
          />
        </div>
        <div>
          <label for="display" class="block text-sm font-medium text-[hsl(var(--foreground))] opacity-70 mb-2">Display Name</label>
          <input
            id="display"
            type="text"
            value={$user?.name || "Ucok"}
            class="w-full px-3 py-2 bg-finime-light-gray border border-gray-600 rounded-lg text-[hsl(var(--foreground))] focus:outline-none focus:border-finime-red transition-colors"
          />
        </div>
        <div>
          <label for="banner" class="block text-sm font-medium text-[hsl(var(--foreground))] opacity-70 mb-2">Banner Url</label>
          <input
          id="banner"
            type="text"
            value={$user?.banner || ""}
            class="w-full px-3 py-2 bg-finime-light-gray border border-gray-600 rounded-lg text-[hsl(var(--foreground))] focus:outline-none focus:border-finime-red transition-colors"
          />
          <p class="text-[11px] opacity-60 mt-1 text-[hsl(var(--foreground))]">*Urlnya pakai gif ya teman teman.</p>
        </div>

        <div class="md:order-none -order-1">
          <label for="or" class="block text-sm text-center font-medium text-[hsl(var(--foreground))] opacity-70 opacity-70 mb-2">Or</label>
          <input
          id="or"
            type="text"
            value={$user?.avatar || ""}
            class="w-full px-3 py-2 bg-finime-light-gray border border-gray-600 rounded-lg text-[hsl(var(--foreground))] focus:outline-none focus:border-finime-red transition-colors"
          />
        </div>

        <div>
          <label for="first" class="block text-sm font-medium text-[hsl(var(--foreground))] opacity-70 mb-2">First Name</label>
          <input
          id="first"
            type="text"
            value={$user?.contact?.first_name || "Unavailable"}
            class="w-full px-3 py-2 bg-finime-light-gray border border-gray-600 rounded-lg text-[hsl(var(--foreground))] focus:outline-none focus:border-finime-red transition-colors"
          />
        </div>
        <div>
          <label for="last" class="block text-sm font-medium text-[hsl(var(--foreground))] opacity-70 mb-2">Last Name</label>
          <input
          id="last"
            type="text"
            value={$user?.contact?.last_name || "Unavailable"}
            class="w-full px-3 py-2 bg-finime-light-gray border border-gray-600 rounded-lg text-[hsl(var(--foreground))] focus:outline-none focus:border-finime-red transition-colors"
          />
        </div>
      </div>
      <div class="mt-4">
        <label for="bio" class="block text-sm font-medium text-[hsl(var(--foreground))] opacity-70 mb-2">Bio</label>
        <textarea
        id="bio"
          rows="3"
          placeholder="Tell us about yourself..."
          value={$user?.bio || ""}
          class="w-full px-3 py-2 bg-finime-light-gray border border-gray-600 rounded-lg text-[hsl(var(--foreground))] focus:outline-none focus:border-finime-red transition-colors resize-none"
        ></textarea>
      </div>
    </div>
  {:else}
    <h1>Login dulu mas, gak bisa pake fitur ini kalo belum <a class="text-red-400 underline" href="/auth/login">Login</a></h1>
  {/if}
</div>
