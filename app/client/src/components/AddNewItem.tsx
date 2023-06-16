import { useState } from "react";
import { NewItemForm } from "./NewItemForm";

type AddNewItemProps = {
  onAdd(text: string): void;
  toggleButtonText: string;
  dark?: boolean | undefined;
};

export const AddNewItem = (props: AddNewItemProps) => {
  const [showForm, setShowForm] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onAdd, toggleButtonText, dark: _dark } = props;

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
    <button {...props} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </button>
  );
};
