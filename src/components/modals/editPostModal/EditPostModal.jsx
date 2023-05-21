import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { fetchPosts } from "../../../apiCalls";
import API from "../../../axios";
import { PostContext } from "../../../context/PostContext/PostContextProvider";
import "./editPostModal.css";

const EditPostModal = ({ setOpenEditPostModal, post }) => {
  const [editedText, setEditedText] = useState(post.desc);
  const { dispatch } = useContext(PostContext);
  const handleDelete = async () => {
    try {
      await API.put(`/posts/${post._id}`, { desc: editedText });
      setOpenEditPostModal(false);
      fetchPosts(dispatch);
    } catch (err) {}
    setOpenEditPostModal(false);
  };

  return ReactDOM.createPortal(
    <div className="editCommentModalOverlay">
      <div className="editCommentModalContainer">
        <div className="editCommentTopSection">
          <p>Edit Post</p>
          <textarea
            className="editCommentText"
            value={editedText}
            rows="3"
            cols="40"
            onChange={(e) => setEditedText(e.target.value)}
          />
        </div>
        <div className="editOptionButtons">
          <button onClick={handleDelete}>Update</button>
          <button
            className="cancel"
            onClick={() => setOpenEditPostModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default EditPostModal;
