import { useDragLayer } from "react-dnd";
import { Column } from "./Column";
import { useAppState } from "../context/AppStateContext";

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <div>
      <Column id={draggedItem.id} text={draggedItem.text} isPreview />
    </div>
  ) : null;
};
