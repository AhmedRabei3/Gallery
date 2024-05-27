import "./image_c.css";
import { Link } from "react-router-dom";
const AddImageComp = () => {
  return (
    <div className="add-image-container">
      <div className="image-title">
        <Link to="/image/add" className="add">
        <i className="bi bi-plus-circle"></i>
        </Link>
      </div>
    </div>
  );
};

export default AddImageComp;
