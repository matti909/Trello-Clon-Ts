import { DetailedHTMLProps, HTMLAttributes, useRef } from "react";
import { useAppState } from "../context/AppStateContext";
import { addTask, moveList } from "../context/state/actions";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { throttle } from "throttle-debounce-ts";
import { useDrop } from "react-dnd";
import { useItemDrag } from "../hooks/useItemDrag";
import { isHidden } from "../utils/isHidden";
import { ColumnContainer, ColumnTitle } from "./Styles";

interface ColumnProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  text: string;
  id: string;
  isPreview?: boolean;
}

export const Column = ({ text, id, isPreview, ...rest }: ColumnProps) => {
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

  const columnClass = `bg-[#ebecf0] w-[300px] min-h-[40px] rounded-[3px] p-[8px] flex-grow-0 ${
    isPreview ? "is-preview" : ""
  }`;

  return (
    <ColumnContainer
      {...rest}
      ref={ref}
      hidden={isHidden(draggedItem, "COLUMN", id)}
      className={columnClass}
    >
      <ColumnTitle className=" @apply font-[bold] pt-1.5 pb-3 px-4">
        {text}
      </ColumnTitle>
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
