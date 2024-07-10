import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import router from "./routers/router";

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
      <RouterProvider router={router} />
    </SnackbarProvider>
  );
}

export default App;
