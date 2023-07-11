import { useRef } from "react";
import { useAppState } from "../context/AppStateContext";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import {
  addTask,
  moveList,
  moveTask,
  setDraggedItem,
} from "../context/state/actions";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { useItemDrag } from "../hooks/useItemDrag";
import { isHidden } from "../utils/isHidden";
import { ColumnContainer } from "./Styles";

interface ColumnProps {
  //esto es para revisar!!! polemico!
  text: string;
  id: string;
  isPreview?: boolean;
}

export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();

  const tasks = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }

        dispatch(moveList(draggedItem.id, id));
      } else {
        if (draggedItem.columnId === id) {
          return;
        }
        if (tasks.length) {
          return;
        }

        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
    }),
  });

  const { drag } = useItemDrag({ type: "COLUMN", id, text });

  drag(drop(ref));

  return (
    <ColumnContainer
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden(draggedItem, "COLUMN", id)}
    >
      {tasks.map((task) => (
        <Card
          text={task.text}
          key={task.id}
          id={task.id}
          columnId={id}
          isPreview
        />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};
