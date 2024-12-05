import "./App.css";
import Home from "./screens/Home/Home";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./context/ContextReducer";
import MyOrder from "./screens/MyOrder/MyOrder";
import Login from "./screens/Login/Login";
import Error from "./screens/Error/Error";
import Root from "./components/Root/Root";
import { AuthProvider } from "./context/AuthContext";
import { useCookie } from "./hooks/useCookie";
import Partner from "./screens/Partner/Partner";



const PrivateRoute = ({ element }: any) => {
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
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
