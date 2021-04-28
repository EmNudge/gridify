<script lang="ts">
  import type { RectHolder, Domain } from '../stores/index';
	import type { Writable } from 'svelte/store';

	import { getDomainsFromBoxStores } from '../utils/getDomains'
	import GridRect from './GridRect.svelte';

	export let gridRectNode: Writable<RectHolder> | null;
	export let domain: Domain;
	
	$: domains = getDomainsFromBoxStores($gridRectNode.boxes, domain, $gridRectNode.splitType);
</script>

<g>
	{#each domains as domain, i}
		<GridRect 
			gridRect={$gridRectNode.boxes[i]} 
			gridRectContext={gridRectNode} 
			{domain} />
	{/each}
</g>