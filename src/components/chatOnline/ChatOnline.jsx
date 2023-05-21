import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

const ChatOnline = ({ onlineUsers, currentUserId, setCurrentChat }) => {
  const API = process.env.REACT_APP_BACKEND_API;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const LF = process.env.REACT_APP_LOCAL_FOLDER;

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const { data } = await axios.get(
        `${API}/users/followings/${currentUserId}`
      );
      setFriends(data);
    };

    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (friendId) => {
    try {
      const { data } = await axios.get(
        `${API}/conversations/find/${currentUserId}/${friendId}`
      );
      setCurrentChat(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div
          className="chatOnlineFriend"
          onClick={() => {
            handleClick(o._id);
          }}
        >
          <div className="chatOnlineImgContainer">
            <img
              src={
                o?.profilePicture
                  ? `${PF}${o.profilePicture}`
                  : `${LF}person/user.jpg`
              }
              alt="proPic"
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
