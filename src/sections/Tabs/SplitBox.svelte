<script lang="ts">
	import { 
		splitCurrentRect, 
		gridTypeStore,
		gridSplitStore 
	} from '../../stores';
	
	let divisions = $gridSplitStore.length;
	$: ((divisions) => {
		if (divisions < $gridSplitStore.length) {
			$gridSplitStore = $gridSplitStore.slice(0, divisions);
			return;
		}

		const diff = divisions - $gridSplitStore.length;
		$gridSplitStore = [...$gridSplitStore, ...Array(diff).fill(1)];
	})(divisions);

	type CustomInputEvent = Event & { currentTarget: EventTarget & HTMLInputElement };
	const handleSplitChange = (i: number) => (e: CustomInputEvent) => {
		const nums = $gridSplitStore;
		const newNum = Number((e.target as HTMLInputElement).value);
		$gridSplitStore = [
			...nums.slice(0, i), 
			newNum, 
			...nums.slice(i+1)
		];
	};
</script>

<modal-container>
	<div class="inputs">
		<div>
			<label for="#">Mode</label>
			<br>
			<select bind:value={$gridTypeStore}>
				<option value="vertical">Vertical</option>
				<option value="horizontal">Horizontal</option>
			</select>
		</div>

		<div>
			<label for="#">Amount Of Splits</label>
			<input type="number" placeholder="divisions..." min="1" bind:value={divisions} />
		</div>
		<div>
			<label for="#">Fractional Units</label>
			{#each $gridSplitStore as num, i}
				<input 
					type="number" 
					min="1" 
					value={num} 
					on:input={handleSplitChange(i)} />
			{/each}
		</div>
	</div>
	<br>

	<button on:click={splitCurrentRect}>Split</button>
</modal-container>

<style>
	modal-container {
		display: flex;
		grid-gap: 5px;
		text-align: center;
	}
	.inputs {
		display: flex;
		justify-content: center;
		grid-gap: 20px;
		max-width: 400px;
		margin: 0 auto;
	}
	.inputs div {
		text-align: left;
	}
</style>