export type ColumnDragItem = {
  id: string;
  text: string;
  type: "COLUMN";
};
export type DragItem = ColumnDragItem;

export interface DragPreviewContainerProps {
  isHidden?: boolean;
  isPreview?: boolean;
}
