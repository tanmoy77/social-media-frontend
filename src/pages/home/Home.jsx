import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../axios";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./home.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getLoggedIn = async () => {
      try {
        await API.get("/auth/checklogin");
        setIsLoggedIn(true);
      } catch (err) {
        navigate("/login");
      }
    };
    getLoggedIn();
  }, []);

  return (
    <div>
      <Topbar />
      {/* <div className="navContainer">
        <SideNavSpace />
        <Navbar />
        <SideNavSpace />
      </div> */}
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;
