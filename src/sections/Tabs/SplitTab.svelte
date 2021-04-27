<script>
  import SplitBox from './SplitBox.svelte';
  import MergeBoxes from './MergeBoxes.svelte';
  import QuickActions from './QuickActions.svelte';
  import Export from './Export.svelte';

  let selectedIndex = 0;
  const tabs = [
    { name: 'Split Box', component: SplitBox },
    { name: 'Merge Boxes', component: MergeBoxes },
    { name: 'Quick Actions', component: QuickActions },
    { name: 'Export', component: Export },
  ];
  
  $: component = tabs[selectedIndex].component;
</script>

<section class="tabs">
  <nav>
    {#each tabs as { name }, i}
      <span 
        role="tab" 
        aria-selected={i === selectedIndex ? "true" : undefined}
        on:click={() => selectedIndex = i}
      >{name}</span>
    {/each}
  </nav>
  
  <section role="tabpanel" class="panel">
    {#if selectedIndex === 0}
      <SplitBox />
    {:else}
      <svelte:component this={component} />
    {/if}
  </section>
</section>

<style>
  .tabs {
    --bg: #555;
    color: white;
  }
  nav {
    display: flex;
    justify-content: flex-start;
    grid-gap: 2px;
    background: #222;
  }
  nav span {
    padding: 5px 15px;
    color: white;
    cursor: pointer;
  }
  nav span[aria-selected] {
    background: var(--bg);
  }
  section.panel {
    padding: 20px;
    box-sizing: border-box;
    background: var(--bg);
  }

  :global(button, input, select) {
    filter: hue-rotate(180deg) invert(1);
  }
</style>