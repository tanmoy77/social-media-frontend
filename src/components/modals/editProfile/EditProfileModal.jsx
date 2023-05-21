import React, { useState } from "react";
import ReactDOM from "react-dom";
import API from "../../../axios";
import "./editProfileModal.css";

const EditProfileModal = ({ setOpenEditProfileModal, fetchUser, user }) => {
  const [bio, setBio] = useState(user?.bio);
  const [city, setCity] = useState(user?.city);

  const handleSubmit = async () => {
    await API.put(`/users/${user?._id}`, { bio, city });
    fetchUser();
    setOpenEditProfileModal(false);
  };

  return ReactDOM.createPortal(
    <div className="editProfileModalOverlay">
      <div className="editProfileModalContainer">
        <div className="editProfileTopSection">
          <p className="editProfileHeader">Edit Profile</p>
          <div className="editProfileItem">
            <p className="editProfileItemName">Bio</p>
            <textarea
              className="editProfileBio editProfileItemValue"
              rows="3"
              cols="40"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="editProfileItem">
            <p className="editProfileItemName">City</p>
            <input
              className="editProfileItemValue"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="editProfileOptionButtons">
          <button onClick={handleSubmit}>Update</button>
          <button
            className="cancel"
            onClick={() => setOpenEditProfileModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default EditProfileModal;
