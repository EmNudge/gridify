import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';

export enum Split {
	HORIZONTAL = 'horiztonal',
	VERTICAL = 'vertical',
}

export type Rect = { fractionalSize: number };
export type RectHolder = { splitType: Split, fractionalSize: number, boxes: Writable<Box>[] };
export type Box = Rect | RectHolder;
export type Domain = [number,number,number,number];

export const getBoxesFromSize = (boxSizes: number[]): Writable<Box>[] => 
	boxSizes.map(fractionalSize => writable({ fractionalSize }));

export const getBox = (splitType: Split, fractionalSize: number, boxSizes: number[]): RectHolder => ({ 
	splitType, 
	fractionalSize, 
	boxes: getBoxesFromSize(boxSizes)
});

export const restart = () => {
	gridRectNodeStore.set(getBox(Split.VERTICAL, 1, [1]));
}

export const gridRectNodeStore: Writable<RectHolder> = 
	writable(getBox(Split.VERTICAL, 1, [1]));

export const gridTypeStore: Writable<Split> = writable(Split.VERTICAL);

// we have a store of a store for both of these since we only want to mutate rect
// but we want those changes to be subscribed to. We store a store of a store to not
// cause subscription problems
export const gridRectToSplitStoreStore: Writable<Writable<Rect>> = writable(gridRectNodeStore);
// this stores the parent rect, so it is always a holder. We need this in case we want to reorganize
// the siblings instead of creating another child
export const gridRectContextStoreStore: Writable<Writable<RectHolder>> = writable(null);

export const gridSplitStore: Writable<number[]> = writable([1, 1]);

export const splitCurrentRect = () => {
	const gridRectToSplitStore = get(gridRectToSplitStoreStore);
	const gridRectContextStore = get(gridRectContextStoreStore);
	const splitType = get(gridTypeStore);
	const gridSplits = get(gridSplitStore);

	// if splitType doesn't matches parent, make split be a child
	if (!canMakeSiblingSplit(splitType, gridRectContextStore)) {
		gridRectToSplitStore.update(({ fractionalSize }) => getBox(
			splitType, 
			fractionalSize,
			gridSplits,
		));
		return;
	}

	// if we can, make it the siblings
	const totalDivisions = gridSplits.reduce((accum, curr) => accum+curr);
	gridRectContextStore.update(({ splitType, fractionalSize, boxes }) => {
		const newBoxes = [];
		for (const boxStore of boxes) {
			// add all divisions to current array
			if (boxStore === gridRectToSplitStore) {
				newBoxes.push(...getBoxesFromSize(gridSplits));
				continue;
			}
			
			// update current box division size and add
			boxStore.update(box => {
				return { ...box, fractionalSize: box.fractionalSize*totalDivisions };
			});
			newBoxes.push(boxStore);
		}

		return { splitType, fractionalSize, boxes: newBoxes };
	})
};

const canMakeSiblingSplit = (splitType: Split, gridRectParent: Writable<RectHolder>) => {
	if (!gridRectParent) return false;

	const gridRect = get(gridRectParent);
	return gridRect.splitType === splitType;
}