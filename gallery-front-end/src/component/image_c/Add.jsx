import { toast, ToastContainer } from "react-toastify";
import "./add.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewImage } from "../../redux/apiCalls/imagesApiCalls";
import { Circles } from "react-loader-spinner";

const Add = () => {
  const dipatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isImageCreated } = useSelector((state) => state.images);
  const [title, setTetile] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("description is required");
    if (file === null) return toast.error("No Image provided");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", file);

    dipatch(createNewImage(formData));
  };
  useEffect(() => {
    if (isImageCreated) {
      navigate("/");
    }
  }, [isImageCreated, navigate]);

  return (
    <section className="create-image">
      <ToastContainer theme="colored" position="top-center" />
      <h1 className="create-image-title">Add a new image</h1>
      <form onSubmit={formSubmitHandler} className="create-image-form">
        <input
          placeholder="Add title here"
          type="text"
          className="create-image-title"
          value={title}
          onChange={(e) => setTetile(e.target.value)}
        />
        <textarea
          className="ceate-image-text-area"
          rows={3}
          placeholder="Image description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          name="file"
          id="file"
          className="ceate-image-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="create-image-btn">
          {loading ? ( 
            <Circles
              height="40"
              width="40"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            "Upload Image"
          )}{" "}
        </button>
      </form>
    </section>
  );
};

export default Add;
