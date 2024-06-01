import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import TopNavBar from "../AdminDashboard/TopNavBar";
import "./ClienteDashboard.css";
import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const LayoutClient = () => {
  const [user, setUser] = useState();

  let navigate = useNavigate();

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
    } else {
      navigate("/SignUpPage");
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div>
        <TopNavBar />
      </div>
      <div class="contentAdmin">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};

export default LayoutClient;
