import { findItemIndexById } from "../utils/findItemIndexById";
import { moveItem } from "../utils/moveItem";
import { Action, AppState } from "./state/actions";
import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  text: string;
}

export interface List {
  id: string;
  text: string;
  tasks: Task[];
}

export interface AppStateContextProps {
  lists: List[];
  getTasksByListId(id: string): Task[];
}

export const appStateReducer = (
  draft: AppState,
  action: Action
): AppState | void => {
  switch (action.type) {
    case "ADD_LIST": {
      draft.lists.push({
        id: uuidv4(),
        text: action.payload,
        tasks: [],
      });
      break;
    }

    case "ADD_TASK": {
      const { text, listId } = action.payload;
      const targetListIndex = findItemIndexById(draft.lists, listId);

      draft.lists[targetListIndex].tasks.push({
        id: uuidv4(),
        text,
      });
      break;
    }

    case "MOVE_LIST": {
      const { draggedId, hoverId } = action.payload;
      const dragIndex = findItemIndexById(draft.lists, draggedId);
      const hoverIndex = findItemIndexById(draft.lists, hoverId);
      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex);
      break;
    }

    case "SET_DRAGGED_ITEM": {
      draft.draggedItem = action.payload;
      break;
    }
  }
};
