<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<section class="relative w-full h-[150px] mt-18 flex flex-col items-start justify-center text-start bg-[hsl(var(--background))] rounded-lg p-8 pl-16 lg:pt-0">
  <h1 class="text-4xl font-extrabold text-primary-foreground drop-shadow-lg tracking-wide animate-fade-in">
    {title}
  </h1>
  <p class="mt-3 opacity-50 text-lg text-muted-foreground max-w-2xl animate-slide-up">
    {description}
  </p>
</section>

<style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in { animation: fadeIn 1s ease-out; }
  .animate-slide-up { animation: slideUp 1s ease-out; }
</style>
