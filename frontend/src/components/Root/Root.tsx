import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Root = () => {
  return (
    <>
      <NavBar />
      <div className="px-8">

      <Outlet />
      </div>
    </>
  );
};

export default Root;
