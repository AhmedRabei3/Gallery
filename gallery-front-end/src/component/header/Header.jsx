import "./header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCalls";
import { AddImage } from "../";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const active = useLocation().pathname;

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const dispatch = useDispatch();

  return (
    <div className="header">
      {user && <AddImage />}
      <div className="header-right">
        <ul className="navbar">
          <Link
            id={active === "/" ? "active" : null}
            to="/"
            className="navbar-item"
          >
            <i className="bi bi-house-fill"></i>Home
          </Link>
          {user && (
            <div onClick={logoutHandler} className="navbar-item">
              <i className="bi bi-box-arrow-left"></i>Logout
            </div>
          )}
          {!user && (
            <>
              <Link
                id={active === "/register" ? "active" : null}
                to="/register"
                className="navbar-item"
              >
                <i className="bi bi-person-add"></i>Register
              </Link>
              <Link
                id={active === "/login" ? "active" : null}
                to="/login"
                className="navbar-item"
              >
                <i className="bi bi-box-arrow-in-right"></i>Login
              </Link>
            </>
          )}
        </ul>
      </div>
      <div className="profile-image-wrapper1">
        <div className="profile-name">{user ? user?.username : "Guest"}</div>
        <img
          onClick={() => {
            if (user) {
              navigate(`/profile/${user.id}`);
            }
          }}
          src={user ? user?.profilePhoto?.url : "../images/user-avatar.png"}
          alt="profile image"
          className="profile-image"
        />
      </div>
    </div>
  );
};
export default Header;
