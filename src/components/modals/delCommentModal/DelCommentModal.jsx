import React from "react";
import ReactDOM from "react-dom";
import API from "../../../axios";
import "./delCommentModal.css";

const DelCommentModal = ({
  setIsOpenCommentDelModal,
  comment,
  getComments,
  setCommentNumber,
}) => {
  const handleDelete = async () => {
    try {
      await API.delete(`/comments/${comment._id}`);
      setIsOpenCommentDelModal(false);
      getComments();
      setCommentNumber((prev) => prev - 1);
    } catch (err) {}
  };

  return ReactDOM.createPortal(
    <div className="delCommentModalOverlay">
      <div className="delCommentModalContainer">
        <p>Do you want to delete this comment?</p>
        <div className="optionButtons">
          <button onClick={handleDelete}>Yes</button>
          <button
            className="cancel"
            onClick={() => setIsOpenCommentDelModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default DelCommentModal;
