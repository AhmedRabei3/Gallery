import { Link, useNavigate } from "react-router-dom";
import "./image_c.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../../redux/apiCalls/imagesApiCalls";
import { toast, ToastContainer } from "react-toastify";

const ImageComp = ({ image, previousUrl }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className={"image-container"}>
      <ToastContainer position="top-center" />
      <div className="image-view">
        <img
          onClick={() =>
            navigate(`/image/details/${image?._id}`, {
              state: { previousUrl },
            })
          }
          className="image-element"
          src={image?.image.url}
          alt="Image element"
        />
        <div className="author">
          {image.user.username && (
            <Link
              to={`/profile/${image.user.id}`}
            >{`Image By : ${image.user.username}`}</Link>
          )}
        </div>
        <div className="image-title">
          <h3>{image?.title}</h3>
          <div className="likes">
            {user && (
              <i
                onClick={() => {
                  dispatch(toggleLike(image?._id));
                }}
                className={
                  image?.likes.includes(user?.id)
                    ? "bi bi-hand-thumbs-up-fill"
                    : "bi bi-hand-thumbs-up thumb"
                }
              ></i>
            )}
            {!user && (
              <i
                onClick={() => toast.error("Available only for logged in user")}
                className={"bi bi-hand-thumbs-up-fill not-registerd"}
              ></i>
            )}
            <span>{image?.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageComp;
