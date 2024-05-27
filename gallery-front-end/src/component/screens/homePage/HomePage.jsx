import "./home-page.css";
import { useSelector, useDispatch } from "react-redux";
import { ImageComp } from "../../";
import { useEffect, useState } from "react";
import {
  getAllImages,
  getImagesCount,
} from "../../../redux/apiCalls/imagesApiCalls";
import { Pagination } from "../../";

const HomePage = (props) => {
  const { images } = useSelector((state) => state.images);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { imagesCount } = useSelector((state) => state.images);
  const totalPages = Math.ceil(imagesCount / 8);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    dispatch(getImagesCount());
    dispatch(getAllImages(currentPage));
  }, [currentPage, images]);

  const previousUrl = props.previousUrl || "/";

  return (
    <div className="pagination-home-page">
      <div className="home-page">
        {(props.imageList || images).map((item) => (
          <ImageComp image={item} key={item._id} previousUrl={previousUrl} />
        ))}
      </div>
      {!props.imageList && (
        <Pagination
          pageNumbers={pageNumbers}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default HomePage;
