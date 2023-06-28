import { Dispatch, createContext, useContext } from "react";
import { Action, AppState } from "./state/actions";
import { List, Task, appStateReducer } from "./AppStateReducer";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../interfaces/DragItem";

const appData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
};

type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

interface Props {
  children: React.ReactNode;
}

export const AppStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);
  const { draggedItem, lists } = state;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return (
    <AppStateContext.Provider
      value={{ lists, getTasksByListId, dispatch, draggedItem }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAppState = () => {
  return useContext(AppStateContext);
};
