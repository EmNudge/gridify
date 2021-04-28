<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { get } from 'svelte/store';
  
  import type { Box } from '../../stores/index';
  import { 
    Split,
    toSplitRectsStore,  
    splitDivisionsStore,
  } from '../../stores/index';

  import { 
    restart, 
    getRectHolder,
  } from '../../stores/utils';
  
  let gridRectToSplit: Writable<Box>; 
  $: gridRectToSplit = $toSplitRectsStore[0];
  function verticalSplit() {
    gridRectToSplit.update(({ fractionalSize }) => get(getRectHolder(
      Split.VERTICAL, 
      fractionalSize,
      $splitDivisionsStore,
    ))); 
  }
  function horizontalSplit() {
    gridRectToSplit.update(({ fractionalSize }) => get(getRectHolder(
      Split.HORIZONTAL, 
      fractionalSize,
      $splitDivisionsStore,
    ))); 
  }
  function deselect() {
    toSplitRectsStore.set(null);
  }
</script>

<div>
  <button on:click={deselect}>Deselect Box</button>
  <button on:click={restart}>Restart Grid</button>
  <br>
  <br>
  <button on:click={verticalSplit}>Split Box In Half Vertically</button>
  <button on:click={horizontalSplit}>Split Box In Half Horizontally</button>
</div>