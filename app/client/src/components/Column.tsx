import React from "react";
import { AddNewItem } from "./AddNewItem";

interface ColumnProps {
  text: string;
  index: number;
  id: string;
}

export const Column = ({
  text,
  children,
}: React.PropsWithChildren<ColumnProps>) => {
  return (
    <div className="bg-[#ebecf0] w-[300px] min-h-[40px] rounded-[3px] p-[8px] flex-grow-0 ">
      <div className=" @apply font-[bold] pt-1.5 pb-3 px-4">{text}</div>
      {children}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={console.log}
        dark
      />
    </div>
  );
};
