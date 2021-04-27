<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { Domain, Box, RectHolder, Rect } from '../stores';
  import { gridRectToSplitStoreStore, gridRectContextStoreStore } from '../stores';
  import GridRectNode from './GridRectNode.svelte';
  
  export let gridRect: Writable<Box>;
  export let gridRectContext: Writable<RectHolder>;
  export let domain: Domain;

  let rectHolderStore: Writable<RectHolder> = null;
  $: rectHolderStore = Boolean(($gridRect as RectHolder).boxes)
    ? (gridRect as Writable<RectHolder>)
    : null;

  $: isSelected = $gridRectToSplitStoreStore == gridRect;

  function addToSplit() {
    gridRectToSplitStoreStore.set(gridRect as Writable<Rect>);
    gridRectContextStoreStore.set(gridRectContext);
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