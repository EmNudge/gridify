<script>
  import { 
    restart, 
    getBox,
    Split,
    gridRectToSplitStoreStore,  
    gridSplitStore,
  } from '../../stores';
  
  $: gridRectToSplit = $gridRectToSplitStoreStore;
  function verticalSplit() {
    gridRectToSplit.update(({ fractionalSize }) => getBox(
      Split.VERTICAL, 
      fractionalSize,
      $gridSplitStore,
    )); 
  }
  function horizontalSplit() {
    gridRectToSplit.update(({ fractionalSize }) => getBox(
      Split.HORIZONTAL, 
      fractionalSize,
      $gridSplitStore,
    )); 
  }
  function deselect() {
    gridRectToSplitStoreStore.set(null);
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