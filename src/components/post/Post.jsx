import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { CircularProgress } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { memo, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import API from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import CommentInput from "../commentInput/CommentInput";
import Comments from "../comments/Comments";
import DelPostModal from "../modals/delPostModal/DelPostModal";
import EditPostModal from "../modals/editPostModal/EditPostModal";
import "./post.css";

const Post = ({ post, profile }) => {
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(post.likes.length);
  const [dislike, setDislike] = useState(post.dislikes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [isHated, setIsHated] = useState(false);
  const [totalReactions, setTotalReactions] = useState(like + dislike);

  const [popupStatus, setPopStatus] = useState({});
  const [openPostOptionModal, setOpenPostOptionModal] = useState(false);
  const [openDelPostModal, setOpenDelPostModal] = useState(false);
  const [openEditPostModal, setOpenEditPostModal] = useState(false);

  const [isShowed, setIsShowed] = useState(false);
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const LF = process.env.REACT_APP_LOCAL_FOLDER;
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentNumber, setCommentNumber] = useState(post.comments.length);

  const handleOpenModal = (commentId) => {
    setPopStatus({
      [commentId]: !popupStatus[commentId],
    });
  };

  const handleClick = async (reactType) => {
    if (reactType === "love") {
      if (!isLiked) {
        if (isHated) {
          setIsHated(false);
          setDislike((prev) => prev - 1);
        }
        setIsLiked(true);
        setLike((prev) => prev + 1);
        try {
          await API.put(`/posts/${post._id}/like`);
        } catch (err) {}
      } else {
        setIsLiked(false);
        setLike((prev) => prev - 1);
        await API.put(`/posts/${post._id}/like`);
      }
    } else if (reactType === "hate") {
      if (!isHated) {
        if (isLiked) {
          setIsLiked(false);
          setLike((prev) => prev - 1);
        }
        setDislike((prev) => prev + 1);
        setIsHated(true);
        await API.put(`/posts/${post._id}/dislike`);
      } else {
        setDislike((prev) => prev - 1);
        setIsHated(false);
        await API.put(`/posts/${post._id}/dislike`);
      }
    }
  };

  const getComments = async () => {
    setCommentsLoading(true);
    try {
      const { data } = await API.get(`/comments/${post._id}`);
      setComments(data);
      setCommentsLoading(false);
    } catch (err) {}
  };

  const handleClickShowComments = () => {
    if (!isShowed) {
      getComments();
    }

    setIsShowed(!isShowed);
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(user?.details._id));
    setIsHated(post.dislikes.includes(user?.details._id));
  }, [user?.details._id, post.likes, post.dislikes]);

  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${post.user._id}`}>
                {loading ? (
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={35}
                    height={35}
                  />
                ) : (
                  <img
                    src={post.user?.profilePicture || `${LF}person/user.jpg`}
                    alt="profile pic"
                    className="postProfileImg"
                  />
                )}
              </Link>

              <span className="postUserName">
                {loading ? (
                  <Skeleton animation="wave" height={20} width={80} />
                ) : (
                  post.user.username
                )}
              </span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              {user?.details._id === post.user._id && (
                <MoreVertOutlinedIcon
                  className="postOptionIcon"
                  onClick={() => setOpenPostOptionModal(!openPostOptionModal)}
                />
              )}

              {openPostOptionModal && (
                <div className="postOptionModal">
                  <div className="postOptionModalWrapper">
                    <div
                      className="postOptionModalItem"
                      onClick={() => setOpenDelPostModal(true)}
                    >
                      <DeleteForeverIcon /> Delete
                    </div>
                    {openDelPostModal && (
                      <DelPostModal
                        setOpenDelPostModal={setOpenDelPostModal}
                        post={post}
                        profile={profile}
                      />
                    )}
                    <hr />
                    <div
                      className="postOptionModalItem"
                      onClick={() => setOpenEditPostModal(true)}
                    >
                      <EditIcon /> Edit Post
                    </div>
                    {openEditPostModal && (
                      <EditPostModal
                        post={post}
                        setOpenEditPostModal={setOpenEditPostModal}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="postCenter" onDoubleClick={() => handleClick("love")}>
            <div className="postText">{post?.desc}</div>
            {post.img && (
              <img src={post.img} alt="post pic" className="postImg" />
            )}
          </div>
          <div className="postBottom">
            {!post.img && <hr className="postHr" />}
            <div className="postBottomButtonSection">
              <div className="postBottomButton">
                <div className="postBottomButtonItem">
                  <button onClick={() => handleClick("love")}>
                    {isLiked ? (
                      <FavoriteIcon className="postBottomIcon postIconLove" />
                    ) : (
                      <FavoriteBorderIcon className="postBottomIcon postIconOutlined" />
                    )}
                  </button>
                  <span>{like}</span>
                </div>
                <div className="postBottomButtonItem">
                  <button onClick={() => handleClick("hate")}>
                    {isHated ? (
                      <ThumbDownAltIcon className="postBottomIcon postIconDislike" />
                    ) : (
                      <ThumbDownOutlinedIcon className="postBottomIcon postIconOutlined" />
                    )}
                  </button>
                  <span>{dislike}</span>
                </div>
              </div>
              <div className="postBottomButton">
                <button onClick={handleClickShowComments}>
                  <ChatBubbleOutlineIcon className="postBottomIcon postIconOutlined" />
                  <span className="commentsNumberSpan">{commentNumber} </span>{" "}
                  {commentNumber === 1 ? "Comment" : "Comments"}
                </button>
              </div>
            </div>
            {isShowed ? (
              <>
                <div className="postBottomCommentSection">
                  <CommentInput
                    postId={post._id}
                    getComments={getComments}
                    setCommentNumber={setCommentNumber}
                  />
                  {commentsLoading ? (
                    <div className="loading-bar">
                      <CircularProgress className="loadingGif" />
                    </div>
                  ) : (
                    <div className="allComments">
                      {comments?.map((comment) => (
                        <Comments
                          key={comment._id}
                          comment={comment}
                          handleOpenModal={handleOpenModal}
                          popupStatus={popupStatus}
                          getComments={getComments}
                          setCommentNumber={setCommentNumber}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Post);
