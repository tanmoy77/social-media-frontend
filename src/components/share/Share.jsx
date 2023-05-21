import AttachFileIcon from "@mui/icons-material/AttachFile";
import CancelIcon from "@mui/icons-material/Cancel";
import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { fetchPosts, fetchProfilePosts } from "../../apiCalls";
import API from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext/PostContextProvider";
import "./share.css";

const Share = ({ username }) => {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);
  // const API = process.env.REACT_APP_BACKEND_API;
  const LF = process.env.REACT_APP_LOCAL_FOLDER;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const textarearef = useRef(null);
  const { dispatch } = useContext(PostContext);

  // image upload state
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateImg = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile.size >= 1048576) {
      setImageUploadError("Max file size is 1MB.");
    } else {
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ifoqd5xcdasfdsaawer");
    try {
      // setUploadingImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/diaguflgu/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      // setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      // setUploadingImg(false);
      setImageUploadError(error);
    }
  };

  const handleChange = (e) => {
    setDesc(e.target.value);
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

  const cancelImgHandle = () => {
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      desc: desc,
    };
    if (!image) {
      if (newPost.desc === "") {
        return;
      }
    }
    setLoading(true);
    if (image) {
      const url = await uploadImage(image);
      newPost.img = url;
    }

    try {
      await API.post("/posts/create", newPost);
      if (username) {
        fetchProfilePosts(dispatch, username);
      } else {
        fetchPosts(dispatch);
      }
      setImagePreview(null);
      setImage(null);
      setDesc("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setImageUploadError(err);
    }
  };

  useEffect(() => {
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }

    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [file]);

  return (
    <div className="share">
      <form className="shareWrapper" onSubmit={handleSubmit}>
        <div className="shareTop">
          <img
            src={user?.details.profilePicture || `${LF}person/user.jpg`}
            alt="profile pic"
            className="shareProfileImg"
          />
          <textarea
            ref={textarearef}
            className="shareInput"
            value={desc}
            rows="1"
            type="text"
            placeholder={`What's new, ${user?.details.username}?`}
            onChange={(e) => handleChange(e)}
          />
          <button className="shareButton" type="submit" disabled={loading}>
            {loading ? (
              <CircularProgress className="postUploadingProgress" size="1rem" />
            ) : (
              "Post"
            )}
          </button>
        </div>
        <hr className="shareHr" />
        {imagePreview && (
          <div className="shareImgContainer">
            <img className="shareImg" src={imagePreview} alt="Img" />
            <CancelIcon className="shareCancelImg" onClick={cancelImgHandle} />
          </div>
        )}
        <div className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <AttachFileIcon className="shareIcon" />
              <span className="shareOptionText">Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={validateImg}
              />
            </label>
            {imagePreview ? (
              <p style={{ marginLeft: "10px" }}>{image?.name}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Share;
