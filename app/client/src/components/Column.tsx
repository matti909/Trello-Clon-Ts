import { DetailedHTMLProps, HTMLAttributes, useRef } from "react";
import { useAppState } from "../context/AppStateContext";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { addTask, moveList } from "../context/state/actions";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { useItemDrag } from "../hooks/useItemDrag";
import { isHidden } from "../utils/isHidden";
import { ColumnContainer, ColumnTitle } from "./Styles";

interface ColumnProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string;
  id: string;
  isPreview?: boolean;
}

export const Column = ({ text, id }: ColumnProps) => {
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
      }
    }),
  });

  const { drag } = useItemDrag({ type: "COLUMN", id, text });

  drag(drop(ref));

  return (
    <ColumnContainer ref={ref} hidden={isHidden(draggedItem, "COLUMN", id)}>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};
