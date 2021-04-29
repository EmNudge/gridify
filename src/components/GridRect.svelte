<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { Domain, Box, RectHolder, Rect } from '../stores/index';
  
  import { get } from 'svelte/store';
  import { toSplitRectsStore } from '../stores/index';
  import { getDomainsFromBoxStores } from '../utils/getDomains'
  
  export let gridRect: Writable<Box>;
  export let domain: Domain;

  let rectHolderStore: Writable<RectHolder> = null;
  $: rectHolderStore = Boolean(($gridRect as RectHolder).boxes)
    ? (gridRect as Writable<RectHolder>)
    : null;

  let domains: Domain[];
  $: domains = rectHolderStore 
    ? getDomainsFromBoxStores($rectHolderStore.boxes, domain, $rectHolderStore.splitType)
    : []; 

  $: isSelected = $toSplitRectsStore.includes(gridRect as Writable<Rect>);

  function addToSplit(e: MouseEvent) {
    const rectParent = get(gridRect as Writable<Rect>).parent;

    rectParent.update(oldParentStore => {
      // if shift key wasn't pressed or parents don't match
      if (!e.shiftKey) {
        toSplitRectsStore.set([gridRect as Writable<Rect>]);
        return oldParentStore;
      }

      toSplitRectsStore.update(gridStoreList => [...gridStoreList, gridRect as Writable<Rect>]);
      return oldParentStore;
    });
  }
</script>

{#if rectHolderStore}
  <g>
    {#each domains as domain, i}
      <svelte:self 
        gridRect={$rectHolderStore.boxes[i]}
        {domain} />
    {/each}
  </g>
{:else}
  <rect 
    class:isSelected
    on:click={addToSplit}
    x="{domain[0]}%" 
    y="{domain[1]}%" 
    width="{domain[2]}%" 
    height="{domain[3]}%"

    fill="none"
    stroke="black"
  />
{/if}


<style>
	rect {
		stroke: black;
		fill: none;
		pointer-events: all;
	}
	rect:hover {
		fill: #eee;
		cursor: pointer;
	}
  rect.isSelected {
    fill: rgba(0, 255, 255, 0.431);
  }
</style>