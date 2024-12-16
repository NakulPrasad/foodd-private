import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Root from "./components/Root/Root";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/ContextReducer";
import { useCookie } from "./hooks/useCookie";
import Checkout from "./screens/Checkout/Checkout";
import City from "./screens/City/City";
import Error from "./screens/Error/Error";
import MyOrder from "./screens/MyOrder/MyOrder";
import Partner from "./screens/Partner/Partner";
import Theme from "./theme/theme";
import Restaurant from "./screens/Restaurant/Restaurant";

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
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path:"/",
        element: <City/>
      },
      {
        path: "/myOrder",
        element: <MyOrder />,
      },
      {
        path: "/partner-with-us/new/",
        element: <Partner />,
      },
      {
        path: "/restraunt/*",
        element: <Restaurant />,
      },

    ],
  },
  {
    element: <PrivateRoute element={<Root />} />,
    errorElement: <Error />,
    children: [
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MantineProvider theme={Theme}>
          <RouterProvider router={router} />
        </MantineProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
