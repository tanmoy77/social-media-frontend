import React from "react";
import "./commentModal.css";

const CommentOptionModal = ({
  currentUserId,
  commentAuthorId,
  postAuthorId,
}) => {
  return (
    <div className="commentOptionModal">
      {(currentUserId === commentAuthorId ||
        currentUserId === postAuthorId) && (
        <div className="commentOptionModalItem">Delete</div>
      )}
      <hr />
      {currentUserId === commentAuthorId && (
        <div className="commentOptionModalItem">Edit</div>
      )}
    </div>
  );
};

export default CommentOptionModal;
