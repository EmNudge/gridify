import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { 
  rootRectStore, toSplitRectsStore, 
  splitTypeStore, splitDivisionsStore,
  RectHolder, Box, Rect, Split 
} from './index';

//#region getters
// takes in an array of fractional sizes and a parent.
// Gives all rects a common parent
export const getRectsFromSize = (
	boxSizes: number[], 
	parent: Writable<RectHolder>
): Writable<Box>[] => 
	boxSizes.map(fractionalSize => writable({ fractionalSize, parent }));

// takes in a split type, size, and then the sizes of the boxes.
// makes children have itself as a parent
export const getRectHolder = (
	splitType: Split, 
	fractionalSize: number, 
	boxSizes: number[],
): Writable<RectHolder> => {
	const parentObj = { splitType, fractionalSize, boxes: [] };
	const parentStore = writable(parentObj);
	parentObj.boxes = getRectsFromSize(boxSizes, parentStore);
	return parentStore;
};
//#endregion

// revert root store to the initial basic box
export const restart = () => {
	rootRectStore.set(getRectHolder(Split.VERTICAL, 1, [1]));
};

// split what is currently in the first spot in the array of rectangles
export const splitCurrentRect = () => {
	const toSplitRects = get(toSplitRectsStore);
	if (toSplitRects.length !== 1) {
		console.error("Don't know which box to split!!");
		return;
	}

  const toSplitRectStore = toSplitRects[0];

	// get first item and split it
	const rectHolder = get(toSplitRects[0]).parent;
	const splitType = get(splitTypeStore);
	const splitDivisions = get(splitDivisionsStore);

	// if splitType doesn't matches parent, make split be a child
	if (!canMakeSiblingSplit(splitType, rectHolder)) {
    // use TS to conver to new type
    const holder = toSplitRectStore as unknown as Writable<RectHolder>;
		holder.update(({ fractionalSize }) => {
      return get(getRectHolder(
        splitType, 
        fractionalSize,
        splitDivisions,
      ));
    });

		return;
	}

	// if we can, make it the siblings
	const totalDivisions = splitDivisions.reduce((accum, curr) => accum+curr);
	rectHolder.update(({ splitType, fractionalSize, boxes }) => {
		const newBoxes = [];
		for (const boxStore of boxes) {
			// add all divisions to current array
			if (boxStore === toSplitRectStore) {
				newBoxes.push(...getRectsFromSize(splitDivisions, rectHolder));
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