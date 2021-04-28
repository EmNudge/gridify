<script lang="ts">
	import { 
		splitTypeStore,
		splitDivisionsStore 
	} from '../../stores/index';
	import {
		splitCurrentRect, 
	} from '../../stores/utils';
	
	let divisions = $splitDivisionsStore.length;
	$: ((divisions) => {
		if (divisions < $splitDivisionsStore.length) {
			$splitDivisionsStore = $splitDivisionsStore.slice(0, divisions);
			return;
		}

		const diff = divisions - $splitDivisionsStore.length;
		$splitDivisionsStore = [...$splitDivisionsStore, ...Array(diff).fill(1)];
	})(divisions);

	type CustomInputEvent = Event & { currentTarget: EventTarget & HTMLInputElement };
	const handleSplitChange = (i: number) => (e: CustomInputEvent) => {
		const nums = $splitDivisionsStore;
		const newNum = Number((e.target as HTMLInputElement).value);
		$splitDivisionsStore = [
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
			<select bind:value={$splitTypeStore}>
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
			{#each $splitDivisionsStore as num, i}
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