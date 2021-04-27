<script lang="ts">
  import type { RectHolder, Domain } from '../stores';
	import { getDomainsFromBoxStores } from '../utils/getDomains'
	import GridRect from './GridRect.svelte';

	export let gridRectNode: RectHolder;
	export let domain: Domain;
	
	const domains = getDomainsFromBoxStores(gridRectNode.boxes, domain, gridRectNode.splitType);
</script>

{#each domains as domain, i}
	<GridRect gridRect={gridRectNode.boxes[i]} {domain} />
{/each}