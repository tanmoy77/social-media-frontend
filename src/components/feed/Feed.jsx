import { CircularProgress } from "@mui/material";
import { memo, useContext, useEffect } from "react";
import { fetchPosts, fetchProfilePosts } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext/PostContextProvider";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

const Feed = ({ userId }) => {
  const { user } = useContext(AuthContext);
  const { posts, isLoading, error, dispatch } = useContext(PostContext);

  useEffect(() => {
    userId ? fetchProfilePosts(dispatch, userId) : fetchPosts(dispatch);
  }, [userId, user?._id]);

  return (
    <>
      <div className="feed">
        <div className="feedWrapper">
          {userId ? (
            userId === user?.details._id && <Share username={userId} />
          ) : (
            <Share />
          )}
          {userId && (
            <div className="feedSpan">
              <p>Posts</p>
            </div>
          )}
          {isLoading ? (
            <div className="loading-bar">
              <CircularProgress className="loadingGif" />
            </div>
          ) : (
            posts.map((p) => <Post key={p._id} post={p} profile={userId} />)
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Feed);
