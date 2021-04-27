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
export const gridRectToSplitStoreStore: Writable<Writable<Rect>> = writable(gridRectNodeStore);
export const gridSplitStore: Writable<number[]> = writable([1, 1]);

export const splitCurrentRect = () => {
	const gridRectToSplit = get(gridRectToSplitStoreStore);
	gridRectToSplit.update(({ fractionalSize }) => getBox(
		get(gridTypeStore), 
		fractionalSize,
		get(gridSplitStore),
	));
}