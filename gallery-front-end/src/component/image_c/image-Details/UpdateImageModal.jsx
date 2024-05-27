import "./update-image-modal.css";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { updateImageInfo } from "../../../redux/apiCalls/imagesApiCalls";

const UpdateImageModal = ({ setUpdateImage, image }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);


  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateImageInfo(image?._id, { title, description }));
    setUpdateImage(false);
  };

  return (
    <div className="update-image">
      <ToastContainer theme="colored" />
      <form onSubmit={formSubmitHandler} className="update-image-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateImage(false)}
            className="bi bi-x-circle-fill update-image-form-close"
          ></i>
        </abbr>
        <h1 className="update-image-title">Update image</h1>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="update-image-input"
        />
        <textarea
          className="update-image-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        ></textarea>
        <button type="submit" className="update-image-btn">
          Update image info
        </button>
      </form>
    </div>
  );
};

export default UpdateImageModal;
