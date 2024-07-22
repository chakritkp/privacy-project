import "./App.css";
import { SnackbarProvider } from "notistack";

import AppRouters from "./routers/AppRouters";

function App() {
  return (
   
      <SnackbarProvider
        autoHideDuration={3000}
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <AppRouters />
      </SnackbarProvider>
    
  );
}

export default App;
