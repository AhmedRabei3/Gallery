import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./image-details.css";
import UpdateImageModal from "./UpdateImageModal";
import { toast ,ToastContainer } from "react-toastify";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import {
  deleteImageCall,
  getSingleImage,
  toggleLike,
} from "../../../redux/apiCalls/imagesApiCalls";

const ImageDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [owner, setOwner] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);
  const { image } = useSelector((state) => state.images);

  useEffect(() => {
    if (user?.id === image?.user?.id) {
      setOwner(true);
    }else{
      setOwner(false);
    }
  }, [user, image , id]);
  
  
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSingleImage(id));
  }, [id]);

  
  // Delete Image Handler
  const deleteImageHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this image!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteImageCall(image?._id));
        navigate(`/profile/${user?.id}`);
      } else {
        swal("You backed away");
      }
    });
  };

  return (
    <div className="image-details">
      <ToastContainer />
      <div
        onClick={() => navigate(location.state.previousUrl)}
        className="image-details-image-wrapper"
      >
        <i className="bi bi-arrow-counterclockwise return">Return</i>
        <img src={image?.image?.url} alt="" className="image-details-image" />
      </div>
      <h1 className="image-details-title">{image?.title}</h1>
      <div className="image-details-user-info">
        <img
          src={image?.user?.profilePhoto?.url}
          alt=""
          className="image-details-user-image"
        />
        <div className="image-details-user">
          <strong>
            <Link to={`/profile/${image?.user?.id}`}>
              {image?.user?.username}
            </Link>
          </strong>
          <Moment fromNow ago>
            {image?.createdAt}
          </Moment>{" "}
          ago
        </div>
      </div>
      <p className="image-details-description">
        <span className="description">DESCRIPTION: </span> {image?.description}
      </p>
      <div className="image-details-icon-wrapper">
        <div>
          {user && (
            <i
              onClick={() => dispatch(toggleLike(image?._id))}
              className={
                image?.likes.includes(user?.id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
            ></i>
          )}
          {!user && (
            <i
              onClick={() => {
                toast.warning("Available only for registerd & logged in user");
              }}
              id="not-available"
              className={"bi bi-hand-thumbs-up-fill"}
            ></i>
          )}
          <small>{image?.likes?.length} likes</small>
        </div>
        {owner && (
          <div>
            <i
              onClick={() => setUpdateImage(true)}
              className="bi bi-pencil-square"
            ></i>
            <i onClick={deleteImageHandler} className="bi bi-trash-fill"></i>
          </div>
        )}
        {updateImage && owner && (
          <UpdateImageModal image={image} setUpdateImage={setUpdateImage} />
        )}
      </div>
    </div>
  );
};

export default ImageDetails;
