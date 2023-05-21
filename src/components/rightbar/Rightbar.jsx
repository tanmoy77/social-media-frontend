import "./rightbar.css";

const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img
                className="rightbarProfileImg"
                src="/assets/person/3.jpeg"
                alt="pro pic"
              />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Josephine Alexandra</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Rightbar;
