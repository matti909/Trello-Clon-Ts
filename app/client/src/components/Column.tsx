import { useAppState } from "../context/AppStateContext";
import { addTask } from "../context/state/actions";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";

interface ColumnProps {
  text: string;
  id: string;
}

export const Column = ({ text, id }: ColumnProps) => {
  const { getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);

  return (
    <div className="bg-[#ebecf0] w-[300px] min-h-[40px] rounded-[3px] p-[8px] flex-grow-0 ">
      <div className=" @apply font-[bold] pt-1.5 pb-3 px-4">{text}</div>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </div>
  );
};
