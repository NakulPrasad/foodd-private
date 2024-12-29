import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavBar from "../NavBar/NavBar";
import { useCookie } from "../../hooks/useCookie";

const Root = () => {
  const { checkAuth, setAuthToken } = useAuth();
  const [queryParameters] = useSearchParams()
  useEffect(() => {

    // const params = new URLSearchParams(window.location.search);
    // const token = params.get("token");
    const token = queryParameters.get("token");

    if (token) {
      setAuthToken(token)
      window.location.href = "/"; // Redirect to a clean URL
    }
    checkAuth();
    
  }, []);
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Root;
