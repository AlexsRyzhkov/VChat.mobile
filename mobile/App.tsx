import {AppRouter} from "./src/router/AppRouter";
import {AuthProvider} from "./src/context/AuthContext";

export default function App() {
  return (
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
  );
}
