import ClearIcon from "@mui/icons-material/Clear";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../navbar/Navbar";
import "./topbar.css";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const LF = process.env.REACT_APP_LOCAL_FOLDER;
  const [openTopbarModal, setOpenTopbarModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    const { data } = await API.get(`/search?search=${query}`);
    setSearchResults(data);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            <span className="logoF">G</span>olpo
          </span>
        </Link>
      </div>
      <div className="topbarCenter">
        <Navbar />
        {/*  */}
      </div>
      <div className="topbarRight">
        <div className="topbarRightContainer">
          <div className="searchbar">
            <SearchIcon className="searchIcon" />
            <input
              placeholder="Search for people"
              className="searchInput"
              onChange={handleSearchChange}
              value={searchInput}
            />
            {searchInput && (
              <ClearIcon
                className="clearIcon"
                fontSize="inherit"
                onClick={() => setSearchInput("")}
              />
            )}
            {searchInput && (
              <div className="searchResults">
                {searchResults?.users?.length > 0 ? (
                  searchResults?.users?.map((u) => (
                    <Link to={`/profile/${u._id}`}>
                      <div className="searchResultItem">
                        <img
                          alt={u.username}
                          src={u.profilePicture || `${LF}person/user.jpg`}
                        />
                        <p>{u.username}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="notFoundResult">
                    <p>No Result Found</p>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* <div className="topbarIconItem">
            <PeopleAltOutlinedIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatBubbleOutlineIcon />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsNoneIcon />
            <span className="topbarIconBadge">1</span>
          </div> */}
          <div className="profileOption">
            <img
              src={user?.details.profilePicture || `${LF}person/user.jpg`}
              alt="pro pic"
              className="topbarImg"
              onClick={() => setOpenTopbarModal(!openTopbarModal)}
            />
          </div>
          {openTopbarModal && (
            <div className="topbarModal">
              <div className="topbarModalWrapper">
                <div className="topbarModalItem">
                  <Link to={`/profile/${user?.details._id}`}>My Profile</Link>
                </div>
                <hr />
                <div className="topbarModalItem">
                  <LogoutIcon />
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
