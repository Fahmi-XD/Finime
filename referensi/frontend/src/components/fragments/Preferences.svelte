<script lang="ts">
  export let mode: string;
</script>

<div id="account" class="space-y-6">
  <div>
    <h2 class="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">Preferences Settings</h2>
    <p class="text-gray-400">Pengaturan preferensi atau pengaturan umum.</p>
  </div>

  <div class="bg-finime-gray rounded-lg p-6">
    <h3 class="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">General</h3>
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <label for="" class="text-sm font-medium text-[hsl(var(--foreground))]">Mode Website</label>
          <p class="text-xs text-gray-500">Mode informasi hanya menampilkan info saja.</p>
        </div>
        <select
          bind:value={mode}
          class="px-3 py-2 bg-finime-light-gray border border-gray-600 rounded-lg text-[hsl(var(--foreground))] focus:outline-none focus:border-finime-red"
        >
          <option class="text-black" value="nonton">Nonton</option>
          <option class="text-black" value="informasi">Informasi</option>
        </select>
      </div>
    </div>
  </div>
</div>
