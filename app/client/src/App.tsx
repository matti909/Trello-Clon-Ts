import { AddNewItem } from "./components/AddNewItem";
import { Column } from "./components/Column";
import { AppContainer } from "./components/Styles";
import { useAppState } from "./context/AppStateContext";
import { addList } from "./context/state/actions";
//import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export const App = () => {
  const { lists, dispatch } = useAppState();
  return (
    <AppContainer>
      {lists.map((list) => (
        <Column id={list.id} text={list.text} key={list.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addList(text))}
        dark
      />
    </AppContainer>
  );
};
