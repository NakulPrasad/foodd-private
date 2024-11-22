import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer/Footer";

const Root = () => {
  return (
    <div className="">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
