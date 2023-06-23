import { insertItemAtIndex } from "./insertItemAtIndex";
import { removeItemAtIndex } from "./removeItemAtIndex";

export const moveItem = <TItem>(array: TItem[], from: number, to: number) => {
  const item = array[from];
  return insertItemAtIndex(removeItemAtIndex(array, from), item, to);
};
