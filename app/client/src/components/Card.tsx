import { useRef } from "react";
import { CardContainer } from "./Styles";
import { isHidden } from "../utils/isHidden";
import { useAppState } from "../context/AppStateContext";
import { useItemDrag } from "../hooks/useItemDrag";
import { useDrop } from "react-dnd";
import { moveTask, setDraggedItem } from "../context/state/actions";
import { throttle } from "throttle-debounce-ts";

interface CardProps {
  text: string;
  id: string;
  columnId: string;
  isPreview?: boolean;
}

export const Card = ({ columnId, id, text, isPreview }: CardProps) => {
  const { draggedItem, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({
    type: "CARD",
    id,
    text,
    columnId,
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type !== "CARD") {
        return;
      }
      if (draggedItem.id === id) {
        return;
      }

      dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId));
      dispatch(setDraggedItem({ ...draggedItem, columnId }));
    }),
  });

  drag(drop(ref));

  return (
    <CardContainer
      ref={ref}
      isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
      isPreview={isPreview}
    >
      {text}
    </CardContainer>
  );
};
