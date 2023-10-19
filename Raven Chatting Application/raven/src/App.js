import Messenger from "./components/Messenger";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountProvider from "./context/AccountProvider";

function App() {
  const clientId ='934813266235-d9eeaii6lbl4bsnd2fmh8elrvku49i8g.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
    <Messenger/>
    </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
