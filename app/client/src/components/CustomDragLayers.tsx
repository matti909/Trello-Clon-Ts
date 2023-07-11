import { useDragLayer } from "react-dnd";
import { Column } from "./Column";
import { useAppState } from "../context/AppStateContext";
import { CustomDragLayerContainer, DragPreviewWrapper } from "./Styles";
import { Card } from "./Card";

export const CustomDragLayer: React.FC = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem?.type === "COLUMN" ? (
          <Column id={draggedItem.id} text={draggedItem.text} isPreview />
        ) : (
          <Card
            columnId={draggedItem.columnId}
            isPreview
            id={draggedItem.id}
            text={draggedItem.text}
          />
        )}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : (
    ""
  );
};
