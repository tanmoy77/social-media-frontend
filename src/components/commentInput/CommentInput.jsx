import { CircularProgress } from "@mui/material";
import React, { useRef, useState } from "react";
import API from "../../axios";
import "./commentInput.css";

const CommentInput = ({ postId, getComments, setCommentNumber }) => {
  const textarearef = useRef(null);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setComment(e.target.value);
    const element = textarearef.current;
    element.rows = 1;

    if (e.target.value === "") {
      return;
    }

    if (element.scrollHeight > element.offsetHeight) {
      //increase number of rows to match content
      element.rows = element.scrollHeight / 18;
    } else {
      //decrease number of rows to match content
      element.rows = element.scrollHeight / 18 - 1;
    }
  };
  const handleComment = async () => {
    setComment("");
    setIsLoading(false);
    try {
      await API.post(`/comments/create/${postId}`, { text: comment });
      getComments();
      setCommentNumber((prev) => prev + 1);
      textarearef.current.rows = 1;
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* <hr /> */}
      <div className="commentsTop">
        <div className="commentsTopImgWrapper">
          <img
            src="/assets/person/1.jpeg"
            className="commentsProfileImg"
            alt="profile pic"
          />
        </div>
        <div className="commentsTopInputWrapper">
          <textarea
            rows="1"
            maxLength={500}
            ref={textarearef}
            className="commentsTopInput"
            placeholder="Write a comment..."
            onChange={handleChange}
            value={comment}
          />
        </div>
        <button
          value="comment"
          className="commentsTopBtn"
          onClick={handleComment}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size="1rem" /> : "comment"}
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
