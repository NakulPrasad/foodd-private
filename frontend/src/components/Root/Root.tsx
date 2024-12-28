import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavBar from "../NavBar/NavBar";

const Root = () => {
  const { checkAuth } = useAuth();
  useEffect(() => {
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
