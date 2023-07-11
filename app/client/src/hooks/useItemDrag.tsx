import {useEffect} from "react";
import { useDrag } from "react-dnd";
import { useAppState } from "../context/AppStateContext";
import { getEmptyImage } from "react-dnd-html5-backend";
import { DragItem } from "../interfaces/DragItem";
import { setDraggedItem } from "../context/state/actions";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    end: () => dispatch(setDraggedItem(null)),
  });
  
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return { drag };
};
