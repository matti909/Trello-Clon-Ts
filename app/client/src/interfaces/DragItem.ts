export type ColumnDragItem = {
  id: string;
  text: string;
  type: "COLUMN";
};

export type CardDragItem = {
  id: string;
  columnId: string;
  text: string;
  type: "CARD";
};

export type DragItem = CardDragItem | ColumnDragItem;

export interface DragPreviewContainerProps {
  isHidden?: boolean;
  isPreview?: boolean;
}
