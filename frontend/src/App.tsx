import React from "react";
import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./screens/Signup";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./screens/MyOrder";
import Login2 from "./screens/Login/Login";
import Error from "./screens/Error/Error";
import Root from "./components/Root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/myOrder",
        element: <MyOrder />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login2 />,
    errorElement: <Error />,
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
