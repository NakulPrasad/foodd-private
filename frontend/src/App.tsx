import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./components/Root/Root";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/ContextReducer";
import { useCookie } from "./hooks/useCookie";
import Error from "./screens/Error/Error";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import MyOrder from "./screens/MyOrder/MyOrder";
import Partner from "./screens/Partner/Partner";
import Checkout from "./screens/Checkout/Checkout";

interface PrivateRouteProps {
  element: React.ReactElement;
}

/**
 * @description This function checks for authentication before accessing to user.
 * @param element React Component
 * @returns React Component if authenticated else redirected to /login
 */

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { getItem } = useCookie();
  const isAuthenticated = getItem("user");

  return isAuthenticated ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<Root />} />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/myOrder",
        element: <MyOrder />,
      },
      {
        path: "/partner-with-us/new/",
        element: <Partner />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MantineProvider>
          <RouterProvider router={router} />
        </MantineProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
