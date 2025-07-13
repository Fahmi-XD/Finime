<script lang="ts">
  export let src: string;
</script>

<style>
  .poster {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>

<img {src} class="poster" alt="poster" onerror="{(e) => (e.target as HTMLImageElement).style.display='none'}" />
