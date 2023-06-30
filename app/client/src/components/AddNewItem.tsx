import { useState, useEffect, useRef, useCallback } from "react";
import { NewItemForm } from "./NewItemForm";
import { AddItemButton } from "./Styles";

interface AddNewItemProps {
  onAdd(text: string): void;
  toggleButtonText: string;
  dark?: boolean;
}

export const AddNewItem = (props: AddNewItemProps) => {
  const [showForm, setShowForm] = useState(false);
  const [clickedInside, setClickedInside] = useState(false);
  const { onAdd, toggleButtonText, dark } = props;
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = useCallback(() => {
    if (!clickedInside) {
      setShowForm(false);
    }
    setClickedInside(false);
  }, [clickedInside]);

  const handleEscKey = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowForm(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [handleClickOutside, handleEscKey]);

  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <AddItemButton
      ref={addButtonRef}
      onClick={() => setShowForm(true)}
      onMouseDown={() => setClickedInside(true)}
    >
      {toggleButtonText}
    </AddItemButton>
  );
};
