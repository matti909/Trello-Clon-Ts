import { Card } from "./components/Card";
import { Column } from "./components/Column";

export const App = () => {
  return (
    <div className="items-start bg-[#3179ba] flex flex-row h-full p-20 w-full gap-4">
      <Column text="To Do">
        <Card text="Generate app scaffold" />
      </Column>
      <Column text="In Progress">
        <Card text="Learn Typescript" />
      </Column>
      <Column text="Done">
        <Card text="Begin to use static typing" />
      </Column>
    </div>
  );
};
