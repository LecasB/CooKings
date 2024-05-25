import { Outlet } from "react-router-dom";
import SideNavBar from "./SideNavBar";
import TopNavBar from "./TopNavBar";
import "./Admin.css";

const LayoutAdmin = () => {
  return (
    <>
      <div>
        <TopNavBar />
      </div>
      <div class="contentAdmin">
        <SideNavBar />
        <Outlet />
      </div>
    </>
  );
};

export default LayoutAdmin;
