<script>
  import GridRectNode from '../components/GridRectNode.svelte';
  import { gridRectNodeStore } from '../stores';
</script>

<section>
  <svg width="512px" height="512px">
    <GridRectNode gridRectNode={$gridRectNodeStore} domain={[0,0,100,100]} />
  </svg>
</section>

<style>
  svg {
    border: 1px solid black;
    min-height: 400px;
  }
</style>