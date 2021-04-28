import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { getRectHolder } from './utils';

//#region rectangle types
export enum Split {
	HORIZONTAL = 'horiztonal',
	VERTICAL = 'vertical',
}

export type Rect = { fractionalSize: number, parent: Writable<RectHolder> };
export type RectHolder = { splitType: Split, fractionalSize: number, boxes: Writable<Box>[] };
export type Box = Rect | RectHolder;

export type Domain = [number,number,number,number];
//#endregion

//#region root and splitter stores

const initialRoot = getRectHolder(Split.VERTICAL, 1, [1])
// tree root
export const rootRectStore: Writable<Writable<RectHolder>> = 
	writable(initialRoot);

// which type to use for the next split
export const splitTypeStore: Writable<Split> = writable(Split.VERTICAL);

// initialize with 0th item of initialRoot
const initialRect = get(initialRoot).boxes[0] as Writable<Rect>;
// array of rects to split
export const toSplitRectsStore: Writable<Writable<Rect>[]> = 
	writable([initialRect]);

// array of fractional units for division
export const splitDivisionsStore: Writable<number[]> = writable([1, 1]);

//#endregion