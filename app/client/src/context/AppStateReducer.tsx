import { DragItem } from "../interfaces/DragItem";
import { findItemIndexById } from "../utils/findItemIndexById";
import { moveItem } from "../utils/moveItem";

import { v4 as uuidv4 } from "uuid";
import { Action } from "./state/actions";

export type AppState = {
  lists: List[];
  draggedItem: DragItem | null;
};

export interface Task {
  id: string;
  text: string;
}

export interface List {
  id: string;
  text: string;
  tasks: Task[];
}

export interface AppdraftContextProps {
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

    case "MOVE_TASK": {
      const { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId } =
        action.payload;
      const sourceListIndex = findItemIndexById(draft.lists, sourceColumnId);
      const targetListIndex = findItemIndexById(draft.lists, targetColumnId);
      const dragIndex = findItemIndexById(
        draft.lists[sourceListIndex].tasks,
        draggedItemId
      );
      const hoverIndex = hoveredItemId
        ? findItemIndexById(draft.lists[targetListIndex].tasks, hoveredItemId)
        : 0;

      if (sourceListIndex === -1 || targetListIndex === -1) {
        return; // Si no se encuentra el índice de alguna de las listas, salimos de la función
      }

      const item = draft.lists[sourceListIndex].tasks[dragIndex];

      // Eliminar la tarea de la lista de origen
      draft.lists[sourceListIndex].tasks.splice(dragIndex, 1);

      // Agregar la tarea a la lista de destino
      draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, item);
      break;
    }
  }
};
