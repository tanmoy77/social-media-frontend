import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const LF = process.env.REACT_APP_LOCAL_FOLDER + "person/user.jpg";
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const API = process.env.REACT_APP_BACKEND_API;
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const { data } = await axios.get(`${API}/users/?userId=${friendId}`);
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser._id, conversation.members]);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? `${PF}${user.profilePicture}`
            : `${LF}person/user.jpg`
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversation;
