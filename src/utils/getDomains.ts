import type { Writable } from 'svelte/store';
import type { Box, Domain, Split } from '../stores';
import { get } from 'svelte/store';

export function getDomainsFromBoxStores(
  boxStores: Writable<Box>[], 
  domain: Domain, 
  splitType: Split
): Domain[] {
  const boxes: Box[] = boxStores.map(boxStore => get(boxStore));

  const totalFractionalUnits = boxes.reduce((total, curr) => curr.fractionalSize + total, 0);
  const [x,y,width,height] = domain;

  let space = 0;
  if (splitType === 'vertical') {
    return boxes.map(box => {
      const elSize = box.fractionalSize/totalFractionalUnits * width;
      space += elSize;
      
      return [x+space-elSize, y, elSize, height];
    });
  }

  return boxes.map(box => {
    const elSize = box.fractionalSize/totalFractionalUnits * height;
    space += elSize;
    
    return [x, y+space-elSize, width, elSize];
  });
}