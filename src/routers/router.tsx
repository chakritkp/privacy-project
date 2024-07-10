import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Productlist from "../pages/Productlist";
import SignUpForm from "../pages/SignUpForm";
import SignIn from "../pages/SignIn";
import { AuthNoTokenRoute, AuthTokenRoute } from "./RouteGuard";
import Navbar from "../component/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthTokenRoute>
        <Navbar />
        <Productlist />
      </AuthTokenRoute>
    ),
    // children: [
    //   {
    //     path: "products",
    //     element: <Productlist />,
    //   },
    // ],
  },
  {
    path: "/admin",
    element: (
      <AuthTokenRoute>
        <Home />
      </AuthTokenRoute>
    ),
    children: [
      {
        path: "products",
        element: <Productlist />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: (
      <AuthNoTokenRoute>
        <SignIn />
      </AuthNoTokenRoute>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <AuthNoTokenRoute>
        <SignUpForm />
      </AuthNoTokenRoute>
    ),
  },
]);

export default router;
