import { useState, useEffect, useRef, useCallback } from "react";
import { NewItemForm } from "./NewItemForm";

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
    <button
      ref={addButtonRef}
      className={`${
        dark ? "text-black" : "text-white"
      } bg-white bg-opacity-25 hover:bg-opacity-50 rounded-md border-none cursor-pointer max-w-md p-2`}
      onClick={() => setShowForm(true)}
      onMouseDown={() => setClickedInside(true)}
    >
      {toggleButtonText}
    </button>
  );
};
