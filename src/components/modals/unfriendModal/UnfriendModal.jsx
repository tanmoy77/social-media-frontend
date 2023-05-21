import React, { useContext } from "react";
import ReactDOM from "react-dom";
import API from "../../../axios";
import { AuthContext } from "../../../context/AuthContext";
import "./unfriendModal.css";

const UnfriendModal = ({
  setOpenUnfriendModal,
  setFriendOptionModalOpen,
  friend,
  checkFriendReqStatus,
}) => {
  const { dispatch } = useContext(AuthContext);

  const handleUnfriend = async () => {
    await API.post("/users/unfriend", { friendId: friend._id });
    dispatch({ type: "UNFRIEND", payload: friend._id });
    setOpenUnfriendModal(false);
    checkFriendReqStatus();
  };

  const handleCancel = () => {
    setOpenUnfriendModal(false);
    setFriendOptionModalOpen(false);
  };

  return ReactDOM.createPortal(
    <div className="unfriendModalOverlay">
      <div className="unfriendModalContainer">
        <p>Do you want to unfriend {friend.username} ?</p>
        <div className="unfriendModalOptionButtons">
          <button onClick={handleUnfriend}>Yes</button>
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default UnfriendModal;
