import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import API from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import DelCommentModal from "../modals/delCommentModal/DelCommentModal";
import EditCommentModal from "../modals/editCommentModal/EditCommentModal";
import "./comments.css";

const Comments = ({
  comment,
  handleOpenModal,
  popupStatus,
  getComments,
  setCommentNumber,
}) => {
  const [dislikes, setDislikes] = useState(comment.dislikes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likes, setLikes] = useState(comment.likes.length);
  const [isOpenCommentDelModal, setIsOpenCommentDelModal] = useState(false);
  const [isOpenCommentEditModal, setIsOpenCommentEditModal] = useState(false);
  const LF = process.env.REACT_APP_LOCAL_FOLDER;

  const { user: currentUser } = useContext(AuthContext);

  const handleClick = async (reactType) => {
    if (reactType === "love") {
      if (!isLiked) {
        if (isDisliked) {
          setIsDisliked(false);
          setDislikes((prev) => prev - 1);
        }
        setIsLiked(true);
        setLikes((prev) => prev + 1);
        try {
          await API.put(`/comments/like/${comment._id}`);
        } catch (err) {}
      } else {
        setIsLiked(false);
        setLikes((prev) => prev - 1);
        await API.put(`/comments/like/${comment._id}`);
      }
    } else if (reactType === "dislike") {
      if (!isDisliked) {
        if (isLiked) {
          setIsLiked(false);
          setLikes((prev) => prev - 1);
        }
        setDislikes((prev) => prev + 1);
        setIsDisliked(true);
        await API.put(`/comments/dislike/${comment._id}`);
      } else {
        setDislikes((prev) => prev - 1);
        setIsDisliked(false);
        await API.put(`/comments/dislike/${comment._id}`);
      }
    }
  };

  useEffect(() => {
    setLikes(comment.likes.length);
    setDislikes(comment.dislikes.length);
  }, [comment]);

  useEffect(() => {
    setIsLiked(comment.likes.includes(currentUser.details._id));
    setIsDisliked(comment.dislikes.includes(currentUser.details._id));
  }, [currentUser.details._id, comment.likes, comment.dislikes]);

  return (
    <div className="comments">
      <div className="commentsBottom">
        <div className="commentsBottomLeft">
          <img
            className="commentsProfileImg"
            src={comment.user.profilePicture || `${LF}/person/user.jpg`}
            alt="profile pic"
          />
        </div>
        <div className="commentsBottomCenter">
          <span className="commentsUsername">{comment?.user.username}</span>
          <span className="commentsPost">{comment.text}</span>
          <div className="centerBottom">
            <div className="commentsReactIcons">
              <div
                onClick={() => handleClick("love")}
                className="commentsReactIconContainer"
              >
                {isLiked ? (
                  <FavoriteIcon className="commentsReactIcon iconLove" />
                ) : (
                  <FavoriteBorderIcon className="commentsReactIcon iconOutlined" />
                )}
              </div>
              <span className="reactLabel">{likes}</span>
              <span className="dot">·</span>
              <div
                onClick={() => handleClick("dislike")}
                className="commentsReactIconContainer"
              >
                {isDisliked ? (
                  <ThumbDownIcon className="commentsReactIcon iconDisliked" />
                ) : (
                  <ThumbDownOffAltIcon className="commentsReactIcon iconOutlined" />
                )}
              </div>
              <span className="reactLabel">{dislikes}</span>
              <span className="dot">·</span>
              <span className="commentTimeLabel">
                {format(comment.createdAt)}
              </span>
              {comment.edited && (
                <>
                  <span className="dot">·</span>
                  <span className="commentTimeLabel">(edited)</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="commentsBottomRight">
          {(currentUser.details._id === comment.user._id ||
            currentUser.details._id === comment.postAuthorId) && (
            <MoreHorizIcon
              className="commentsIcon"
              onClick={() => handleOpenModal(comment._id)}
            />
          )}

          {popupStatus[comment._id] && (
            // <CommentOptionModal
            //   currentUserId={currentUser.details._id}
            //   commentAuthorId={comment.user._id}
            //   postAuthorId={comment.postAuthorId}
            // />
            <div className="commentOptionModal">
              {(currentUser.details._id === comment.user._id ||
                currentUser.details._id === comment.postAuthorId) && (
                <div className="commentOptionModalWrapper">
                  <div
                    className="commentOptionModalItem"
                    onClick={() => setIsOpenCommentDelModal(true)}
                  >
                    Delete
                  </div>
                  {isOpenCommentDelModal && (
                    <DelCommentModal
                      setIsOpenCommentDelModal={setIsOpenCommentDelModal}
                      comment={comment}
                      getComments={getComments}
                      setCommentNumber={setCommentNumber}
                    />
                  )}
                </div>
              )}
              {/* <hr /> */}
              {currentUser.details._id === comment.user._id && (
                <>
                  <div
                    className="commentOptionModalItem"
                    onClick={() => setIsOpenCommentEditModal(true)}
                  >
                    Edit Comment
                  </div>
                  {isOpenCommentEditModal && (
                    <EditCommentModal
                      setIsOpenCommentEditModal={setIsOpenCommentEditModal}
                      comment={comment}
                      getComments={getComments}
                      commentText={comment.text}
                      handleOpenModal={handleOpenModal}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
