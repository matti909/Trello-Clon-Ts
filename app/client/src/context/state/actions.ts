import { DragItem } from "../../interfaces/DragItem";
import { List } from "../AppStateReducer";

interface AddListAction {
  type: "ADD_LIST";
  payload: string;
}

interface AddTaskAction {
  type: "ADD_TASK";
  payload: { text: string; listId: string };
}

interface moveList {
  type: "MOVE_LIST";
  payload: {
    draggedId: string;
    hoverId: string;
  };
}
interface setDraggedItem {
  type: "SET_DRAGGED_ITEM";
  payload: DragItem | null;
}

export type Action = AddListAction | AddTaskAction | moveList | setDraggedItem; // Discriminated union technique

export type AppState = {
  lists: List[];
  draggedItem: DragItem | null;
};

/**ACTIONS CREATOR */

export const addTask = (text: string, listId: string): Action => ({
  type: "ADD_TASK",
  payload: {
    text,
    listId,
  },
});

export const addList = (text: string): Action => ({
  type: "ADD_LIST",
  payload: text,
});

export const moveList = (draggedId: string, hoverId: string): Action => ({
  type: "MOVE_LIST",
  payload: {
    draggedId,
    hoverId,
  },
});

export const setDraggedItem = (draggedItem: DragItem | null): Action => ({
  type: "SET_DRAGGED_ITEM",
  payload: draggedItem,
});
