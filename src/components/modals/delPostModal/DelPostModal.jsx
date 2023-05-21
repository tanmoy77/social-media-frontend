import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { fetchPosts, fetchProfilePosts } from "../../../apiCalls";
import API from "../../../axios";
import { PostContext } from "../../../context/PostContext/PostContextProvider";
import "./delPostModal.css";

const DelPostModal = ({ setOpenDelPostModal, post, profile }) => {
  const { dispatch } = useContext(PostContext);
  const handleDelete = async () => {
    try {
      await API.delete(`/posts/${post._id}`);
      setOpenDelPostModal(false);
      if (profile) {
        fetchProfilePosts(dispatch, profile);
      } else {
        fetchPosts(dispatch);
      }
    } catch (err) {}
  };

  return ReactDOM.createPortal(
    <div className="delCommentModalOverlay">
      <div className="delCommentModalContainer">
        <p>Do you want to delete this post?</p>
        <div className="optionButtons">
          <button onClick={handleDelete}>Yes</button>
          <button className="cancel" onClick={() => setOpenDelPostModal(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default DelPostModal;
