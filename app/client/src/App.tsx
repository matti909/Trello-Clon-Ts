import { AddNewItem } from "./components/AddNewItem";
import { Column } from "./components/Column";
import { AppContainer } from "./components/Styles";
import { useAppState } from "./context/AppStateContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export const App = () => {
  const { lists, dispatch } = useAppState();
  return (
    <GoogleOAuthProvider
      clientId="517813506441-u951rl1rikbm6cj7tabanf78aohiu3gh.apps.googleusercontent.com
    "
    >
      <AppContainer>
        hola
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        ;
      </AppContainer>

      {lists.map((list) => (
        <Column id={list.id} text={list.text} key={list.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch({ type: "ADD_LIST", payload: text })}
      />
    </GoogleOAuthProvider>
  );
};
