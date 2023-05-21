import CancelIcon from "@mui/icons-material/Cancel";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// import DoneAllIcon from "@mui/icons-material/DoneAll";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { CircularProgress } from "@mui/material";
import { memo, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../axios";
import Feed from "../../components/feed/Feed";
import EditProfileModal from "../../components/modals/editProfile/EditProfileModal";
import UnfriendModal from "../../components/modals/unfriendModal/UnfriendModal";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./profile.css";

const Profile = () => {
  const profile = useRef();
  const params = useParams();
  const userId = params.userId;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const LF = process.env.REACT_APP_LOCAL_FOLDER;
  const [ppFile, setPPFile] = useState(null);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [friendReqStatus, setFriendReqStatus] = useState(null);
  const [friendOptionModalOpen, setFriendOptionModalOpen] = useState(false);
  const [openUnfriendModal, setOpenUnfriendModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [openPPModal, setOpenPPModal] = useState(false);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);

  // image upload state
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [file, setFile] = useState(null);

  const checkFriendReqStatus = async () => {
    const { data } = await API.get(
      `/users/checkFriendReqStatus?profileUserId=${userId}`
    );
    setFriendReqStatus(data);
  };

  const validateImg = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile.size >= 1048576) {
      setImageUploadError("Max file size is 1MB.");
    } else {
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ifoqd5xcdasfdsaawer");
    try {
      // setUploadingImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/diaguflgu/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      // setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      // setUploadingImg(false);
      setImageUploadError(error);
    }
  };

  const fetchUser = async () => {
    const res = await API.get(`/users/?userId=${userId}`);
    setUser(res.data);
  };

  console.log(currentUser);

  const cancelImgHandle = () => {
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};
    setImageUploading(true);

    let url = null;

    if (image) {
      url = await uploadImage(image);
      data.profilePicture = url;
    }

    try {
      await API.put(`/users/${currentUser?.details._id}`, data);
      dispatch({ type: "UPLOAD_PROFILE_PIC", payload: url });
      setImageUploading(false);
      setImage(false);
      setOpenPPModal(false);
      fetchUser();
    } catch (err) {
      setImageUploading(false);
      setImageUploadError("Error in server.");
    }
  };

  const handleAddFriend = async () => {
    await API.post("/users/sendFriendRequest", { recipientId: userId });
    checkFriendReqStatus();
  };

  const handleCancelRequest = async () => {
    await API.post("/users/cancelFriendRequest", { recipientId: userId });
    checkFriendReqStatus();
  };

  const handleAcceptReq = async () => {
    await API.post("/users/acceptFriendRequest", { sender: user._id });
    checkFriendReqStatus();
    dispatch({ type: "ADD_FRIEND_TO_FRIENDLIST", payload: user._id });
  };

  const handleRejectReq = async () => {
    await API.post("/users/rejectFriendRequest", { sender: user._id });
    checkFriendReqStatus();
  };

  // const handleFollow = async () => {
  //   try {
  //     await axios.put(`${API}/users/${user._id}/follow`, {
  //       userId: currentUser._id,
  //     });
  //     dispatch({ type: "FOLLOW", payload: user._id });
  //     setFollowed(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleUnfollow = async () => {
  //   try {
  //     await axios.put(`${API}/users/${user._id}/unfollow`, {
  //       userId: currentUser._id,
  //     });
  //     dispatch({ type: "UNFOLLOW", payload: user._id });
  //     setFollowed(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handlePPSubmit = async (e) => {
  //   e.preventDefault();
  //   const reqBody = {
  //     userId: currentUser._id,
  //   };

  //   if (ppFile) {
  //     const data = new FormData();
  //     const fileName = Date.now() + ppFile.name;

  //     data.append("name", fileName);
  //     data.append("file", ppFile);
  //     reqBody.profilePicture = fileName;
  //     console.log(reqBody);
  //     try {
  //       await axios.post(`${API}/upload`, data);
  //       console.log("data", data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   try {
  //     await axios.put(`${API}/users/${user._id}`, reqBody);
  //     window.location.reload();
  //   } catch (err) {}
  // };

  // useEffect(() => {
  //   setFollowed(currentUser.following.includes(user?._id));
  // }, [currentUser, user?._id]);

  useEffect(() => {
    setLoading(true);
    fetchUser();
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    checkFriendReqStatus();
  }, [userId]);

  console.log(friendReqStatus);

  return (
    <>
      <div>
        <Topbar />
        <div
          className={openPPModal ? "profile overlay" : "profile"}
          ref={profile}
        >
          <div className="profileContainer">
            <div className="sidebar"></div>
            <div className="center">
              <div className="profiletop">
                <div className="imgContainer">
                  <img
                    className="profileCoverImg"
                    src={
                      user?.coverPicture
                        ? user.coverPicture
                        : `${LF}person/blankCover.jpg`
                    }
                    alt="cover"
                  />
                  <div className="profilePictureContainer">
                    <div className="profileUserImgContainer">
                      <img
                        className="profileUserImg"
                        src={
                          user?.profilePicture
                            ? user.profilePicture
                            : `${LF}person/user.jpg`
                        }
                        alt="profile"
                      />
                      {user?.username === currentUser?.details.username && (
                        <div className="changeIconSection">
                          <ChangeCircleIcon
                            className="changePPIcon"
                            onClick={() => setOpenPPModal(!openPPModal)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="profileInfo">
                  <span className="profileUsername">{user.username}</span>
                  <p className="profileBio">{user?.bio}</p>
                  {user?.city && (
                    <div className="moreInfo">
                      {user?.city && (
                        <div className="moreInfoItem">
                          <LocationOnIcon className="icon" />
                          <span className="moreInfoItemKey">
                            Currently living in
                          </span>{" "}
                          {user?.city}
                        </div>
                      )}
                      {user?.from && (
                        <div className="moreInfoItem">
                          <FlightTakeoffIcon className="icon" />{" "}
                          <span className="moreInfoItemKey">From</span>{" "}
                          {user?.from}
                        </div>
                      )}
                    </div>
                  )}

                  {currentUser?.details._id === userId && (
                    <>
                      <button
                        className="pButton pButtonEdit"
                        onClick={() => setOpenEditProfileModal(true)}
                      >
                        Edit Profile
                      </button>
                      {openEditProfileModal && (
                        <EditProfileModal
                          setOpenEditProfileModal={setOpenEditProfileModal}
                          fetchUser={fetchUser}
                          user={user}
                        />
                      )}
                    </>
                  )}

                  {currentUser?.details?.friends.includes(userId) && (
                    <div className="pButtonContainer">
                      <button
                        className="pButton pButtonFriendStatus"
                        onClick={() =>
                          setFriendOptionModalOpen(!friendOptionModalOpen)
                        }
                      >
                        <HowToRegIcon fontSize="inherit" />
                        Friends <ExpandMoreIcon fontSize="inherit" />
                      </button>
                      <button className="pButton pButtonMessage">
                        <ChatBubbleOutlineIcon fontSize="inherit" />
                        Text
                      </button>
                      {friendOptionModalOpen && (
                        <div className="friendsOptionModal">
                          <div
                            className="friendsOptionModalItem"
                            onClick={() => setOpenUnfriendModal(true)}
                          >
                            <PersonRemoveIcon fontSize="inherit" /> Unfriend
                          </div>
                          {openUnfriendModal && (
                            <UnfriendModal
                              setOpenUnfriendModal={setOpenUnfriendModal}
                              setFriendOptionModalOpen={
                                setFriendOptionModalOpen
                              }
                              friend={user}
                              checkFriendReqStatus={checkFriendReqStatus}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {!currentUser?.details.friends.includes(userId) &&
                    currentUser?.details._id !== userId &&
                    friendReqStatus?.status === false && (
                      <div className="pButtonContainer">
                        <button
                          className="pButton pButtonFriendStatus"
                          onClick={handleAddFriend}
                        >
                          Add Friend
                        </button>
                      </div>
                    )}

                  {!currentUser?.details.friends.includes(userId) &&
                    friendReqStatus?.status === "hanging" && (
                      <div className="friendRequestWrapper">
                        <span>Friend request sent</span>
                        <div className="pButtonContainer">
                          <button
                            className="pButton pButtonCancel"
                            onClick={handleCancelRequest}
                          >
                            Cancel Request
                          </button>
                        </div>
                      </div>
                    )}

                  {!currentUser?.details.friends.includes(userId) &&
                    friendReqStatus?.status === "pending" && (
                      <div className="friendRequestWrapper">
                        <span>{user.username} has sent you friend request</span>
                        <div className="pButtonContainer">
                          <button
                            className="pButton pButtonFriendStatus"
                            onClick={handleAcceptReq}
                          >
                            Accept
                          </button>
                          <button
                            className="pButton rejectFriendOption"
                            onClick={handleRejectReq}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    )}

                  {/* {currentUser?.} */}
                </div>
              </div>
              {/* {user?.username === currentUser?.username ? (
                <button className="editProfileButton">Edit Profile</button>
              ) : followed ? (
                <button className="unfollowButton">Unfollow</button>
              ) : (
                <button className="followButton">Follow</button>
              )} */}
              <Feed userId={userId} />
            </div>
            <div className="rightbar"></div>
          </div>
        </div>
        {openPPModal && (
          <div className="ChangePPModal">
            <div
              className="modalCloseButtonSection"
              onClick={() => setOpenPPModal(false)}
            >
              <div className="closeButton">X</div>
            </div>
            <div className="modalPPWrapper">
              <h3
                style={{
                  marginBottom: "20px",
                }}
              >
                Upload Profile Picture
              </h3>
              <label htmlFor="ppfile" className="modalPPOption">
                <PermMediaIcon className="mediaIcon" />
                <span className="shareOptionText">select profile photo</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="ppfile"
                  accept=".png, .jpeg, .jpg"
                  onChange={validateImg}
                />
              </label>
              {imagePreview && (
                <div className="ppImgContainer">
                  <img className="ppImg" src={imagePreview} alt="selectedImg" />
                  <CancelIcon
                    className="ppCancelImg"
                    onClick={cancelImgHandle}
                  />
                </div>
              )}
              {imagePreview && (
                <div className="modalButtonSection">
                  <button
                    className="modalButton cancelButton"
                    onClick={cancelImgHandle}
                  >
                    cancel
                  </button>
                  <button
                    className="modalButton saveButton"
                    onClick={handleSubmit}
                  >
                    {imageUploading ? (
                      <CircularProgress className="loadingIcon" size="1rem" />
                    ) : (
                      "save"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(Profile);
