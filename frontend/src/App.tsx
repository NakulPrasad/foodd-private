import "./App.css";
import Home from "./screens/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./context/ContextReducer";
import MyOrder from "./screens/MyOrder/MyOrder";
import Login from "./screens/Login/Login";
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
    element: <Login />,
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
