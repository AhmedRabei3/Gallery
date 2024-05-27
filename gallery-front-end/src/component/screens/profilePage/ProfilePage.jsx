import "./profilePage.css";
import { HomePage } from "../../index";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import UpdateProfileModal from "./UpdateProfileModal";
import Moment from "react-moment";
import swal from "sweetalert";
import {
  deleteAccount,
  getUserProfile,
  uploadProfilePhoto,
} from "../../../redux/apiCalls/profileApiCall";
import { useParams, useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";

const ProfilePage = () => {
  const { id } = useParams();
  const { profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [updateProfile, setUpdateProfile] = useState(false);
  const { loading, isProfilePhotoCreated } = useSelector(
    (state) => state.profile
  );

  const previousUrl = `/profile/${id}`;

  useEffect(() => {
    dispatch(getUserProfile(id));
  }, [id, profile, isProfilePhotoCreated]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("No Image Provided");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData));
  };

  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Are you serious? Your account will be deleted, and we won't be able to see you again!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteAccount(id));
        navigate("/login");
      } else {
        swal("Procidure has been blocked");
      }
    });
  };

  return (
    <section className="profile">
      {user?.id === profile?._id && (
        <button onClick={deleteAccountHandler} className="delete-account-btn">
          Delete Profile
        </button>
      )}
      <ToastContainer position="top-center" />
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto?.url}
            alt="profile image"
            className="profile-image"
          />
          {user?.id === profile?._id && (
            <form onSubmit={formSubmitHandler}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="bi bi-camera-fill upload-profile-photo-icon"
                ></label>
              </abbr>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit" className="upload-profile-photo-btn">
                {loading ? (
                  <Circles
                    height="15"
                    width="15"
                    color="#4fa94d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                ) : (
                  "Upload"
                )}{" "}
              </button>
            </form>
          )}
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">{profile?.bio}</p>
        <div className="user-date-joined">
          <strong>Joined at: </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
          <div className="moment">
            Joined since:{" "}
            <Moment fromNow ago>
              {profile?.createdAt}
            </Moment>{" "}
            ago
          </div>
        </div>
        {user?.id === profile?._id && (
          <button
            onClick={() => setUpdateProfile(true)}
            className="profile-update-btn"
          >
            <i className="bi bi-file-person-fill">Update Profile</i>
          </button>
        )}
      </div>
      <div className="profile-image-list">
        <h2 className="profile-image-list-title">
          Images by {profile?.username}:
        </h2>
        <HomePage imageList={profile?.images} previousUrl={previousUrl} />
      </div>
      {updateProfile && (
        <UpdateProfileModal
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
};

export default ProfilePage;
