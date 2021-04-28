<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { Domain, Box, RectHolder, Rect } from '../stores/index';
  
  import { get } from 'svelte/store';
  import { toSplitRectsStore } from '../stores/index';
  import GridRectNode from './GridRectNode.svelte';
  
  export let gridRect: Writable<Box>;
  export let gridRectContext: Writable<RectHolder>;
  export let domain: Domain;

  let rectHolderStore: Writable<RectHolder> = null;
  $: rectHolderStore = Boolean(($gridRect as RectHolder).boxes)
    ? (gridRect as Writable<RectHolder>)
    : null;

  $: isSelected = $toSplitRectsStore.includes(gridRect as Writable<Rect>);

  function addToSplit(e: MouseEvent) {
    const rectParent = get(gridRect as Writable<Rect>).parent;

      rectParent.update(oldParentStore => {
      // if shift key wasn't pressed or parents don't match
      if (!e.shiftKey || oldParentStore !== get(gridRectContext)) {
        toSplitRectsStore.set([gridRect as Writable<Rect>]);
        return get(gridRectContext);
      }

      toSplitRectsStore.update(gridStoreList => [...gridStoreList, gridRect as Writable<Rect>]);
      return get(gridRectContext);
    });
  }
</script>

{#if rectHolderStore}
  <GridRectNode gridRectNode={rectHolderStore} {domain} />
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