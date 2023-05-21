import React, { useState } from "react";
import ReactDOM from "react-dom";
import API from "../../../axios";
import "./editCommentModal.css";

const EditPostModal = ({
  setIsOpenCommentEditModal,
  comment,
  getComments,
  commentText,
  handleOpenModal,
}) => {
  const [editedText, setEditedText] = useState(commentText);
  const handleDelete = async () => {
    try {
      await API.put(`/comments/${comment._id}`, { text: editedText });
      setIsOpenCommentEditModal(false);
      handleOpenModal(comment._id);
      getComments();
    } catch (err) {}
    setIsOpenCommentEditModal(false);
    getComments();
  };

  return ReactDOM.createPortal(
    <div className="editCommentModalOverlay">
      <div className="editCommentModalContainer">
        <div className="editCommentTopSection">
          <p>Edit comment</p>
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
            onClick={() => setIsOpenCommentEditModal(false)}
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
