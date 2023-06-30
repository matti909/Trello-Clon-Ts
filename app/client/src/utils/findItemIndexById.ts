interface Item {
  id: string;
}

export const findItemIndexById = <TItem extends Item>(
  items: TItem[],
  id: string
): number => {
  return items.findIndex((item: TItem) => item.id === id);
};
