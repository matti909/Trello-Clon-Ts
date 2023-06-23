import { AddNewItem } from "./components/AddNewItem";
import { Column } from "./components/Column";
import { useAppState } from "./context/AppStateContext";

export const App = () => {
  const { lists, dispatch } = useAppState();
  return (
    <div className="items-start bg-[#3179ba] flex flex-row h-full p-20 w-full gap-4">
      {lists.map((list) => (
        <Column id={list.id} text={list.text} key={list.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch({ type: "ADD_LIST", payload: text })}
      />
    </div>
  );
};
