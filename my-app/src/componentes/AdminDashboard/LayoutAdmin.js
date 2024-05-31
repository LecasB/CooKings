import { Outlet } from "react-router-dom";
import SideNavBar from "./SideNavBar";
import TopNavBar from "./TopNavBar";
import "./Admin.css";
import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const LayoutAdmin = () => {
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState();

  let navigate = useNavigate();

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
      setAdmin(user.user_metadata.admin);

      if (user.user_metadata.admin == false) {
        navigate("/*");
      }
    } else {
      navigate("/*");
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
        <SideNavBar />
        <Outlet />
      </div>
    </>
  );
};

export default LayoutAdmin;
