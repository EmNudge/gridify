<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { Domain, Box, RectHolder, Rect } from '../stores';
  import { gridRectToSplitStoreStore } from '../stores';
  import GridRectNode from './GridRectNode.svelte';
  
  export let gridRect: Writable<Box>;
  export let domain: Domain;

  let rectHolder: RectHolder = null;
  $: rectHolder = Boolean(($gridRect as RectHolder).boxes)
    ? ($gridRect as RectHolder)
    : null;

  $: isSelected = $gridRectToSplitStoreStore == gridRect;

  function performSplit() {
    gridRectToSplitStoreStore.set(gridRect as Writable<Rect>);
  }
</script>

{#if rectHolder}
  <GridRectNode gridRectNode={rectHolder} {domain} />
{:else}
  <rect 
    class:isSelected
    on:click={performSplit}
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