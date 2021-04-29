<script>
  import GridRect from '../components/GridRect.svelte';
  import { rootRectStore } from '../stores/index';
</script>

<section>
  <svg width="512px" height="512px">
    <GridRect gridRect={$rootRectStore} domain={[0,0,100,100]} />
  </svg>
</section>

<style>
  svg {
    border: 1px solid black;
    min-height: 400px;
  }
</style>