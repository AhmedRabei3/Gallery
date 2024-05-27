import { Link } from "react-router-dom";
import "./notFound.css"

const NotFound = () => {
  return (
    <section className="not-found">
      <div className="not-found-title">404</div>
        <h1>PAGE NOT FOUND</h1>
        <Link  to="/" className="not-found-text">
            Go to home page
        </Link>
    </section>
  );
};

export default NotFound;
