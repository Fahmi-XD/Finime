<script lang="ts">
  export let type: 'text' | 'avatar' | 'image' | 'button' | 'card' | 'list-item' | 'grid' | 'card-2' = 'text';
  export let variant: 'short' | 'medium' | 'long' | 'small' | 'large' | 'square' | 'portrait' | 'cols-2' | 'cols-3' | 'cols-4' = 'long';
  export let count: number = 1;
  export let className: string = '';
  export let width: string = '';
  export let height: string = '';
  export let style: string = '';

  // Generate array based on count
  $: items = Array.from({ length: count }, (_, i) => i);

  // Get CSS classes based on type and variant
  function getSkeletonClasses(): string {
    let classes = 'skeleton';
    
    switch (type) {
      case 'text':
        classes += ` skeleton-text ${variant}`;
        break;
      case 'avatar':
        classes += ` skeleton-avatar ${variant}`;
        break;
      case 'image':
        classes += ` skeleton-image ${variant}`;
        break;
      case 'button':
        classes += ' skeleton-button';
        break;
      case 'card':
        classes += ' skeleton-card';
        break;
      case 'card-2':
        classes += ' skeleton-card h-[160px] w-[120px] shrink-0';
        break;
      case 'list-item':
        classes += ' skeleton-list-item';
        break;
      case 'grid':
        classes += ` skeleton-grid ${variant}`;
        break;
    }
    
    return `${classes} ${className}`.trim();
  }

  // Get inline styles
  function getInlineStyles(): string {
    let styles = style;
    
    if (width) {
      styles += `width: ${width};`;
    }
    
    if (height) {
      styles += `height: ${height};`;
    }
    
    return styles;
  }
</script>

{#if type === 'list-item'}
  {#each items as item}
    <div class={getSkeletonClasses()} style={getInlineStyles()}>
      <div class="skeleton skeleton-avatar small"></div>
      <div class="skeleton skeleton-text medium"></div>
    </div>
  {/each}
{:else if type === 'grid'}
  <div class={getSkeletonClasses()} style={getInlineStyles()}>
    {#each items as item}
      <div class="skeleton skeleton-card">
        <div class="skeleton skeleton-image square"></div>
        <div class="skeleton skeleton-text short"></div>
        <div class="skeleton skeleton-text medium"></div>
      </div>
    {/each}
  </div>
{:else if type === 'card'}
  {#each items as item}
    <div class="block">
      <div class={getSkeletonClasses()} style={getInlineStyles()}>
      </div>
      <div class="skeleton skeleton-text mb-1 short h-5 mt-5"></div>
      <div class="skeleton skeleton-text mb-1 medium h-5"></div>
      <div class="skeleton skeleton-text mb-1 short h-5"></div>
    </div>
  {/each}
{:else if type === 'card-2'}
  {#each items as item}
    <div class="flex w-full gap-5">
      <div class={getSkeletonClasses()} style={getInlineStyles()}>
        <div class="skeleton skeleton-image square"></div>
      </div>
      <div class="w-full">
        <div class="skeleton skeleton-text mb-1 short h-5 mt-5"></div>
        <div class="skeleton skeleton-text mb-1 medium h-5"></div>
        <div class="skeleton skeleton-text mb-1 short h-5"></div>
      </div>
    </div>
  {/each}
{:else}
  {#each items as item}
    <div class={getSkeletonClasses()} style={getInlineStyles()}></div>
  {/each}
{/if}
