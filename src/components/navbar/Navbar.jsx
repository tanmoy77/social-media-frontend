import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <Link>
            <div className="navbarIconItem">
              <HomeOutlinedIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link>
            <div className="navbarIconItem">
              <ForumOutlinedIcon />
            </div>
          </Link>
        </li>
        <li>
          <Link>
            <div className="navbarIconItem">
              <PersonAddOutlinedIcon />
              <span className="navbarIconBadge">1</span>
            </div>
          </Link>
        </li>
        <li>
          <div className="navbarIconItem">
            <ChatBubbleOutlineOutlinedIcon />
            <span className="navbarIconBadge">1</span>
          </div>
        </li>
        <li>
          <div className="navbarIconItem">
            <NotificationsNoneOutlinedIcon />
            <span className="navbarIconBadge">1</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
